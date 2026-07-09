"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useT } from "@/lib/LanguageContext";

export default function HeroVideo() {
  const h = useT().hero;

  return (
    <section style={{
      position: "relative", width: "100%",
      height: "100dvh", minHeight: "560px",
      display: "flex", overflow: "hidden",
      background: "#f5f0eb",  /* cream fallback if image fails */
    }}>

      {/* ── Image panel — desktop: right 50%, mobile: absolute full-bg ── */}
      <div className="hero-img-panel" style={{
        flex: "0 0 50%", width: "50%",
        position: "relative", overflow: "hidden",
        order: 2,
      }}>
        <img
          src="/hero-new.jpg"
          alt="VIKOS Jewelry model"
          loading="eager"
          style={{
            width: "100%", height: "100%",
            objectFit: "cover",
            objectPosition: "60% 15%",
            display: "block",
          }}
        />
        {/* Blend left edge into text panel on desktop */}
        <div className="hero-img-gradient" style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, #0E0D0B 0%, transparent 20%)",
          pointerEvents: "none",
        }} />
      </div>

      {/* ── Dark overlay for mobile (sits over image on mobile only) ── */}
      <div className="hero-mobile-overlay" style={{
        display: "none",
        position: "absolute", inset: 0, zIndex: 1,
        background: "rgba(0,0,0,0.48)",
        pointerEvents: "none",
      }} />

      {/* ── Text panel — desktop: left 50%, mobile: full-width centered ── */}
      <div className="hero-text-panel" style={{
        flex: "0 0 50%", width: "50%",
        display: "flex", flexDirection: "column",
        alignItems: "flex-start", justifyContent: "center",
        padding: "0 clamp(40px, 6vw, 96px)",
        position: "relative", zIndex: 2,
        order: 1,
        background: "#0E0D0B",
      }}>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontFamily: "'Inter',sans-serif", fontSize: "9px",
            letterSpacing: "0.44em", textTransform: "uppercase",
            color: "#C9A96E", margin: "0 0 20px",
          }}
        >
          {h.eyebrow}
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.32 }}
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(3rem, 5.5vw, 6rem)",
            fontWeight: 300, color: "#FAFAF8",
            lineHeight: 1.0, margin: "0 0 20px",
            textTransform: "uppercase", letterSpacing: "0.04em",
          }}
        >
          {h.titles[0][0]}<br />
          <em style={{ fontStyle: "italic", fontWeight: 400 }}>{h.titles[0][1]}</em>
        </motion.h1>

        {/* Thin gold rule */}
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.23, 1, 0.32, 1] }}
          style={{
            width: "48px", height: "1px",
            background: "#C9A96E",
            margin: "0 0 20px",
            transformOrigin: "left",
          }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          style={{
            fontFamily: "'Inter',sans-serif", fontSize: "10px",
            letterSpacing: "0.22em", textTransform: "uppercase",
            color: "rgba(250,250,248,0.5)", margin: "0 0 48px", fontWeight: 300,
          }}
        >
          {h.body}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link href="/shop" style={{
            display: "inline-block", padding: "15px 48px",
            background: "transparent",
            border: "1px solid rgba(250,250,248,0.5)",
            color: "#FAFAF8",
            fontFamily: "'Inter',sans-serif", fontSize: "10px",
            letterSpacing: "0.26em", textTransform: "uppercase",
            textDecoration: "none",
            transition: "border-color 0.25s, background 0.25s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#C9A96E"; e.currentTarget.style.background = "rgba(201,169,110,0.12)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(250,250,248,0.5)"; e.currentTarget.style.background = "transparent"; }}
          >
            {h.cta}
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          style={{
            position: "absolute", bottom: "32px",
            left: "clamp(40px, 6vw, 96px)",
            width: "1px", height: "32px",
            background: "linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)",
          }}
        />
      </div>

      <style>{`
        @media (max-width: 767px) {
          /* Image becomes absolute full-screen background */
          .hero-img-panel {
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            flex: unset !important;
            order: 0 !important;
            z-index: 0;
          }
          /* Hide the desktop left-edge blend, show mobile overlay instead */
          .hero-img-gradient { display: none !important; }
          .hero-mobile-overlay { display: block !important; }
          /* Text panel becomes full-width transparent, sits above image */
          .hero-text-panel {
            flex: unset !important;
            width: 100% !important;
            background: transparent !important;
            align-items: center !important;
            text-align: center !important;
            padding: 0 28px !important;
          }
        }
      `}</style>
    </section>
  );
}
