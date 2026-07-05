"use client";

function IgIcon({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill={color} stroke="none"/>
    </svg>
  );
}

const T = {
  gold:  "#C9A96E",
  black: "#111111",
  warm:  "#FAFAF8",
  serif: "'Cormorant Garamond', Georgia, serif",
  sans:  "'Inter', system-ui, sans-serif",
};

/*
  8 images shown — editorial grid layout:
    [ A  A  B  C ]   A = 2×2 featured
    [ A  A  D  E ]
    [ F  G  H  H ]   H = 2×2 featured
    [ F  G  H  H ]   F,G each span 2 rows tall
*/
const IMAGES = [
  { src: "/instagram/ig1.jpeg",  alt: "טבעת יהלום על אבנים" },   // A — large featured
  { src: "/instagram/ig11.jpeg", alt: "טבעת יהלום על יד" },      // B
  { src: "/instagram/ig12.jpeg", alt: "צמידי זהב" },             // C
  { src: "/instagram/ig13.jpeg", alt: "טבעת אמייל" },            // D
  { src: "/instagram/ig3.jpeg",  alt: "שרשרת בקופסת ויקוס" },   // E
  { src: "/instagram/ig15.jpeg", alt: "תכשיטים ליד הבריכה" },    // F — tall
  { src: "/instagram/ig16.jpeg", alt: "עגילי יהלום" },           // G — tall
  { src: "/instagram/ig8.jpeg",  alt: "תכשיטי ויקוס" },          // H — large featured
];

const AREAS = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;

function Photo({ src, alt, area }: { src: string; alt: string; area: string }) {
  return (
    <div className="ig-photo" style={{ gridArea: area }}>
      <img src={src} alt={alt} loading="lazy" />
      <div className="ig-hover">
        <IgIcon size={20} color="#fff" />
      </div>
    </div>
  );
}

export default function InstagramGallery() {
  return (
    <section style={{ background: T.warm, padding: "96px 32px" }}>
      <div style={{ maxWidth: "1160px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{
            fontFamily: T.sans, fontSize: "9px", letterSpacing: "0.36em",
            textTransform: "uppercase", color: T.gold, marginBottom: "14px",
          }}>
            עקבו אחרינו
          </p>
          <h2 style={{
            fontFamily: T.serif, fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
            fontWeight: 300, color: T.black, margin: "0 0 12px",
          }}>
            העיצובים שלנו
          </h2>
          <a href="https://instagram.com/vikosjewelry" target="_blank" rel="noopener noreferrer" className="ig-handle">
            <IgIcon size={13} />
            @vikosjewelry
          </a>
        </div>

        <div className="ig-grid">
          {IMAGES.map((img, i) => (
            <Photo key={img.src} src={img.src} alt={img.alt} area={AREAS[i]} />
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "44px" }}>
          <a href="https://instagram.com/vikosjewelry" target="_blank" rel="noopener noreferrer" className="ig-cta">
            <IgIcon size={12} />
            עקבו ב-Instagram
          </a>
        </div>
      </div>

      <style>{`
        /*
          4-column, 4-row editorial grid.
          A and H are 2×2 featured cells.
          F and G are 1×2 tall cells.
          B, C, D, E are standard 1×1 cells.
        */
        .ig-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(4, 220px);
          grid-template-areas:
            "a a b c"
            "a a d e"
            "f g h h"
            "f g h h";
          gap: 4px;
        }

        .ig-photo {
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        /* object-fit: cover always fills the cell — 1:1 square crop */
        .ig-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: transform 700ms cubic-bezier(0.23, 1, 0.32, 1);
        }

        .ig-hover {
          position: absolute;
          inset: 0;
          background: rgba(12, 12, 12, 0.36);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 400ms ease;
        }

        @media (hover: hover) and (pointer: fine) {
          .ig-photo:hover img      { transform: scale(1.05); }
          .ig-photo:hover .ig-hover { opacity: 1; }
        }

        .ig-handle {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 11px;
          letter-spacing: 0.1em;
          color: #C9A96E;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: opacity 0.2s;
        }
        .ig-handle:hover { opacity: 0.7; }

        .ig-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 32px;
          border: 1px solid #C9A96E;
          color: #C9A96E;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          text-decoration: none;
          transition: background 0.25s ease, color 0.25s ease;
        }
        .ig-cta:hover {
          background: #C9A96E;
          color: #fff;
        }

        /* ─── Mobile: 2-col stacked ─────────────────────────── */
        @media (max-width: 768px) {
          .ig-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(4, 180px) repeat(2, 180px);
            grid-template-areas:
              "a a"
              "a a"
              "b c"
              "d e"
              "f g"
              "h h";
          }
        }

        /* ─── Very small: uniform squares ───────────────────── */
        @media (max-width: 480px) {
          .ig-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: auto;
            grid-template-areas: unset;
          }
          .ig-photo {
            grid-area: unset !important;
            aspect-ratio: 1 / 1;
          }
        }
      `}</style>
    </section>
  );
}
