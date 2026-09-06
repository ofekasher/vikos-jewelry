"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { getMaterialEn } from "@/lib/products";
import type { Product } from "@/lib/products";
import { useStore } from "@/lib/store";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import { useT, useLang } from "@/lib/LanguageContext";

// ─── Constants ────────────────────────────────────────────────────────────────

const RING_SIZES = ["46", "48", "50", "52", "54", "56", "58"];
const T = {
  serif: "'Cormorant Garamond', Georgia, serif",
  sans: "'Inter', sans-serif",
  gold: "#8B7355",
  black: "#111",
  bg: "#fffdf9",
};

// Metal label → swatch color
const METAL_SWATCHES: Record<string, string> = {
  "זהב צהוב":  "#C9A96E",
  "yellow gold": "#C9A96E",
  "זהב ורוד":  "#C9917A",
  "rose gold":  "#C9917A",
  "זהב לבן":   "#D0CEC8",
  "white gold": "#D0CEC8",
  "כסף":       "#B8B8B8",
  "silver":    "#B8B8B8",
};

function getSwatchColor(material: string): string {
  const lower = material.toLowerCase();
  for (const [key, color] of Object.entries(METAL_SWATCHES)) {
    if (lower.includes(key.toLowerCase())) return color;
  }
  return "#C9A96E";
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Desktop thumbnail strip — 5 visible, +N overflow tile */
function ThumbnailStrip({
  images, active, onSelect, alt = "",
}: { images: string[]; active: number; onSelect: (i: number) => void; alt?: string }) {
  const MAX = 5;
  const visible = images.slice(0, MAX);
  const extra = images.length - MAX;

  return (
    <div style={{ display: "flex", gap: "6px", marginTop: "10px" }}>
      {visible.map((src, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`תמונה ${i + 1}`}
          style={{
            width: "64px", height: "64px", padding: 0, border: "none",
            outline: active === i ? `2px solid ${T.gold}` : "2px solid transparent",
            outlineOffset: "2px",
            background: "#fff", overflow: "hidden", flexShrink: 0,
            cursor: "pointer",
            transition: "outline-color 120ms ease-out",
            position: "relative",
          }}
        >
          <Image src={src} alt={alt ? `${alt} — תצוגה ${i + 1}` : ""} fill sizes="64px"
            style={{ objectFit: "contain", padding: "6px" }} />
        </button>
      ))}
      {extra > 0 && (
        <button
          onClick={() => onSelect(MAX)}
          style={{
            width: "64px", height: "64px", border: "none", outline: "2px solid transparent",
            background: "#F0EDEA", flexShrink: 0, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: T.sans, fontSize: "11px", color: "#888",
          }}
        >
          +{extra}
        </button>
      )}
    </div>
  );
}

/** Mobile swipeable carousel with dot indicators */
function MobileCarousel({ images, active, onSelect, alt = "" }: {
  images: string[]; active: number; onSelect: (i: number) => void; alt?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollTo = useCallback((i: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
    onSelect(i);
  }, [onSelect]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const handler = () => {
      const i = Math.round(el.scrollLeft / el.clientWidth);
      onSelect(i);
    };
    el.addEventListener("scrollend", handler, { passive: true });
    return () => el.removeEventListener("scrollend", handler);
  }, [onSelect]);

  return (
    <div>
      <div
        ref={trackRef}
        style={{
          display: "flex", overflowX: "scroll", scrollSnapType: "x mandatory",
          scrollbarWidth: "none", WebkitOverflowScrolling: "touch",
          aspectRatio: "1/1", background: "#fff",
        }}
      >
        {images.map((src, i) => (
          <div key={i} style={{ minWidth: "100%", scrollSnapAlign: "start", position: "relative", aspectRatio: "1/1" }}>
            <Image src={src} alt={alt ? `${alt} — תצוגה ${i + 1}` : ""} fill sizes="100vw"
              style={{ objectFit: "contain", padding: "8%" }} />
          </div>
        ))}
      </div>
      {/* Dots */}
      {images.length > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "10px" }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`תמונה ${i + 1}`}
              style={{
                width: active === i ? "18px" : "6px", height: "6px",
                borderRadius: "3px", border: "none", padding: 0, cursor: "pointer",
                background: active === i ? T.gold : "#D0C8BC",
                transition: "width 200ms ease-out, background 200ms ease-out",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/** Metal / variant selector */
function MetalSelector({
  variants, current, onSelect,
}: {
  variants: { id: string; label: string; color: string; images: string[] }[];
  current: string;
  onSelect: (id: string, images: string[]) => void;
}) {
  if (variants.length < 2) return null;

  return (
    <div style={{ marginBottom: "24px" }}>
      <p style={{
        fontFamily: T.sans, fontSize: "10px", letterSpacing: "0.22em",
        textTransform: "uppercase", color: "#AAA", marginBottom: "10px",
      }}>
        מתכת <span style={{ color: "#555", textTransform: "none", letterSpacing: 0 }}>
          · {variants.find(v => v.id === current)?.label ?? ""}
        </span>
      </p>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {variants.map(v => (
          <button
            key={v.id}
            onClick={() => onSelect(v.id, v.images)}
            onMouseEnter={() => {
              // Preload first image on hover
              if (v.images[0]) {
                const img = new window.Image();
                img.src = v.images[0];
              }
            }}
            title={v.label}
            aria-label={v.label}
            aria-pressed={current === v.id}
            style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: v.color, border: "none", cursor: "pointer", padding: 0,
              outline: current === v.id ? `2px solid ${T.gold}` : "2px solid transparent",
              outlineOffset: "3px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
              transition: "outline-color 120ms ease-out",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/** Size guide modal */
function SizeGuideModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 300,
        background: "rgba(0,0,0,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          background: "#fff", maxWidth: "460px", width: "100%",
          padding: "32px 28px", position: "relative",
        }}
      >
        <button
          onClick={onClose}
          aria-label="סגור"
          style={{
            position: "absolute", top: "16px", insetInlineEnd: "16px",
            background: "none", border: "none", cursor: "pointer", padding: "4px",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <h2 style={{ fontFamily: T.serif, fontSize: "1.6rem", fontWeight: 400, fontStyle: "italic", marginBottom: "20px", color: T.black }}>
          מדריך מידות טבעת
        </h2>

        <p style={{ fontFamily: T.sans, fontSize: "13px", color: "#555", lineHeight: 1.75, marginBottom: "16px" }}>
          מידת טבעת ישראלית מחושבת לפי היקף האצבע במילימטרים.
        </p>

        <div style={{ background: "#F9F8F6", padding: "16px", marginBottom: "20px" }}>
          <p style={{ fontFamily: T.sans, fontSize: "12px", fontWeight: 600, color: "#333", marginBottom: "8px" }}>
            כיצד למדוד בבית:
          </p>
          {[
            "חתכו רצועת נייר ברוחב ~0.5 ס\"מ.",
            "כרכו אותה סביב בסיס האצבע (לא צמוד מדי).",
            "סמנו את נקודת החפיפה ומדדו את האורך במ\"מ.",
            "זהו מספר המידה שלכם.",
          ].map((step, i) => (
            <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "6px" }}>
              <span style={{ fontFamily: T.sans, fontSize: "11px", color: T.gold, minWidth: "16px", fontWeight: 600 }}>{i + 1}.</span>
              <span style={{ fontFamily: T.sans, fontSize: "12px", color: "#555" }}>{step}</span>
            </div>
          ))}
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", fontFamily: T.sans }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #E8E8E4" }}>
              <th style={{ textAlign: "start", padding: "6px 8px", color: "#AAA", fontWeight: 400, letterSpacing: "0.1em" }}>מידה</th>
              <th style={{ textAlign: "start", padding: "6px 8px", color: "#AAA", fontWeight: 400, letterSpacing: "0.1em" }}>היקף (מ"מ)</th>
              <th style={{ textAlign: "start", padding: "6px 8px", color: "#AAA", fontWeight: 400, letterSpacing: "0.1em" }}>קוטר פנימי</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["46", "46", "14.6"],
              ["48", "48", "15.3"],
              ["50", "50", "15.9"],
              ["52", "52", "16.5"],
              ["54", "54", "17.2"],
              ["56", "56", "17.8"],
              ["58", "58", "18.5"],
            ].map(([size, circ, diam]) => (
              <tr key={size} style={{ borderBottom: "1px solid #F0EDE9" }}>
                <td style={{ padding: "7px 8px", color: "#333", fontWeight: 500 }}>{size}</td>
                <td style={{ padding: "7px 8px", color: "#555" }}>{circ} מ"מ</td>
                <td style={{ padding: "7px 8px", color: "#555" }}>{diam} ס"מ</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p style={{ fontFamily: T.sans, fontSize: "11px", color: "#AAA", marginTop: "14px" }}>
          לא בטוחים? צרו איתנו קשר בוואטסאפ ונעזור לכם.
        </p>
      </motion.div>
    </motion.div>
  );
}

/** Spec table shown inside פרטים tab */
function SpecTable({ product, lang }: { product: Product; lang: string }) {
  const rawMaterial = product.material.split("|")[0].trim();
  const materialDisplay = lang === "en" ? getMaterialEn(rawMaterial) : rawMaterial;

  // Extract karat from material string (e.g. "זהב צהוב 14K" → "14K")
  const karatMatch = product.material.match(/\d+[Kk]|\d+K|\b925\b/);
  const karat = karatMatch ? karatMatch[0].toUpperCase() : null;

  const rows: [string, string][] = [
    ["מתכת", materialDisplay],
    karat ? ["טוהר / קראט", karat] : null,
    product.category === "rings" ? ["טווח מידות", "46 – 58"] : null,
  ].filter(Boolean) as [string, string][];

  if (!rows.length) return null;

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "4px" }}>
      <tbody>
        {rows.map(([label, value]) => (
          <tr key={label} style={{ borderBottom: "1px solid #F0EDE9" }}>
            <td style={{
              fontFamily: T.sans, fontSize: "11px", color: "#AAA",
              padding: "9px 0", letterSpacing: "0.1em", textTransform: "uppercase",
              width: "40%",
            }}>{label}</td>
            <td style={{
              fontFamily: T.sans, fontSize: "13px", color: "#333",
              padding: "9px 0",
            }}>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** פרטים / חומרים tabs */
function ProductTabs({ product, lang, description }: {
  product: Product; lang: string; description: string;
}) {
  const [tab, setTab] = useState<"details" | "care">("details");

  const careText = lang === "en"
    ? "To maintain your jewelry's beauty: avoid contact with perfumes, lotions, and chemicals. Store in the provided pouch. Clean gently with a soft cloth."
    : "לשמירה על יופי התכשיט: הימנעו ממגע עם בשמים, קרמים וחומרים כימיים. אחסנו בשקית הנלווית. נקו בעדינות עם מטלית רכה.";

  return (
    <div style={{ marginTop: "28px", borderTop: "1px solid #EFEFEF" }}>
      {/* Tab row */}
      <div style={{ display: "flex", borderBottom: "1px solid #EFEFEF", marginBottom: "20px" }}>
        {(["details", "care"] as const).map(t => {
          const label = t === "details"
            ? (lang === "en" ? "Details" : "פרטים")
            : (lang === "en" ? "Materials & Care" : "חומרים ותחזוקה");
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                fontFamily: T.sans, fontSize: "10px", letterSpacing: "0.18em",
                textTransform: "uppercase", color: tab === t ? T.black : "#AAA",
                background: "none", border: "none", cursor: "pointer",
                padding: "12px 0", marginInlineEnd: "24px",
                borderBottom: tab === t ? `1.5px solid ${T.black}` : "1.5px solid transparent",
                transition: "color 160ms, border-color 160ms",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      {tab === "details" && (
        <div>
          {description && (
            <p style={{
              fontFamily: "'Frank Ruhl Libre', serif",
              fontSize: "14px", fontWeight: 300, color: "#555",
              lineHeight: 1.8, marginBottom: "16px",
            }}>
              {description}
            </p>
          )}
          <SpecTable product={product} lang={lang} />
        </div>
      )}

      {tab === "care" && (
        <p style={{
          fontFamily: "'Frank Ruhl Libre', serif",
          fontSize: "14px", fontWeight: 300, color: "#555",
          lineHeight: 1.8,
        }}>
          {careText}
        </p>
      )}
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function ProductPage({
  productId,
  staticProduct,
}: {
  productId: string;
  staticProduct: Product | null;
}) {
  const { addToCart } = useStore();
  const p_t = useT().product;
  const { lang } = useLang();

  const [product, setProduct]           = useState<Product | null>(staticProduct);
  const [liveProducts, setLiveProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetch("/api/products")
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.length) setLiveProducts(data); })
      .catch(() => {});
  }, []);
  const [notFoundState, setNotFoundState] = useState(false);
  const [adding, setAdding]             = useState(false);
  const [activeImg, setActiveImg]       = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeError, setSizeError]       = useState(false);
  const [lightbox, setLightbox]         = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // variant state: { id, images[] } for each metal
  const [variantProducts, setVariantProducts] = useState<
    { id: string; label: string; color: string; images: string[] }[]
  >([]);
  const [activeVariantId, setActiveVariantId] = useState<string>(productId);
  // gallery images controlled independently so swapping variant doesn't reload page
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  const mainBtnRef = useRef<HTMLButtonElement>(null);

  // ── Load product ─────────────────────────────────────────────────────────────
  useEffect(() => {
    function loadProduct() {
      fetch(`/api/admin/products/${productId}`)
        .then(r => r.ok ? r.json() : Promise.reject())
        .then(raw => {
          const p: Product = {
            id:            raw.id,
            nameHe:        raw.name_he  || raw.nameHe  || "",
            nameEn:        raw.name_en  || raw.nameEn  || "",
            descriptionHe: raw.description_he || raw.descriptionHe || "",
            descriptionEn: raw.description_en || raw.descriptionEn || "",
            price:         raw.price,
            category:      raw.category,
            image:         raw.image || raw.images?.[0] || "",
            hoverImage:    raw.hover_image ?? undefined,
            images:        raw.images ?? [],
            material:      raw.material || "",
            isNew:         raw.is_new ?? false,
            isBestseller:  raw.is_bestseller ?? false,
            inStock:       raw.in_stock ?? true,
            discount:      raw.discount ?? 0,
            variants:      raw.variants ?? undefined,
          };
          setProduct(p);

          // Build gallery
          const imgs = p.images.length > 0 ? p.images : [p.image].filter(Boolean);
          setGalleryImages(imgs);
          setActiveVariantId(p.id);

          // Load variant sibling products if variants array exists
          if (p.variants && p.variants.length > 1) {
            Promise.all(
              p.variants.map(vid =>
                fetch(`/api/admin/products/${vid}`)
                  .then(r => r.ok ? r.json() : null)
                  .catch(() => null)
              )
            ).then(results => {
              const loaded = results
                .filter(Boolean)
                .map(raw => {
                  const vImgs = raw.images?.length ? raw.images : [raw.image].filter(Boolean);
                  const mat = raw.material || "";
                  return {
                    id: raw.id,
                    label: (raw.name_he || raw.name_en || "").split(" ").slice(-2).join(" ") || mat,
                    color: getSwatchColor(mat),
                    images: vImgs,
                  };
                });
              setVariantProducts(loaded);
            });
          }
        })
        .catch(() => {
          if (!staticProduct) setNotFoundState(true);
        });
    }
    loadProduct();
    window.addEventListener("focus", loadProduct);
    return () => window.removeEventListener("focus", loadProduct);
  }, [productId]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Sticky CTA ───────────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const btn = mainBtnRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      setStickyVisible(rect.bottom < 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Keyboard gallery navigation ───────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  setActiveImg(i => Math.min(i + 1, galleryImages.length - 1));
      if (e.key === "ArrowRight") setActiveImg(i => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [galleryImages.length]);

  if (notFoundState) notFound();
  if (!product) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#AAA" }}>
      {lang === "en" ? "Loading..." : "טוען..."}
    </div>
  );

  const isRing = product.category === "rings";
  const displayName = lang === "en" ? product.nameEn : product.nameHe;
  const displayDescription = lang === "en" ? product.descriptionEn : product.descriptionHe;
  const rawMaterial = product.material.split("|")[0].trim();
  const materialDisplay = lang === "en" ? getMaterialEn(rawMaterial) : rawMaterial;
  const catLabel = p_t.catLabels[product.category as keyof typeof p_t.catLabels];

  const discountedPrice = product.discount
    ? Math.round(product.price * (1 - product.discount / 100))
    : null;

  // Related items come from the live catalog (Supabase) — never the static list
  const related = liveProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = async () => {
    if (isRing && !selectedSize) { setSizeError(true); return; }
    setSizeError(false);
    setAdding(true);
    addToCart(product);
    toast.success(p_t.addedToCart(displayName), {
      description: `₪${product.price.toLocaleString()}`,
      duration: 3000,
    });
    await new Promise(r => setTimeout(r, 600));
    setAdding(false);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) await navigator.share({ title: displayName, url: window.location.href });
      else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success(p_t.linkCopied, { duration: 2000 });
      }
    } catch {}
  };

  const handleVariantSelect = (id: string, images: string[]) => {
    setActiveVariantId(id);
    setGalleryImages(images);
    setActiveImg(0);
  };

  const sizeButtonDisabled = isRing && !selectedSize;

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <Navbar />
      <CartDrawer />

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 80px", paddingTop: "96px" }}>

        {/* ── Breadcrumb ──────────────────────────────────────────────────────── */}
        <nav aria-label="breadcrumb" style={{ marginBottom: "32px" }}>
          <ol style={{
            display: "flex", alignItems: "center", gap: "8px",
            fontFamily: T.sans, fontSize: "11px", letterSpacing: "0.16em",
            textTransform: "uppercase", color: "#AAA", listStyle: "none",
            padding: 0, margin: 0,
          }}>
            <li><Link href="/" style={{ color: "inherit", textDecoration: "none", transition: "color 150ms" }}
              onMouseEnter={e => (e.currentTarget.style.color = T.black)}
              onMouseLeave={e => (e.currentTarget.style.color = "#AAA")}
            >{p_t.breadcrumbHome}</Link></li>
            <li aria-hidden style={{ opacity: .5 }}>›</li>
            <li><Link href="/shop" style={{ color: "inherit", textDecoration: "none", transition: "color 150ms" }}
              onMouseEnter={e => (e.currentTarget.style.color = T.black)}
              onMouseLeave={e => (e.currentTarget.style.color = "#AAA")}
            >{p_t.breadcrumbShop}</Link></li>
            {catLabel && <>
              <li aria-hidden style={{ opacity: .5 }}>›</li>
              <li><Link href={`/shop?category=${product.category}`}
                style={{ color: "inherit", textDecoration: "none", transition: "color 150ms" }}
                onMouseEnter={e => (e.currentTarget.style.color = T.black)}
                onMouseLeave={e => (e.currentTarget.style.color = "#AAA")}
              >{catLabel}</Link></li>
            </>}
            <li aria-hidden style={{ opacity: .5 }}>›</li>
            <li style={{ color: T.gold }}>{displayName}</li>
          </ol>
        </nav>

        {/* ── Two-column grid ─────────────────────────────────────────────────── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(24px, 5vw, 64px)",
          alignItems: "start",
        }} className="product-grid">

          {/* ═══ LEFT: Gallery ══════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="gallery-col"
          >
            {/* Main image — desktop */}
            <div
              className="gallery-main-desktop"
              onClick={() => setLightbox(true)}
              style={{
                position: "relative", background: "#fff",
                aspectRatio: "1/1", overflow: "hidden",
                cursor: "zoom-in",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={galleryImages[activeImg]}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  style={{ position: "absolute", inset: "8%" }}
                >
                  {galleryImages[activeImg] && (
                    <Image
                      src={galleryImages[activeImg]}
                      alt={displayName}
                      fill sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: "contain" }}
                      priority
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Badges */}
              {(product.isNew || product.isBestseller) && (
                <div style={{ position: "absolute", top: "12px", insetInlineEnd: "12px", display: "flex", flexDirection: "column", gap: "4px" }}>
                  {product.isNew && (
                    <span style={{ background: T.black, color: "#fff", fontFamily: T.sans, fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase", padding: "3px 8px" }}>{p_t.new}</span>
                  )}
                  {product.isBestseller && (
                    <span style={{ background: T.gold, color: "#fff", fontFamily: T.sans, fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase", padding: "3px 8px" }}>{p_t.bestseller}</span>
                  )}
                </div>
              )}

              {/* Zoom hint */}
              <div style={{
                position: "absolute", bottom: "10px", insetInlineStart: "10px",
                background: "rgba(255,255,255,0.88)", backdropFilter: "blur(4px)",
                padding: "4px 10px", display: "flex", alignItems: "center", gap: "5px",
              }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
                <span style={{ fontFamily: T.sans, fontSize: "9px", letterSpacing: "0.14em", color: "#666" }}>{p_t.zoom}</span>
              </div>
            </div>

            {/* Mobile carousel */}
            <div className="gallery-main-mobile">
              <MobileCarousel images={galleryImages} active={activeImg} onSelect={setActiveImg} alt={displayName} />
            </div>

            {/* Desktop thumbnails */}
            {galleryImages.length > 1 && (
              <div className="gallery-thumbs-desktop">
                <ThumbnailStrip images={galleryImages} active={activeImg} onSelect={i => { setActiveImg(i); }} alt={displayName} />
              </div>
            )}
          </motion.div>

          {/* ═══ RIGHT: Info column ═════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
            className="info-col"
            style={{ paddingTop: "4px" }}
          >

            {/* Collection label */}
            <p style={{
              fontFamily: T.sans, fontSize: "10px", letterSpacing: "0.3em",
              textTransform: "uppercase", color: "#AAA", marginBottom: "8px",
            }}>
              VIKOS Jewelry {catLabel ? `· ${catLabel}` : ""}
            </p>

            {/* Product name */}
            <h1 style={{
              fontFamily: T.serif,
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              fontWeight: 400, fontStyle: "italic",
              color: T.black, lineHeight: 1.15,
              marginBottom: "12px",
            }}>
              {displayName}
            </h1>

            {/* Material label */}
            {materialDisplay && (
              <p style={{
                fontFamily: T.sans, fontSize: "11px", letterSpacing: "0.14em",
                color: "#888", marginBottom: "20px", textTransform: "uppercase",
              }}>
                {materialDisplay}
              </p>
            )}

            {/* Price */}
            <div style={{ marginBottom: "24px" }}>
              {discountedPrice ? (
                <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                  <p style={{ fontFamily: T.sans, fontSize: "1.8rem", fontWeight: 300, color: T.black, margin: 0 }}>
                    <span dir="ltr" style={{ unicodeBidi: "isolate" }}>₪{discountedPrice.toLocaleString()}</span>
                  </p>
                  <p style={{ fontFamily: T.sans, fontSize: "1rem", color: "#AAA", textDecoration: "line-through", margin: 0 }}>
                    <span dir="ltr" style={{ unicodeBidi: "isolate" }}>₪{product.price.toLocaleString()}</span>
                  </p>
                </div>
              ) : (
                <p style={{ fontFamily: T.sans, fontSize: "1.8rem", fontWeight: 300, color: T.black, margin: "0 0 4px" }}>
                  <span dir="ltr" style={{ unicodeBidi: "isolate" }}>₪{product.price.toLocaleString()}</span>
                </p>
              )}
              <p style={{ fontFamily: T.sans, fontSize: "11px", color: T.gold, margin: 0, letterSpacing: "0.04em" }}>
                {p_t.installments(Math.round(product.price / 3))}
              </p>
            </div>

            {/* Metal / variant selector */}
            {variantProducts.length > 1 && (
              <MetalSelector
                variants={variantProducts}
                current={activeVariantId}
                onSelect={handleVariantSelect}
              />
            )}

            {/* Ring size selector */}
            {isRing && (
              <div style={{ marginBottom: "22px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                  <span style={{ fontFamily: T.sans, fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#AAA" }}>
                    {p_t.selectSize}
                  </span>
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    style={{
                      fontFamily: T.sans, fontSize: "10px", color: T.gold,
                      textDecoration: "underline", textUnderlineOffset: "2px",
                      background: "none", border: "none", cursor: "pointer",
                    }}
                  >
                    {p_t.sizeGuide}
                  </button>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                  {RING_SIZES.map(size => {
                    const outOfStock = false; // extend when stock data is available
                    return (
                      <button
                        key={size}
                        onClick={() => { if (!outOfStock) { setSelectedSize(size); setSizeError(false); } }}
                        disabled={outOfStock}
                        className="size-btn"
                        style={{
                          width: "48px", height: "48px",
                          fontFamily: T.sans, fontSize: "12px", fontWeight: 300,
                          border: selectedSize === size ? `1.5px solid ${T.gold}` : "1px solid #E0DDD8",
                          background: selectedSize === size ? T.gold : "#fff",
                          color: selectedSize === size ? "#fff" : outOfStock ? "#CCC" : "#555",
                          cursor: outOfStock ? "not-allowed" : "pointer",
                          textDecoration: outOfStock ? "line-through" : "none",
                          opacity: outOfStock ? 0.5 : 1,
                        }}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
                {!selectedSize && !sizeError && (
                  <p style={{ fontFamily: T.sans, fontSize: "10px", color: "#AAA", marginTop: "6px" }}>
                    {p_t.sizeHint}
                  </p>
                )}
                {sizeError && (
                  <p role="alert" style={{ fontFamily: T.sans, fontSize: "10px", color: "#C0392B", marginTop: "6px", display: "flex", alignItems: "center", gap: "5px" }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    {p_t.selectSizeError}
                  </p>
                )}
              </div>
            )}

            {/* Add to cart */}
            <button
              ref={mainBtnRef}
              onClick={handleAddToCart}
              disabled={adding || sizeButtonDisabled}
              className="add-btn"
              style={{
                width: "100%",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                padding: "16px 32px",
                fontFamily: T.sans, fontSize: "11px", letterSpacing: "0.22em",
                textTransform: "uppercase", fontWeight: 500,
                background: sizeButtonDisabled ? "#D0C8BC" : adding ? "#333" : T.black,
                color: "#fff", border: "none",
                cursor: sizeButtonDisabled ? "default" : adding ? "default" : "pointer",
                transition: "background 200ms ease-out",
                minHeight: "54px",
              }}
            >
              {adding ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                    style={{ display: "inline-block", width: "14px", height: "14px", border: "1.5px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%" }}
                  />
                  {p_t.adding}
                </>
              ) : sizeButtonDisabled ? (
                <>{lang === "en" ? "Select a size to continue" : "בחרו מידה כדי להמשיך"}</>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 01-8 0"/>
                  </svg>
                  {p_t.addToCart}
                </>
              )}
            </button>

            {/* Secondary actions row */}
            <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
              {/* Wishlist */}
              <button
                onClick={() => useStore.getState().toggleWishlist(product)}
                aria-label="רשימת משאלות"
                className="action-btn"
                style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                  padding: "12px", border: "1px solid #E0DDD8", background: "#fff",
                  cursor: "pointer", fontFamily: T.sans, fontSize: "10px", letterSpacing: "0.14em",
                  color: "#555", textTransform: "uppercase",
                  transition: "border-color 200ms, color 200ms",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                {p_t.saveWishlist}
              </button>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/972549784329?text=${encodeURIComponent(`שלום, אני מתעניין/ת במוצר: ${displayName} (₪${product.price.toLocaleString()})`)}`}
                target="_blank" rel="noreferrer"
                className="action-btn"
                style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                  padding: "12px", border: "1px solid #E0DDD8", background: "#fff",
                  textDecoration: "none", fontFamily: T.sans, fontSize: "10px", letterSpacing: "0.14em",
                  color: "#555", textTransform: "uppercase",
                  transition: "border-color 200ms, color 200ms",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                שאל/י
              </a>

              {/* Share */}
              <button
                onClick={handleShare}
                aria-label="שתף"
                className="action-btn"
                style={{
                  width: "48px", height: "48px", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: "1px solid #E0DDD8", background: "#fff", cursor: "pointer",
                  transition: "border-color 200ms",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
              </button>
            </div>

            {/* Trust strip */}
            <div style={{
              display: "flex", marginTop: "20px",
              background: "#F9F8F6", padding: "12px 0",
            }}>
              {[
                { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", label: p_t.trust[0] },
                { icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z", label: p_t.trust[1] },
                { icon: "M20 12V22H4V12 M22 7H2v5h20V7z M12 22V7 M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z", label: p_t.trust[2] },
              ].map((item, i) => (
                <div key={i} style={{
                  flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "5px",
                  padding: "4px 8px",
                  borderInlineEnd: i < 2 ? "1px solid #EDEAE4" : "none",
                }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={item.icon} />
                  </svg>
                  <span style={{ fontFamily: T.sans, fontSize: "9px", letterSpacing: "0.14em", color: "#888", textAlign: "center", textTransform: "uppercase" }}>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Delivery hint */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "10px", justifyContent: "center" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              <span style={{ fontFamily: T.sans, fontSize: "11px", color: "#999" }}>
                {p_t.deliveryHint(p_t.deliveryDay)}
              </span>
            </div>

            {/* Tabs: פרטים / חומרים ותחזוקה */}
            <ProductTabs product={product} lang={lang} description={displayDescription} />
          </motion.div>
        </div>

        {/* ── Related products ──────────────────────────────────────────────── */}
        {related.length > 0 && (
          <section style={{ marginTop: "100px", paddingTop: "60px", borderTop: "1px solid #E8E8E4" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "48px", gap: "16px" }}>
              <div>
                <p style={{ fontFamily: T.sans, fontSize: "9px", letterSpacing: "0.32em", textTransform: "uppercase", color: "#B0A898", marginBottom: "10px" }}>
                  {p_t.relatedEyebrow}
                </p>
                <h2 style={{ fontFamily: T.serif, fontSize: "clamp(1.6rem,2.8vw,2.4rem)", fontWeight: 300, fontStyle: "italic", color: "#1A1A1A", margin: 0, lineHeight: 1.15 }}>
                  {p_t.relatedTitle}
                </h2>
              </div>
            </div>
            <div className="related-grid">
              {related.map(p => (
                <Link key={p.id} href={`/product/${p.id}`} style={{ textDecoration: "none" }} className="related-card">
                  <div className="related-img-wrap">
                    <img src={p.image} alt={lang === "en" ? p.nameEn : p.nameHe} loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "contain", padding: "10%", display: "block" }}
                      className="related-img"
                    />
                  </div>
                  <div style={{ paddingTop: "12px" }}>
                    <p style={{ fontFamily: T.serif, fontSize: "1.05rem", fontStyle: "italic", color: "#1A1A1A", margin: "0 0 4px", lineHeight: 1.3 }}>
                      {lang === "en" ? p.nameEn : p.nameHe}
                    </p>
                    <p style={{ fontFamily: T.sans, fontSize: "11px", color: T.gold }}>
                      <span dir="ltr" style={{ unicodeBidi: "isolate" }}>₪{p.price.toLocaleString()}</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* ── Lightbox ─────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightbox(false)}
            style={{
              position: "fixed", inset: 0, zIndex: 200,
              background: "rgba(0,0,0,0.94)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "40px", cursor: "zoom-out",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              style={{ maxWidth: "80vw", maxHeight: "80vh", position: "relative", cursor: "default" }}
              onClick={e => e.stopPropagation()}
            >
              {galleryImages[activeImg] && (
                <Image src={galleryImages[activeImg]} alt={displayName}
                  width={900} height={900}
                  style={{ maxWidth: "80vw", maxHeight: "80vh", objectFit: "contain" }}
                />
              )}
            </motion.div>
            <button
              onClick={() => setLightbox(false)}
              aria-label="סגור"
              style={{
                position: "absolute", top: "20px", insetInlineStart: "20px",
                background: "rgba(255,255,255,0.1)", border: "none", color: "#fff",
                width: "40px", height: "40px", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Size Guide Modal ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showSizeGuide && <SizeGuideModal onClose={() => setShowSizeGuide(false)} />}
      </AnimatePresence>

      <Footer />

      {/* ── Sticky bottom bar ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {stickyVisible && product && (
          <motion.div
            initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
            style={{
              position: "fixed", bottom: 0, insetInlineStart: 0, insetInlineEnd: 0, zIndex: 90,
              background: "#fff", borderTop: "1px solid #E8E8E4",
              padding: "10px 20px",
              display: "flex", alignItems: "center", gap: "14px",
              boxShadow: "0 -4px 28px rgba(0,0,0,0.08)",
            }}
          >
            <div style={{ flex: 1, minWidth: 0, direction: "rtl" }}>
              <p style={{ fontFamily: T.serif, fontSize: "1rem", fontStyle: "italic", color: T.black, margin: "0 0 1px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {displayName}
              </p>
              <p style={{ fontFamily: T.sans, fontSize: "13px", color: T.gold, margin: 0 }}>
                <span dir="ltr" style={{ unicodeBidi: "isolate" }}>₪{product.price.toLocaleString()}</span>
              </p>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={adding}
              style={{
                padding: "13px 22px",
                background: adding ? "#333" : T.black,
                color: "#fff", border: "none", cursor: "pointer", flexShrink: 0,
                fontFamily: T.sans, fontSize: "10px", letterSpacing: "0.18em",
                textTransform: "uppercase", minHeight: "44px",
                transition: "background 200ms",
              }}
            >
              {adding ? "..." : p_t.addToCart}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* Responsive layout */
        @media (max-width: 768px) {
          .product-grid { grid-template-columns: 1fr !important; }
          .gallery-main-desktop { display: none !important; }
          .gallery-thumbs-desktop { display: none !important; }
          .gallery-main-mobile { display: block !important; }
          .info-col { order: 2; }
          .gallery-col { order: 1; }
        }
        @media (min-width: 769px) {
          .gallery-main-mobile { display: none !important; }
          .info-col {
            position: sticky;
            top: 96px;
            align-self: start;
            /* Guard: don't trap user when info is taller than viewport */
            max-height: calc(100vh - 116px);
            overflow-y: auto;
            scrollbar-width: none;
          }
          .info-col::-webkit-scrollbar { display: none; }
        }

        /* Hover / active states */
        .add-btn:not(:disabled):active { transform: scale(0.98); }
        .action-btn:hover { border-color: ${T.gold} !important; color: ${T.gold} !important; }
        .action-btn:hover svg { stroke: ${T.gold} !important; }

        .size-btn {
          transition: background 120ms ease-out, border-color 120ms ease-out, color 120ms ease-out;
        }
        .size-btn:not(:disabled):hover { border-color: ${T.gold} !important; color: ${T.gold} !important; }
        .size-btn:not(:disabled):active { transform: scale(0.94); }

        /* Related grid */
        .related-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px;
        }
        @media (max-width: 900px) { .related-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; } }
        @media (max-width: 480px) { .related-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; } }

        .related-card { display: block; }
        .related-img-wrap { aspect-ratio: 1/1; overflow: hidden; background: #fff; }
        .related-img { transition: transform 600ms cubic-bezier(0.23, 1, 0.32, 1); }
        .related-card:hover .related-img { transform: scale(1.04); }

        /* Mobile scrollbar hide */
        ::-webkit-scrollbar { width: 0; height: 0; }
      `}</style>
    </div>
  );
}
