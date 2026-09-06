import { NextResponse } from "next/server";
import { Resend } from "resend";

const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL ?? "studio@vikosjewelry.com";
const getResend = () => new Resend(process.env.RESEND_API_KEY ?? "");

interface OrderItem {
  id?: string;
  name: string;
  nameHe: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderPayload {
  orderId: string;
  customer: { name: string; email: string; phone: string; address: string; city: string; zip: string };
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paypalOrderId: string;
}

interface PayPalVerification {
  ok: boolean;
  paidAmount: number | null;   // total actually captured, null when verification is skipped (dev only)
  currency: string | null;
}

async function verifyPayPalOrder(paypalOrderId: string): Promise<PayPalVerification> {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const secret   = process.env.PAYPAL_SECRET;
  if (!clientId || !secret) {
    // Never accept unverified payments in production
    if (process.env.NODE_ENV === "production") return { ok: false, paidAmount: null, currency: null };
    return { ok: true, paidAmount: null, currency: null };
  }

  const base = process.env.PAYPAL_MODE === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

  const tokenRes = await fetch(`${base}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${secret}`).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
  });
  if (!tokenRes.ok) return { ok: false, paidAmount: null, currency: null };
  const { access_token } = await tokenRes.json() as { access_token: string };

  const orderRes = await fetch(`${base}/v2/checkout/orders/${paypalOrderId}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  if (!orderRes.ok) return { ok: false, paidAmount: null, currency: null };
  const paypalOrder = await orderRes.json() as {
    status: string;
    purchase_units?: { amount?: { value?: string; currency_code?: string } }[];
  };
  const amount = paypalOrder.purchase_units?.[0]?.amount;
  return {
    ok: paypalOrder.status === "COMPLETED",
    paidAmount: amount?.value ? parseFloat(amount.value) : null,
    currency: amount?.currency_code ?? null,
  };
}

/** Recompute the order total from the database — client-sent prices are never trusted. */
async function priceOrderFromDb(items: OrderItem[]): Promise<{ subtotal: number; shipping: number; total: number; items: OrderItem[] } | null> {
  const ids = items.map(i => i.id).filter(Boolean) as string[];
  if (ids.length !== items.length) return null; // every item must carry a product id

  const { createServerClient } = await import("@/lib/supabase");
  const db = createServerClient();
  const { data, error } = await db.from("products").select("id,price,discount,name_he,name_en,image").in("id", ids);
  if (error || !data) return null;
  const byId = new Map(data.map(p => [p.id, p]));

  const priced: OrderItem[] = [];
  let subtotal = 0;
  for (const item of items) {
    const p = byId.get(item.id!);
    if (!p) return null; // unknown product
    const qty = Math.max(1, Math.min(20, Math.floor(item.quantity)));
    const unit = p.discount > 0 ? Math.round(p.price * (1 - p.discount / 100)) : p.price;
    subtotal += unit * qty;
    priced.push({ id: p.id, name: p.name_en ?? p.name_he, nameHe: p.name_he, price: unit, quantity: qty, image: p.image });
  }
  const shipping = subtotal >= 500 ? 0 : 30;
  return { subtotal, shipping, total: subtotal + shipping, items: priced };
}

export async function POST(req: Request) {
  const order: OrderPayload = await req.json();

  // 1. Recompute all prices from the database — ignore whatever the client sent
  const priced = await priceOrderFromDb(order.items);
  if (!priced) {
    return NextResponse.json({ error: "Invalid order items" }, { status: 400 });
  }
  order.items = priced.items;
  order.subtotal = priced.subtotal;
  order.shipping = priced.shipping;
  order.total = priced.total;

  // 2. Verify the PayPal payment is completed AND matches the real total
  const paypal = await verifyPayPalOrder(order.paypalOrderId);
  if (!paypal.ok) {
    return NextResponse.json({ error: "PayPal order verification failed" }, { status: 402 });
  }
  if (paypal.paidAmount !== null && Math.abs(paypal.paidAmount - priced.total) > 0.01) {
    return NextResponse.json({ error: "Paid amount does not match order total" }, { status: 402 });
  }

  // Save to Supabase if configured
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const { createServerClient } = await import("@/lib/supabase");
      const db = createServerClient();
      await db.from("orders").insert([{
        id: order.orderId,
        customer_name: order.customer.name,
        customer_email: order.customer.email,
        customer_phone: order.customer.phone,
        address: `${order.customer.address}, ${order.customer.city} ${order.customer.zip}`,
        items: order.items,
        subtotal: order.subtotal,
        shipping: order.shipping,
        total: order.total,
        paypal_order_id: order.paypalOrderId,
        status: "paid",
      }]);
    } catch (err) {
      console.error("Supabase order save failed:", err);
      // Don't fail the request — emails are more important than DB write
    }
  }

  if (!process.env.RESEND_API_KEY) {
    console.log("New order (Resend not configured):", order);
    return NextResponse.json({ ok: true });
  }

  const itemsHtml = order.items.map(item => `
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${item.nameHe}</td>
      <td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: center; color: #888;">×${item.quantity}</td>
      <td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: left; font-variant-numeric: tabular-nums;">₪${(item.price * item.quantity).toLocaleString()}</td>
    </tr>
  `).join("");

  try {
    const resend = getResend();
    // Notification to business
    await resend.emails.send({
      from: "VIKOS Orders <onboarding@resend.dev>",
      to: BUSINESS_EMAIL,
      subject: `הזמנה חדשה #${order.orderId.slice(0, 8).toUpperCase()} — ${order.customer.name}`,
      html: `
        <div dir="rtl" style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <h2 style="color: #C9A96E;">הזמנה חדשה התקבלה ✓</h2>
          <p><strong>מס׳ הזמנה:</strong> ${order.orderId.slice(0, 8).toUpperCase()}</p>
          <h3 style="margin-top: 24px; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; color: #888;">פרטי לקוח</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 6px 0; color: #888; width: 100px;">שם</td><td>${order.customer.name}</td></tr>
            <tr><td style="padding: 6px 0; color: #888;">אימייל</td><td>${order.customer.email}</td></tr>
            <tr><td style="padding: 6px 0; color: #888;">טלפון</td><td>${order.customer.phone}</td></tr>
            <tr><td style="padding: 6px 0; color: #888;">כתובת</td><td>${order.customer.address}, ${order.customer.city} ${order.customer.zip}</td></tr>
          </table>
          <h3 style="margin-top: 24px; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; color: #888;">פריטים</h3>
          <table style="width: 100%; border-collapse: collapse;">
            ${itemsHtml}
          </table>
          <table style="width: 100%; margin-top: 16px; border-collapse: collapse;">
            <tr><td style="padding: 4px 0; color: #888;">סכום ביניים</td><td style="text-align: left;">₪${order.subtotal.toLocaleString()}</td></tr>
            <tr><td style="padding: 4px 0; color: #888;">משלוח</td><td style="text-align: left;">${order.shipping === 0 ? "חינם" : `₪${order.shipping}`}</td></tr>
            <tr style="font-weight: 700; font-size: 16px;"><td style="padding: 8px 0; border-top: 2px solid #C9A96E;">סה"כ</td><td style="text-align: left; border-top: 2px solid #C9A96E; color: #C9A96E;">₪${order.total.toLocaleString()}</td></tr>
          </table>
          <p style="margin-top: 16px; font-size: 12px; color: #aaa;">PayPal Order ID: ${order.paypalOrderId}</p>
        </div>
      `,
    });

    // Confirmation to customer
    await resend.emails.send({
      from: "VIKOS Jewelry <onboarding@resend.dev>",
      to: order.customer.email,
      subject: `אישור הזמנה #${order.orderId.slice(0, 8).toUpperCase()} — VIKOS Jewelry`,
      html: `
        <div dir="rtl" style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #FAFAF8; padding: 40px; color: #1a1a1a;">
          <div style="text-align: center; margin-bottom: 32px;">
            <span style="font-family: Georgia, serif; font-size: 28px; letter-spacing: 0.22em;">VIKOS</span>
          </div>
          <h2 style="font-family: Georgia, serif; font-weight: 300; font-size: 24px;">ההזמנה אושרה!</h2>
          <div style="width: 40px; height: 1px; background: #C9A96E; margin: 12px 0 24px;"></div>
          <p style="color: #555; line-height: 1.8;">תודה, ${order.customer.name}. ההזמנה שלך התקבלה בהצלחה.</p>
          <div style="background: #fff; border: 1px solid #eee; padding: 20px; margin: 24px 0; border-radius: 2px;">
            <p style="font-size: 12px; color: #888; margin-bottom: 4px;">מס׳ הזמנה</p>
            <p style="font-size: 18px; font-weight: 600; letter-spacing: 0.1em;">#${order.orderId.slice(0, 8).toUpperCase()}</p>
          </div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
            ${itemsHtml}
          </table>
          <div style="text-align: left; padding-top: 12px; border-top: 1px solid #eee;">
            <span style="font-size: 16px; font-weight: 600; color: #C9A96E;">סה"כ: ₪${order.total.toLocaleString()}</span>
          </div>
          <div style="margin-top: 32px; padding: 16px; background: #fff8f0; border: 1px solid #C9A96E;">
            <p style="margin: 0; font-size: 13px; color: #555; line-height: 1.7;">
              <strong>כתובת משלוח:</strong><br/>
              ${order.customer.address}, ${order.customer.city} ${order.customer.zip}
            </p>
            <p style="margin: 8px 0 0; font-size: 12px; color: #888;">זמן אספקה משוער: 3–5 ימי עסקים</p>
          </div>
          <p style="margin-top: 32px; font-size: 12px; color: #aaa; text-align: center;">שאלות? ${BUSINESS_EMAIL}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Order email error:", err);
    return NextResponse.json({ error: "שגיאה בשליחת אישור" }, { status: 500 });
  }
}
