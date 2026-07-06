"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useT } from "@/lib/LanguageContext";

export default function HeroVideo() {
  const h = useT().hero;

  return (
    <section style={{ position: "relative", width: "100%", height: "100dvh", minHeight: "560px", overflow: "hidden" }}>

      {/* ── Background image ── */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('/hero-new.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }} />

      {/* ── Dark overlay ── */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.28) 50%, rgba(0,0,0,0.1) 100%)",
        pointerEvents: "none",
      }} />

      {/* ── Content ── */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "0 24px",
        zIndex: 2,
      }}>
        {/* Brand eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ fontFamily: "'Inter',sans-serif", fontSize: "9px", letterSpacing: "0.44em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "16px" }}
        >
          {h.eyebrow}
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.6rem,7vw,5.5rem)", fontWeight: 300, color: "#fff", lineHeight: 1.05, marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.06em" }}
        >
          {h.titles[0][0]}<br />
          <em style={{ fontStyle: "italic", fontWeight: 400 }}>{h.titles[0][1]}</em>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: "44px", fontWeight: 300 }}
        >
          {h.body}
        </motion.p>

        {/* CTA → /shop */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Link href="/shop" style={{
            display: "inline-block", padding: "15px 48px",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.6)",
            color: "#fff",
            fontFamily: "'Inter',sans-serif", fontSize: "10px", letterSpacing: "0.26em", textTransform: "uppercase",
            textDecoration: "none",
            transition: "border-color 0.25s, background 0.25s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#C9A96E"; e.currentTarget.style.background = "rgba(201,169,110,0.12)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)"; e.currentTarget.style.background = "transparent"; }}
          >
            {h.cta}
          </Link>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        style={{
          position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)",
          width: "1px", height: "32px",
          background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)",
          zIndex: 2,
        }}
      />
    </section>
  );
}
