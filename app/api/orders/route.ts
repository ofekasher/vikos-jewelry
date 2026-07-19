import { NextResponse } from "next/server";
import { Resend } from "resend";

const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL ?? "studio@vikosjewelry.com";
const getResend = () => new Resend(process.env.RESEND_API_KEY ?? "");

interface OrderItem {
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

async function verifyPayPalOrder(paypalOrderId: string): Promise<boolean> {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const secret   = process.env.PAYPAL_SECRET;
  if (!clientId || !secret) return true; // skip verification if not configured

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
  if (!tokenRes.ok) return false;
  const { access_token } = await tokenRes.json() as { access_token: string };

  const orderRes = await fetch(`${base}/v2/checkout/orders/${paypalOrderId}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  if (!orderRes.ok) return false;
  const paypalOrder = await orderRes.json() as { status: string };
  return paypalOrder.status === "COMPLETED";
}

export async function POST(req: Request) {
  const order: OrderPayload = await req.json();

  const paypalValid = await verifyPayPalOrder(order.paypalOrderId);
  if (!paypalValid) {
    return NextResponse.json({ error: "PayPal order verification failed" }, { status: 402 });
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
          <div style="margin-top: 32px; padding: 16px; background: #fff8f0; border-right: 3px solid #C9A96E;">
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
