"use client";
import { useState } from "react";
import Link from "next/link";
import { useT } from "@/lib/LanguageContext";

const CARDS = [
  { id: "rings",     img: "/rings/RA_hand_01.png",          href: "/shop?category=rings" },
  { id: "earrings",  img: "/instagram/ig16.jpeg",            href: "/shop?category=earrings" },
  { id: "necklaces", img: "/necklaces/pe7k_neck_01.png",     href: "/shop?category=necklaces" },
  { id: "bracelets", img: "/bracelets/br_01.png",            href: "/shop?category=bracelets" },
];

export default function CategoryAccordion() {
  const [hovered, setHovered] = useState<string | null>(null);
  const t = useT();
  const c = t.categories;

  const labels: Record<string, string> = {
    rings:     c.rings.label,
    earrings:  c.earrings.label,
    necklaces: c.necklaces.label,
    bracelets: c.bracelets?.label ?? "Bracelets",
  };

  return (
    <section style={{ background: "#ffffff", padding: "72px 32px" }}>
      <div style={{ maxWidth: "1160px", margin: "0 auto" }}>

        {/* Section header */}
        <div style={{ marginBottom: "40px" }}>
          <p style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: "10px", letterSpacing: "0.28em",
            textTransform: "uppercase", color: "#C9A96E", marginBottom: "8px",
          }}>
            {c.eyebrow ?? "Shop by Category"}
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
            fontWeight: 400, color: "#111111", lineHeight: 1.15, margin: 0,
          }}>
            {c.title ?? "Explore the Collection"}
          </h2>
        </div>

        {/* 4 equal cards */}
        <div className="cat-cards-grid">
          {CARDS.map(({ id, img, href }) => (
            <Link
              key={id}
              href={href}
              className="cat-card-link"
              style={{ textDecoration: "none", display: "block" }}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Square image */}
              <div style={{
                overflow: "hidden",
                aspectRatio: "1 / 1",
                background: "#F9F7F4",
                marginBottom: "14px",
              }}>
                <img
                  src={img}
                  alt={labels[id]}
                  loading="lazy"
                  className="cat-card-img"
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover", display: "block",
                    transition: "transform 500ms cubic-bezier(0.23, 1, 0.32, 1)",
                    transform: hovered === id ? "scale(1.06)" : "scale(1)",
                  }}
                />
              </div>

              {/* Label */}
              <p style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#111111",
                margin: 0,
                transition: "color 200ms ease",
              }}>
                {labels[id]}
              </p>

              {/* Underline CTA */}
              <p style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "9px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: hovered === id ? "#C9A96E" : "#AAAAAA",
                margin: "5px 0 0",
                transition: "color 200ms ease",
              }}>
                {c.cta ?? "Shop Now"} →
              </p>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .cat-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        @media (max-width: 768px) {
          .cat-cards-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }
        @media (max-width: 480px) {
          .cat-cards-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }
      `}</style>
    </section>
  );
}
