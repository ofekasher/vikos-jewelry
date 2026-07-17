import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "מדיניות פרטיות — Vikos Jewelry" };

export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: "740px", margin: "0 auto", padding: "120px 32px 80px", fontFamily: "'Inter', sans-serif" }}>
      <Link href="/" style={{ fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#8B7355", textDecoration: "none", display: "inline-block", marginBottom: "40px" }}>
        ← VIKOS
      </Link>
      <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 300, fontStyle: "italic", color: "#111", marginBottom: "32px" }}>
        מדיניות פרטיות
      </h1>
      <div style={{ fontSize: "14px", color: "#555", lineHeight: 1.9, display: "flex", flexDirection: "column", gap: "20px" }}>
        <p>VIKOS Jewelry מכבדת את פרטיות המשתמשים. המידע שאנו אוספים משמש אך ורק לצורך עיבוד הזמנות, משלוח ושיפור השירות.</p>
        <p><strong style={{ color: "#111" }}>מידע שנאסף:</strong> שם, כתובת אימייל, כתובת למשלוח, ומספר טלפון — בעת ביצוע הזמנה בלבד.</p>
        <p><strong style={{ color: "#111" }}>שימוש במידע:</strong> אנו משתמשים במידע לעיבוד הזמנות, שליחת אישורים, ויצירת קשר בנוגע להזמנתך.</p>
        <p><strong style={{ color: "#111" }}>אבטחה:</strong> כל תשלומים מעובדים דרך PayPal בצורה מאובטחת. אנו לא שומרים פרטי כרטיס אשראי.</p>
        <p><strong style={{ color: "#111" }}>צור קשר:</strong> לשאלות בנוגע לפרטיות, צור קשר: <a href="mailto:studio@vikosjewelry.com" style={{ color: "#8B7355" }}>studio@vikosjewelry.com</a></p>
      </div>
    </main>
  );
}
