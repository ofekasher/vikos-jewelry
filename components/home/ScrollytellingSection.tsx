"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useLang } from "@/lib/LanguageContext";

export default function ScrollytellingSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { lang } = useLang();
  const he = lang !== "en";

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 0.6], [1.18, 1.0]);
  const textY = useTransform(scrollYProgress, [0.1, 0.45], ["52px", "0px"]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.42], [0, 1]);
  const ruleScaleX = useTransform(scrollYProgress, [0.3, 0.55], [0, 1]);

  const stats = he
    ? [
        { num: "500+", label: "תכשיטים" },
        { num: "1,200+", label: "לקוחות מרוצים" },
        { num: "12", label: "שנות ניסיון" },
      ]
    : [
        { num: "500+", label: "Pieces" },
        { num: "1,200+", label: "Happy Clients" },
        { num: "12", label: "Years of Craft" },
      ];

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        height: "100dvh",
        overflow: "hidden",
        background: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Parallax background — zooms out as section enters view */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          inset: "-12%",
          scale: reduce ? 1 : bgScale,
        }}
      >
        <img
          src="/cat-rings.jpg"
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 35%",
          }}
        />
      </motion.div>

      {/* Dark scrim */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.68) 55%, rgba(0,0,0,0.88) 100%)",
        }}
      />

      {/* Content block */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "0 32px",
          maxWidth: "680px",
          width: "100%",
          y: reduce ? 0 : textY,
          opacity: reduce ? 1 : textOpacity,
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontFamily: "var(--font-inter), 'Plus Jakarta Sans', system-ui, sans-serif",
            fontSize: "10px",
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            color: "#C9A96E",
            marginBottom: "20px",
          }}
        >
          {he ? "הקולקציה שלנו" : "Our Collection"}
        </p>

        {/* Headline */}
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "#ffffff",
            lineHeight: 1.1,
            textWrap: "balance",
            margin: 0,
          }}
        >
          {he
            ? "כל תכשיט מספר סיפור שנולד ברגע"
            : "Every Piece Tells a Story Born in a Moment"}
        </h2>

        {/* Gold rule — expands left→right on scroll */}
        <motion.div
          style={{
            width: "56px",
            height: "1px",
            background: "#C9A96E",
            margin: "28px 0",
            scaleX: reduce ? 1 : ruleScaleX,
            transformOrigin: "center",
          }}
        />

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: "clamp(20px, 6vw, 64px)",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {stats.map(({ num, label }, i) => (
            <motion.div
              key={label}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.5,
                delay: 0.1 + i * 0.1,
                ease: [0.23, 1, 0.32, 1],
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span
                style={{
                  fontFamily:
                    "'Cormorant Garamond', var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 300,
                  color: "#C9A96E",
                  lineHeight: 1,
                }}
              >
                {num}
              </span>
              <span
                style={{
                  fontFamily:
                    "var(--font-inter), 'Plus Jakarta Sans', system-ui, sans-serif",
                  fontSize: "9px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.52)",
                }}
              >
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
