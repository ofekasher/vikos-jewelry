"use client";
import Link from "next/link";
import { useT } from "@/lib/LanguageContext";

const CARDS = [
  { id: "rings",     img: "/cat-rings-v2.jpg",     href: "/shop?category=rings" },
  { id: "earrings",  img: "/cat-earrings-v2.jpg",  href: "/shop?category=earrings" },
  { id: "necklaces", img: "/cat-necklaces-v2.jpg", href: "/shop?category=necklaces" },
  { id: "bracelets", img: "/cat-bracelets-v2.jpg", href: "/shop?category=bracelets" },
];

export default function CategoryAccordion() {
  const c = useT().categories;

  const labels: Record<string, string> = {
    earrings:  c.earrings.label,
    rings:     c.rings.label,
    necklaces: c.necklaces.label,
    bracelets: c.bracelets?.label ?? "Bracelets",
  };

  return (
    <section style={{ background: "#F0F0EE", padding: "0 16px 16px" }}>
      <div className="cat-grid">
        {CARDS.map(({ id, img, href }) => (
          <Link key={id} href={href} className="cat-block" style={{ textDecoration: "none" }}>
            <img src={img} alt={labels[id]} loading="lazy" className="cat-block-img" />
            <div className="cat-block-scrim" />
            <div className="cat-block-footer">
              <span className="cat-block-label">{labels[id]}</span>
              <span className="cat-block-arrow">→</span>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        .cat-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
        }

        .cat-block {
          position: relative;
          display: block;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          cursor: pointer;
          background: #ffffff;
        }

        .cat-block-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          display: block;
          transition: transform 700ms cubic-bezier(0.23, 1, 0.32, 1);
        }

        @media (hover: hover) and (pointer: fine) {
          .cat-block:hover .cat-block-img {
            transform: scale(1.06);
          }
        }

        .cat-block-scrim {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 40%;
          background: linear-gradient(to top, rgba(0,0,0,0.42), rgba(0,0,0,0));
          pointer-events: none;
        }

        .cat-block-footer {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 20px;
        }

        .cat-block-label {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #ffffff;
          padding-right: 0.28em;
          text-shadow: 0 1px 6px rgba(0,0,0,0.25);
        }

        .cat-block-arrow {
          font-size: 13px;
          color: #ffffff;
          transition: transform 200ms ease;
        }

        @media (hover: hover) and (pointer: fine) {
          .cat-block:hover .cat-block-arrow {
            transform: translateX(3px);
          }
        }

        @media (max-width: 768px) {
          .cat-grid { gap: 6px; }
          .cat-block-footer { padding: 14px 16px; }
          .cat-block-label { font-size: 10px; }
        }
      `}</style>
    </section>
  );
}
