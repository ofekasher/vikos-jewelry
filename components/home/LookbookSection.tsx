"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LookbookSection() {
  return (
    <section style={{ overflow: "hidden", background: "#111111" }} dir="rtl">
      <div className="lookbook-grid">

        {/* Image — 60% */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="lookbook-img-col"
        >
          <img
            src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1400&q=90"
            alt="לוקבוק ויקוס"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </motion.div>

        {/* Text — 40% */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          className="lookbook-text"
        >
          <p style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: "9px",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#C9A96E",
            marginBottom: "20px",
          }}>
            לוקבוק 2025
          </p>

          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(2.2rem, 3.5vw, 3.4rem)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "#ffffff",
            lineHeight: 1.1,
            margin: "0 0 20px",
          }}>
            הקולקציה<br />
            החדשה
          </h2>

          <div style={{ width: "32px", height: "1px", background: "#C9A96E", marginBottom: "20px" }} />

          <p style={{
            fontFamily: "'Frank Ruhl Libre', serif",
            fontSize: "13px",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.85,
            fontWeight: 300,
            marginBottom: "40px",
          }}>
            טבעות, שרשראות ועגילים שמספרים סיפור של עדינות ויוקרה — מעוצבים בסדנת ויקוס.
          </p>

          <Link href="/shop" className="lookbook-cta">
            לצפייה בקולקציה &rarr;
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
          background: #111111;
        }
        .lookbook-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #C9A96E;
          text-decoration: none;
          border-bottom: 1px solid rgba(201,169,110,0.4);
          padding-bottom: 2px;
          align-self: flex-start;
          transition: border-color 180ms ease-out;
        }
        @media (hover: hover) and (pointer: fine) {
          .lookbook-cta:hover { border-bottom-color: #C9A96E; }
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
