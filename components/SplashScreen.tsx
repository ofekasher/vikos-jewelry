"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const TOTAL = 3400;

type Particle = { x: number; y: number; r: number; vx: number; vy: number; alpha: number; life: number };

function mkParticle(large: boolean): Particle {
  return {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: large ? Math.random() * 2.2 + 1.6 : Math.random() * 0.9 + 0.2,
    vx: (Math.random() - 0.5) * (large ? 0.15 : 0.3),
    vy: -(Math.random() * (large ? 0.25 : 0.45) + (large ? 0.05 : 0.1)),
    alpha: large ? Math.random() * 0.22 + 0.06 : Math.random() * 0.4 + 0.1,
    life: Math.random(),
  };
}

/* ── Particles — mix of small + large for depth ── */
function GoldDust() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = [
      ...Array.from({ length: 55 }, () => mkParticle(false)),
      ...Array.from({ length: 8 },  () => mkParticle(true)),
    ];

    let raf: number;
    const draw = () => {
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.life += 0.004;
        if (p.y < -4 || p.life > 1) { p.x = Math.random() * w; p.y = h + 4; p.life = 0; }
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
    <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />
  );
}

const LETTERS = ["V", "I", "K", "O", "S"];

export default function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (sessionStorage.getItem("vikos_splash")) return;
    sessionStorage.setItem("vikos_splash", "1");
    setVisible(true);
    const t = setTimeout(() => setVisible(false), TOTAL);
    return () => clearTimeout(t);
  }, []);

  const dur = (n: number) => reduce ? 0.01 : n;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: dur(0.65), ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "#0A0806",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <GoldDust />

          {/* Warm radial glow — centered behind logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: dur(2.0), delay: 0.2, ease: "easeOut" }}
            style={{
              position: "absolute",
              width: "70vw", height: "70vw",
              maxWidth: "520px", maxHeight: "520px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 68%)",
              pointerEvents: "none",
            }}
          />

          {/* Center stack */}
          <div style={{
            position: "relative", zIndex: 2,
            display: "flex", flexDirection: "column",
            alignItems: "center",
          }}>

            {/* Single asymmetric line — draws from center leftward */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: dur(1.0), delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
              style={{
                width: "clamp(80px, 18vw, 160px)",
                height: "1px",
                background: "linear-gradient(to left, #C9A96E 0%, transparent 100%)",
                transformOrigin: "right",
                marginBottom: "clamp(28px, 5vw, 44px)",
                alignSelf: "center",
              }}
            />

            {/* VIKOS — letter stagger, no blur (GPU-safe) */}
            <div style={{
              display: "flex", alignItems: "baseline",
              gap: "0.04em", position: "relative",
              marginBottom: "clamp(28px, 5vw, 44px)",
            }}>
              {LETTERS.map((letter, i) => (
                <motion.span
                  key={letter + i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: dur(0.75),
                    delay: 0.7 + i * 0.065,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "clamp(64px, 13vw, 108px)",
                    fontWeight: 300,
                    letterSpacing: "0.28em",
                    color: "#FAFAF8",
                    lineHeight: 1,
                    display: "block",
                  }}
                >
                  {letter}
                </motion.span>
              ))}

              {/* Shine sweep — CSS transform string for GPU acceleration */}
              <motion.div
                initial={{ transform: "translateX(-140%)" }}
                animate={{ transform: "translateX(240%)" }}
                transition={{ duration: dur(1.0), delay: 1.7, ease: "easeInOut" }}
                style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.14) 50%, transparent 80%)",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Gold dot — scale from 0.5, not 0 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: dur(0.5), delay: 1.2, ease: [0.23, 1, 0.32, 1] }}
              style={{
                width: "4px", height: "4px",
                borderRadius: "50%",
                background: "#C9A96E",
                marginBottom: "clamp(20px, 3.5vw, 32px)",
              }}
            />

            {/* Tagline — English only, clean */}
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 0.55, y: 0 }}
              transition={{ duration: dur(0.9), delay: 1.5, ease: "easeOut" }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(7px, 1.6vw, 9px)",
                textTransform: "uppercase",
                letterSpacing: "0.42em",
                color: "#C9A96E",
                margin: 0,
              }}
            >
              HANDCRAFTED IN ISRAEL
            </motion.p>
          </div>

          {/* Progress line */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: "1px", background: "rgba(201,169,110,0.07)",
          }}>
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: (TOTAL - 600) / 1000, delay: 0.2, ease: "linear" }}
              style={{ height: "100%", background: "linear-gradient(to right, transparent, #C9A96E, transparent)" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
