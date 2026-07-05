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

const IMAGES = [
  { src: "/instagram/ig1.jpeg",  alt: "טבעת יהלום על אבנים" },
  { src: "/instagram/ig2.jpeg",  alt: "צמידים על מעמד קטיפה" },
  { src: "/instagram/ig3.jpeg",  alt: "שרשרת בקופסת ויקוס" },
  { src: "/instagram/ig4.jpeg",  alt: "עגילים על קופסה" },
  { src: "/instagram/ig5.jpeg",  alt: "טבעות אמייל אדום" },
  { src: "/instagram/ig6.jpeg",  alt: "תכשיטי ויקוס" },
  { src: "/instagram/ig7.jpeg",  alt: "תכשיטי ויקוס" },
  { src: "/instagram/ig8.jpeg",  alt: "תכשיטי ויקוס" },
  { src: "/instagram/ig9.jpeg",  alt: "תכשיטי ויקוס" },
  { src: "/instagram/ig10.jpeg", alt: "תכשיטי ויקוס" },
];

function Photo({ src, alt, area }: { src: string; alt: string; area: string }) {
  return (
    <div className="ig-photo" style={{ gridArea: area }}>
      <img src={src} alt={alt} loading="lazy" />
      <div className="ig-overlay">
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
          <p style={{ fontFamily: T.sans, fontSize: "9px", letterSpacing: "0.36em", textTransform: "uppercase", color: T.gold, marginBottom: "14px" }}>
            עקבו אחרינו
          </p>
          <h2 style={{ fontFamily: T.serif, fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 300, color: T.black, margin: "0 0 12px" }}>
            העיצובים שלנו
          </h2>
          <a
            href="https://instagram.com/vikosjewelry"
            target="_blank"
            rel="noopener noreferrer"
            className="ig-handle"
          >
            <IgIcon size={13} />
            @vikosjewelry
          </a>
        </div>

        {/*
          Editorial asymmetric 4-col grid:
          [ A  A  B  C ]   ← A is 2×2 large featured
          [ A  A  D  E ]
          [ F  G  H  H ]   ← H is 2×2 large featured
          [ I  J  H  H ]
        */}
        <div className="ig-grid">
          <Photo src={IMAGES[0].src} alt={IMAGES[0].alt} area="a" />
          <Photo src={IMAGES[1].src} alt={IMAGES[1].alt} area="b" />
          <Photo src={IMAGES[2].src} alt={IMAGES[2].alt} area="c" />
          <Photo src={IMAGES[3].src} alt={IMAGES[3].alt} area="d" />
          <Photo src={IMAGES[4].src} alt={IMAGES[4].alt} area="e" />
          <Photo src={IMAGES[5].src} alt={IMAGES[5].alt} area="f" />
          <Photo src={IMAGES[6].src} alt={IMAGES[6].alt} area="g" />
          <Photo src={IMAGES[7].src} alt={IMAGES[7].alt} area="h" />
          <Photo src={IMAGES[8].src} alt={IMAGES[8].alt} area="i" />
          <Photo src={IMAGES[9].src} alt={IMAGES[9].alt} area="j" />
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "44px" }}>
          <a
            href="https://instagram.com/vikosjewelry"
            target="_blank"
            rel="noopener noreferrer"
            className="ig-cta"
          >
            <IgIcon size={12} />
            עקבו ב-Instagram
          </a>
        </div>
      </div>

      <style>{`
        .ig-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(4, 200px);
          grid-template-areas:
            "a a b c"
            "a a d e"
            "f g h h"
            "i j h h";
          gap: 4px;
        }

        .ig-photo {
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .ig-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .ig-overlay {
          position: absolute;
          inset: 0;
          background: rgba(17, 17, 17, 0.38);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        @media (hover: hover) and (pointer: fine) {
          .ig-photo:hover img { transform: scale(1.06); }
          .ig-photo:hover .ig-overlay { opacity: 1; }
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

        @media (max-width: 768px) {
          .ig-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(6, 160px);
            grid-template-areas:
              "a a"
              "a a"
              "b c"
              "d e"
              "f g"
              "h h"
              "i j";
          }
        }

        @media (max-width: 480px) {
          .ig-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: auto;
            grid-template-areas: none;
          }
          .ig-photo {
            grid-area: unset !important;
            aspect-ratio: 1/1;
          }
        }
      `}</style>
    </section>
  );
}
