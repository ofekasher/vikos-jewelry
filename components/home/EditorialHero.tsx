"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { useT } from "@/lib/LanguageContext";

export default function EditorialHero() {
  const t = useT();
  const e = t.editorial;

  return (
    <section style={{ overflow: "hidden" }}>
      <div className="editorial-hero-grid">
        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
          className="editorial-hero-text"
        >
          <p style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: "13px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#8B7355",
            marginBottom: "14px",
          }}>
            {e.eyebrow}
          </p>

          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(1.3rem, 2.2vw, 2rem)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "#111111",
            lineHeight: 1.1,
            margin: "0 0 14px",
            whiteSpace: "pre-line",
          }}>
            {e.title}
          </h2>

          <p style={{
            fontFamily: "'Frank Ruhl Libre', serif",
            fontSize: "13px",
            color: "#6B6B6B",
            lineHeight: 1.75,
            fontWeight: 300,
            maxWidth: "300px",
            marginBottom: "20px",
          }}>
            {e.body}
          </p>

          <Link href="/shop" className="editorial-hero-cta">
            {e.cta} →
          </Link>
        </motion.div>

        {/* Image side */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="editorial-hero-img-wrap"
        >
          <img
            src="/hero-santorini.jpg"
            alt="VIKOS Jewelry"
            className="editorial-hero-img"
          />
        </motion.div>
      </div>

      <style>{`
        .editorial-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          height: 400px;
        }
        .editorial-hero-text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 20px 28px;
          background: #F0F0EE;
        }
        .editorial-hero-img-wrap {
          overflow: hidden;
          position: relative;
        }
        .editorial-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.02);
        }
        .editorial-hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #111111;
          text-decoration: none;
          border-bottom: 1px solid #111111;
          padding-bottom: 2px;
          align-self: flex-start;
          transition: color 180ms ease-out, border-color 180ms ease-out;
        }
        @media (hover: hover) and (pointer: fine) {
          .editorial-hero-cta:hover {
            color: #8B7355;
            border-bottom-color: #8B7355;
          }
        }
        @media (max-width: 768px) {
          .editorial-hero-grid {
            grid-template-columns: 1fr;
            height: auto;
          }
          .editorial-hero-img-wrap {
            min-height: 280px;
          }
          .editorial-hero-text {
            padding: 48px 24px;
          }
        }
      `}</style>
    </section>
  );
}
