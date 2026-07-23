"use client";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { useLang } from "@/lib/LanguageContext";

const RING_POOL = [
  "/rings/RA_hand_01.png",
  "/rings/RA_hand_03.png",
  "/rings/RA_hand_05.png",
  "/rings/RB_hand_01.png",
  "/rings/RB_hand_04.png",
  "/rings/RC_hand_01.png",
  "/rings/RC_hand_03.png",
  "/rings/RD_hand_01.png",
  "/rings/RD_hand_05.png",
  "/rings/RE_hand_01.png",
  "/rings/RE_hand_03.png",
];

const BRACELET_POOL = [
  "/bracelets/hand_a01.png",
  "/bracelets/hand_a02.png",
  "/bracelets/hand_a04.png",
  "/bracelets/hand_a06.png",
  "/bracelets/hand_a08.png",
  "/bracelets/hand_a10.png",
  "/bracelets/br_01.png",
  "/bracelets/br_03.png",
  "/bracelets/br_05.png",
  "/bracelets/br_07.png",
];

const NECKLACE_POOL = [
  "/necklaces/j2ox_neck_01.png",
  "/necklaces/j2ox_neck_03.png",
  "/necklaces/j2ox_neck_05.png",
  "/necklaces/pe7k_neck_01.png",
  "/necklaces/pe7k_neck_03.png",
  "/necklaces/pe7k_neck_05.png",
  "/necklaces/tjhq_neck_01.png",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

type Card = {
  src: string;
  labelHe: string;
  labelEn: string;
  href: string;
};

const DEFAULT_CARDS: Card[] = [
  { src: RING_POOL[0],     labelHe: "טבעות",   labelEn: "Rings",     href: "/shop?category=rings" },
  { src: BRACELET_POOL[0], labelHe: "צמידים",  labelEn: "Bracelets", href: "/shop?category=bracelets" },
  { src: NECKLACE_POOL[0], labelHe: "שרשראות", labelEn: "Necklaces", href: "/shop?category=necklaces" },
];

export default function ProductTriptych() {
  const { lang } = useLang();
  const he = lang !== "en";

  const [cards, setCards] = useState<Card[]>(DEFAULT_CARDS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCards([
      { src: pick(RING_POOL),     labelHe: "טבעות",   labelEn: "Rings",     href: "/shop?category=rings" },
      { src: pick(BRACELET_POOL), labelHe: "צמידים",  labelEn: "Bracelets", href: "/shop?category=bracelets" },
      { src: pick(NECKLACE_POOL), labelHe: "שרשראות", labelEn: "Necklaces", href: "/shop?category=necklaces" },
    ]);
    setReady(true);
  }, []);

  return (
    <section style={{ background: "#0E0E0C", padding: "88px 40px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "52px",
          gap: "24px",
          flexWrap: "wrap",
        }}>
          <div>
            <p style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: "10px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#8B7355",
              marginBottom: "14px",
            }}>
              {he ? "קולקציית 2026" : "Collection 2026"}
            </p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "#fff",
              lineHeight: 1.1,
              whiteSpace: "pre-line",
            }}>
              {he ? "יופי שנולד\nמידיים" : "Beauty born\nfrom hands"}
            </h2>
          </div>

          <Link
            href="/shop"
            className="triptych-view-all"
          >
            {he ? "לכל הקולקציה" : "View all"} →
          </Link>
        </div>

        {/* Triptych grid */}
        <div className="triptych-grid">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 36 }}
              animate={ready ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.7,
                delay: i * 0.11,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="triptych-card"
            >
              <Link href={card.href} className="triptych-link">
                <div className="triptych-img-wrap">
                  <img
                    src={card.src}
                    alt={he ? card.labelHe : card.labelEn}
                    className="triptych-img"
                  />
                </div>

                {/* Gradient scrim */}
                <div className="triptych-scrim" />

                {/* Label */}
                <div className="triptych-label">
                  <p className="triptych-label-brand">VIKOS</p>
                  <p className="triptych-label-cat">
                    {he ? card.labelHe : card.labelEn}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .triptych-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .triptych-card {
          position: relative;
          aspect-ratio: 3 / 4;
          overflow: hidden;
        }
        .triptych-link {
          display: block;
          width: 100%;
          height: 100%;
          position: relative;
          text-decoration: none;
        }
        .triptych-img-wrap {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .triptych-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 700ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        @media (hover: hover) and (pointer: fine) {
          .triptych-card:hover .triptych-img {
            transform: scale(1.07);
          }
        }
        .triptych-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.78) 0%,
            rgba(0, 0, 0, 0.12) 45%,
            transparent 100%
          );
          pointer-events: none;
        }
        .triptych-label {
          position: absolute;
          bottom: 24px;
          left: 22px;
          pointer-events: none;
        }
        .triptych-label-brand {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #8B7355;
          margin-bottom: 5px;
        }
        .triptych-label-cat {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.5rem;
          font-weight: 400;
          font-style: italic;
          color: #fff;
          line-height: 1;
        }
        .triptych-view-all {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.45);
          text-decoration: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.18);
          padding-bottom: 3px;
          white-space: nowrap;
          transition: color 180ms ease-out, border-color 180ms ease-out;
          align-self: flex-end;
        }
        .triptych-view-all:hover {
          color: #8B7355;
          border-bottom-color: #8B7355;
        }
        @media (max-width: 900px) {
          .triptych-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto;
          }
          .triptych-card:first-child {
            grid-column: 1 / -1;
            aspect-ratio: 16 / 9;
          }
        }
        @media (max-width: 600px) {
          .triptych-grid {
            display: flex;
            flex-direction: row;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            gap: 10px;
            padding-bottom: 4px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .triptych-grid::-webkit-scrollbar { display: none; }
          .triptych-card {
            flex: 0 0 78vw;
            aspect-ratio: 3 / 4;
            scroll-snap-align: start;
          }
        }
      `}</style>
    </section>
  );
}
