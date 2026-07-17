"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { useT } from "@/lib/LanguageContext";

export default function LookbookSection() {
  const t = useT();
  const l = t.lookbook;

  return (
    <section style={{ overflow: "hidden", background: "#F0F0EE" }}>
      <div className="lookbook-grid">

        {/* Image — 60% */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="lookbook-img-col"
        >
          <img
            src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1400&q=90"
            alt="VIKOS Lookbook"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </motion.div>

        {/* Text — 40% */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          className="lookbook-text"
        >
          <p style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: "9px",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#8B7355",
            marginBottom: "20px",
          }}>
            {l.eyebrow}
          </p>

          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(2.2rem, 3.5vw, 3.4rem)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "#111111",
            lineHeight: 1.1,
            margin: "0 0 20px",
            whiteSpace: "pre-line",
          }}>
            {l.title}
          </h2>

          <div style={{ width: "32px", height: "1px", background: "#8B7355", marginBottom: "20px" }} />

          <p style={{
            fontFamily: "'Frank Ruhl Libre', serif",
            fontSize: "13px",
            color: "#6B6B6B",
            lineHeight: 1.85,
            fontWeight: 300,
            marginBottom: "40px",
          }}>
            {l.body}
          </p>

          <Link href="/shop" className="lookbook-cta">
            {l.cta} →
          </Link>
        </motion.div>
      </div>

      <style>{`
        .lookbook-grid {
          display: grid;
          grid-template-columns: 3fr 2fr;
          min-height: 520px;
        }
        .lookbook-img-col {
          overflow: hidden;
          position: relative;
        }
        .lookbook-text {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 72px 56px;
          background: #F0F0EE;
        }
        .lookbook-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #111111;
          text-decoration: none;
          border-bottom: 1px solid rgba(17,17,17,0.35);
          padding-bottom: 2px;
          align-self: flex-start;
          transition: border-color 180ms ease-out;
        }
        @media (hover: hover) and (pointer: fine) {
          .lookbook-cta:hover { border-bottom-color: #8B7355; }
        }
        @media (max-width: 768px) {
          .lookbook-grid { grid-template-columns: 1fr; }
          .lookbook-img-col { min-height: 300px; }
          .lookbook-text { padding: 48px 24px; }
        }
      `}</style>
    </section>
  );
}
