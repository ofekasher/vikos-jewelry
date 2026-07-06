"use client";
import { useState } from "react";
import Link from "next/link";
import { useT } from "@/lib/LanguageContext";

const PANELS = [
  { id: "rings",     img: "/rings/vopf_hand_01.png",      href: "/shop?cat=rings" },
  { id: "earrings",  img: "/instagram/ig16.jpeg",          href: "/shop?cat=earrings" },
  { id: "necklaces", img: "/necklaces/pe7k_neck_01.png",   href: "/shop?cat=necklaces" },
];

export default function CategoryAccordion() {
  const [hovered, setHovered] = useState<string | null>(null);
  const t = useT();
  const c = t.categories;

  const labels: Record<string, { name: string; cta: string }> = {
    rings:     { name: c.rings.label,     cta: c.cta },
    earrings:  { name: c.earrings.label,  cta: c.cta },
    necklaces: { name: c.necklaces.label, cta: c.cta },
  };

  return (
    <section style={{ padding: "72px 0 0" }}>
      <div style={{ display: "flex", height: "520px" }} className="cat-panels">
        {PANELS.map(({ id, img, href }) => (
          <Link
            key={id}
            href={href}
            style={{ flex: 1, position: "relative", overflow: "hidden", textDecoration: "none", display: "block" }}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Background image */}
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "transform 400ms cubic-bezier(0.23, 1, 0.32, 1), filter 400ms ease",
              transform: hovered === id ? "scale(1.04)" : "scale(1)",
              filter: hovered === id ? "brightness(0.9)" : "brightness(0.72)",
            }} />

            {/* Gradient overlay — darker at bottom */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.22) 60%, rgba(0,0,0,0.1) 100%)",
              pointerEvents: "none",
            }} />

            {/* Center label */}
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: "14px",
            }}>
              <p style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "13px",
                fontWeight: 400,
                letterSpacing: "0.38em",
                textTransform: "uppercase",
                color: "#fff",
                margin: 0,
              }}>
                {labels[id].name}
              </p>
              <span style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "9px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.75)",
                borderBottom: "1px solid rgba(255,255,255,0.45)",
                paddingBottom: "2px",
                transition: "color 300ms ease, border-color 300ms ease",
              }}
              className={hovered === id ? "cat-cta-hover" : ""}
              >
                {labels[id].cta}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        .cat-panels > a + a { border-left: 1px solid rgba(255,255,255,0.08); }

        @media (max-width: 640px) {
          .cat-panels {
            flex-direction: column !important;
            height: auto !important;
          }
          .cat-panels > a {
            height: 220px;
          }
          .cat-panels > a + a {
            border-left: none;
            border-top: 1px solid rgba(255,255,255,0.08);
          }
        }
      `}</style>
    </section>
  );
}
