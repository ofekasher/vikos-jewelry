"use client";
import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

const T = {
  gold: "#8B7355",
  ink: "#111111",
  muted: "#8C8578",
  warm: "#FAFAF8",
  serif: "'Cormorant Garamond', Georgia, serif",
  sans: "'Inter', system-ui, sans-serif",
};

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Unhandled error boundary:", error);
  }, [error]);

  return (
    <main dir="rtl" style={{
      minHeight: "100vh", background: T.warm, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", padding: "32px", textAlign: "center", gap: "18px",
      fontFamily: T.sans,
    }}>
      <AlertTriangle size={40} strokeWidth={1.25} color={T.gold} />
      <h1 style={{ fontFamily: T.serif, fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 300, fontStyle: "italic", color: T.ink, margin: 0 }}>
        משהו השתבש
      </h1>
      <p style={{ fontSize: "13px", color: T.muted, maxWidth: "360px", lineHeight: 1.8, margin: 0 }}>
        קרתה שגיאה בלתי צפויה. אפשר לנסות שוב, או לחזור לדף הבית ולנסות מאוחר יותר.
      </p>
      <div style={{ display: "flex", gap: "12px", marginTop: "8px", flexWrap: "wrap", justifyContent: "center" }}>
        <button
          onClick={() => reset()}
          style={{ padding: "12px 28px", background: T.ink, color: "#fff", border: "none", cursor: "pointer", fontFamily: T.sans, fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase" }}
        >
          נסה שוב
        </button>
        <Link href="/" style={{ padding: "12px 28px", background: "transparent", color: T.ink, border: `1px solid ${T.ink}`, fontFamily: T.sans, fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", textDecoration: "none" }}>
          לדף הבית
        </Link>
      </div>
    </main>
  );
}
