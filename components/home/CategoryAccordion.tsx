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
            <div className="cat-block-imgwrap">
              <img src={img} alt={labels[id]} loading="lazy" className="cat-block-img" />
            </div>
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

        .cat-block-imgwrap {
          aspect-ratio: 4 / 3;
          background: #F5F3EF;
          overflow: hidden;
          padding: 20px;
        }

        .cat-block-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center center;
          display: block;
          transition: transform 500ms cubic-bezier(0.23, 1, 0.32, 1);
        }

        @media (hover: hover) and (pointer: fine) {
          .cat-block:hover .cat-block-img {
            transform: scale(1.04);
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
          color: #8B7355;
          transition: transform 200ms ease;
        }

        @media (hover: hover) and (pointer: fine) {
          .cat-block:hover .cat-block-arrow {
            transform: translateX(3px);
          }
        }

        @media (max-width: 768px) {
          .cat-grid { gap: 6px; }
          .cat-block-imgwrap { padding: 14px; }
          .cat-block-footer { padding: 10px 14px; }
        }
      `}</style>
    </section>
  );
}
