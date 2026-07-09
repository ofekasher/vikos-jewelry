"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const TOTAL = 2800; // ms — shorter = more confident

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
          transition={{ duration: d(0.5), ease: "easeInOut" }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "#080706",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Top line — draws in from center outward */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: d(1.1), delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            style={{
              position: "absolute",
              top: "calc(50% - 72px)",
              left: "clamp(48px, 8vw, 120px)",
              right: "clamp(48px, 8vw, 120px)",
              height: "1px",
              background: "linear-gradient(to right, transparent 0%, rgba(201,169,110,0.35) 30%, rgba(201,169,110,0.35) 70%, transparent 100%)",
              transformOrigin: "center",
            }}
          />

          {/* VIKOS — revealed via clipPath, no stagger, single unit */}
          <div style={{ position: "relative", overflow: "hidden" }}>
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={{ clipPath: "inset(0% 0 0 0)" }}
              transition={{ duration: d(0.9), delay: 0.55, ease: [0.23, 1, 0.32, 1] }}
            >
              <span style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(52px, 11vw, 96px)",
                fontWeight: 300,
                letterSpacing: "0.36em",
                color: "#F5F3EF",
                lineHeight: 1,
                display: "block",
                paddingRight: "0.36em", /* compensate letter-spacing on last char */
              }}>
                VIKOS
              </span>
            </motion.div>
          </div>

          {/* Bottom line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: d(1.1), delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            style={{
              position: "absolute",
              top: "calc(50% + 72px)",
              left: "clamp(48px, 8vw, 120px)",
              right: "clamp(48px, 8vw, 120px)",
              height: "1px",
              background: "linear-gradient(to right, transparent 0%, rgba(201,169,110,0.35) 30%, rgba(201,169,110,0.35) 70%, transparent 100%)",
              transformOrigin: "center",
            }}
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            transition={{ duration: d(0.8), delay: 1.15, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: "calc(50% + 96px)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(7px, 1.4vw, 9px)",
              fontWeight: 400,
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              color: "#C9A96E",
              margin: 0,
              paddingRight: "0.5em",
            }}
          >
            HANDCRAFTED IN ISRAEL
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
