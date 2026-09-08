import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "מדיניות החזרות והחלפות — Vikos Jewelry" };

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

export default function ReturnsPage() {
  return (
    <main dir="rtl" style={{ maxWidth: "740px", margin: "0 auto", padding: "120px 32px 80px", fontFamily: "'Inter', sans-serif" }}>
      <Link href="/" style={{ fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: T.gold, textDecoration: "none", display: "inline-block", marginBottom: "40px" }}>
        ← VIKOS
      </Link>

      <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 300, fontStyle: "italic", color: T.ink, marginBottom: "12px" }}>
        מדיניות החזרות והחלפות
      </h1>
      <p style={{ fontSize: "13px", color: "#999", marginBottom: "40px" }}>VIKOS JEWELRY</p>

      <div style={{ fontSize: "14px", color: T.body, lineHeight: 1.9 }}>
        <p style={{ marginBottom: "32px" }}>
          אנו ב-VIKOS JEWELRY רוצים שתיהנו מכל תכשיט שרכשתם. מדיניות ההחזרות, ההחלפות וביטול העסקאות שלנו פועלת בהתאם להוראות חוק הגנת הצרכן, התשמ״א–1981 והתקנות מכוחו.
        </p>

        <Section title="החזרות והחלפות">
          <p>ניתן לבקש החזרה או החלפה של תכשיט בתוך 14 ימים ממועד קבלת ההזמנה, בכפוף להוראות הדין.</p>
          <p>על התכשיט להיות חדש, שלם וללא פגם או נזק, כאשר לא נעשה בו שימוש והוא מוחזר, ככל האפשר, באריזתו המקורית ובצירוף הוכחת רכישה.</p>
          <p>מטעמי היגיינה ובהתאם להוראות הדין, עגילים שנעשה בהם שימוש או שנענדו אינם ניתנים להחזרה או להחלפה.</p>
          <p>תכשיטים שיוצרו, הוזמנו או הותאמו במיוחד עבור הלקוח, לרבות התאמה אישית, עשויים שלא להיות ניתנים לביטול, להחזרה או להחלפה בהתאם להוראות הדין.</p>
          <p>מכיוון ש-VIKOS JEWELRY פועלת אונליין בלבד, החזרת והחלפת מוצרים מתבצעת באמצעות משלוח/שליח בתיאום מראש עם שירות הלקוחות.</p>
        </Section>

        <Section title="ביטול עסקה">
          <p>בקשה לביטול עסקה שבוצעה באתר ניתן להעביר בתוך התקופה הקבועה בחוק, ובדרך כלל בתוך 14 ימים ממועד קבלת המוצר או ממועד קבלת פרטי העסקה — לפי המאוחר, בכפוף לחריגים ולהוראות הדין.</p>
          <p>במקרים שבהם החוק מעניק תקופת ביטול מורחבת לאזרח ותיק, עולה חדש או אדם עם מוגבלות, יחולו הוראות החוק הרלוונטיות.</p>
        </Section>

        <Section title="איך מבקשים ביטול, החזרה או החלפה?">
          <p>יש ליצור קשר עם שירות הלקוחות של VIKOS JEWELRY ולציין את השם המלא, מספר ההזמנה, פרטי המוצר וסיבת הפנייה.</p>
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
          <p>לאחר קבלת הפנייה נשלח את ההנחיות להחזרת התכשיט.</p>
        </Section>

        <Section title="החזר כספי">
          <p>כאשר קיימת זכות ביטול על פי דין, ההחזר הכספי יבוצע בהתאם להוראות החוק ולאמצעי התשלום שבו בוצעה העסקה.</p>
          <p>במקרה שבו החוק מאפשר גביית דמי ביטול, VIKOS JEWELRY תהיה רשאית לגבות 5% ממחיר העסקה או 100 ₪ — לפי הנמוך מביניהם.</p>
          <p>החזר כספי מותנה בהחזרת המוצר, בהתאם להוראות הדין והמדיניות.</p>
        </Section>

        <Section title="מוצר פגום או אי-התאמה">
          <p>אם קיבלתם תכשיט עם פגם, מוצר שאינו תואם להזמנה או במקרה אחר שבו הביטול נובע מהפרה מצד VIKOS JEWELRY, אנא פנו אלינו בהקדם.</p>
          <p>במקרים שבהם הביטול נעשה בשל פגם, אי-התאמה, אי-אספקה במועד או הפרה אחרת המזכה בכך על פי דין, לא ייגבו דמי ביטול, והטיפול בהחזרת המוצר יתבצע בהתאם להוראות החוק.</p>
        </Section>

        <Section title="מבצעים והטבות">
          <p>החזר או החלפה של תכשיט שנרכש במסגרת מבצע או הנחה יחושבו בהתאם לסכום ששולם בפועל עבור המוצר.</p>
          <p>כאשר ההטבה מותנית ברכישת מספר מוצרים יחד, כגון מבצעי זוגות או הטבות על מספר פריטים, גובה ההחזר עשוי להיות מחושב מחדש בהתאם לתנאי המבצע ולהוראות הדין.</p>
        </Section>

        <Section title="חשוב לדעת">
          <p>VIKOS JEWELRY שומרת לעצמה את הזכות לעדכן את מדיניות ההחזרות וההחלפות מעת לעת, בכפוף להוראות הדין. במקרה של סתירה בין האמור במדיניות זו לבין הוראות חוק מחייבות — הוראות הדין יחולו.</p>
        </Section>

        <p style={{ marginTop: "48px", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.1rem", fontStyle: "italic", color: T.ink }}>
          VIKOS JEWELRY — Fine Jewelry, made to be remembered. ✨
        </p>
      </div>
    </main>
  );
}
