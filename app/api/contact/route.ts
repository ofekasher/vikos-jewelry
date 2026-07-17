import { NextResponse } from "next/server";
import { Resend } from "resend";

const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL ?? "studio@vikosjewelry.com";
const getResend = () => new Resend(process.env.RESEND_API_KEY ?? "");

export async function POST(req: Request) {
  const { name, email, phone, budget, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "שדות חסרים" }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    // Email not configured yet — log and return success so form works in dev
    console.log("Custom order inquiry (Resend not configured):", { name, email, phone, budget, message });
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = getResend();
    // Email to business
    await resend.emails.send({
      from: "VIKOS Website <onboarding@resend.dev>",
      to: BUSINESS_EMAIL,
      subject: `פנייה חדשה להזמנה מותאמת — ${name}`,
      html: `
        <div dir="rtl" style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <h2 style="color: #C9A96E; border-bottom: 1px solid #eee; padding-bottom: 12px;">פנייה חדשה להזמנה מותאמת</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #888; width: 120px;">שם</td><td style="padding: 8px 0; font-weight: 500;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #888;">אימייל</td><td style="padding: 8px 0;">${email}</td></tr>
            <tr><td style="padding: 8px 0; color: #888;">טלפון</td><td style="padding: 8px 0;">${phone || "לא צוין"}</td></tr>
            <tr><td style="padding: 8px 0; color: #888;">תקציב</td><td style="padding: 8px 0;">${budget ? `₪${budget}` : "לא צוין"}</td></tr>
          </table>
          <div style="margin-top: 20px; padding: 16px; background: #f9f7f4; border-right: 3px solid #C9A96E;">
            <p style="margin: 0; line-height: 1.7; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #aaa;">נשלח מטופס ההזמנה המותאמת באתר VIKOS</p>
        </div>
      `,
    });

    // Confirmation email to customer
    await resend.emails.send({
      from: "VIKOS Jewelry <onboarding@resend.dev>",
      to: email,
      subject: "קיבלנו את פנייתך — VIKOS Jewelry",
      html: `
        <div dir="rtl" style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a; background: #FAFAF8; padding: 40px;">
          <h1 style="font-family: Georgia, serif; font-weight: 300; color: #1a1a1a; font-size: 28px; margin-bottom: 8px;">תודה, ${name}</h1>
          <div style="width: 40px; height: 1px; background: #C9A96E; margin-bottom: 24px;"></div>
          <p style="line-height: 1.8; color: #555;">קיבלנו את פנייתך להזמנה מותאמת אישית. הצוות שלנו יחזור אליך תוך <strong>24 שעות</strong> עם הצעה אישית.</p>
          <p style="line-height: 1.8; color: #555; margin-top: 16px;">בכל שאלה דחופה ניתן ליצור קשר ישירות:</p>
          <p style="color: #C9A96E;">📞 ${process.env.WHATSAPP_NUMBER ?? "050-000-0000"}</p>
          <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #eee; text-align: center;">
            <span style="font-family: Georgia, serif; font-size: 22px; letter-spacing: 0.2em; color: #111;">VIKOS</span>
            <p style="font-size: 11px; color: #aaa; margin-top: 8px; letter-spacing: 0.1em;">תכשיטים בעבודת יד · ישראל</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json({ error: "שגיאה בשליחת המייל" }, { status: 500 });
  }
}
