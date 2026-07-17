"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useT } from "@/lib/LanguageContext";

const T = {
  gold:  "#8B7355",
  black: "#111111",
  gray:  "#6B6B6B",
  warm:  "#F0F0EE",
  serif: "'Cormorant Garamond', Georgia, serif",
  sans:  "'Inter', system-ui, sans-serif",
};

const AUTO = 5000;

export default function ReviewsCarousel() {
  const t       = useT();
  const reviews = t.reviews.items;
  const reduce  = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = reviews.length;

  const go = useCallback((d: 1 | -1) => {
    setDir(d);
    setIdx(prev => (prev + d + total) % total);
  }, [total]);

  const reset = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => go(1), AUTO);
  };

  useEffect(() => {
    if (reduce) return;
    timer.current = setInterval(() => go(1), AUTO);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [go, reduce]);

  const variants = {
    enter:  (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
    center: { opacity: 1, x: 0 },
    exit:   (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
  };

  return (
    <section style={{ background: T.warm, padding: "96px 32px" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>

        {/* Stars */}
        <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginBottom: "40px" }}>
          {[1,2,3,4,5].map(s => (
            <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={T.gold}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          ))}
        </div>

        {/* Quote */}
        <div style={{ position: "relative", minHeight: "120px" }}>
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.div
              key={idx}
              custom={dir}
              variants={reduce ? {} : variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            >
              <p style={{
                fontFamily: T.serif,
                fontSize: "1.4rem",
                fontStyle: "italic",
                fontWeight: 400,
                color: T.black,
                lineHeight: 1.55,
                margin: "0 0 24px",
              }}>
                &ldquo;{reviews[idx].text}&rdquo;
              </p>
              <p style={{
                fontFamily: T.sans,
                fontSize: "10px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: T.gray,
                margin: "0 0 4px",
              }}>
                {reviews[idx].name}
              </p>
              <p style={{
                fontFamily: T.sans,
                fontSize: "9px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: T.gold,
                margin: 0,
              }}>
                {reviews[idx].product}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot nav */}
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "40px" }}>
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); reset(); }}
              style={{
                width: i === idx ? "22px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background: i === idx ? T.gold : "rgba(139,115,85,0.3)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "width 250ms ease-out, background 250ms ease-out",
              }}
            />
          ))}
        </div>

        {/* Prev / Next */}
        <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "24px" }}>
          {([-1, 1] as const).map((d) => (
            <button
              key={d}
              onClick={() => { go(d); reset(); }}
              className="review-nav-btn"
              style={{
                width: "40px", height: "40px", borderRadius: "50%",
                border: "1px solid rgba(139,115,85,0.3)",
                background: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.5" strokeLinecap="round">
                {d === 1 ? <polyline points="15 18 9 12 15 6"/> : <polyline points="9 18 15 12 9 6"/>}
              </svg>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .review-nav-btn {
          transition: border-color 150ms ease-out, background 150ms ease-out;
        }
        @media (hover: hover) and (pointer: fine) {
          .review-nav-btn:hover {
            border-color: #8B7355;
            background: rgba(139,115,85,0.06);
          }
        }
        .review-nav-btn:active { transform: scale(0.94); }
      `}</style>
    </section>
  );
}
