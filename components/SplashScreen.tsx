"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const TOTAL = 3600;

export default function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();
  const d = (n: number) => reduce ? 0.01 : n;

  useEffect(() => {
    if (sessionStorage.getItem("vikos_splash")) return;
    sessionStorage.setItem("vikos_splash", "1");
    setVisible(true);
    const t = setTimeout(() => setVisible(false), TOTAL);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: d(0.7), ease: "easeInOut" }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            overflow: "hidden",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          {/* ── Background: blurred jewelry image → bokeh effect ── */}
          <img
            src="/hero-new.jpg"
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
              objectPosition: "60% 25%",
              filter: "blur(6px) saturate(1.3) brightness(0.85)",
              transform: "scale(1.08)", /* hide blur edges */
            }}
          />

          {/* Warm dark overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "rgba(10, 6, 2, 0.55)",
          }} />

          {/* Gold center radial glow — simulates bokeh warmth */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 50% 50%, rgba(200, 145, 50, 0.22) 0%, transparent 58%)",
          }} />

          {/* ── Arch + content — centered ── */}
          <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>

            {/*
              Roman arch SVG (like the Canva template):
              - Open at bottom (no floor bar)
              - Semicircular top, two straight vertical sides
              - viewBox 0 0 220 400
              - Arch inner width = 200px → radius = 100px
              - Straight section = ~195px
              - Path: bottom-left → up → semicircle over top → down to bottom-right
            */}
            <svg
              viewBox="0 0 220 400"
              style={{
                position: "absolute",
                width: "clamp(190px, 26vw, 300px)",
                height: "clamp(345px, 47vw, 545px)",
              }}
              overflow="visible"
            >
              <motion.path
                d="M 10 395 L 10 195 A 100 100 0 0 1 210 195 L 210 395"
                fill="none"
                stroke="rgba(255,255,255,0.80)"
                strokeWidth="1.2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: d(1.6), delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              />
            </svg>

            {/* Content inside arch */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "clamp(28px, 4vw, 52px) clamp(20px, 3.5vw, 44px)",
              gap: 0,
            }}>

              {/* Decorative "V" monogram — like the SD in the template */}
              <div style={{ overflow: "hidden", marginBottom: "clamp(8px, 1.4vw, 14px)" }}>
                <motion.span
                  initial={{ transform: "translateY(110%)" }}
                  animate={{ transform: "translateY(0%)" }}
                  transition={{ duration: d(0.85), delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "clamp(52px, 9vw, 100px)",
                    fontWeight: 300,
                    letterSpacing: "-0.02em",
                    color: "#FAFAF8",
                    lineHeight: 0.85,
                    display: "block",
                  }}
                >
                  V
                </motion.span>
              </div>

              {/* VIKOS brand name — smaller, spaced */}
              <div style={{ overflow: "hidden" }}>
                <motion.span
                  initial={{ transform: "translateY(110%)", opacity: 0 }}
                  animate={{ transform: "translateY(0%)", opacity: 1 }}
                  transition={{ duration: d(0.75), delay: 1.1, ease: [0.23, 1, 0.32, 1] }}
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "clamp(11px, 1.8vw, 18px)",
                    fontWeight: 500,
                    letterSpacing: "0.45em",
                    textTransform: "uppercase",
                    color: "#FAFAF8",
                    lineHeight: 1,
                    display: "block",
                    paddingRight: "0.45em",
                  }}
                >
                  VIKOS
                </motion.span>
              </div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.65 }}
                transition={{ duration: d(0.8), delay: 1.45, ease: "easeOut" }}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(6px, 0.9vw, 8px)",
                  fontWeight: 400,
                  letterSpacing: "0.38em",
                  textTransform: "uppercase",
                  color: "#fff",
                  margin: "clamp(8px, 1.2vw, 12px) 0 0",
                  paddingRight: "0.38em",
                }}
              >
                PREMIUM QUALITY
              </motion.p>

              {/* Leaf ornament — matching the Canva template style */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: d(0.8), delay: 1.65, ease: "easeOut" }}
                style={{ marginTop: "clamp(18px, 3vw, 30px)" }}
              >
                <svg width="clamp(60px, 8vw, 90px)" height="18" viewBox="0 0 90 18" fill="none">
                  {/* Left branch */}
                  <path d="M43 9 C36 5, 26 4, 10 9" stroke="rgba(255,255,255,0.7)" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
                  <path d="M38 9 C34 6, 28 5, 20 7" stroke="rgba(255,255,255,0.45)" strokeWidth="0.7" fill="none" strokeLinecap="round"/>
                  <path d="M33 9 C30 7, 26 6.5, 22 7.5" stroke="rgba(255,255,255,0.3)" strokeWidth="0.6" fill="none" strokeLinecap="round"/>
                  {/* Right branch */}
                  <path d="M47 9 C54 5, 64 4, 80 9" stroke="rgba(255,255,255,0.7)" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
                  <path d="M52 9 C56 6, 62 5, 70 7" stroke="rgba(255,255,255,0.45)" strokeWidth="0.7" fill="none" strokeLinecap="round"/>
                  <path d="M57 9 C60 7, 64 6.5, 68 7.5" stroke="rgba(255,255,255,0.3)" strokeWidth="0.6" fill="none" strokeLinecap="round"/>
                  {/* Center diamond */}
                  <rect x="43.5" y="7.5" width="3" height="3" fill="rgba(255,255,255,0.8)" transform="rotate(45 45 9)"/>
                </svg>
              </motion.div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
