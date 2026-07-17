"use client";
import { motion, useReducedMotion } from "motion/react";
import { useLang } from "@/lib/LanguageContext";
import Link from "next/link";

export default function HeroVideo() {
  const reduce = useReducedMotion();
  const { lang } = useLang();
  const he = lang !== "en";

  const ease = [0.23, 1, 0.32, 1] as const;

  return (
    <section style={{
      position: "relative", width: "100%",
      height: "100dvh", minHeight: "560px",
      overflow: "hidden",
      background: "#0a0a0a",
    }}>
      {/* Background image */}
      <img
        src="/hero-editorial.jpg"
        alt=""
        aria-hidden="true"
        loading="eager"
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          objectPosition: "center 40%",
          display: "block",
        }}
      />

      {/* Dark scrim for text readability */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.42) 60%, rgba(0,0,0,0.62) 100%)",
      }} />

      {/* Text content */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "0 32px",
      }}>

        {/* Eyebrow */}
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          style={{
            fontFamily: "'Inter', var(--font-inter), system-ui, sans-serif",
            fontSize: "10px", letterSpacing: "0.38em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.65)",
            marginBottom: "20px",
          }}
        >
          {he ? "תכשיטים יוקרתיים" : "Luxury Jewelry"}
        </motion.p>

        {/* Main headline */}
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.35, ease }}
          style={{
            fontFamily: "'Cormorant Garamond', var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(2.8rem, 7vw, 6rem)",
            fontWeight: 300, fontStyle: "italic",
            color: "#fff",
            lineHeight: 1.08,
            marginBottom: "12px",
            textWrap: "balance",
            maxWidth: "740px",
          }}
        >
          {he ? "עיצוב שמדבר" : "Design That Speaks"}
          <br />
          <em style={{ fontStyle: "normal", fontWeight: 600, letterSpacing: "0.06em", fontSize: "0.75em" }}>
            VIKOS
          </em>
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={reduce ? false : { scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55, ease }}
          style={{ width: "48px", height: "1px", background: "rgba(255,255,255,0.5)", margin: "24px auto" }}
        />

        {/* Sub-copy */}
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease }}
          style={{
            fontFamily: "'Inter', var(--font-inter), system-ui, sans-serif",
            fontSize: "13px", color: "rgba(255,255,255,0.72)",
            letterSpacing: "0.04em", lineHeight: 1.7,
            maxWidth: "380px", marginBottom: "36px",
          }}
        >
          {he ? "תכשיטים בעבודת יד · עיצוב סקנדינבי · ישראל" : "Handcrafted Jewelry · Scandinavian Design · Israel"}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.8, ease }}
          style={{ display: "flex", gap: "14px", flexWrap: "wrap", justifyContent: "center" }}
        >
          <Link href="/shop" style={{
            padding: "14px 36px",
            background: "#fff", color: "#111",
            fontFamily: "'Inter', var(--font-inter), system-ui, sans-serif",
            fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase",
            textDecoration: "none", fontWeight: 500,
            transition: "background 180ms ease-out, color 180ms ease-out, transform 100ms ease-out",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.88)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#fff"; }}
          >
            {he ? "לקולקציה" : "Shop Now"}
          </Link>
          <Link href="/custom" style={{
            padding: "14px 36px",
            background: "transparent", color: "#fff",
            border: "1px solid rgba(255,255,255,0.55)",
            fontFamily: "'Inter', var(--font-inter), system-ui, sans-serif",
            fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase",
            textDecoration: "none",
            transition: "border-color 180ms ease-out",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.9)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.55)"; }}
          >
            {he ? "הזמנה מותאמת" : "Custom Order"}
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      {!reduce && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          style={{
            position: "absolute", bottom: "32px", left: "50%",
            transform: "translateX(-50%)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
          }}
        >
          <span style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: "9px", letterSpacing: "0.28em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.45)",
          }}>
            {he ? "גלול" : "Scroll"}
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            style={{ width: "1px", height: "28px", background: "rgba(255,255,255,0.35)" }}
          />
        </motion.div>
      )}
    </section>
  );
}
