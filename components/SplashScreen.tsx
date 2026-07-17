"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("vikos_splash")) return;
    sessionStorage.setItem("vikos_splash", "1");
    setVisible(true);
    const t = setTimeout(dismiss, 2500);
    return () => clearTimeout(t);
  }, []);

  function dismiss() {
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "#000",
            overflow: "hidden",
          }}
        >
          {videoFailed ? (
            /* Fallback — logo on black */
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2rem, 8vw, 4rem)",
                fontWeight: 300, letterSpacing: "0.45em",
                textTransform: "uppercase", color: "#fff",
              }}>
                VIKOS
              </span>
            </div>
          ) : (
            <video
              ref={videoRef}
              src="/splash-intro.mp4"
              autoPlay
              muted
              playsInline
              onEnded={dismiss}
              onError={() => setVideoFailed(true)}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          )}

          {/* Skip button */}
          <button
            onClick={dismiss}
            aria-label="דלג על מבוא"
            style={{
              position: "absolute", bottom: "28px", left: "50%",
              transform: "translateX(-50%)",
              background: "none", border: "1px solid rgba(255,255,255,0.3)",
              color: "rgba(255,255,255,0.55)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase",
              cursor: "pointer", padding: "8px 20px",
              transition: "border-color 180ms ease, color 180ms ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
          >
            דלג
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
