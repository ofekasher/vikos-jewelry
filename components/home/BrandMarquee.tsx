"use client";
import Marquee from "react-fast-marquee";

const ITEMS = [
  "זהב 14K",
  "מיוצר ביד",
  "משלוח חינם",
  "30 יום החזרה",
  "גודל מתכוונן",
  "עיצוב ישראלי",
  "אריזת מתנה",
  "תעודת אמינות",
];

export default function BrandMarquee() {
  return (
    <div style={{
      borderTop: "1px solid #E8E8E8",
      borderBottom: "1px solid #E8E8E8",
      background: "#ffffff",
      padding: "14px 0",
      overflow: "hidden",
    }}>
      <Marquee speed={8} gradient={false} direction="right">
        {ITEMS.map((item) => (
          <span
            key={item}
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: "9px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#888888",
              display: "inline-flex",
              alignItems: "center",
              gap: "20px",
              marginRight: "48px",
            }}
          >
            <span style={{ color: "#C9A96E", fontSize: "7px", flexShrink: 0 }}>✦</span>
            {item}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
