"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useT } from "@/lib/LanguageContext";

const VIDEOS = [
  { src: "/videos/ring.mp4",     poster: "/posters/ring-poster.jpg" },
  { src: "/videos/necklace.mp4", poster: "/posters/necklace-poster.jpg" },
];

const INTERVAL = 6000;

export default function HeroVideo() {
  const h = useT().hero;
  const [active, setActive] = useState(0);
  const [prev, setPrev]     = useState<number | null>(null);
  const refs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)];

  const switchTo = useCallback((idx: number) => {
    if (idx === active) return;
    setPrev(active);
    setActive(idx);
  }, [active]);

  useEffect(() => {
    const id = setInterval(() => {
      switchTo((active + 1) % VIDEOS.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [active, switchTo]);

  useEffect(() => {
    refs[active].current?.play().catch(() => {});
    if (prev !== null) {
      const v = refs[prev].current;
      if (v) { v.pause(); v.currentTime = 0; }
    }
  }, [active, prev]); // eslint-disable-line

  return (
    <section style={{ position: "relative", width: "100%", height: "100dvh", minHeight: "560px", overflow: "hidden" }}>

      {/* ── Video layers ── */}
      {VIDEOS.map((v, i) => (
        <motion.video
          key={v.src}
          ref={refs[i]}
          src={v.src}
          autoPlay={i === 0}
          muted
          loop
          playsInline
          preload={i === 0 ? "auto" : "none"}
          poster={v.poster}
          animate={{ opacity: i === active ? 1 : 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* ── Dark overlay ── */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.15) 100%)",
        pointerEvents: "none",
      }} />

      {/* ── Corner vignette ── */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 30% 20% at 100% 100%, rgba(0,0,0,0.92) 0%, transparent 100%)",
        pointerEvents: "none",
        zIndex: 1,
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

        {/* Animated headline */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={active}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6 }}
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.6rem,7vw,5.5rem)", fontWeight: 300, color: "#fff", lineHeight: 1.05, marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.06em" }}
          >
            {h.titles[active][0]}<br />
            <em style={{ fontStyle: "italic", fontWeight: 400 }}>{h.titles[active][1]}</em>
          </motion.h1>
        </AnimatePresence>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: "44px", fontWeight: 300 }}
        >
          {h.body}
        </motion.p>

        {/* Single CTA → /shop */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
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

      {/* ── Dot indicators ── */}
      <div style={{
        position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "12px",
        zIndex: 2,
      }}>
        <div style={{ display: "flex", gap: "10px" }}>
          {VIDEOS.map((_, i) => (
            <button
              key={i}
              onClick={() => switchTo(i)}
              aria-label={`Video ${i + 1}`}
              style={{
                width: i === active ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: i === active ? "#C9A96E" : "rgba(255,255,255,0.4)",
                border: "none", cursor: "pointer", padding: 0,
                transition: "all 0.35s ease",
              }}
            />
          ))}
        </div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          style={{ width: "1px", height: "32px", background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)" }}
        />
      </div>
    </section>
  );
}
