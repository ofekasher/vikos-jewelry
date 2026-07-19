"use client";
import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
function IconSearch({ size = 14, color = "currentColor" }: { size?: number; color?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
}
function IconX({ size = 12, color = "currentColor" }: { size?: number; color?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
}
function IconSliders({ size = 12, color = "currentColor" }: { size?: number; color?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="21" y1="4" x2="14" y2="4"/><line x1="10" y1="4" x2="3" y2="4"/><line x1="21" y1="12" x2="12" y2="12"/><line x1="8" y1="12" x2="3" y2="12"/><line x1="21" y1="20" x2="16" y2="20"/><line x1="12" y1="20" x2="3" y2="20"/><line x1="14" y1="2" x2="14" y2="6"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="16" y1="18" x2="16" y2="22"/></svg>;
}
function IconHeart({ size = 14, fill = "none", color = "currentColor" }: { size?: number; fill?: string; color?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
}
function IconBag({ size = 12, strokeWidth = 1.5 }: { size?: number; strokeWidth?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>;
}
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import { categories, getMaterialEn } from "@/lib/products";
import type { Product } from "@/lib/products";
import { useStore } from "@/lib/store";
import { useLang } from "@/lib/LanguageContext";

const T = {
  gold:   "#8B7355",
  black:  "#111111",
  gray:   "#6B6B6B",
  light:  "#AAAAAA",
  border: "#E8E8E8",
  warm:   "#F0F0EE",
  serif:  "'Cormorant Garamond', Georgia, serif",
  sans:   "'Inter', system-ui, sans-serif",
};

const MATERIAL_OPTIONS = [
  { value: "הכל",     labelHe: "הכל",      labelEn: "All" },
  { value: "זהב 14K", labelHe: "זהב 14K",  labelEn: "14K Gold" },
  { value: "זהב 18K", labelHe: "זהב 18K",  labelEn: "18K Gold" },
  { value: "כסף 925", labelHe: "כסף 925",  labelEn: "925 Silver" },
  { value: "זהב ורד", labelHe: "זהב ורד",  labelEn: "Rose Gold" },
  { value: "יהלום",   labelHe: "יהלום",    labelEn: "Diamond" },
];
const SORT_OPTIONS = [
  { id: "default",    labelHe: "מומלץ",            labelEn: "Recommended" },
  { id: "price-asc",  labelHe: "מחיר: נמוך לגבוה", labelEn: "Price: Low to High" },
  { id: "price-desc", labelHe: "מחיר: גבוה לנמוך", labelEn: "Price: High to Low" },
  { id: "new",        labelHe: "חדש",               labelEn: "New" },
  { id: "bestseller", labelHe: "נמכר ביותר",        labelEn: "Best Seller" },
];

function ProductCard({ p, index }: { p: Product; index: number }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const { lang } = useLang();
  const [hovered, setHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const wishlisted = isWishlisted(p.id);
  const displayName = lang === "en" ? p.nameEn : p.nameHe;

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.28, delay: Math.min(index * 0.04, 0.24), ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer" }}
    >
      <Link href={`/product/${p.id}`} style={{ textDecoration: "none", display: "block" }}>
        <div style={{ position: "relative", overflow: "hidden", background: "#F0EEEB", aspectRatio: "3/4", marginBottom: "12px" }}>

          {/* Skeleton with logo */}
          {!imgLoaded && (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "#F0EEEB" }}>
              <img src="/logo.png" alt="" style={{ width: "48px", opacity: 0.18, mixBlendMode: "multiply" }} />
            </div>
          )}

          {/* next/image */}
          <Image
            src={p.image} alt={displayName}
            fill sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 25vw"
            priority={index < 4}
            style={{ objectFit: "cover", transition: "opacity 0.4s", opacity: imgLoaded ? 1 : 0 }}
            onLoad={() => setImgLoaded(true)}
          />

          {/* Wishlist — always visible on touch, hover on desktop */}
          <button onClick={e => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); toast.success(wishlisted ? (lang === "en" ? `${displayName} removed from wishlist` : `${displayName} הוסר ממועדפים`) : (lang === "en" ? `${displayName} added to wishlist` : `${displayName} נוסף למועדפים`)); }}
            aria-label="מועדפים"
            style={{ position: "absolute", top: "10px", left: "10px", width: "44px", height: "44px", borderRadius: "50%", background: "rgba(255,255,255,0.88)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "opacity 0.2s" }}
            className={wishlisted ? "wish-active" : "wish-btn"}>
            <IconHeart size={14} fill={wishlisted ? T.gold : "none"} color={wishlisted ? T.gold : "#666"} />
          </button>

          {/* Quick-add — hover on desktop, always visible on touch */}
          <button onClick={e => { e.preventDefault(); e.stopPropagation(); addToCart(p); toast.success(lang === "en" ? `${displayName} added to cart` : `${displayName} נוסף לסל`, { duration: 2200 }); }}
            style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "14px", background: "rgba(255,255,255,0.92)", backdropFilter: "blur(4px)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", fontFamily: T.sans, fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: T.black, transition: "transform 0.3s ease", minHeight: "44px" }}
            className={hovered ? "add-btn-visible" : "add-btn-hidden"}>
            <IconBag size={12} strokeWidth={1.5} />
            {lang === "en" ? "Add to bag" : "הוסף לסל"}
          </button>

          {(p.isNew || p.isBestseller) && (
            <span style={{ position: "absolute", top: "10px", right: "10px", background: p.isBestseller ? T.gold : T.black, color: "#fff", fontFamily: T.sans, fontSize: "8px", letterSpacing: "0.14em", textTransform: "uppercase", padding: "3px 7px" }}>
              {p.isBestseller ? (lang === "en" ? "Best Seller" : "נמכר ביותר") : (lang === "en" ? "New" : "חדש")}
            </span>
          )}
        </div>
      </Link>
      <Link href={`/product/${p.id}`} style={{ textDecoration: "none" }}>
        <p style={{ fontFamily: T.serif, fontSize: "0.98rem", fontWeight: 400, color: T.black, marginBottom: "4px", lineHeight: 1.3 }}>{displayName}</p>
        <p style={{ fontFamily: T.sans, fontSize: "13px", color: T.gray, fontWeight: 300 }}>₪{p.price.toLocaleString()}</p>
      </Link>
    </motion.article>
  );
}

function ShopContent() {
  const { lang } = useLang();
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetch("/api/products").then(r => r.json()).then(setProducts).catch(() => {});
  }, []);

  const searchParams = useSearchParams();
  const router = useRouter();
  const activeCategory = searchParams.get("category") ?? "all";

  function setActiveCategory(cat: string) {
    if (cat === "all") router.push("/shop");
    else router.push(`/shop?category=${cat}`);
  }
  const [sort, setSort] = useState("default");
  const [showSort, setShowSort] = useState(false);
  const [material, setMaterial] = useState("הכל");
  const [maxPrice, setMaxPrice] = useState(25000);
  const [onlyNew, setOnlyNew] = useState(false);
  const [onlyBestseller, setOnlyBestseller] = useState(false);
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = (() => {
    let list = activeCategory === "all" ? products : products.filter(p => p.category === activeCategory);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(p => p.nameHe.toLowerCase().includes(q) || p.nameEn.toLowerCase().includes(q));
    }
    if (material !== "הכל") list = list.filter(p => p.material.includes(material.split(" ")[0]));
    list = list.filter(p => p.price <= maxPrice);
    if (onlyNew) list = list.filter(p => p.isNew);
    if (onlyBestseller) list = list.filter(p => p.isBestseller);
    if (sort === "price-asc")  list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "new")        list = [...list].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    if (sort === "bestseller") list = [...list].sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    return list;
  })();

  const hasActiveFilters = material !== "הכל" || maxPrice < 25000 || onlyNew || onlyBestseller || search;
  const clearFilters = () => { setMaterial("הכל"); setMaxPrice(25000); setOnlyNew(false); setOnlyBestseller(false); setSearch(""); };

  const SORTS = SORT_OPTIONS.map(s => ({ id: s.id, label: lang === "en" ? s.labelEn : s.labelHe }));

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <Navbar />
      <CartDrawer />

      {/* Header */}
      <section style={{ paddingTop: "72px", paddingBottom: "36px", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px" }}>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            style={{ fontFamily: T.sans, fontSize: "9px", letterSpacing: "0.38em", textTransform: "uppercase", color: T.gold, marginBottom: "12px" }}>
            {lang === "en" ? "The Collection" : "הקולקציה"}
          </motion.p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08 }}
              style={{ fontFamily: T.serif, fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 300, color: T.black, lineHeight: 1.05, margin: 0 }}>
              {lang === "en" ? "All Items" : "כל הפריטים"}
            </motion.h1>

            {/* Search */}
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <span style={{ position: "absolute", right: "12px", pointerEvents: "none", display: "flex" }}><IconSearch size={14} color="#AAA" /></span>
              <input ref={searchRef} value={search} onChange={e => setSearch(e.target.value)}
                placeholder={lang === "en" ? "Search..." : "חיפוש..."}
                style={{ paddingRight: "36px", paddingLeft: search ? "32px" : "14px", paddingTop: "9px", paddingBottom: "9px", border: `1px solid ${T.border}`, background: "#fff", fontFamily: T.sans, fontSize: "12px", color: T.black, outline: "none", width: "200px", transition: "border-color 0.2s", borderRadius: 0 }}
                onFocus={e => { e.currentTarget.style.borderColor = T.gold; e.currentTarget.style.width = "260px"; }}
                onBlur={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.width = "200px"; }}
              />
              {search && (
                <button onClick={() => setSearch("")} style={{ position: "absolute", left: "10px", background: "none", border: "none", cursor: "pointer", color: "#AAA", display: "flex" }}>
                  <IconX size={12} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky filter bar */}
      <div style={{ position: "sticky", top: "70px", zIndex: 30, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(8px)", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "52px", gap: "12px" }}>
          {/* Category pills */}
          <div style={{ display: "flex", gap: "6px", overflowX: "auto", flexShrink: 0 }} className="hide-scrollbar">
            {categories.map(cat => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)} style={{ padding: "5px 14px", border: `1px solid ${activeCategory === cat.id ? T.black : T.border}`, background: activeCategory === cat.id ? T.black : "transparent", color: activeCategory === cat.id ? "#fff" : T.gray, fontFamily: T.sans, fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.22s ease" }}>
                {lang === "en" ? cat.labelEn : cat.labelHe}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
            {hasActiveFilters && (
              <button onClick={clearFilters} style={{ fontFamily: T.sans, fontSize: "10px", color: T.gold, background: "none", border: "none", cursor: "pointer", textDecoration: "underline", whiteSpace: "nowrap" }}>{lang === "en" ? "Clear" : "נקה"}</button>
            )}
            <span style={{ fontFamily: T.sans, fontSize: "10px", color: T.light }}>{filtered.length} {lang === "en" ? "items" : "פריטים"}</span>

            <button onClick={() => setShowFilters(v => !v)} style={{ display: "flex", alignItems: "center", gap: "6px", background: showFilters ? T.black : "none", border: `1px solid ${showFilters ? T.black : T.border}`, cursor: "pointer", padding: "5px 12px", fontFamily: T.sans, fontSize: "10px", letterSpacing: "0.12em", color: showFilters ? "#fff" : T.gray, transition: "all 0.2s" }}>
              <IconSliders size={12} />
              {lang === "en" ? "Filter" : "סינון"}
            </button>

            <div style={{ position: "relative" }}>
              <button onClick={() => setShowSort(v => !v)} style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: `1px solid ${T.border}`, cursor: "pointer", padding: "5px 12px", fontFamily: T.sans, fontSize: "10px", letterSpacing: "0.12em", color: T.gray, transition: "border-color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = T.black)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = T.border)}>
                {SORTS.find(s => s.id === sort)?.label}
              </button>
              <AnimatePresence>
                {showSort && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}
                    style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, background: "#fff", border: `1px solid ${T.border}`, minWidth: "180px", zIndex: 50, boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>
                    {SORTS.map(s => (
                      <button key={s.id} onClick={() => { setSort(s.id); setShowSort(false); }}
                        style={{ display: "block", width: "100%", padding: "10px 16px", textAlign: "right", background: s.id === sort ? T.warm : "none", border: "none", cursor: "pointer", fontFamily: T.sans, fontSize: "11px", color: s.id === sort ? T.black : T.gray, transition: "background 0.15s" }}
                        onMouseEnter={e => (e.currentTarget.style.background = T.warm)}
                        onMouseLeave={e => (e.currentTarget.style.background = s.id === sort ? T.warm : "none")}>
                        {s.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Advanced filters panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
              style={{ overflow: "hidden", borderTop: `1px solid ${T.border}` }}>
              <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px 32px", display: "flex", flexWrap: "wrap", gap: "32px", alignItems: "flex-start" }}>

                {/* Material */}
                <div>
                  <p style={{ fontFamily: T.sans, fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: T.light, marginBottom: "10px" }}>{lang === "en" ? "Material" : "חומר"}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {MATERIAL_OPTIONS.map(opt => (
                      <button key={opt.value} onClick={() => setMaterial(opt.value)} style={{ padding: "4px 12px", border: `1px solid ${material === opt.value ? T.black : T.border}`, background: material === opt.value ? T.black : "transparent", color: material === opt.value ? "#fff" : T.gray, fontFamily: T.sans, fontSize: "10px", cursor: "pointer", transition: "all 0.18s" }}>
                        {lang === "en" ? opt.labelEn : opt.labelHe}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div style={{ minWidth: "220px" }}>
                  <p style={{ fontFamily: T.sans, fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: T.light, marginBottom: "10px" }}>
                    {lang === "en" ? "Budget" : "תקציב"}
                  </p>
                  {/* Quick range buttons */}
                  <div style={{ display: "flex", gap: "6px", marginBottom: "12px", flexWrap: "wrap" }}>
                    {[
                      { label: lang === "en" ? "Up to ₪2,000" : "עד ₪2,000",       val: 2000 },
                      { label: lang === "en" ? "₪2,000–₪8,000" : "₪2,000–₪8,000",  val: 8000 },
                      { label: lang === "en" ? "₪8,000–₪25,000" : "₪8,000–₪25,000", val: 25000 },
                    ].map(btn => (
                      <button key={btn.val} onClick={() => setMaxPrice(btn.val)}
                        style={{ padding: "4px 10px", border: `1px solid ${maxPrice === btn.val ? T.black : T.border}`, background: maxPrice === btn.val ? T.black : "transparent", color: maxPrice === btn.val ? "#fff" : T.gray, fontFamily: T.sans, fontSize: "10px", cursor: "pointer", transition: "all 0.18s", whiteSpace: "nowrap" }}>
                        {btn.label}
                      </button>
                    ))}
                  </div>
                  {/* Precise slider */}
                  <p style={{ fontFamily: T.sans, fontSize: "9px", color: T.light, marginBottom: "6px" }}>
                    {lang === "en" ? "Up to" : "עד"} ₪{maxPrice.toLocaleString()}
                  </p>
                  <input type="range" min={500} max={25000} step={500} value={maxPrice}
                    onChange={e => setMaxPrice(Number(e.target.value))}
                    style={{ width: "100%", accentColor: T.gold }} />
                </div>

                {/* Toggles */}
                <div>
                  <p style={{ fontFamily: T.sans, fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: T.light, marginBottom: "10px" }}>{lang === "en" ? "Status" : "סטטוס"}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {[
                      { label: lang === "en" ? "New only" : "חדש בלבד",         val: onlyNew,        set: setOnlyNew },
                      { label: lang === "en" ? "Best Seller" : "נמכר ביותר",    val: onlyBestseller, set: setOnlyBestseller },
                    ].map(({ label, val, set }) => (
                      <label key={label} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                        <input type="checkbox" checked={val} onChange={e => set(e.target.checked)} style={{ accentColor: T.gold, width: "14px", height: "14px" }} />
                        <span style={{ fontFamily: T.sans, fontSize: "11px", color: T.gray }}>{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product grid */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "56px 32px 80px" }}>
        <AnimatePresence mode="wait">
          <motion.div key={activeCategory + sort + material + search + onlyNew + onlyBestseller + maxPrice}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px 20px" }} className="shop-grid">
            {filtered.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "96px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <IconX size={32} color={T.light} />
            <p style={{ fontFamily: T.serif, fontSize: "1.2rem", color: T.light, fontWeight: 300 }}>{lang === "en" ? "No items found" : "לא נמצאו פריטים"}</p>
            <button onClick={() => { setActiveCategory("all"); clearFilters(); }}
              style={{ marginTop: "8px", padding: "10px 24px", border: `1px solid ${T.border}`, background: "none", cursor: "pointer", fontFamily: T.sans, fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: T.gray, transition: "all 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T.black; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "none"; (e.currentTarget as HTMLElement).style.color = T.gray; }}>
              {lang === "en" ? "Show all" : "הצג הכל"}
            </button>
          </div>
        )}
      </section>

      <Footer />

      <style>{`
        @media (max-width: 1100px) { .shop-grid { grid-template-columns: repeat(3,1fr) !important; } }
        @media (max-width: 700px)  { .shop-grid { grid-template-columns: repeat(2,1fr) !important; gap: 24px 12px !important; } }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* Desktop: show on hover */
        .add-btn-hidden { transform: translateY(100%); }
        .add-btn-visible { transform: translateY(0); }
        .wish-btn { opacity: 0; }
        .wish-active { opacity: 1; }

        /* Touch devices: always show */
        @media (hover: none) {
          .add-btn-hidden { transform: translateY(0) !important; }
          .wish-btn { opacity: 1 !important; }
        }
      `}</style>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <ShopContent />
    </Suspense>
  );
}
