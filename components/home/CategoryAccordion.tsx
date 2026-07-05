"use client";
import { useState } from "react";
import Link from "next/link";

const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";
const DUR  = "660ms";

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
  const [active, setActive] = useState<string | null>(null);

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

      <div
        className="cat-accordion"
        aria-label="קטגוריות"
        onMouseLeave={() => setActive(null)}
      >
        {cats.map((cat) => {
          const isActive = active === cat.id;
          const isShrunk = active !== null && !isActive;

          return (
            <Link
              key={cat.id}
              href={cat.href}
              className="cat-strip"
              onMouseEnter={() => setActive(cat.id)}
              aria-current={isActive ? "page" : undefined}
              style={{
                textDecoration: "none",
                flex: isActive ? "3.2 0 0" : isShrunk ? "0.6 0 0" : "1 0 0",
                transition: `flex ${DUR} ${EASE}`,
              }}
            >
              {/* Background image — subtle parallax scale on hover */}
              <div
                className="cat-img"
                style={{
                  backgroundImage: `url(${cat.img})`,
                  transform: isActive ? "scale(1)" : "scale(1.06)",
                  transition: `transform ${DUR} ${EASE}`,
                }}
              />

              {/* Persistent dark gradient — no flash, just deepens */}
              <div
                className="cat-overlay"
                style={{
                  opacity: isActive ? 1 : 0.72,
                  transition: `opacity ${DUR} ${EASE}`,
                }}
              />

              {/* Vertical label — visible when collapsed */}
              <div
                className="cat-label-v"
                style={{
                  opacity: isActive ? 0 : 1,
                  transition: `opacity 380ms ${EASE} ${isActive ? "0ms" : "200ms"}`,
                }}
              >
                <span>{cat.label}</span>
              </div>

              {/* Expanded content — fades in after strip opens */}
              <div
                className="cat-content"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateY(0)" : "translateY(10px)",
                  transition: isActive
                    ? `opacity 320ms ease-out 300ms, transform 320ms ${EASE} 300ms`
                    : `opacity 180ms ease-out, transform 180ms ${EASE}`,
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                <p className="cat-sub">{cat.sub}</p>
                <p className="cat-name">{cat.label}</p>
                <span className="cat-cta">גלי עוד →</span>
              </div>

              {/* Thin gold border on right edge — appears on hover */}
              <div
                className="cat-edge"
                style={{
                  opacity: isActive ? 1 : 0,
                  transition: `opacity 400ms ${EASE} 200ms`,
                }}
              />
            </Link>
          );
        })}
      </div>

      <style>{`
        .cat-accordion {
          display: flex;
          height: 480px;
          overflow: hidden;
        }

        .cat-strip {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          /* flex set via inline style for per-strip control */
        }

        /* Background image */
        .cat-img {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          /* transform + transition via inline */
        }

        /* Dark overlay — gradient that lives always, just shifts opacity */
        .cat-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(10, 10, 10, 0.85) 0%,
            rgba(10, 10, 10, 0.30) 55%,
            rgba(10, 10, 10, 0.10) 100%
          );
          /* opacity via inline */
        }

        /* Vertical label */
        .cat-label-v {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          /* opacity via inline */
        }

        .cat-label-v span {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 9px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.85);
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }

        /* Expanded content */
        .cat-content {
          position: absolute;
          bottom: 40px;
          right: 32px;
          /* opacity + transform via inline */
        }

        .cat-sub {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 9px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.55);
          margin: 0 0 10px;
        }

        .cat-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.8rem, 2.8vw, 2.6rem);
          font-style: italic;
          font-weight: 300;
          color: #ffffff;
          line-height: 1.05;
          margin: 0 0 22px;
          white-space: nowrap;
        }

        .cat-cta {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 9px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #C9A96E;
          border-bottom: 1px solid rgba(201, 169, 110, 0.45);
          padding-bottom: 2px;
        }

        /* Thin gold right-edge accent */
        .cat-edge {
          position: absolute;
          top: 15%;
          bottom: 15%;
          right: 0;
          width: 1px;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(201, 169, 110, 0.6) 40%,
            rgba(201, 169, 110, 0.6) 60%,
            transparent
          );
          /* opacity via inline */
        }

        @media (max-width: 768px) {
          .cat-accordion {
            flex-direction: column;
            height: auto;
          }
          .cat-strip {
            flex: none !important;
            height: 100px;
            transition: height ${DUR} ${EASE} !important;
          }
          .cat-label-v span {
            writing-mode: horizontal-tb;
          }
          .cat-content {
            bottom: 20px;
            right: 20px;
          }
          .cat-name {
            font-size: 1.6rem;
          }
        }
      `}</style>
    </section>
  );
}
