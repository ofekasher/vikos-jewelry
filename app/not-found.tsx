import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "דף לא נמצא — Vikos Jewelry" };

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "#fff", padding: "40px 32px", textAlign: "center",
    }}>
      <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "7rem", fontWeight: 300, color: "#F0F0EE", lineHeight: 1, display: "block", marginBottom: "0" }}>
        404
      </span>
      <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 300, fontStyle: "italic", color: "#111", display: "block", marginTop: "-24px", marginBottom: "16px" }}>
        הדף לא נמצא
      </span>
      <div style={{ width: "40px", height: "1px", background: "#8B7355", margin: "0 auto 24px" }} />
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#888", lineHeight: 1.8, marginBottom: "36px", maxWidth: "340px" }}>
        הדף שחיפשת לא קיים. אולי הוא הועבר, או שהכתובת שגויה.
      </p>
      <Link href="/" style={{
        padding: "14px 36px",
        background: "#111", color: "#fff",
        fontFamily: "'Inter', sans-serif",
        fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase",
        textDecoration: "none",
      }}>
        חזרה לדף הבית
      </Link>
    </div>
  );
}
