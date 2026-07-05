"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function EditorialHero() {
  return (
    <section style={{ overflow: "hidden" }} dir="rtl">
      <div className="editorial-hero-grid">
        {/* Text side — right in RTL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
          className="editorial-hero-text"
        >
          <p style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: "10px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#C9A96E",
            marginBottom: "14px",
          }}>
            קולקציית 2025
          </p>

          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "#111111",
            lineHeight: 1.1,
            margin: "0 0 14px",
          }}>
            יופי שנולד<br />מידיים
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
            כל תכשיט מעוצב ומיוצר ביד, עם חומרים שנבחרו בקפידה ותשומת לב לכל פרט.
          </p>

          <Link href="/shop" className="editorial-hero-cta">
            גלי את הקולקציה &rarr;
          </Link>
        </motion.div>

        {/* Image side — left in RTL */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="editorial-hero-img-wrap"
        >
          <img
            src="/necklaces/pe7k_neck_03.png"
            alt="תכשיטי ויקוס"
            className="editorial-hero-img"
          />
        </motion.div>
      </div>

      <style>{`
        .editorial-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          height: 320px;
        }
        .editorial-hero-text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 20px 28px;
          background: #F9F7F4;
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
            color: #C9A96E;
            border-bottom-color: #C9A96E;
          }
        }
        @media (max-width: 768px) {
          .editorial-hero-grid {
            grid-template-columns: 1fr;
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
