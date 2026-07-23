"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const LETTERS = ["V", "I", "K", "O", "S"];

export default function SplashScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("vikos_splash")) return;
    sessionStorage.setItem("vikos_splash", "1");
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 3400);
    return () => clearTimeout(t);
  }, []);

  function dismiss() { setVisible(false); }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          onClick={dismiss}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#0c0a08",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "default",
            overflow: "hidden",
            userSelect: "none",
          }}
        >
          {/* Ambient warm glow — light under black velvet effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.4, delay: 0.2, ease: "easeOut" }}
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 68% 44% at 50% 50%, rgba(139,115,85,0.16) 0%, transparent 100%)",
              pointerEvents: "none",
            }}
          />

          {/* VIKOS — each letter materializes out of blur */}
          <div style={{ display: "flex", position: "relative", zIndex: 1 }}>
            {LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, filter: "blur(18px)", y: -10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.45 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(3rem, 12vw, 7.5rem)",
                  fontWeight: 300,
                  letterSpacing: "0.44em",
                  color: "#f0ece6",
                  lineHeight: 1,
                  display: "inline-block",
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Gold rule — expands from center outward */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 1.25, ease: [0.23, 1, 0.32, 1] }}
            style={{
              width: "clamp(180px, 28vw, 280px)",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent 0%, #8B7355 25%, #c6a97e 50%, #8B7355 75%, transparent 100%)",
              marginTop: "24px",
              transformOrigin: "center",
              position: "relative",
              zIndex: 1,
            }}
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 1.65, ease: "easeOut" }}
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: "9px",
              letterSpacing: "0.48em",
              textTransform: "uppercase",
              color: "#8B7355",
              marginTop: "18px",
              position: "relative",
              zIndex: 1,
            }}
          >
            תכשיטים מעוצבים
          </motion.p>

          {/* Skip */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 2.1, duration: 0.5 }}
            whileHover={{ opacity: 0.65 }}
            onClick={(e) => { e.stopPropagation(); dismiss(); }}
            aria-label="דלג על מבוא"
            style={{
              position: "absolute",
              bottom: "32px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: "9px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#ffffff",
              padding: "8px 24px",
            }}
          >
            דלג
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
