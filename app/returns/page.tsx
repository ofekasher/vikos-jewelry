import type { Metadata } from "next";
import Link from "next/link";
import { RotateCcw, XCircle, MessageCircle, Wallet, AlertTriangle, Tag, Info, PackageCheck, Clock, Gem, type LucideIcon } from "lucide-react";

export const metadata: Metadata = { title: "מדיניות החזרות והחלפות — Vikos Jewelry" };

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
  { icon: Clock, label: "14 יום להחזרה", sub: "ממועד קבלת ההזמנה" },
  { icon: Gem, label: "עגילים לא מוחזרים", sub: "מטעמי היגיינה" },
  { icon: Wallet, label: "עד 5% דמי ביטול", sub: "או 100 ₪ — לפי הנמוך" },
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

export default function ReturnsPage() {
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
          מדיניות החזרות והחלפות
        </h1>
        <div style={{ width: "44px", height: "1px", background: T.gold, margin: "0 auto 22px" }} />
        <p style={{ fontSize: "13px", color: T.muted, maxWidth: "460px", margin: "0 auto", lineHeight: 1.8, fontWeight: 300 }}>
          אנו רוצים שתיהנו מכל תכשיט שרכשתם. המדיניות פועלת בהתאם לחוק הגנת הצרכן, התשמ״א–1981.
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
          <Section icon={RotateCcw} title="החזרות והחלפות">
            <p>ניתן לבקש החזרה או החלפה של תכשיט בתוך 14 ימים ממועד קבלת ההזמנה, בכפוף להוראות הדין.</p>
            <p>על התכשיט להיות חדש, שלם וללא פגם או נזק, כאשר לא נעשה בו שימוש והוא מוחזר, ככל האפשר, באריזתו המקורית ובצירוף הוכחת רכישה.</p>
            <p>מטעמי היגיינה ובהתאם להוראות הדין, עגילים שנעשה בהם שימוש או שנענדו אינם ניתנים להחזרה או להחלפה.</p>
            <p>תכשיטים שיוצרו, הוזמנו או הותאמו במיוחד עבור הלקוח, לרבות התאמה אישית, עשויים שלא להיות ניתנים לביטול, להחזרה או להחלפה בהתאם להוראות הדין.</p>
            <p>מכיוון ש-VIKOS JEWELRY פועלת אונליין בלבד, החזרת והחלפת מוצרים מתבצעת באמצעות משלוח/שליח בתיאום מראש עם שירות הלקוחות.</p>
          </Section>

          <Section icon={XCircle} title="ביטול עסקה">
            <p>בקשה לביטול עסקה שבוצעה באתר ניתן להעביר בתוך התקופה הקבועה בחוק, ובדרך כלל בתוך 14 ימים ממועד קבלת המוצר או ממועד קבלת פרטי העסקה — לפי המאוחר, בכפוף לחריגים ולהוראות הדין.</p>
            <p>במקרים שבהם החוק מעניק תקופת ביטול מורחבת לאזרח ותיק, עולה חדש או אדם עם מוגבלות, יחולו הוראות החוק הרלוונטיות.</p>
          </Section>

          {/* Contact CTA */}
          <section style={{ display: "flex", gap: "20px", marginBottom: "40px" }}>
            <IconBadge Icon={MessageCircle} />
            <div style={{ flex: 1, paddingTop: "4px" }}>
              <h2 style={{ fontFamily: T.serif, fontSize: "1.3rem", fontWeight: 500, color: T.ink, marginBottom: "12px" }}>
                איך מבקשים ביטול, החזרה או החלפה?
              </h2>
              <p style={{ marginBottom: "16px" }}>יש ליצור קשר עם שירות הלקוחות של VIKOS JEWELRY ולציין את השם המלא, מספר ההזמנה, פרטי המוצר וסיבת הפנייה.</p>
              <div style={{
                background: T.dark, padding: "24px 28px",
                display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "16px",
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
              <p style={{ margin: 0 }}>לאחר קבלת הפנייה נשלח את ההנחיות להחזרת התכשיט.</p>
            </div>
          </section>

          <Section icon={Wallet} title="החזר כספי">
            <p>כאשר קיימת זכות ביטול על פי דין, ההחזר הכספי יבוצע בהתאם להוראות החוק ולאמצעי התשלום שבו בוצעה העסקה.</p>
            <p>במקרה שבו החוק מאפשר גביית דמי ביטול, VIKOS JEWELRY תהיה רשאית לגבות 5% ממחיר העסקה או 100 ₪ — לפי הנמוך מביניהם.</p>
            <p>החזר כספי מותנה בהחזרת המוצר, בהתאם להוראות הדין והמדיניות.</p>
          </Section>

          <Section icon={AlertTriangle} title="מוצר פגום או אי-התאמה">
            <p>אם קיבלתם תכשיט עם פגם, מוצר שאינו תואם להזמנה או במקרה אחר שבו הביטול נובע מהפרה מצד VIKOS JEWELRY, אנא פנו אלינו בהקדם.</p>
            <p>במקרים שבהם הביטול נעשה בשל פגם, אי-התאמה, אי-אספקה במועד או הפרה אחרת המזכה בכך על פי דין, לא ייגבו דמי ביטול, והטיפול בהחזרת המוצר יתבצע בהתאם להוראות החוק.</p>
          </Section>

          <Section icon={Tag} title="מבצעים והטבות">
            <p>החזר או החלפה של תכשיט שנרכש במסגרת מבצע או הנחה יחושבו בהתאם לסכום ששולם בפועל עבור המוצר.</p>
            <p>כאשר ההטבה מותנית ברכישת מספר מוצרים יחד, כגון מבצעי זוגות או הטבות על מספר פריטים, גובה ההחזר עשוי להיות מחושב מחדש בהתאם לתנאי המבצע ולהוראות הדין.</p>
          </Section>

          <Section icon={Info} title="חשוב לדעת">
            <p>VIKOS JEWELRY שומרת לעצמה את הזכות לעדכן את מדיניות ההחזרות וההחלפות מעת לעת, בכפוף להוראות הדין. במקרה של סתירה בין האמור במדיניות זו לבין הוראות חוק מחייבות — הוראות הדין יחולו.</p>
          </Section>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "16px", paddingTop: "32px", borderTop: `1px solid ${T.border}` }}>
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
