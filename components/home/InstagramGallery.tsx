"use client";
import { useState } from "react";
import { motion } from "framer-motion";
function IgIcon({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill={color} stroke="none"/>
    </svg>
  );
}

const T = {
  gold:  "#C9A96E",
  black: "#111111",
  gray:  "#6B6B6B",
  warm:  "#FAFAF8",
  serif: "'Cormorant Garamond', Georgia, serif",
  sans:  "'Inter', system-ui, sans-serif",
};

/*
 * TODO: Replace with Elfsight widget when ready
 * 1. Go to elfsight.com → Instagram Feed widget
 * 2. Connect your @vikosjewelry Instagram account
 * 3. Copy the embed script tag (looks like: <script src="https://static.elfsight.com/platform/platform.js" ...></script>)
 * 4. Add the script to app/layout.tsx <head> section
 * 5. Replace the <PlaceholderGrid /> component below with:
 *    <div class="elfsight-app-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX" data-elfsight-app-lazy></div>
 * 6. Remove this file entirely
 */

// Lifestyle shots: jewelry worn on hands, neck, wrist, body — for social media feel
const IMAGES = [
  { id: 1, src: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=600&q=85", alt: "שרשרת על צוואר" },
  { id: 2, src: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=600&q=85", alt: "תליון יהלום" },
  { id: 3, src: "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=600&q=85", alt: "טבעת על אצבע" },
  { id: 4, src: "https://images.unsplash.com/photo-1540585268978-2d62e9fcf8e0?w=600&q=85", alt: "תכשיטי זהב" },
  { id: 5, src: "https://images.unsplash.com/photo-1549049950-48d5887197a4?w=600&q=85", alt: "עגילים על אישה" },
  { id: 6, src: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=85", alt: "צמיד זהב על יד" },
];

function GalleryItem({ img, delay }: { img: typeof IMAGES[0]; delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay }}
      style={{ position: "relative", overflow: "hidden", aspectRatio: "1/1", cursor: "pointer" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={img.src}
        alt={img.alt}
        loading="lazy"
        style={{
          width: "100%", height: "100%", objectFit: "cover", display: "block",
          transform: hovered ? "scale(1.06)" : "scale(1)",
          transition: "transform 0.55s ease",
        }}
      />

      {/* Gold overlay on hover */}
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(201,169,110,0.82)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}>
        <IgIcon size={24} color="#fff" />
        <span style={{
          fontFamily: T.sans, fontSize: "10px", letterSpacing: "0.24em",
          textTransform: "uppercase", color: "#fff", fontWeight: 400,
        }}>
          צפה
        </span>
      </div>
    </motion.div>
  );
}

export default function InstagramGallery() {
  return (
    <section style={{ background: T.warm, padding: "96px 32px" }}>
      <div style={{ maxWidth: "1160px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{ fontFamily: T.sans, fontSize: "9px", letterSpacing: "0.36em", textTransform: "uppercase", color: T.gold, marginBottom: "14px" }}>
            עקבו אחרינו
          </p>
          <h2 style={{ fontFamily: T.serif, fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 300, color: T.black, margin: "0 0 12px" }}>
            העיצובים שלנו
          </h2>
          <a
            href="https://instagram.com/vikosjewelry"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: T.sans, fontSize: "11px", letterSpacing: "0.1em",
              color: T.gold, textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: "6px",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            <IgIcon size={13} />
            @vikosjewelry
          </a>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "4px",
        }}
          className="insta-grid"
        >
          {IMAGES.map((img, i) => (
            <GalleryItem key={img.id} img={img} delay={i * 0.07} />
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "36px" }}>
          <a
            href="https://instagram.com/vikosjewelry"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "12px 32px",
              border: `1px solid ${T.gold}`, color: T.gold,
              fontFamily: T.sans, fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase",
              textDecoration: "none",
              transition: "background 0.25s, color 0.25s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T.gold; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = T.gold; }}
          >
            <IgIcon size={12} />
            עקבו ב-Instagram
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .insta-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
