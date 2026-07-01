"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import HeroVideo from "@/components/HeroVideo";
import ReviewsCarousel from "@/components/home/ReviewsCarousel";
import InstagramGallery from "@/components/home/InstagramGallery";
import { products } from "@/lib/products";
import { useStore } from "@/lib/store";

/* ── Design tokens ── */
const T = {
  gold:    "#C9A96E",
  black:   "#111111",
  gray:    "#6B6B6B",
  light:   "#AAAAAA",
  border:  "#E8E8E8",
  warm:    "#F9F7F4",
  serif:   "'Cormorant Garamond', Georgia, serif",
  sans:    "'Inter', system-ui, sans-serif",
};

/* ── Reusable section header ── */
function SectionHeader({ eyebrow, title, cta }: { eyebrow: string; title: string; cta?: { label: string; href: string } }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "32px" }}>
      <div>
        <p style={{ fontFamily: T.sans, fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: T.gold, marginBottom: "8px" }}>
          {eyebrow}
        </p>
        <h2 style={{ fontFamily: T.serif, fontSize: "clamp(1.5rem,2.8vw,2.2rem)", fontWeight: 400, color: T.black, lineHeight: 1.15, margin: 0 }}>
          {title}
        </h2>
      </div>
      {cta && (
        <Link href={cta.href} style={{
          fontFamily: T.sans, fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase",
          color: T.gray, textDecoration: "none", borderBottom: `1px solid ${T.border}`,
          paddingBottom: "2px", transition: "color 0.2s, border-color 0.2s", whiteSpace: "nowrap",
        }}
        onMouseEnter={e => { e.currentTarget.style.color = T.gold; e.currentTarget.style.borderBottomColor = T.gold; }}
        onMouseLeave={e => { e.currentTarget.style.color = T.gray; e.currentTarget.style.borderBottomColor = T.border; }}
        >
          {cta.label} →
        </Link>
      )}
    </div>
  );
}

const categories = [
  {
    label: "עגילים",
    sub: "אלגנטיות עדינה",
    href: "/shop?cat=earrings",
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=85",
      "https://images.unsplash.com/photo-1573408301185-9519f94816b4?w=500&q=85",
    ],
  },
  {
    label: "טבעות",
    sub: "סמל נצחי",
    href: "/shop?cat=rings",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&q=85",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=500&q=85",
    ],
  },
  {
    label: "צמידים",
    sub: "יוקרה על הפרק",
    href: "/shop?cat=bracelets",
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=85",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=500&q=85",
    ],
  },
];

export default function HomePage() {
  const { addToCart } = useStore();
  const newest = products.slice(0, 3);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }} dir="rtl">
      <Navbar />
      <CartDrawer />

      {/* ══════════════════════════════════════
          HERO — video crossfade
      ══════════════════════════════════════ */}
      <HeroVideo />

      {/* ══════════════════════════════════════
          NEWEST COLLECTION
      ══════════════════════════════════════ */}
      <section style={{ maxWidth: "1160px", margin: "0 auto", padding: "72px 32px 0" }}>
        <SectionHeader
          eyebrow="טרי מהסדנה"
          title="הקולקציה החדשה ביותר"
          cta={{ label: "ראה הכל", href: "/shop" }}
        />

        <div className="newest-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }}>
          {newest.map((p, i) => (
            <motion.div key={p.id}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <Link href={`/product/${p.id}`} style={{ textDecoration: "none", display: "block" }}>
                {/* Image */}
                <div style={{ position: "relative", overflow: "hidden", background: T.warm, marginBottom: "14px" }}>
                  <img src={p.image} alt={p.nameHe} loading={i === 0 ? "eager" : "lazy"}
                    style={{
                      width: "100%", aspectRatio: "1/1", objectFit: "cover", display: "block",
                      transition: "transform 0.6s ease",
                      transform: hovered === p.id ? "scale(1.06)" : "scale(1)",
                    }}
                  />
                  {/* Quick add */}
                  <button
                    onClick={e => { e.preventDefault(); e.stopPropagation(); addToCart(p); toast.success(`${p.nameHe} נוסף לסל`, { duration: 2000 }); }}
                    style={{
                      position: "absolute", bottom: 0, left: 0, right: 0,
                      background: "rgba(17,17,17,0.88)",
                      border: "none", cursor: "pointer", padding: "13px",
                      fontFamily: T.sans, fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase",
                      color: "#fff",
                      transform: hovered === p.id ? "translateY(0)" : "translateY(100%)",
                      transition: "transform 0.28s ease",
                    }}
                  >
                    הוסף לסל
                  </button>
                  {/* Badge */}
                  {p.isNew && (
                    <span style={{
                      position: "absolute", top: "12px", right: "12px",
                      background: T.black, color: "#fff",
                      fontFamily: T.sans, fontSize: "8px", letterSpacing: "0.15em", textTransform: "uppercase",
                      padding: "3px 8px",
                    }}>חדש</span>
                  )}
                </div>

                {/* Product info */}
                <p style={{ fontFamily: T.sans, fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: T.light, marginBottom: "5px" }}>
                  {p.material.split("|")[0].trim()}
                </p>
                <p style={{ fontFamily: T.serif, fontSize: "1.05rem", fontWeight: 400, color: T.black, marginBottom: "5px", lineHeight: 1.3 }}>
                  {p.nameHe}
                </p>
                <p style={{ fontFamily: T.sans, fontSize: "13px", color: T.gold, fontWeight: 500, letterSpacing: "0.03em" }}>
                  ₪{p.price.toLocaleString()}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          THIN DIVIDER
      ══════════════════════════════════════ */}
      <div style={{ maxWidth: "1160px", margin: "64px auto 0", padding: "0 32px" }}>
        <div style={{ height: "1px", background: T.border }} />
      </div>

      {/* ══════════════════════════════════════
          SHOP BY CATEGORY
      ══════════════════════════════════════ */}
      <section style={{ maxWidth: "1160px", margin: "0 auto", padding: "64px 32px 0" }}>
        <SectionHeader eyebrow="לפי סגנון" title="קנה לפי קטגוריה" />

        <div className="category-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" }}>
          {categories.map((cat, i) => (
            <motion.div key={cat.label}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Link href={cat.href} style={{ textDecoration: "none", display: "block" }}
                onMouseEnter={e => { const img = e.currentTarget.querySelector("img") as HTMLImageElement; if (img) img.style.transform = "scale(1.05)"; }}
                onMouseLeave={e => { const img = e.currentTarget.querySelector("img") as HTMLImageElement; if (img) img.style.transform = "scale(1)"; }}
              >
                {/* Single image card */}
                <div style={{ aspectRatio: "3/4", overflow: "hidden", background: T.warm, marginBottom: "14px" }}>
                  <img src={cat.images[0]} alt={cat.label}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease", display: "block" }} />
                </div>
                <p style={{ fontFamily: T.sans, fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: T.light, marginBottom: "4px" }}>
                  {cat.sub}
                </p>
                <p style={{ fontFamily: T.serif, fontSize: "1.1rem", fontWeight: 400, color: T.black }}>
                  {cat.label}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          BRAND STORY
      ══════════════════════════════════════ */}
      <section style={{ background: T.warm, padding: "80px 32px" }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center" }}
          className="brand-story-grid">
          {/* Video */}
          <div style={{ overflow: "hidden", borderRadius: "2px", background: "#1a1a1a" }}>
            <video
              src="/videos/brand-story.mp4"
              autoPlay
              muted
              loop
              playsInline
              style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", display: "block" }}
            />
          </div>

          {/* Text */}
          <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            <p style={{ fontFamily: T.sans, fontSize: "9px", letterSpacing: "0.38em", textTransform: "uppercase", color: T.gold }}>
              הסיפור שלנו
            </p>
            <h2 style={{ fontFamily: T.serif, fontSize: "clamp(1.8rem, 2.8vw, 2.8rem)", fontWeight: 300, color: T.black, lineHeight: 1.15, margin: 0 }}>
              מידה אחת<br />
              <em style={{ fontStyle: "italic", fontWeight: 400 }}>מתאימה לכולן</em>
            </h2>
            <div style={{ width: "40px", height: "1px", background: T.gold }} />
            <p style={{ fontFamily: T.sans, fontSize: "13px", color: T.gray, lineHeight: 1.9, fontWeight: 300, maxWidth: "380px" }}>
              הטבעות שלנו מעוצבות להתאים בדיוק — ניתנות לכיוון, ללא צורך בידיעת המידה מראש. כי היופי האמיתי הוא זה שמרגיש כמו שנתפר עבורך.
            </p>
            <Link href="/shop" style={{
              display: "inline-block", alignSelf: "flex-start", marginTop: "4px",
              padding: "13px 32px",
              background: T.gold, color: "#fff",
              fontFamily: T.sans, fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase",
              textDecoration: "none", transition: "background 0.25s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#b8924f")}
            onMouseLeave={e => (e.currentTarget.style.background = T.gold)}
            >
              לחנות →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          REVIEWS CAROUSEL
      ══════════════════════════════════════ */}
      <ReviewsCarousel />

      {/* ══════════════════════════════════════
          INSTAGRAM GALLERY
      ══════════════════════════════════════ */}
      <InstagramGallery />

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .brand-story-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .newest-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 14px !important;
          }
          .category-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 14px !important;
          }
        }
        @media (max-width: 480px) {
          .newest-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}
