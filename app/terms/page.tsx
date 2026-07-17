import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "תנאי שימוש — Vikos Jewelry" };

export default function TermsPage() {
  return (
    <main style={{ maxWidth: "740px", margin: "0 auto", padding: "120px 32px 80px", fontFamily: "'Inter', sans-serif" }}>
      <Link href="/" style={{ fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#8B7355", textDecoration: "none", display: "inline-block", marginBottom: "40px" }}>
        ← VIKOS
      </Link>
      <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 300, fontStyle: "italic", color: "#111", marginBottom: "32px" }}>
        תנאי שימוש
      </h1>
      <div style={{ fontSize: "14px", color: "#555", lineHeight: 1.9, display: "flex", flexDirection: "column", gap: "20px" }}>
        <p>השימוש באתר VIKOS Jewelry מהווה הסכמה לתנאים המפורטים להלן.</p>
        <p><strong style={{ color: "#111" }}>הזמנות:</strong> כל הזמנה טעונה אישור מצדנו. אנו שומרים לעצמנו הזכות לבטל הזמנה במקרה של שגיאת מחיר או חוסר במלאי.</p>
        <p><strong style={{ color: "#111" }}>קניין רוחני:</strong> כל התכנים, התמונות והעיצובים באתר הם קניין בלעדי של VIKOS Jewelry.</p>
        <p><strong style={{ color: "#111" }}>אחריות:</strong> תכשיטינו מגיעים עם אחריות לשנה על פגמי ייצור.</p>
        <p><strong style={{ color: "#111" }}>שינויים:</strong> תנאים אלו עשויים להשתנות ללא הודעה מוקדמת.</p>
        <p><strong style={{ color: "#111" }}>צור קשר:</strong> <a href="mailto:studio@vikosjewelry.com" style={{ color: "#8B7355" }}>studio@vikosjewelry.com</a></p>
      </div>
    </main>
  );
}
