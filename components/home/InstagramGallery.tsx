"use client";
import { useT } from "@/lib/LanguageContext";

function IgIcon({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill={color} stroke="none"/>
    </svg>
  );
}

const IMAGES = [
  { src: "/instagram/ig2.jpeg",  alt: "VIKOS Jewelry" },
  { src: "/instagram/ig5.jpeg",  alt: "VIKOS Jewelry" },
  { src: "/instagram/ig7.jpeg",  alt: "VIKOS Jewelry" },
  { src: "/instagram/ig9.jpeg",  alt: "VIKOS Jewelry" },
  { src: "/instagram/ig4.jpeg",  alt: "VIKOS Jewelry" },
  { src: "/instagram/ig10.jpeg", alt: "VIKOS Jewelry" },
  { src: "/instagram/ig14.jpeg", alt: "VIKOS Jewelry" },
  { src: "/instagram/ig17.jpeg", alt: "VIKOS Jewelry" },
];

const AREAS = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;

function Photo({ src, alt, area }: { src: string; alt: string; area: string }) {
  return (
    <div className="ig-photo" style={{ gridArea: area }}>
      <img src={src} alt={alt} loading="lazy" />
      <div className="ig-hover"><IgIcon size={20} color="#fff" /></div>
    </div>
  );
}

export default function InstagramGallery() {
  const ig = useT().instagram;

  return (
    <section style={{ background: "#F0F0EE", padding: "96px 32px" }}>
      <div style={{ maxWidth: "1160px", margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "9px", letterSpacing: "0.36em", textTransform: "uppercase", color: "#8B7355", marginBottom: "14px" }}>
            {ig.eyebrow}
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 300, color: "#111111", margin: "0 0 12px" }}>
            {ig.title}
          </h2>
          <a href="https://instagram.com/vikosjewelry" target="_blank" rel="noopener noreferrer" className="ig-handle">
            <IgIcon size={13} />{ig.handle}
          </a>
        </div>

        <div className="ig-grid">
          {IMAGES.map((img, i) => (
            <Photo key={img.src} src={img.src} alt={img.alt} area={AREAS[i]} />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "44px" }}>
          <a href="https://instagram.com/vikosjewelry" target="_blank" rel="noopener noreferrer" className="ig-cta">
            <IgIcon size={12} />{ig.cta}
          </a>
        </div>
      </div>

      <style>{`
        .ig-grid { display:grid; grid-template-columns:repeat(4,1fr); grid-template-rows:repeat(4,220px); grid-template-areas:"a a b c""a a d e""f g h h""f g h h"; gap:4px; }
        .ig-photo { position:relative; overflow:hidden; cursor:pointer; }
        .ig-photo img { width:100%; height:100%; object-fit:cover; object-position:center; display:block; transition:transform 700ms cubic-bezier(0.23,1,0.32,1); }
        .ig-hover { position:absolute; inset:0; background:rgba(12,12,12,0.36); display:flex; align-items:center; justify-content:center; opacity:0; transition:opacity 400ms ease; }
        @media (hover:hover) and (pointer:fine) { .ig-photo:hover img { transform:scale(1.05); } .ig-photo:hover .ig-hover { opacity:1; } }
        .ig-handle { font-family:'Inter',sans-serif; font-size:11px; letter-spacing:.1em; color:#8B7355; text-decoration:none; display:inline-flex; align-items:center; gap:6px; transition:opacity .2s; }
        .ig-handle:hover { opacity:.7; }
        .ig-cta { display:inline-flex; align-items:center; gap:8px; padding:12px 32px; border:1px solid #8B7355; color:#8B7355; font-family:'Inter',sans-serif; font-size:10px; letter-spacing:.22em; text-transform:uppercase; text-decoration:none; transition:background .25s,color .25s; }
        .ig-cta:hover { background:#8B7355; color:#fff; }
        @media (max-width:768px) { .ig-grid { grid-template-columns:repeat(2,1fr); grid-template-rows:repeat(6,180px); grid-template-areas:"a a""a a""b c""d e""f g""h h"; } }
        @media (max-width:480px) { .ig-grid { grid-template-columns:repeat(2,1fr); grid-template-rows:auto; grid-template-areas:unset; } .ig-photo { grid-area:unset !important; aspect-ratio:1/1; } }
      `}</style>
    </section>
  );
}
