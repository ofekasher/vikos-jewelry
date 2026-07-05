"use client";
import { useState } from "react";
import Link from "next/link";

const cats = [
  {
    id: "earrings",
    label: "עגילים",
    sub: "אלגנטיות עדינה",
    href: "/shop?cat=earrings",
    img: "https://images.pexels.com/photos/20943476/pexels-photo-20943476.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    id: "rings",
    label: "טבעות",
    sub: "סמל נצחי",
    href: "/shop?cat=rings",
    img: "/rings/vopf_hand_01.png",
  },
  {
    id: "necklaces",
    label: "שרשראות",
    sub: "קסם עדין",
    href: "/shop?cat=necklaces",
    img: "/necklaces/pe7k_neck_01.png",
  },
  {
    id: "bracelets",
    label: "צמידים",
    sub: "יוקרה על הפרק",
    href: "/shop?cat=bracelets",
    img: "/bracelets/br_01.png",
  },
];

export default function CategoryAccordion() {
  const [active, setActive] = useState<string>("rings");

  return (
    <section style={{ padding: "72px 0 0" }} dir="rtl">
      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 32px 0" }}>
        <p style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: "10px",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "#C9A96E",
          marginBottom: "8px",
        }}>
          לפי סגנון
        </p>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
          fontWeight: 400,
          color: "#111111",
          lineHeight: 1.15,
          marginBottom: "36px",
        }}>
          קנה לפי קטגוריה
        </h2>
      </div>

      {/* Accordion strips */}
      <div className="cat-accordion" aria-label="קטגוריות">
        {cats.map((cat) => {
          const isActive = active === cat.id;
          return (
            <Link
              key={cat.id}
              href={cat.href}
              className={`cat-strip${isActive ? " cat-strip--active" : ""}`}
              onMouseEnter={() => setActive(cat.id)}
              aria-current={isActive ? "page" : undefined}
              style={{ textDecoration: "none" }}
            >
              {/* Background image */}
              <div className="cat-strip-img" style={{ backgroundImage: `url(${cat.img})` }} />

              {/* Overlay */}
              <div className="cat-strip-overlay" />

              {/* Vertical label (collapsed) */}
              <div className="cat-strip-label-v">
                <span>{cat.label}</span>
              </div>

              {/* Expanded content */}
              <div className="cat-strip-content">
                <p style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: "9px",
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.65)",
                  marginBottom: "10px",
                }}>
                  {cat.sub}
                </p>
                <p style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "2rem",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "#ffffff",
                  lineHeight: 1.1,
                  marginBottom: "20px",
                }}>
                  {cat.label}
                </p>
                <span style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: "9px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#C9A96E",
                  borderBottom: "1px solid rgba(201,169,110,0.5)",
                  paddingBottom: "1px",
                }}>
                  גלי עוד &rarr;
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <style>{`
        .cat-accordion {
          display: flex;
          height: 460px;
          overflow: hidden;
        }

        .cat-strip {
          position: relative;
          flex: 1;
          overflow: hidden;
          cursor: pointer;
          transition: flex 480ms cubic-bezier(0.23, 1, 0.32, 1);
        }

        .cat-strip--active {
          flex: 3.5;
        }

        .cat-strip-img {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transform: scale(1.05);
          transition: transform 480ms cubic-bezier(0.23, 1, 0.32, 1);
        }

        .cat-strip--active .cat-strip-img {
          transform: scale(1);
        }

        .cat-strip-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(17,17,17,0.72) 0%, rgba(17,17,17,0.18) 60%, transparent 100%);
          transition: opacity 300ms ease-out;
        }

        .cat-strip:not(.cat-strip--active) .cat-strip-overlay {
          background: rgba(17,17,17,0.52);
        }

        /* Vertical label — shown when collapsed */
        .cat-strip-label-v {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 1;
          transition: opacity 250ms ease-out;
        }

        .cat-strip-label-v span {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.9);
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }

        .cat-strip--active .cat-strip-label-v {
          opacity: 0;
          pointer-events: none;
        }

        /* Expanded content — shown when active */
        .cat-strip-content {
          position: absolute;
          bottom: 36px;
          right: 28px;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 300ms ease-out 100ms, transform 300ms ease-out 100ms;
          pointer-events: none;
        }

        .cat-strip--active .cat-strip-content {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        @media (max-width: 768px) {
          .cat-accordion {
            flex-direction: column;
            height: auto;
          }
          .cat-strip {
            flex: none !important;
            height: 120px;
            transition: height 400ms cubic-bezier(0.23, 1, 0.32, 1);
          }
          .cat-strip--active {
            height: 280px;
          }
          .cat-strip-label-v span {
            writing-mode: horizontal-tb;
          }
          .cat-strip-content {
            bottom: 20px;
            right: 20px;
          }
        }
      `}</style>
    </section>
  );
}
