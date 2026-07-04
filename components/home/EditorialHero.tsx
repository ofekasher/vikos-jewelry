"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export default function EditorialHero() {
  const reduce = useReducedMotion();

  return (
    <section style={{ overflow: "hidden" }} dir="rtl">
      <div className="editorial-hero-grid">
        {/* Text side — right in RTL */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
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
            marginBottom: "24px",
          }}>
            קולקציית 2025
          </p>

          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(3.5rem, 7vw, 6rem)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "#111111",
            lineHeight: 1.05,
            margin: "0 0 28px",
          }}>
            יופי שנולד<br />
            מידיים
          </h2>

          <p style={{
            fontFamily: "'Frank Ruhl Libre', serif",
            fontSize: "14px",
            color: "#6B6B6B",
            lineHeight: 1.85,
            fontWeight: 300,
            maxWidth: "340px",
            marginBottom: "40px",
          }}>
            כל תכשיט הוא סיפור — מעוצב ומיוצר ביד, עם חומרים שנבחרו בקפידה ועם תשומת לב לכל פרט.
          </p>

          <Link href="/shop" className="editorial-hero-cta">
            גלי את הקולקציה &rarr;
          </Link>
        </motion.div>

        {/* Image side — left in RTL */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="editorial-hero-img-wrap"
        >
          <img
            src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&q=90"
            alt="תכשיטי ויקוס"
            className="editorial-hero-img"
          />
        </motion.div>
      </div>

      <style>{`
        .editorial-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 580px;
        }
        .editorial-hero-text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px 64px;
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
