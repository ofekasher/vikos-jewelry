import type { Metadata } from "next";
import Link from "next/link";
import { Truck, Clock, UserCheck, MessageCircle, MapPinned, PackageCheck, type LucideIcon } from "lucide-react";

export const metadata: Metadata = { title: "משלוחים ואספקה — Vikos Jewelry" };

const T = {
  gold: "#8B7355",
  ink: "#111111",
  dark: "#0D0C0A",
  body: "#5A564F",
  muted: "#8C8578",
  cream: "#F5F4F0",
  warm: "#FAFAF8",
  border: "#E4E0D8",
  serif: "'Cormorant Garamond', Georgia, serif",
  sans: "'Inter', system-ui, sans-serif",
};

const facts = [
  { icon: Clock, label: "עד 14 ימי עסקים", sub: "מרגע אישור התשלום" },
  { icon: Truck, label: "משלוח לכל הארץ", sub: "כולל יישובי פריפריה" },
  { icon: MapPinned, label: "איסוף עצמי", sub: "בתיאום מראש" },
];

function IconBadge({ Icon }: { Icon: LucideIcon }) {
  return (
    <div style={{
      width: "44px", height: "44px", borderRadius: "50%",
      border: `1px solid ${T.border}`, background: T.warm,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
    }}>
      <Icon size={18} strokeWidth={1.5} color={T.gold} />
    </div>
  );
}

function Section({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: React.ReactNode }) {
  return (
    <section style={{ display: "flex", gap: "20px", marginBottom: "40px" }}>
      <IconBadge Icon={Icon} />
      <div style={{ flex: 1, paddingTop: "4px" }}>
        <h2 style={{ fontFamily: T.serif, fontSize: "1.3rem", fontWeight: 500, color: T.ink, marginBottom: "12px" }}>
          {title}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>{children}</div>
      </div>
    </section>
  );
}

export default function ShippingPage() {
  return (
    <main dir="rtl" style={{ minHeight: "100vh", background: T.warm, fontFamily: T.sans }}>
      {/* Hero */}
      <section style={{
        position: "relative", overflow: "hidden",
        background: T.cream, textAlign: "center",
        padding: "120px 32px 64px",
      }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.03, pointerEvents: "none",
          backgroundImage: `radial-gradient(circle, ${T.gold} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }} />
        <Link href="/" style={{
          position: "relative", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase",
          color: T.gold, textDecoration: "none", display: "inline-block", marginBottom: "28px",
        }}>
          ← VIKOS
        </Link>
        <p style={{ fontFamily: T.sans, fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: T.gold, marginBottom: "18px" }}>
          מידע ללקוח
        </p>
        <h1 style={{
          position: "relative", fontFamily: T.serif, fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
          fontWeight: 300, fontStyle: "italic", color: T.ink, margin: "0 0 14px",
        }}>
          משלוחים ואספקה
        </h1>
        <div style={{ width: "44px", height: "1px", background: T.gold, margin: "0 auto 22px" }} />
        <p style={{ fontSize: "13px", color: T.muted, maxWidth: "420px", margin: "0 auto", lineHeight: 1.8, fontWeight: 300 }}>
          כל מה שכדאי לדעת על אריזה, זמני אספקה ואיך עוקבים אחרי ההזמנה שלכם.
        </p>
      </section>

      {/* Quick facts strip */}
      <section style={{ maxWidth: "740px", margin: "-28px auto 0", padding: "0 32px", position: "relative", zIndex: 1 }}>
        <div style={{
          background: "#fff", border: `1px solid ${T.border}`,
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          boxShadow: "0 12px 32px rgba(0,0,0,0.05)",
        }} className="facts-grid">
          {facts.map(({ icon: Icon, label, sub }, i) => (
            <div key={label} style={{
              padding: "24px 16px", textAlign: "center",
              borderLeft: i < facts.length - 1 ? `1px solid ${T.border}` : "none",
            }}>
              <Icon size={20} strokeWidth={1.5} color={T.gold} style={{ margin: "0 auto 10px" }} />
              <p style={{ fontFamily: T.sans, fontSize: "12px", fontWeight: 600, color: T.ink, margin: "0 0 4px" }}>{label}</p>
              <p style={{ fontFamily: T.sans, fontSize: "11px", color: T.muted, margin: 0 }}>{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Content */}
      <div style={{ maxWidth: "740px", margin: "0 auto", padding: "64px 32px 96px" }}>
        <div style={{ fontSize: "14px", color: T.body, lineHeight: 1.9 }}>
          <Section icon={Truck} title="משלוחים ואספקה">
            <p>אספקת המוצרים מתבצעת באמצעות חברות שילוח לכתובת שהוזנה בעת ההזמנה.</p>
            <p>עלות המשלוח תחויב בעת ביצוע ההזמנה, אלא אם צוין אחרת במפורש.</p>
          </Section>

          <Section icon={Clock} title="זמני אספקה">
            <p>מרגע אישור התשלום, המוצרים יישלחו ללקוח בתוך 14 ימי עסקים.</p>
            <p>באזורים מרוחקים ויישובי פריפריה ייתכנו זמני אספקה ארוכים יותר (עד 30 ימים).</p>
            <p>איסוף עצמי יתאפשר בתיאום מראש מול שירות הלקוחות, מכתובת החברה.</p>
          </Section>

          <Section icon={UserCheck} title="אחריות הלקוח">
            <p>באחריות הלקוח לוודא כי פרטי ההזמנה (שם, כתובת, טלפון ודוא״ל) מולאו בצורה מדויקת.</p>
            <p>מסירת פרטים שגויים או חלקיים עלולה לגרום לעיכוב או ביטול ההזמנה — מבלי שהחברה תישא באחריות לכך.</p>
          </Section>

          {/* Contact CTA */}
          <section style={{ display: "flex", gap: "20px" }}>
            <IconBadge Icon={MessageCircle} />
            <div style={{ flex: 1, paddingTop: "4px" }}>
              <h2 style={{ fontFamily: T.serif, fontSize: "1.3rem", fontWeight: 500, color: T.ink, marginBottom: "12px" }}>
                שאלות?
              </h2>
              <div style={{
                background: T.dark, padding: "24px 28px",
                display: "flex", flexWrap: "wrap", gap: "12px",
              }}>
                <a href="https://wa.me/972549784329" style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  background: T.gold, color: "#fff", textDecoration: "none",
                  padding: "12px 20px", fontSize: "12px", fontWeight: 500,
                  letterSpacing: "0.04em", flex: "1 1 auto", justifyContent: "center",
                }}>
                  <MessageCircle size={15} strokeWidth={1.75} />
                  וואטסאפ: 054-978-4329
                </a>
                <a href="mailto:hello.vikosjewelry@gmail.com" style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  background: "transparent", color: "#fff", textDecoration: "none",
                  padding: "12px 20px", fontSize: "12px", fontWeight: 500,
                  border: "1px solid rgba(255,255,255,0.25)", flex: "1 1 auto", justifyContent: "center",
                }}>
                  hello.vikosjewelry@gmail.com
                </a>
              </div>
            </div>
          </section>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "56px", paddingTop: "32px", borderTop: `1px solid ${T.border}` }}>
            <PackageCheck size={16} strokeWidth={1.5} color={T.gold} />
            <p style={{ fontFamily: T.serif, fontSize: "1.05rem", fontStyle: "italic", color: T.ink, margin: 0 }}>
              VIKOS JEWELRY — Fine Jewelry, made to be remembered.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 560px) {
          .facts-grid { grid-template-columns: 1fr !important; }
          .facts-grid > div { border-left: none !important; border-bottom: 1px solid ${T.border}; }
          .facts-grid > div:last-child { border-bottom: none; }
        }
      `}</style>
    </main>
  );
}
