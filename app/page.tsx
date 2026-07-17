"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import HeroVideo from "@/components/HeroVideo";
import EditorialHero from "@/components/home/EditorialHero";
import BrandMarquee from "@/components/home/BrandMarquee";
import LookbookSection from "@/components/home/LookbookSection";
import CategoryAccordion from "@/components/home/CategoryAccordion";
import ReviewsCarousel from "@/components/home/ReviewsCarousel";
import InstagramGallery from "@/components/home/InstagramGallery";
import type { Product } from "@/lib/products";
import { useStore } from "@/lib/store";
import { useT, useLang } from "@/lib/LanguageContext";

/* ── Design tokens ── */
const T = {
  gold:    "#8B7355",
  black:   "#111111",
  gray:    "#6B6B6B",
  light:   "#AAAAAA",
  border:  "#E8E8E8",
  warm:    "#F0F0EE",
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
        <Link href={cta.href} className="section-cta-link" style={{ whiteSpace: "nowrap" }}>
          {cta.label} →
        </Link>
      )}
    </div>
  );
}


export default function HomePage() {
  const { addToCart } = useStore();
  const t = useT();
  const { lang } = useLang();
  const h = t.home;
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetch("/api/products").then(r => r.json()).then(setAllProducts).catch(() => {});
  }, []);
  const newest = allProducts.slice(0, 3);

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <Navbar />
      <CartDrawer />

      {/* ══════════════════════════════════════
          HERO — video crossfade
      ══════════════════════════════════════ */}
      <HeroVideo />

      {/* ══════════════════════════════════════
          EDITORIAL SPLIT — breaks layout repetition
      ══════════════════════════════════════ */}
      <EditorialHero />

      {/* ══════════════════════════════════════
          BRAND MARQUEE
      ══════════════════════════════════════ */}
      <BrandMarquee />

      {/* ══════════════════════════════════════
          NEWEST COLLECTION
      ══════════════════════════════════════ */}
      <section style={{ maxWidth: "1160px", margin: "0 auto", padding: "72px 32px 0" }}>
        <SectionHeader
          eyebrow={h.freshEyebrow}
          title={h.freshTitle}
          cta={{ label: h.freshCta, href: "/shop" }}
        />

        <div className="newest-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }}>
          {newest.map((p, i) => (
            <motion.div key={p.id}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.28, delay: i * 0.07, ease: [0.23, 1, 0.32, 1] }}
              className="newest-product-card"
            >
              <Link href={`/product/${p.id}`} style={{ textDecoration: "none", display: "block" }}>
                {/* Image */}
                <div style={{ position: "relative", overflow: "hidden", background: T.warm, marginBottom: "14px", aspectRatio: "1/1" }}>
                  <Image src={p.image} alt={lang === "en" ? p.nameEn : p.nameHe}
                    fill sizes="(max-width: 768px) 50vw, 33vw"
                    loading={i === 0 ? "eager" : "lazy"}
                    style={{ objectFit: "cover" }}
                    className="newest-product-img"
                  />
                  {/* Quick add */}
                  <button
                    onClick={e => { e.preventDefault(); e.stopPropagation(); addToCart(p); toast.success(t.product.addedToCart(p.nameHe), { duration: 2000 }); }}
                    className="newest-quick-add"
                    style={{
                      position: "absolute", bottom: 0, left: 0, right: 0,
                      background: "rgba(17,17,17,0.88)",
                      border: "none", cursor: "pointer", padding: "13px",
                      fontFamily: T.sans, fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase",
                      color: "#fff",
                    }}
                  >
                    {h.quickAdd}
                  </button>
                  {/* Badge */}
                  {p.isNew && (
                    <span style={{
                      position: "absolute", top: "12px", right: "12px",
                      background: T.black, color: "#fff",
                      fontFamily: T.sans, fontSize: "8px", letterSpacing: "0.15em", textTransform: "uppercase",
                      padding: "3px 8px",
                    }}>{h.new}</span>
                  )}
                </div>

                {/* Product info */}
                <p style={{ fontFamily: T.sans, fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: T.light, marginBottom: "5px" }}>
                  {p.material.split("|")[0].trim()}
                </p>
                <p style={{ fontFamily: T.serif, fontSize: "1.05rem", fontWeight: 400, color: T.black, marginBottom: "5px", lineHeight: 1.3 }}>
                  {lang === "en" ? p.nameEn : p.nameHe}
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
          SHOP BY CATEGORY — accordion slider
      ══════════════════════════════════════ */}
      <CategoryAccordion />

      {/* ══════════════════════════════════════
          BRAND STORY
      ══════════════════════════════════════ */}
      <section style={{ background: "#F0F0EE", padding: "80px 32px" }}>
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
              poster="/hero-editorial.jpg"
              style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", display: "block" }}
            />
          </div>

          {/* Text */}
          <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            <p style={{ fontFamily: T.sans, fontSize: "9px", letterSpacing: "0.38em", textTransform: "uppercase", color: T.gold }}>
              {h.storyEyebrow}
            </p>
            <h2 style={{ fontFamily: T.serif, fontSize: "clamp(1.8rem, 2.8vw, 2.8rem)", fontWeight: 300, color: T.black, lineHeight: 1.15, margin: 0 }}>
              {h.storyTitle}<br />
              <em style={{ fontStyle: "italic", fontWeight: 400 }}>{h.storyTitleEm}</em>
            </h2>
            <div style={{ width: "40px", height: "1px", background: T.gold }} />
            <p style={{ fontFamily: T.sans, fontSize: "13px", color: T.gray, lineHeight: 1.9, fontWeight: 300, maxWidth: "380px" }}>
              {h.storyBody}
            </p>
            <Link href="/shop" className="brand-cta-btn">
              {h.storyCta} →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          LOOKBOOK — editorial full-bleed
      ══════════════════════════════════════ */}
      <LookbookSection />

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
        }
        @media (max-width: 480px) {
          .newest-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        /* Section CTA link */
        .section-cta-link {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #6B6B6B;
          text-decoration: none;
          border-bottom: 1px solid #E8E8E8;
          padding-bottom: 2px;
          transition: color 180ms ease-out, border-color 180ms ease-out;
        }
        @media (hover: hover) and (pointer: fine) {
          .section-cta-link:hover { color: #8B7355; border-bottom-color: #8B7355; }
        }

        /* Category card image hover */
        .category-card-img {
          transition: transform 400ms ease-out;
        }
        @media (hover: hover) and (pointer: fine) {
          .category-card-link:hover .category-card-img { transform: scale(1.05); }
        }

        /* Newest grid — CSS hover (no JS re-render) */
        .newest-product-img { transition: transform 0.6s ease; }
        @media (hover: hover) and (pointer: fine) {
          .newest-product-card:hover .newest-product-img { transform: scale(1.06); }
          .newest-quick-add { transform: translateY(100%); transition: transform 0.28s ease; }
          .newest-product-card:hover .newest-quick-add { transform: translateY(0); }
        }
        .newest-quick-add { transform: translateY(0); transition: transform 0.28s ease; }

        /* Brand story CTA */
        .brand-cta-btn {
          display: inline-block;
          align-self: flex-start;
          margin-top: 4px;
          padding: 13px 32px;
          background: #8B7355;
          color: #fff;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          text-decoration: none;
          transition: background 180ms ease-out;
        }
        @media (hover: hover) and (pointer: fine) {
          .brand-cta-btn:hover { background: #b8924f; }
        }
        .brand-cta-btn:active { transform: scale(0.97); }
      `}</style>
    </div>
  );
}
