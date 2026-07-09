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
          transition={{ duration: d(0.55), ease: "easeInOut" }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            overflow: "hidden",
            display: "flex", alignItems: "center", justifyContent: "center",
            /* Warm dark gradient — GPU-friendly, no image blur */
            background: "radial-gradient(ellipse at 50% 40%, #2a1a08 0%, #130d05 45%, #0a0602 100%)",
          }}
        >
          {/* Subtle gold glow behind arch */}
          <div style={{
            position: "absolute",
            width: "clamp(260px, 36vw, 420px)",
            height: "clamp(260px, 36vw, 420px)",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,149,50,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          {/* ── Arch + content ── */}
          <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>

            {/* Roman arch — semicircle top, open bottom */}
            <svg
              viewBox="0 0 220 400"
              style={{
                position: "absolute",
                width: "clamp(190px, 25vw, 290px)",
                height: "clamp(346px, 45vw, 527px)",
              }}
            >
              <motion.path
                d="M 10 395 L 10 195 A 100 100 0 0 1 210 195 L 210 395"
                fill="none"
                stroke="rgba(255,255,255,0.78)"
                strokeWidth="1.1"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: d(1.5), delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              />
            </svg>

            {/* Content */}
            <div style={{
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              padding: "clamp(26px, 4vw, 50px) clamp(18px, 3vw, 40px)",
            }}>

              {/* V monogram */}
              <div style={{ overflow: "hidden", marginBottom: "clamp(6px, 1vw, 10px)" }}>
                <motion.span
                  initial={{ transform: "translateY(100%)" }}
                  animate={{ transform: "translateY(0%)" }}
                  transition={{ duration: d(0.8), delay: 0.75, ease: [0.23, 1, 0.32, 1] }}
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "clamp(56px, 9.5vw, 104px)",
                    fontWeight: 300,
                    color: "#FAFAF8",
                    lineHeight: 0.85,
                    display: "block",
                  }}
                >
                  V
                </motion.span>
              </div>

              {/* VIKOS */}
              <div style={{ overflow: "hidden" }}>
                <motion.span
                  initial={{ transform: "translateY(100%)", opacity: 0 }}
                  animate={{ transform: "translateY(0%)", opacity: 1 }}
                  transition={{ duration: d(0.7), delay: 1.05, ease: [0.23, 1, 0.32, 1] }}
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "clamp(11px, 1.7vw, 17px)",
                    fontWeight: 500,
                    letterSpacing: "0.46em",
                    textTransform: "uppercase",
                    color: "#FAFAF8",
                    lineHeight: 1,
                    display: "block",
                    paddingRight: "0.46em",
                  }}
                >
                  VIKOS
                </motion.span>
              </div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.55 }}
                transition={{ duration: d(0.7), delay: 1.4, ease: "easeOut" }}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(6px, 0.85vw, 8px)",
                  letterSpacing: "0.38em",
                  textTransform: "uppercase",
                  color: "#fff",
                  margin: "clamp(8px, 1.2vw, 12px) 0 0",
                  paddingRight: "0.38em",
                }}
              >
                PREMIUM QUALITY
              </motion.p>

              {/* Leaf ornament */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: d(0.6), delay: 1.6, ease: "easeOut" }}
                style={{ marginTop: "clamp(16px, 2.6vw, 28px)" }}
              >
                <svg width="clamp(58px, 7.5vw, 86px)" height="16" viewBox="0 0 86 16" fill="none">
                  <path d="M41 8 C34 4, 24 3, 8 8"  stroke="rgba(255,255,255,0.65)" strokeWidth="0.85" fill="none" strokeLinecap="round"/>
                  <path d="M36 8 C32 6, 26 5, 18 6.5" stroke="rgba(255,255,255,0.38)" strokeWidth="0.7"  fill="none" strokeLinecap="round"/>
                  <path d="M45 8 C52 4, 62 3, 78 8"  stroke="rgba(255,255,255,0.65)" strokeWidth="0.85" fill="none" strokeLinecap="round"/>
                  <path d="M50 8 C54 6, 60 5, 68 6.5" stroke="rgba(255,255,255,0.38)" strokeWidth="0.7"  fill="none" strokeLinecap="round"/>
                  <rect x="41.5" y="6.5" width="3" height="3" fill="rgba(255,255,255,0.82)" transform="rotate(45 43 8)"/>
                </svg>
              </motion.div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
