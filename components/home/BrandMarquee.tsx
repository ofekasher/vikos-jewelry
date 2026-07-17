"use client";
import Marquee from "react-fast-marquee";
import { useT } from "@/lib/LanguageContext";

export default function BrandMarquee() {
  const t = useT();

  return (
    <div style={{
      borderTop: "1px solid #E8E8E8",
      borderBottom: "1px solid #E8E8E8",
      background: "#ffffff",
      padding: "14px 0",
      overflow: "hidden",
    }}>
      <Marquee speed={22} gradient={false} direction="right">
        {t.marquee.map((item) => (
          <span
            key={item}
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: "11px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#888888",
              display: "inline-flex",
              alignItems: "center",
              gap: "28px",
              marginRight: "80px",
            }}
          >
            <span style={{ color: "#8B7355", fontSize: "8px", flexShrink: 0 }}>✦</span>
            {item}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
