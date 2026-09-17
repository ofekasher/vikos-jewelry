import { NextResponse } from "next/server";
import { Resend } from "resend";

const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL ?? "hello.vikosjewelry@gmail.com";

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "אימייל לא תקין" }, { status: 400 });
  }

  // Persist the subscriber first — this is the actual mailing list. Emailing
  // the business owner is a nice-to-have notification, not a substitute for
  // having a real, queryable list to send a newsletter to later.
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const { createServerClient } = await import("@/lib/supabase");
      const db = createServerClient();
      const { error } = await db.from("newsletter_subscribers").upsert(
        { email, source: "footer" },
        { onConflict: "email", ignoreDuplicates: true }
      );
      if (error) throw error;
    } catch (err) {
      console.error("Newsletter DB save failed:", err);
      return NextResponse.json({ error: "שגיאה בשמירת ההרשמה" }, { status: 500 });
    }
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
  } catch (err) {
    // The subscriber is already saved — a failed notification email
    // shouldn't make the signup itself look like it failed.
    console.error("Newsletter notification email failed:", err);
  }
  return NextResponse.json({ ok: true });
}
