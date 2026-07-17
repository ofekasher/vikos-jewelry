import { NextResponse } from "next/server";
import { Resend } from "resend";

const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL ?? "studio@vikosjewelry.com";

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "אימייל לא תקין" }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.log("Newsletter signup (Resend not configured):", email);
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "VIKOS Jewelry <onboarding@resend.dev>",
      to: BUSINESS_EMAIL,
      subject: `ניוזלטר — נרשם חדש: ${email}`,
      html: `<p dir="rtl">כתובת: <strong>${email}</strong></p>`,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Newsletter error:", err);
    return NextResponse.json({ error: "שגיאה" }, { status: 500 });
  }
}
