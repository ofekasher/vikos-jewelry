"use client";
import { useState, useRef, useEffect, useCallback } from "react";

interface Props {
  images: string[];
  alt: string;
}

export default function ProductViewer360({ images, alt }: Props) {
  const frames = images.length;
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const startX = useRef(0);
  const lastFrame = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-rotate continuously until user interacts
  useEffect(() => {
    if (!autoRotate || frames < 2) return;
    autoRef.current = setInterval(() => {
      setCurrentFrame(f => (f + 1) % frames);
    }, 80);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [frames, autoRotate]);

  const stopAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    setAutoRotate(false);
    setHasInteracted(true);
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    stopAuto();
    setIsDragging(true);
    startX.current = e.clientX;
    lastFrame.current = currentFrame;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, [currentFrame, stopAuto]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = startX.current - e.clientX;
    const sensitivity = 60; // pixels per frame
    const frameDelta = Math.floor(delta / sensitivity);
    const next = ((lastFrame.current + frameDelta) % frames + frames) % frames;
    setCurrentFrame(next);
  }, [isDragging, frames]);

  const onPointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const percent = frames > 1 ? (currentFrame / (frames - 1)) * 100 : 0;

  return (
    <div style={{ position: "relative", background: "#fff", border: "1px solid #E8E8E8", userSelect: "none" }}>
      {/* Main image */}
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        style={{
          cursor: isDragging ? "grabbing" : "grab",
          aspectRatio: "1/1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px",
          overflow: "hidden",
          background: "#FAFAFA",
          position: "relative",
        }}
      >
        {images.map((src, i) => (
          <img
            key={src + i}
            src={src}
            alt={alt}
            draggable={false}
            style={{
              position: "absolute",
              width: "calc(100% - 64px)",
              height: "calc(100% - 64px)",
              objectFit: "contain",
              display: i === currentFrame ? "block" : "none",
              pointerEvents: "none",
            }}
          />
        ))}
      </div>

      {/* 360° badge */}
      <div style={{
        position: "absolute", top: "14px", left: "14px",
        background: "rgba(17,17,17,0.75)",
        borderRadius: "2px", padding: "4px 10px",
        display: "flex", alignItems: "center", gap: "5px",
      }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5">
          <path d="M21.5 12a9.5 9.5 0 1 1-19 0 9.5 9.5 0 0 1 19 0z"/>
          <path d="M12 8v4l2.5 2.5"/>
          <path d="M16 3.5 C 18 5 20 8 20 12" strokeLinecap="round"/>
          <path d="M20 12 L 22 10 M 20 12 L 18 10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"9px", letterSpacing:"0.18em", color:"#fff", textTransform:"uppercase" }}>
          360°
        </span>
      </div>

      {/* Hint / resume button */}
      {hasInteracted && (
        <button
          onClick={() => { setHasInteracted(false); setAutoRotate(false); setTimeout(() => setAutoRotate(true), 0); }}
          style={{
            position: "absolute", bottom: "54px", left: "50%", transform: "translateX(-50%)",
            background: "rgba(17,17,17,0.65)", borderRadius: "20px", padding: "5px 14px",
            display: "flex", alignItems: "center", gap: "6px",
            border: "none", cursor: "pointer",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round">
            <path d="M5 3l14 9-14 9V3z"/>
          </svg>
          <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"9px", color:"rgba(255,255,255,0.8)", letterSpacing:"0.12em" }}>
            המשך סיבוב
          </span>
        </button>
      )}

      {/* Frame progress bar */}
      {frames > 1 && (
        <div style={{ padding: "10px 20px 14px", background: "#fff", borderTop: "1px solid #F0F0F0" }}>
          <div style={{ position: "relative", height: "2px", background: "#E8E8E8", borderRadius: "1px" }}>
            <div style={{
              position: "absolute", top: 0, left: 0,
              width: `${percent}%`, height: "100%",
              background: "#C9A96E", borderRadius: "1px",
              transition: isDragging ? "none" : "width 0.12s ease",
            }} />
            {/* Frame dots */}
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => { stopAuto(); setCurrentFrame(i); }}
                style={{
                  position: "absolute", top: "50%",
                  left: `${(i / (frames - 1)) * 100}%`,
                  transform: "translate(-50%, -50%)",
                  width: i === currentFrame ? "8px" : "5px",
                  height: i === currentFrame ? "8px" : "5px",
                  borderRadius: "50%",
                  background: i === currentFrame ? "#C9A96E" : "#D0D0D0",
                  border: "none", cursor: "pointer", padding: 0,
                  transition: "all 0.2s",
                }}
              />
            ))}
          </div>
          <p style={{
            fontFamily:"'Inter',sans-serif", fontSize:"8px",
            letterSpacing:"0.18em", color:"#AAA",
            textTransform:"uppercase", textAlign:"center",
            marginTop:"8px",
          }}>
            {currentFrame + 1} / {frames} זוויות
          </p>
        </div>
      )}
    </div>
  );
}
