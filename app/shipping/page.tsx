import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "משלוחים ואספקה — Vikos Jewelry" };

const T = {
  gold: "#8B7355",
  ink: "#111",
  body: "#555",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: "36px" }}>
      <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.3rem", fontWeight: 500, color: T.ink, marginBottom: "12px" }}>
        {title}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>{children}</div>
    </section>
  );
}

export default function ShippingPage() {
  return (
    <main dir="rtl" style={{ maxWidth: "740px", margin: "0 auto", padding: "120px 32px 80px", fontFamily: "'Inter', sans-serif" }}>
      <Link href="/" style={{ fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: T.gold, textDecoration: "none", display: "inline-block", marginBottom: "40px" }}>
        ← VIKOS
      </Link>

      <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 300, fontStyle: "italic", color: T.ink, marginBottom: "12px" }}>
        משלוחים ואספקה
      </h1>
      <p style={{ fontSize: "13px", color: "#999", marginBottom: "40px" }}>VIKOS JEWELRY</p>

      <div style={{ fontSize: "14px", color: T.body, lineHeight: 1.9 }}>
        <Section title="משלוחים ואספקה">
          <p>אספקת המוצרים מתבצעת באמצעות חברות שילוח לכתובת שהוזנה בעת ההזמנה.</p>
          <p>עלות המשלוח תחויב בעת ביצוע ההזמנה, אלא אם צוין אחרת במפורש.</p>
        </Section>

        <Section title="זמני אספקה">
          <p>מרגע אישור התשלום, המוצרים יישלחו ללקוח בתוך 14 ימי עסקים.</p>
          <p>באזורים מרוחקים ויישובי פריפריה ייתכנו זמני אספקה ארוכים יותר (עד 30 ימים).</p>
          <p>איסוף עצמי יתאפשר בתיאום מראש מול שירות הלקוחות, מכתובת החברה.</p>
        </Section>

        <Section title="אחריות הלקוח">
          <p>באחריות הלקוח לוודא כי פרטי ההזמנה (שם, כתובת, טלפון ודוא״ל) מולאו בצורה מדויקת.</p>
          <p>מסירת פרטים שגויים או חלקיים עלולה לגרום לעיכוב או ביטול ההזמנה — מבלי שהחברה תישא באחריות לכך.</p>
        </Section>

        <Section title="שאלות?">
          <div style={{ background: "#FAFAF8", border: "1px solid #EEE", padding: "18px 20px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <span>
              <strong style={{ color: T.ink }}>WhatsApp:</strong>{" "}
              <a href="https://wa.me/972549784329" style={{ color: T.gold, textDecoration: "none" }}>054-978-4329</a>
            </span>
            <span>
              <strong style={{ color: T.ink }}>אימייל:</strong>{" "}
              <a href="mailto:hello.vikosjewelry@gmail.com" style={{ color: T.gold, textDecoration: "none" }}>hello.vikosjewelry@gmail.com</a>
            </span>
          </div>
        </Section>

        <p style={{ marginTop: "48px", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.1rem", fontStyle: "italic", color: T.ink }}>
          VIKOS JEWELRY — Fine Jewelry, made to be remembered. ✨
        </p>
      </div>
    </main>
  );
}
