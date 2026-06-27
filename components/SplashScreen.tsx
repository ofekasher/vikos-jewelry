"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL = 4800; // ms visible before fade

/* ── Gold particle canvas ── */
function GoldDust() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 90;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(Math.random() * 0.5 + 0.1),
      alpha: Math.random() * 0.6 + 0.15,
      life: Math.random(),
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life += 0.004;
        if (p.y < -4 || p.life > 1) {
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + 4;
          p.life = 0;
        }
        const pulse = Math.sin(p.life * Math.PI);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,169,110,${p.alpha * pulse})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}

export default function SplashScreen() {
  const [visible, setVisible] = useState(false);

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
          transition={{ duration: 1.1, ease: "easeInOut" }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "#060504",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Particles */}
          <GoldDust />

          {/* Radial glow behind logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
            style={{
              position: "absolute",
              width: "520px", height: "520px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(201,169,110,0.13) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Center stack */}
          <div style={{
            position: "relative", zIndex: 2,
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: "28px",
          }}>

            {/* Horizontal lines that draw in */}
            <div style={{ display: "flex", alignItems: "center", gap: "18px", width: "340px", justifyContent: "center" }}>
              <motion.div
                initial={{ scaleX: 0, originX: 1 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.1, delay: 0.7, ease: "easeOut" }}
                style={{ flex: 1, height: "1px", background: "linear-gradient(to left, #C9A96E, transparent)", transformOrigin: "right" }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#C9A96E", flexShrink: 0 }}
              />
              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.1, delay: 0.7, ease: "easeOut" }}
                style={{ flex: 1, height: "1px", background: "linear-gradient(to right, #C9A96E, transparent)", transformOrigin: "left" }}
              />
            </div>

            {/* Logo with shine sweep */}
            <div style={{ position: "relative", overflow: "hidden" }}>
              <motion.img
                src="/logo.png"
                alt="VIKOS Jewelry"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.9, ease: "easeOut" }}
                style={{
                  height: "clamp(70px, 10vw, 120px)",
                  objectFit: "contain",
                  display: "block",
                  filter: "invert(1)",
                }}
              />
              {/* Shine sweep over logo */}
              <motion.div
                initial={{ x: "-120%" }}
                animate={{ x: "200%" }}
                transition={{ duration: 1.0, delay: 1.6, ease: "easeInOut" }}
                style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.45) 50%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Bottom lines */}
            <div style={{ display: "flex", alignItems: "center", gap: "18px", width: "340px", justifyContent: "center" }}>
              <motion.div
                initial={{ scaleX: 0, originX: 1 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.1, delay: 0.7, ease: "easeOut" }}
                style={{ flex: 1, height: "1px", background: "linear-gradient(to left, #C9A96E, transparent)", transformOrigin: "right" }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#C9A96E", flexShrink: 0 }}
              />
              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.1, delay: 0.7, ease: "easeOut" }}
                style={{ flex: 1, height: "1px", background: "linear-gradient(to right, #C9A96E, transparent)", transformOrigin: "left" }}
              />
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={{ opacity: 0.65, letterSpacing: "0.38em" }}
              transition={{ duration: 1.4, delay: 1.8, ease: "easeOut" }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "9px",
                textTransform: "uppercase",
                color: "#C9A96E",
                margin: 0,
              }}
            >
              VIKOS JEWELRY · עבודת יד ישראלית
            </motion.p>
          </div>

          {/* Bottom progress line */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: "2px", background: "rgba(201,169,110,0.1)",
          }}>
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: (TOTAL - 600) / 1000, delay: 0.3, ease: "linear" }}
              style={{ height: "100%", background: "linear-gradient(to right, transparent, #C9A96E, transparent)" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
