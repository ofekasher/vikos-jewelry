"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useT } from "@/lib/LanguageContext";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";

/*
  10 local brand photos — editorial asymmetric CSS Grid.

  Desktop layout (3 cols, 5 rows × 240px):

    [ A  ] [ B  ] [ C  ]   A = tall (rows 1–2)
    [ A  ] [ D  ] [ C  ]   C = tall (rows 1–2)
    [ E  ] [ D  ] [ F  ]   D = tall (rows 2–3)
    [ G  ] [ H  ] [ I  ]   G = tall (rows 4–5)
    [ G  ] [ J  ] [ I  ]   I = tall (rows 4–5)

  This gives B, E, F, H, J as short accents and
  A, C, D, G, I as tall featured cells — no two
  adjacent cells share the same height rhythm.
*/
const IMAGES = [
  { src: "/instagram/ig1.jpeg",  area: "a", alt: "תכשיטי ויקוס" },
  { src: "/instagram/ig2.jpeg",  area: "b", alt: "תכשיטי ויקוס" },
  { src: "/instagram/ig3.jpeg",  area: "c", alt: "תכשיטי ויקוס" },
  { src: "/instagram/ig4.jpeg",  area: "d", alt: "תכשיטי ויקוס" },
  { src: "/instagram/ig5.jpeg",  area: "e", alt: "תכשיטי ויקוס" },
  { src: "/instagram/ig6.jpeg",  area: "f", alt: "תכשיטי ויקוס" },
  { src: "/instagram/ig7.jpeg",  area: "g", alt: "תכשיטי ויקוס" },
  { src: "/instagram/ig8.jpeg",  area: "h", alt: "תכשיטי ויקוס" },
  { src: "/instagram/ig9.jpeg",  area: "i", alt: "תכשיטי ויקוס" },
  { src: "/instagram/ig10.jpeg", area: "j", alt: "תכשיטי ויקוס" },
];

export default function GalleryPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const g = useT().gallery;

  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a" }}>
      <Navbar />
      <CartDrawer />

      {/* ── Header ─────────────────────────────────────────── */}
      <section style={{ paddingTop: "160px", paddingBottom: "72px", textAlign: "center", paddingLeft: "24px", paddingRight: "24px" }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: "10px",
            letterSpacing: "0.42em",
            textTransform: "uppercase",
            color: "#8B7355",
            marginBottom: "18px",
          }}
        >
          {g.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(3rem, 7vw, 5.5rem)",
            fontWeight: 300,
            color: "#FAFAF8",
            lineHeight: 1,
            margin: 0,
          }}
        >
          {g.title}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
          style={{
            width: "48px",
            height: "1px",
            background: "#8B7355",
            margin: "28px auto 0",
            transformOrigin: "left center",
          }}
        />
      </section>

      {/* ── Gallery Grid ───────────────────────────────────── */}
      <section style={{ padding: "0 20px 80px", maxWidth: "1280px", margin: "0 auto" }}>
        <div className="gallery-grid">
          {IMAGES.map((img, i) => (
            <motion.button
              key={img.src}
              className="gallery-cell"
              style={{ gridArea: img.area }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: Math.min(i * 0.06, 0.45) }}
              onClick={() => setSelected(img.src)}
              aria-label={`פתח תמונה ${i + 1}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="gallery-img"
              />
            </motion.button>
          ))}
        </div>
      </section>

      {/* ── Lightbox ───────────────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              background: "rgba(0,0,0,0.92)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "40px",
              cursor: "zoom-out",
            }}
            onClick={() => setSelected(null)}
          >
            <motion.img
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              src={selected}
              alt="תמונה מוגדלת"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                cursor: "default",
              }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setSelected(null)}
              aria-label={g.close}
              style={{
                position: "absolute",
                top: "24px",
                right: "24px",
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.6)",
                cursor: "pointer",
                padding: "8px",
                transition: "color 200ms ease",
                lineHeight: 0,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
            >
              <X size={26} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ background: "#0a0a0a" }}>
        <Footer />
      </div>

      <style>{`
        /* ── Desktop: 3-col asymmetric grid ───────────────── */
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(5, 240px);
          grid-template-areas:
            "a b c"
            "a d c"
            "e d f"
            "g h i"
            "g j i";
          gap: 5px;
        }

        .gallery-cell {
          position: relative;
          overflow: hidden;
          cursor: zoom-in;
          background: #111;
          border: none;
          padding: 0;
          display: block;
          width: 100%;
          height: 100%;
        }

        .gallery-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          /* scale(1) → scale(1.03) on hover, slow and intentional */
          transition: transform 400ms ease-out, filter 400ms ease-out;
          filter: brightness(0.92);
        }

        @media (hover: hover) and (pointer: fine) {
          .gallery-cell:hover .gallery-img {
            transform: scale(1.03);
            filter: brightness(1);
          }
        }

        /* ── Tablet: 2 cols, images reflow naturally ───────── */
        @media (max-width: 900px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(3, 280px) repeat(3, 240px);
            grid-template-areas:
              "a b"
              "c d"
              "e f"
              "g h"
              "i j"
              "i j";
          }
        }

        /* ── Mobile: single column with varied heights ──────── */
        @media (max-width: 540px) {
          .gallery-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            grid-template-areas: none;
            gap: 4px;
          }
          .gallery-cell {
            grid-area: unset !important;
            aspect-ratio: 4 / 3;
            height: auto;
          }
          /* Give every 3rd image portrait ratio for variety */
          .gallery-cell:nth-child(3n) {
            aspect-ratio: 3 / 4;
          }
        }
      `}</style>
    </main>
  );
}
