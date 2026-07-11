"use client";
import Link from "next/link";
import { useT } from "@/lib/LanguageContext";

const CARDS = [
  { id: "rings",     img: "/cat-rings.jpg",                href: "/shop?category=rings" },
  { id: "earrings",  img: "/cat-earrings.jpg",             href: "/shop?category=earrings" },
  { id: "necklaces", img: "/necklaces/pe7k_neck_01.png",   href: "/shop?category=necklaces" },
  { id: "bracelets", img: "/cat-bracelets.jpg",            href: "/shop?category=bracelets" },
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
    <section style={{ background: "#FAFAF8", padding: "0 16px 16px" }}>
      <div className="cat-grid">
        {CARDS.map(({ id, img, href }) => (
          <Link key={id} href={href} className="cat-block" style={{ textDecoration: "none" }}>
            <img src={img} alt={labels[id]} loading="lazy" className="cat-block-img" />
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
          display: flex;
          flex-direction: column;
          background: #ffffff;
          cursor: pointer;
          border: 1px solid rgba(0,0,0,0.06);
          transition: box-shadow 300ms ease;
        }

        @media (hover: hover) and (pointer: fine) {
          .cat-block:hover {
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          }
        }

        .cat-block-img {
          width: calc(100% - 32px);
          height: 260px;
          object-fit: contain;
          object-position: center center;
          margin: 16px;
          display: block;
          background: #f5f0eb;
          transition: transform 500ms cubic-bezier(0.23, 1, 0.32, 1);
        }

        @media (hover: hover) and (pointer: fine) {
          .cat-block:hover .cat-block-img {
            transform: scale(1.02);
          }
        }

        .cat-block-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 20px;
          border-top: 1px solid rgba(0,0,0,0.06);
          background: #ffffff;
        }

        .cat-block-label {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #111111;
          padding-right: 0.28em;
        }

        .cat-block-arrow {
          font-size: 12px;
          color: #C9A96E;
          transition: transform 200ms ease;
        }

        @media (hover: hover) and (pointer: fine) {
          .cat-block:hover .cat-block-arrow {
            transform: translateX(3px);
          }
        }

        @media (max-width: 768px) {
          .cat-grid { gap: 6px; }
          .cat-block-img { height: 180px; padding: 16px; }
          .cat-block-footer { padding: 10px 14px; }
        }

        @media (max-width: 480px) {
          .cat-block-img { height: 140px; }
        }
      `}</style>
    </section>
  );
}
