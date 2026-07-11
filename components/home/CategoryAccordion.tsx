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
    <section style={{ width: "100%" }}>
      <div className="cat-grid">
        {CARDS.map(({ id, img, href }) => (
          <Link key={id} href={href} className="cat-block" style={{ textDecoration: "none" }}>
            {/* Background image */}
            <img src={img} alt={labels[id]} loading="lazy" className="cat-block-img" />

            {/* Dark overlay */}
            <div className="cat-block-overlay" />

            {/* Label */}
            <span className="cat-block-label">{labels[id]}</span>
          </Link>
        ))}
      </div>

      <style>{`
        .cat-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 300px 300px;
          width: 100%;
        }

        .cat-block {
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          text-decoration: none;
        }

        .cat-block-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 600ms cubic-bezier(0.23, 1, 0.32, 1),
                      filter 400ms ease;
          filter: brightness(0.62);
        }

        .cat-block-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.22);
          pointer-events: none;
        }

        .cat-block-label {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: clamp(12px, 1.4vw, 16px);
          font-weight: 500;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #ffffff;
          white-space: nowrap;
          padding-right: 0.32em;
        }

        @media (hover: hover) and (pointer: fine) {
          .cat-block:hover .cat-block-img {
            filter: brightness(0.82);
            transform: scale(1.04);
          }
        }

        .cat-block:nth-child(1),
        .cat-block:nth-child(2) {
          border-bottom: 1px solid rgba(255,255,255,0.12);
        }
        .cat-block:nth-child(1),
        .cat-block:nth-child(3) {
          border-right: 1px solid rgba(255,255,255,0.12);
        }

        @media (max-width: 768px) {
          .cat-grid {
            grid-template-rows: auto auto;
          }
          .cat-block {
            aspect-ratio: 1 / 1;
            height: auto;
          }
        }
      `}</style>
    </section>
  );
}
