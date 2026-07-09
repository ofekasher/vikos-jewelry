"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const TOTAL = 3400;

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
          transition={{ duration: d(0.6), ease: "easeInOut" }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            overflow: "hidden",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          {/* ── Background: hero jewelry image ── */}
          <img
            src="/hero-new.jpg"
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
              objectPosition: "60% 20%",
            }}
          />

          {/* Dark warm overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "rgba(6, 4, 2, 0.68)",
          }} />

          {/* Warm golden center glow */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 50% 48%, rgba(180,130,55,0.18) 0%, transparent 60%)",
          }} />

          {/* ── Arch + content ── */}
          <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>

            {/* Gothic arch SVG — draws itself in */}
            <svg
              viewBox="0 0 220 390"
              style={{
                position: "absolute",
                width: "clamp(180px, 24vw, 280px)",
                height: "clamp(260px, 35vw, 400px)",
              }}
            >
              <motion.path
                d="M 10 382 L 10 162 A 100 135 0 0 1 110 8 A 100 135 0 0 1 210 162 L 210 382"
                fill="none"
                stroke="rgba(255,255,255,0.72)"
                strokeWidth="1"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: d(1.5), delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
              />
            </svg>

            {/* Content inside arch */}
            <div style={{
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              padding: "clamp(20px, 4vw, 44px) clamp(16px, 3vw, 36px)",
              gap: 0,
            }}>

              {/* VIKOS — clip-path reveal (slides up into view) */}
              <div style={{ overflow: "hidden" }}>
                <motion.span
                  initial={{ transform: "translateY(100%)", opacity: 0 }}
                  animate={{ transform: "translateY(0%)", opacity: 1 }}
                  transition={{ duration: d(0.9), delay: 0.85, ease: [0.23, 1, 0.32, 1] }}
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "clamp(30px, 5.5vw, 56px)",
                    fontWeight: 300,
                    letterSpacing: "0.34em",
                    color: "#FAFAF8",
                    lineHeight: 1,
                    display: "block",
                    paddingRight: "0.34em",
                  }}
                >
                  VIKOS
                </motion.span>
              </div>

              {/* Gold divider line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: d(0.65), delay: 1.45, ease: [0.23, 1, 0.32, 1] }}
                style={{
                  width: "clamp(28px, 3.5vw, 44px)",
                  height: "1px",
                  background: "#C9A96E",
                  margin: "clamp(14px, 2.2vw, 20px) 0",
                  transformOrigin: "center",
                }}
              />

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.65 }}
                transition={{ duration: d(0.8), delay: 1.6, ease: "easeOut" }}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(6px, 1vw, 8px)",
                  fontWeight: 400,
                  letterSpacing: "0.48em",
                  textTransform: "uppercase",
                  color: "#fff",
                  margin: 0,
                  paddingRight: "0.48em",
                }}
              >
                HANDCRAFTED IN ISRAEL
              </motion.p>

              {/* Decorative leaf ornament — like the Canva design */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: d(0.8), delay: 1.8, ease: "easeOut" }}
                style={{ marginTop: "clamp(16px, 2.8vw, 26px)" }}
              >
                <svg width="clamp(52px, 7vw, 72px)" height="14" viewBox="0 0 72 14" fill="none">
                  {/* Left branch */}
                  <path d="M34 7 C28 3, 20 2, 8 7" stroke="rgba(201,169,110,0.65)" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
                  <path d="M28 7 C26 4, 22 3, 16 5" stroke="rgba(201,169,110,0.45)" strokeWidth="0.7" fill="none" strokeLinecap="round"/>
                  {/* Right branch */}
                  <path d="M38 7 C44 3, 52 2, 64 7" stroke="rgba(201,169,110,0.65)" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
                  <path d="M44 7 C46 4, 50 3, 56 5" stroke="rgba(201,169,110,0.45)" strokeWidth="0.7" fill="none" strokeLinecap="round"/>
                  {/* Center dot */}
                  <circle cx="36" cy="7" r="1.8" fill="rgba(201,169,110,0.75)"/>
                </svg>
              </motion.div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
