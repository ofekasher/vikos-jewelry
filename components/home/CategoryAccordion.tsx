"use client";
import { useState } from "react";
import Link from "next/link";

const cats = [
  {
    id: "earrings",
    label: "עגילים",
    sub: "אלגנטיות עדינה",
    href: "/shop?cat=earrings",
    img: "/instagram/ig16.jpeg",
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

      {/*
        onMouseLeave on the container resets to null — mouseleave does NOT
        bubble, so moving between strips never fires this. Only a true exit
        from the accordion triggers it.
      */}
      <div
        className="cat-accordion"
        aria-label="קטגוריות"
        onMouseLeave={() => setActive(null)}
      >
        {cats.map((cat) => {
          const isActive = active === cat.id;
          const isShrunk = active !== null && active !== cat.id;

          return (
            <Link
              key={cat.id}
              href={cat.href}
              className={[
                "cat-strip",
                isActive  ? "cat-strip--active"  : "",
                isShrunk  ? "cat-strip--shrunk"  : "",
              ].join(" ")}
              onMouseEnter={() => setActive(cat.id)}
              style={{ textDecoration: "none" }}
            >
              <div
                className="cat-img"
                style={{ backgroundImage: `url(${cat.img})` }}
              />
              <div className="cat-overlay" />

              {/* Vertical label — fades out when strip expands */}
              <div className="cat-label-v">
                <span>{cat.label}</span>
              </div>

              {/* Expanded content — fades in after the strip is open */}
              <div className="cat-content">
                <p className="cat-sub">{cat.sub}</p>
                <p className="cat-name">{cat.label}</p>
                <span className="cat-cta">גלי עוד →</span>
              </div>
            </Link>
          );
        })}
      </div>

      <style>{`
        /* ─── Layout ──────────────────────────────────────────── */
        .cat-accordion {
          display: flex;
          height: 480px;
          overflow: hidden;
        }

        /*
          flex-grow IS an animatable CSS property.
          flex shorthand (transition: flex) is NOT reliably animated
          across browsers — which caused the stuck-open bug.
          Using flex-grow + fixed shrink/basis fixes it.
        */
        .cat-strip {
          position: relative;
          overflow: hidden;
          cursor: pointer;

          flex-grow: 1;
          flex-shrink: 0;
          flex-basis: 0%;
          min-width: 0;

          transition:
            flex-grow    660ms cubic-bezier(0.76, 0, 0.24, 1);
        }

        .cat-strip--active { flex-grow: 3.2; }
        .cat-strip--shrunk { flex-grow: 0.55; }

        /* ─── Background image ────────────────────────────────── */
        .cat-img {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transform: scale(1.06);
          transition: transform 660ms cubic-bezier(0.76, 0, 0.24, 1);
        }
        .cat-strip--active .cat-img {
          transform: scale(1);
        }

        /* ─── Dark overlay ────────────────────────────────────── */
        .cat-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(8, 8, 8, 0.82) 0%,
            rgba(8, 8, 8, 0.28) 55%,
            rgba(8, 8, 8, 0.08) 100%
          );
          opacity: 0.72;
          transition: opacity 660ms cubic-bezier(0.76, 0, 0.24, 1);
        }
        .cat-strip--active .cat-overlay { opacity: 1; }

        /* ─── Vertical label (collapsed state) ───────────────── */
        .cat-label-v {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 1;
          transition: opacity 300ms cubic-bezier(0.76, 0, 0.24, 1);
        }
        .cat-strip--active .cat-label-v {
          opacity: 0;
        }

        .cat-label-v span {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 9px;
          letter-spacing: 0.34em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.82);
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }

        /* ─── Expanded content ────────────────────────────────── */
        .cat-content {
          position: absolute;
          bottom: 40px;
          right: 32px;
          opacity: 0;
          transform: translateY(10px);
          pointer-events: none;
          /* fades in only after the strip has had time to open */
          transition:
            opacity   280ms ease-out 280ms,
            transform 280ms cubic-bezier(0.76, 0, 0.24, 1) 280ms;
        }
        .cat-strip--active .cat-content {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .cat-sub {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 9px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.5);
          margin: 0 0 10px;
        }

        .cat-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.8rem, 2.6vw, 2.4rem);
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
          border-bottom: 1px solid rgba(201, 169, 110, 0.4);
          padding-bottom: 2px;
        }

        /* ─── Mobile ──────────────────────────────────────────── */
        @media (max-width: 768px) {
          .cat-accordion {
            flex-direction: column;
            height: auto;
          }
          .cat-strip {
            flex-grow: unset !important;
            flex-shrink: unset !important;
            flex-basis: unset !important;
            height: 100px;
            transition: height 600ms cubic-bezier(0.76, 0, 0.24, 1) !important;
          }
          .cat-strip--active  { height: 280px; }
          .cat-strip--shrunk  { height: 100px; }
          .cat-label-v span   { writing-mode: horizontal-tb; }
          .cat-content        { bottom: 20px; right: 20px; }
          .cat-name           { font-size: 1.6rem; }
        }
      `}</style>
    </section>
  );
}
