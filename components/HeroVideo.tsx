"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useT } from "@/lib/LanguageContext";

export default function HeroVideo() {
  const h = useT().hero;

  return (
    <section className="hero-split" style={{
      position: "relative", width: "100%",
      height: "100dvh", minHeight: "560px",
      display: "flex", overflow: "hidden",
      background: "#0E0D0B",
    }}>

      {/* ── LEFT — text panel ── */}
      <div className="hero-split-left" style={{
        flex: "0 0 50%", width: "50%",
        display: "flex", flexDirection: "column",
        alignItems: "flex-start", justifyContent: "center",
        padding: "0 clamp(40px, 6vw, 96px)",
        position: "relative", zIndex: 2,
      }}>
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontFamily: "'Inter',sans-serif", fontSize: "9px",
            letterSpacing: "0.44em", textTransform: "uppercase",
            color: "#C9A96E", marginBottom: "20px", margin: "0 0 20px",
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
            position: "absolute", bottom: "32px", left: "clamp(40px, 6vw, 96px)",
            width: "1px", height: "32px",
            background: "linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)",
          }}
        />
      </div>

      {/* ── RIGHT — portrait image ── */}
      <div className="hero-split-right" style={{ flex: "0 0 50%", width: "50%", position: "relative", overflow: "hidden" }}>
        <motion.img
          src="/hero-new.jpg"
          alt="VIKOS Jewelry"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            width: "100%", height: "100%",
            objectFit: "cover",
            objectPosition: "60% 15%",
            display: "block",
          }}
        />
        {/* Subtle left-edge gradient to blend into dark panel */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, #0E0D0B 0%, transparent 18%)",
          pointerEvents: "none",
        }} />
      </div>

      {/* ── Mobile: stack as full-bg (≤767px) ── */}
      <style>{`
        @media (max-width: 767px) {
          .hero-split-left  { flex: unset !important; width: 100% !important; padding: 0 28px !important; align-items: center !important; text-align: center !important; }
          .hero-split-right { display: none !important; }
          section.hero-split { background-image: url('/hero-new.jpg'); background-size: cover; background-position: 60% 15%; }
          section.hero-split::after { content: ''; position: absolute; inset: 0; background: rgba(0,0,0,0.55); }
        }
      `}</style>
    </section>
  );
}
