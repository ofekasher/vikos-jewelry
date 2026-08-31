"use client";
import { useState } from "react";

/* ── same tokens as the dashboard ── */
const T = {
  gold:  "#8B7355",
  black: "#111111",
  sans:  "'Inter', system-ui, sans-serif",
};

const PAGES = [
  { id: "home",      label: "דף הבית",  url: "/" },
  { id: "shop",      label: "כל החנות", url: "/shop" },
  { id: "rings",     label: "טבעות",    url: "/shop?category=rings" },
  { id: "bracelets", label: "צמידים",   url: "/shop?category=bracelets" },
  { id: "necklaces", label: "שרשראות",  url: "/shop?category=necklaces" },
  { id: "earrings",  label: "עגילים",   url: "/shop?category=earrings" },
];

export default function SitePreview() {
  const [active, setActive] = useState(PAGES[1]);
  // key forces the iframe to reload when switching pages
  const [frameKey, setFrameKey] = useState(0);

  function go(p: typeof PAGES[number]) {
    setActive(p);
    setFrameKey(k => k + 1);
  }

  return (
    <div style={{ position: "fixed", inset: 0, display: "flex", flexDirection: "column", background: "#FAFAF8", zIndex: 50 }}>
      {/* ── Top bar ── */}
      <div style={{ height: "52px", flexShrink: 0, background: T.black, color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", direction: "rtl", fontFamily: T.sans, gap: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", overflowX: "auto", scrollbarWidth: "none" }}>
          <span style={{ fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: T.gold, border: `1px solid ${T.gold}`, padding: "3px 7px", whiteSpace: "nowrap", flexShrink: 0 }}>
            👁 תצוגת אתר
          </span>
          {PAGES.map(p => (
            <button
              key={p.id}
              onClick={() => go(p)}
              style={{
                padding: "6px 12px", background: active.id === p.id ? "#fff" : "transparent",
                color: active.id === p.id ? T.black : "#aaa", border: active.id === p.id ? "none" : "1px solid #333",
                fontSize: "10px", cursor: "pointer", fontFamily: T.sans, whiteSpace: "nowrap", flexShrink: 0,
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
          <button onClick={() => setFrameKey(k => k + 1)} title="רענון" style={{ padding: "6px 10px", background: "transparent", color: "#aaa", border: "1px solid #333", fontSize: "12px", cursor: "pointer", fontFamily: T.sans }}>⟳</button>
          <a href={active.url} target="_blank" rel="noreferrer" style={{ padding: "6px 10px", background: "transparent", color: "#aaa", textDecoration: "none", fontSize: "10px", border: "1px solid #333", whiteSpace: "nowrap", fontFamily: T.sans }}>פתח בחלון חדש ↗</a>
          <a href="/admin/dashboard" style={{ padding: "6px 12px", background: T.gold, color: "#fff", textDecoration: "none", fontSize: "10px", whiteSpace: "nowrap", fontFamily: T.sans }}>✏ חזרה לעריכה</a>
        </div>
      </div>

      {/* ── The live site itself ── */}
      <iframe
        key={frameKey}
        src={active.url}
        title="תצוגה מקדימה של האתר"
        style={{ flex: 1, width: "100%", border: "none", background: "#fff" }}
      />
    </div>
  );
}
