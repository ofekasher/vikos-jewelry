"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);

  const springX = useSpring(cursorX, { stiffness: 500, damping: 38, mass: 0.4 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 38, mass: 0.4 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const interactive = t.closest("a,button,[role=button],[data-cursor-hover]");
      setHovered(!!interactive);
    };
    const onDown = () => setClicked(true);
    const onUp   = () => setClicked(false);
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [cursorX, cursorY, visible]);

  /* hide on touch */
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  const size = clicked ? 20 : hovered ? 36 : 16;
  const borderWidth = hovered ? 1.5 : 1;

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        animate={{
          width: size,
          height: size,
          opacity: visible ? 1 : 0,
          borderWidth,
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        style={{
          borderRadius: "50%",
          borderStyle: "solid",
          borderColor: "#D4AF37",
          background: hovered ? "rgba(212,175,55,0.08)" : "transparent",
        }}
      />
    </motion.div>
  );
}
