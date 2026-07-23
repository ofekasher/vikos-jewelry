"use client";
import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { products as allProducts, getMaterialEn } from "@/lib/products";
import type { Product } from "@/lib/products";
import { useStore } from "@/lib/store";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import { useT, useLang } from "@/lib/LanguageContext";

const RING_SIZES = ["46", "48", "50", "52", "54", "56", "58"];

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

  const ACCORDION_ITEMS = [
    { title: p_t.productDetails,    content: p_t.productDetailsContent },
    { title: p_t.careInstructions,  content: p_t.careContent },
    { title: p_t.shippingReturns,   content: p_t.shippingContent },
  ];

  // All hooks at top — never after a conditional return
  const [product, setProduct]           = useState<Product | null>(staticProduct);
  const [notFoundState, setNotFoundState] = useState(false);
  const [adding, setAdding]             = useState(false);
  const [selectedImg, setSelectedImg]   = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [wishlisted, setWishlisted]     = useState(false);
  const [sizeError, setSizeError]       = useState(false);
  const [lightbox, setLightbox]         = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);

  useEffect(() => {
    function loadProduct() {
      fetch(`/api/admin/products/${productId}`)
        .then(r => r.ok ? r.json() : Promise.reject())
        .then(raw => {
          const p: Product = {
            id:            raw.id,
            nameHe:        raw.name_he  || raw.nameHe  || raw.name || "",
            nameEn:        raw.name_en  || raw.nameEn  || raw.name || "",
            descriptionHe: raw.description_he || raw.descriptionHe || raw.description || "",
            descriptionEn: raw.description_en || raw.descriptionEn || raw.description || "",
            price:         raw.price,
            category:      raw.category,
            image:         raw.image || raw.images?.[0] || "",
            hoverImage:    raw.hover_image || undefined,
            images:        raw.images ?? [],
            material:      raw.material || "",
            isNew:         raw.is_new ?? raw.isNew ?? raw.badge === "חדש",
            isBestseller:  raw.is_bestseller ?? raw.isBestseller ?? raw.badge === "נמכר ביותר",
          };
          setProduct(p);
        })
        .catch(() => {
          if (!staticProduct) setNotFoundState(true);
        });
    }
    loadProduct();
    // Re-fetch when user returns to this tab (e.g. after admin edit)
    window.addEventListener("focus", loadProduct);
    return () => window.removeEventListener("focus", loadProduct);
  }, [productId, p_t]); // eslint-disable-line react-hooks/exhaustive-deps

  // Show sticky CTA after scrolling past the main add-to-cart button
  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 480);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (notFoundState) notFound();
  if (!product) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#aaa" }}>
      {lang === "en" ? "Loading..." : "טוען..."}
    </div>
  );

  const rawImages = product.images.length > 0 ? product.images : [product.image];
  const filtered = rawImages.filter(src => src && src !== product.hoverImage);
  const allImages = filtered.length > 0 ? filtered : [product.image].filter(Boolean);
  const isRing    = product.category === "rings";

  // Up to 4 related products from same category, excluding self
  const related = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = async () => {
    if (isRing && !selectedSize) {
      setSizeError(true);
      return;
    }
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
      if (navigator.share) {
        await navigator.share({ title: displayName, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success(p_t.linkCopied, { duration: 2000 });
      }
    } catch {}
  };

  const displayName = lang === "en" ? product.nameEn : product.nameHe;
  const displayDescription = lang === "en" ? product.descriptionEn : product.descriptionHe;
  const rawMaterial = product.material.split("|")[0].trim();
  const materialDisplay = lang === "en" ? getMaterialEn(rawMaterial) : rawMaterial;

  return (
    <div className="bg-white">
      <Navbar />
      <CartDrawer />

      <main className="max-w-[1200px] mx-auto px-6 lg:px-10 pb-20" style={{ paddingTop: "96px" }}>

        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-10">
          <ol className="flex items-center gap-2 text-[11px] tracking-[.18em] uppercase text-[#AAA]"
            style={{ fontFamily: "'Inter',sans-serif" }}>
            <li><Link href="/" className="hover:text-[#111] transition-colors">{p_t.breadcrumbHome}</Link></li>
            <li aria-hidden>·</li>
            <li><Link href="/shop" className="hover:text-[#111] transition-colors">{p_t.breadcrumbShop}</Link></li>
            <li aria-hidden>·</li>
            <li className="text-[#8B7355]" aria-current="page">{displayName}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16" style={{ alignItems: "start" }}>

          {/* ── Image Gallery ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col gap-3"
          >
            {/* Main image — click to open lightbox */}
            <div
              onClick={() => setLightbox(true)}
              style={{
                background: "#FAFAFA",
                border: "1px solid #E8E8E8",
                aspectRatio: "3/4",
                overflow: "hidden",
                position: "relative",
                cursor: "zoom-in",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={allImages[selectedImg]}
                  src={allImages[selectedImg]}
                  alt={displayName}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", position: "absolute", inset: 0 }}
                />
              </AnimatePresence>

              {/* Zoom hint */}
              <div style={{
                position: "absolute", bottom: "12px", left: "12px",
                background: "rgba(255,255,255,0.88)", backdropFilter: "blur(4px)",
                padding: "4px 10px", display: "flex", alignItems: "center", gap: "5px",
              }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "9px", letterSpacing: "0.16em", color: "#666" }}>{p_t.zoom}</span>
              </div>

              {/* Badges overlay */}
              {(product.isNew || product.isBestseller) && (
                <div style={{ position: "absolute", top: "12px", right: "12px", display: "flex", flexDirection: "column", gap: "4px" }}>
                  {product.isNew && (
                    <span style={{ background: "#111", color: "#fff", fontFamily: "'Inter',sans-serif", fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase", padding: "3px 8px" }}>{p_t.new}</span>
                  )}
                  {product.isBestseller && (
                    <span style={{ background: "#8B7355", color: "#fff", fontFamily: "'Inter',sans-serif", fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase", padding: "3px 8px" }}>{p_t.bestseller}</span>
                  )}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {allImages.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    style={{
                      width: "60px", height: "60px", padding: 0, border: "none", cursor: "pointer",
                      outline: selectedImg === i ? "2px solid #8B7355" : "2px solid transparent",
                      outlineOffset: "1px",
                      background: "#FAFAFA", overflow: "hidden", flexShrink: 0,
                      transition: "outline-color 120ms ease-out",
                    }}
                  >
                    <img src={src} alt={`תמונה ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* ── Product Details ────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col order-first md:order-none"
            style={{ paddingTop: "4px" }}
          >

            {/* 1. Category label */}
            <div style={{ marginBottom: "8px" }}>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#999", margin: 0 }}>
                {p_t.catLabels[product.category as keyof typeof p_t.catLabels]}
              </p>
            </div>

            {/* 2. Product name — always visible, no risk of empty */}
            <h1 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "#111",
              lineHeight: 1.15,
              marginBottom: "14px",
              paddingBottom: "2px",
            }}>
              {displayName || product.nameHe || product.nameEn || "מוצר"}
            </h1>

            {/* 3. Material — prominent, near name */}
            {materialDisplay && (
              <p style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: "11px",
                letterSpacing: "0.14em",
                color: "#888",
                marginBottom: "18px",
                textTransform: "uppercase",
              }}>
                {materialDisplay}
              </p>
            )}

            {/* 4. Price + installments */}
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "1.6rem", fontWeight: 400, color: "#111", letterSpacing: "-0.01em", margin: "0 0 4px" }}>
                ₪{product.price.toLocaleString()}
              </p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px", color: "#8B7355", margin: 0 }}>
                {p_t.installments(Math.round(product.price / 3))}
              </p>
            </div>

            {/* 5. Trust strip */}
            <div style={{
              display: "flex",
              gap: "0",
              marginBottom: "22px",
              borderTop: "1px solid #EFEFEF",
              borderBottom: "1px solid #EFEFEF",
              padding: "10px 0",
            }}>
              {[
                { icon: "M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z", label: p_t.trust[0] },
                { icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 7v6 M9 10h6", label: p_t.trust[1] },
                { icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: p_t.trust[2] },
              ].map((t, i) => (
                <div key={i} style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                  padding: "4px 8px",
                  borderLeft: i < 2 ? "1px solid #EFEFEF" : "none",
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B7355" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={t.icon} />
                  </svg>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "9px", letterSpacing: "0.12em", color: "#666", textAlign: "center" }}>{t.label}</span>
                </div>
              ))}
            </div>

            {/* 6. Size selector — rings only */}
            {isRing && (
              <div style={{ marginBottom: "22px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#AAA" }}>
                    {p_t.selectSize}
                  </span>
                  <button
                    onClick={() => toast(p_t.sizeGuideText, { duration: 5000 })}
                    style={{ fontFamily: "'Inter',sans-serif", fontSize: "10px", color: "#8B7355", textDecoration: "underline", textUnderlineOffset: "2px", background: "none", border: "none", cursor: "pointer" }}
                  >
                    {p_t.sizeGuide}
                  </button>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {RING_SIZES.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className="size-btn"
                      style={{
                        width: "40px", height: "40px",
                        fontFamily: "'Inter',sans-serif", fontSize: "12px", fontWeight: 300,
                        border: selectedSize === size ? "1px solid #8B7355" : "1px solid #E5E5E5",
                        background: selectedSize === size ? "#8B7355" : "transparent",
                        color: selectedSize === size ? "#fff" : "#555",
                        cursor: "pointer",
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {!selectedSize && !sizeError && (
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "10px", color: "#AAA", marginTop: "6px" }}>{p_t.sizeHint}</p>
                )}
                {sizeError && (
                  <p role="alert" style={{ fontFamily: "'Inter',sans-serif", fontSize: "10px", color: "#C0392B", marginTop: "6px", display: "flex", alignItems: "center", gap: "5px" }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    {p_t.selectSizeError}
                  </p>
                )}
              </div>
            )}

            {/* 7. Add to cart */}
            <button
              onClick={handleAddToCart}
              disabled={adding}
              className="add-btn"
              style={{
                width: "100%",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                padding: "16px 32px",
                fontFamily: "'Inter',sans-serif",
                fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 500,
                background: adding ? "#B89355" : "#8B7355",
                color: "#fff",
                border: "none",
                cursor: adding ? "default" : "pointer",
                boxShadow: adding ? "none" : "0 4px 20px rgba(201,169,110,0.3)",
                transition: "background 200ms ease-out, box-shadow 200ms ease-out",
                minHeight: "54px",
              }}
            >
              {adding ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                    style={{ display: "inline-block", width: "14px", height: "14px", border: "1.5px solid rgba(255,255,255,0.35)", borderTopColor: "#fff", borderRadius: "50%" }}
                  />
                  {p_t.adding}
                </>
              ) : (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 01-8 0"/>
                  </svg>
                  {p_t.addToCart}
                </>
              )}
            </button>

            {/* 8. Secondary CTA + delivery together */}
            <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <Link
                href="/custom"
                style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  padding: "14px 32px",
                  fontFamily: "'Inter',sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase",
                  color: "#111", border: "1px solid #E5E5E5", textDecoration: "none",
                  transition: "border-color 200ms ease-out, color 200ms ease-out",
                  minHeight: "48px",
                }}
                className="custom-btn"
              >
                {p_t.customOrder}
              </Link>

              {/* WhatsApp — ask about this product */}
              <a
                href={`https://wa.me/972549784329?text=${encodeURIComponent(`שלום, אני מתעניין/ת במוצר: ${displayName} (₪${product?.price?.toLocaleString()})`)}`}
                target="_blank" rel="noreferrer"
                style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  padding: "12px 32px", border: "1px solid #25D366", color: "#25D366",
                  fontFamily: "'Inter',sans-serif", fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase",
                  textDecoration: "none", minHeight: "44px",
                  transition: "background 200ms, color 200ms",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#25D366"; (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.color = "#25D366"; }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                שאל/י על המוצר
              </a>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", paddingTop: "4px" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px", color: "#999" }}>
                  {p_t.deliveryHint(p_t.deliveryDay)}
                </span>
              </div>
            </div>

            {/* 9. Wishlist + Share */}
            <div style={{ display: "flex", gap: "8px", marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #F0F0F0" }}>
              <button
                onClick={() => setWishlisted(w => !w)}
                aria-label="רשימת משאלות"
                className="action-btn"
                style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", cursor: "pointer", padding: "4px 0" }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill={wishlisted ? "#8B7355" : "none"} stroke={wishlisted ? "#8B7355" : "#888"} strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "10px", letterSpacing: "0.12em", color: "#888" }}>{p_t.saveWishlist}</span>
              </button>
              <div style={{ width: "1px", background: "#EBEBEB", margin: "0 4px" }} />
              <button
                onClick={handleShare}
                aria-label="שתף"
                className="action-btn"
                style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", cursor: "pointer", padding: "4px 0" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "10px", letterSpacing: "0.12em", color: "#888" }}>{p_t.share}</span>
              </button>
            </div>

            {/* 10. Description — the story */}
            <div style={{ marginTop: "28px", paddingTop: "24px", borderTop: "1px solid #EFEFEF" }}>
              <p style={{
                fontFamily: "'Frank Ruhl Libre', serif",
                fontSize: "14px", fontWeight: 300, color: "#555",
                lineHeight: 1.8,
              }}>
                {displayDescription}
              </p>
            </div>

            {/* 11. Accordion */}
            <div style={{ marginTop: "24px", borderTop: "1px solid #E5E5E5" }}>
              {ACCORDION_ITEMS.map((item, i) => (
                <div key={i} style={{ borderBottom: "1px solid #E5E5E5" }}>
                  <button
                    onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "14px 0", background: "none", border: "none", cursor: "pointer", textAlign: "right",
                    }}
                  >
                    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#333", fontWeight: 400 }}>
                      {item.title}
                    </span>
                    <motion.span
                      animate={{ rotate: openAccordion === i ? 45 : 0 }}
                      transition={{ duration: 0.18 }}
                      style={{ color: "#8B7355", fontSize: "18px", lineHeight: 1, userSelect: "none" }}
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openAccordion === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <p style={{
                          paddingBottom: "16px",
                          fontFamily: "'Frank Ruhl Libre', serif",
                          fontSize: "13px", fontWeight: 300, color: "#666", lineHeight: 1.8,
                          whiteSpace: "pre-line",
                        }}>
                          {item.content}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Related products ─────────────────────────────────── */}
        {related.length > 0 && (
          <section style={{ marginTop: "100px", paddingTop: "60px", scrollMarginTop: "80px", borderTop: "1px solid #E8E8E4" }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "48px", gap: "16px" }}>
              <div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "9px", letterSpacing: "0.32em", textTransform: "uppercase", color: "#B0A898", marginBottom: "10px" }}>
                  {p_t.relatedEyebrow}
                </p>
                <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.6rem,2.8vw,2.4rem)", fontWeight: 300, fontStyle: "italic", color: "#1A1A1A", margin: 0, lineHeight: 1.15 }}>
                  {p_t.relatedTitle}
                </h2>
              </div>
              <div style={{ width: "48px", height: "1px", background: "#D4C9BB", flexShrink: 0, marginBottom: "4px" }} />
            </div>

            <div className="related-grid">
              {related.map(p => (
                <Link key={p.id} href={`/product/${p.id}`} style={{ textDecoration: "none" }} className="related-card">
                  {/* Image */}
                  <div className="related-img-wrap">
                    <img
                      src={p.image} alt={lang === "en" ? p.nameEn : p.nameHe} loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      className="related-img"
                    />
                  </div>
                  {/* Info */}
                  <div style={{ paddingTop: "14px" }}>
                    <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.05rem", fontStyle: "italic", color: "#1A1A1A", fontWeight: 400, margin: "0 0 5px", lineHeight: 1.3 }}>
                      {lang === "en" ? p.nameEn : p.nameHe}
                    </p>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px", letterSpacing: "0.06em", color: "#8B7355", fontWeight: 400 }}>
                      ₪{p.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* ── Lightbox ─────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightbox(false)}
            style={{
              position: "fixed", inset: 0, zIndex: 200,
              background: "rgba(0,0,0,0.94)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "40px", cursor: "zoom-out",
            }}
          >
            <motion.img
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              src={allImages[selectedImg]}
              alt={displayName}
              onClick={e => e.stopPropagation()}
              style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", cursor: "default" }}
            />
            <button
              onClick={() => setLightbox(false)}
              aria-label="סגור"
              style={{
                position: "absolute", top: "20px", left: "20px",
                background: "rgba(255,255,255,0.1)", border: "none", color: "#fff",
                width: "40px", height: "40px", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", transition: "background 200ms ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />

      {/* ── Sticky CTA bar — appears when scrolled past main button ── */}
      <AnimatePresence>
        {stickyVisible && product && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
            style={{
              position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 90,
              background: "#fff", borderTop: "1px solid #E8E8E4",
              padding: "10px 20px 10px",
              display: "flex", alignItems: "center", gap: "14px",
              boxShadow: "0 -4px 28px rgba(0,0,0,0.08)",
            }}
          >
            <div style={{ flex: 1, minWidth: 0, direction: "rtl" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1rem", fontStyle: "italic", color: "#111", margin: "0 0 1px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {displayName}
              </p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "13px", color: "#8B7355", margin: 0 }}>
                ₪{product.price.toLocaleString()}
              </p>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={adding}
              style={{
                padding: "13px 22px", background: adding ? "#B89355" : "#8B7355", color: "#fff",
                border: "none", cursor: "pointer", flexShrink: 0,
                fontFamily: "'Inter',sans-serif", fontSize: "10px", letterSpacing: "0.18em",
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
        .add-btn:active  { transform: scale(0.98); }
        .custom-btn:hover { border-color: #8B7355 !important; color: #8B7355 !important; }
        .action-btn:hover span { color: #111 !important; }
        .action-btn:hover svg  { stroke: #111 !important; }
        .size-btn {
          transition: background 120ms ease-out, border-color 120ms ease-out, color 120ms ease-out;
        }
        .size-btn:active { transform: scale(0.94); }

        .related-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px;
        }
        @media (max-width: 900px) {
          .related-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
        }
        @media (max-width: 480px) {
          .related-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
        }
        .related-card { display: block; }
        .related-img-wrap {
          aspect-ratio: 1/1;
          overflow: hidden;
          background: #F7F6F4;
        }
        .related-img {
          transition: transform 600ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        .related-card:hover .related-img { transform: scale(1.06); }
      `}</style>
    </div>
  );
}
