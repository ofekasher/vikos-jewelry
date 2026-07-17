"use client";
import { useState } from "react";
import Link from "next/link";
import { useT } from "@/lib/LanguageContext";

export default function FooterClient() {
  const f = useT().footer;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");

  async function handleNewsletter() {
    if (!email || !email.includes("@")) { setStatus("err"); return; }
    setStatus("loading");
    try {
      await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      setStatus("ok");
      setEmail("");
    } catch {
      setStatus("err");
    }
  }

  return (
    <footer style={{ background: "#0A0A0A", color: "#fff" }}>

      <div style={{
        maxWidth: "1160px", margin: "0 auto",
        padding: "72px 32px 56px",
        display: "grid",
        gridTemplateColumns: "1.6fr repeat(3, 1fr)",
        gap: "48px",
      }} className="footer-grid">

        {/* Brand column */}
        <div>
          <Link href="/" style={{ textDecoration: "none", display: "inline-block", marginBottom: "16px" }}>
            <img src="/logo.png" alt="VIKOS" style={{ height: "44px", objectFit: "contain", filter: "invert(1)" }} />
          </Link>
          <p style={{ fontFamily: "'Frank Ruhl Libre',serif", fontSize: "13px", fontWeight: 300, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: "210px", marginBottom: "32px" }}>
            {f.tagline}
          </p>

          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "12px" }}>
            {f.newsletterLabel}
          </p>
          {status === "ok" ? (
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
              ✓ {f.newsletterSuccess ?? "נרשמת בהצלחה!"}
            </p>
          ) : (
            <div style={{ display: "flex", borderBottom: `1px solid ${status === "err" ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.2)"}`, paddingBottom: "10px", gap: "8px" }}>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setStatus("idle"); }}
                onKeyDown={e => e.key === "Enter" && handleNewsletter()}
                placeholder={f.newsletterPlaceholder}
                aria-label={f.newsletterPlaceholder}
                style={{ flex: 1, background: "none", border: "none", outline: "none", fontFamily: "'Inter',sans-serif", fontSize: "12px", color: "#fff" }}
              />
              <button
                onClick={handleNewsletter}
                disabled={status === "loading"}
                style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter',sans-serif", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#8B7355", whiteSpace: "nowrap", padding: 0, opacity: status === "loading" ? 0.5 : 1 }}
              >
                {status === "loading" ? "..." : `${f.newsletterCta} →`}
              </button>
            </div>
          )}
        </div>

        {/* Nav columns */}
        {f.columns.map((col) => (
          <div key={col.head}>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "20px" }}>
              {col.head}
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} style={{ fontFamily: "'Inter',sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.55)", textDecoration: "none", transition: "color 0.2s", fontWeight: 300 }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Gold divider */}
      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 32px" }}>
        <div style={{ height: "1px", background: "linear-gradient(to left, transparent, rgba(201,169,110,0.4), transparent)" }} />
      </div>

      {/* Bottom bar */}
      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.25)", margin: 0 }}>
          © {new Date().getFullYear()} Vikos Jewelry. {f.copyright}
        </p>
        <div style={{ display: "flex", gap: "24px" }}>
          {[
            { label: f.privacy,   href: "/privacy" },
            { label: f.terms,     href: "/terms" },
            { label: "Instagram", href: "https://instagram.com/vikosjewelry" },
          ].map((l) => (
            <Link key={l.label} href={l.href} style={{ fontFamily: "'Inter',sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .footer-grid { grid-template-columns: 1fr !important; } }
        ::placeholder { color: rgba(255,255,255,0.25) !important; }
      `}</style>
    </footer>
  );
}
