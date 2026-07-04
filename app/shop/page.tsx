"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ShoppingBag, X, Search, SlidersHorizontal, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import { products, categories } from "@/lib/products";
import { useStore } from "@/lib/store";

const T = {
  gold:   "#C9A96E",
  black:  "#111111",
  gray:   "#6B6B6B",
  light:  "#AAAAAA",
  border: "#E8E8E8",
  warm:   "#F9F7F4",
  serif:  "'Cormorant Garamond', Georgia, serif",
  sans:   "'Inter', system-ui, sans-serif",
};

const MATERIALS = ["הכל", "זהב 14K", "זהב 18K", "כסף 925", "זהב ורד", "יהלום"];
const SORTS = [
  { id: "default",    label: "מומלץ" },
  { id: "price-asc",  label: "מחיר: נמוך לגבוה" },
  { id: "price-desc", label: "מחיר: גבוה לנמוך" },
  { id: "new",        label: "חדש" },
  { id: "bestseller", label: "נמכר ביותר" },
];

function ProductCard({ p, index }: { p: typeof products[0]; index: number }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [hovered, setHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const wishlisted = isWishlisted(p.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: Math.min(index * 0.04, 0.4), ease: [0.23, 1, 0.32, 1] }}
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
            src={p.image} alt={p.nameHe}
            fill sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 25vw"
            priority={index < 4}
            style={{ objectFit: "cover", transition: "opacity 0.4s", opacity: imgLoaded ? 1 : 0 }}
            onLoad={() => setImgLoaded(true)}
          />

          {/* Wishlist — always visible on touch, hover on desktop */}
          <button onClick={e => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); toast.success(wishlisted ? `${p.nameHe} הוסר ממועדפים` : `${p.nameHe} נוסף למועדפים`); }}
            aria-label="מועדפים"
            style={{ position: "absolute", top: "10px", left: "10px", width: "44px", height: "44px", borderRadius: "50%", background: "rgba(255,255,255,0.88)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "opacity 0.2s" }}
            className={wishlisted ? "wish-active" : "wish-btn"}>
            <Heart size={14} fill={wishlisted ? T.gold : "none"} color={wishlisted ? T.gold : "#666"} />
          </button>

          {/* Quick-add — hover on desktop, always visible on touch */}
          <button onClick={e => { e.preventDefault(); e.stopPropagation(); addToCart(p); toast.success(`${p.nameHe} נוסף לסל`, { duration: 2200 }); }}
            style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "14px", background: "rgba(255,255,255,0.92)", backdropFilter: "blur(4px)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", fontFamily: T.sans, fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: T.black, transition: "transform 0.3s ease", minHeight: "44px" }}
            className={hovered ? "add-btn-visible" : "add-btn-hidden"}>
            <ShoppingBag size={12} strokeWidth={1.5} />
            הוסף לסל
          </button>

          {(p.isNew || p.isBestseller) && (
            <span style={{ position: "absolute", top: "10px", right: "10px", background: p.isBestseller ? T.gold : T.black, color: "#fff", fontFamily: T.sans, fontSize: "8px", letterSpacing: "0.14em", textTransform: "uppercase", padding: "3px 7px" }}>
              {p.isBestseller ? "נמכר ביותר" : "חדש"}
            </span>
          )}
        </div>
      </Link>
      <Link href={`/product/${p.id}`} style={{ textDecoration: "none" }}>
        <p style={{ fontFamily: T.serif, fontSize: "0.98rem", fontWeight: 400, color: T.black, marginBottom: "4px", lineHeight: 1.3 }}>{p.nameHe}</p>
        <p style={{ fontFamily: T.sans, fontSize: "13px", color: T.gray, fontWeight: 300 }}>₪{p.price.toLocaleString()}</p>
      </Link>
    </motion.article>
  );
}

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all");
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

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }} dir="rtl">
      <Navbar />
      <CartDrawer />

      {/* Header */}
      <section style={{ paddingTop: "72px", paddingBottom: "36px", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px" }}>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            style={{ fontFamily: T.sans, fontSize: "9px", letterSpacing: "0.38em", textTransform: "uppercase", color: T.gold, marginBottom: "12px" }}>
            הקולקציה
          </motion.p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08 }}
              style={{ fontFamily: T.serif, fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 300, color: T.black, lineHeight: 1.05, margin: 0 }}>
              כל הפריטים
            </motion.h1>

            {/* Search */}
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <Search size={14} color="#AAA" style={{ position: "absolute", right: "12px", pointerEvents: "none" }} />
              <input ref={searchRef} value={search} onChange={e => setSearch(e.target.value)}
                placeholder="חיפוש..."
                style={{ paddingRight: "36px", paddingLeft: search ? "32px" : "14px", paddingTop: "9px", paddingBottom: "9px", border: `1px solid ${T.border}`, background: "#fff", fontFamily: T.sans, fontSize: "12px", color: T.black, outline: "none", width: "200px", transition: "border-color 0.2s, width 0.3s", borderRadius: 0 }}
                onFocus={e => { e.currentTarget.style.borderColor = T.gold; e.currentTarget.style.width = "260px"; }}
                onBlur={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.width = "200px"; }}
              />
              {search && (
                <button onClick={() => setSearch("")} style={{ position: "absolute", left: "10px", background: "none", border: "none", cursor: "pointer", color: "#AAA", display: "flex" }}>
                  <X size={12} />
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
                {cat.labelHe}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
            {hasActiveFilters && (
              <button onClick={clearFilters} style={{ fontFamily: T.sans, fontSize: "10px", color: T.gold, background: "none", border: "none", cursor: "pointer", textDecoration: "underline", whiteSpace: "nowrap" }}>נקה</button>
            )}
            <span style={{ fontFamily: T.sans, fontSize: "10px", color: T.light }}>{filtered.length} פריטים</span>

            <button onClick={() => setShowFilters(v => !v)} style={{ display: "flex", alignItems: "center", gap: "6px", background: showFilters ? T.black : "none", border: `1px solid ${showFilters ? T.black : T.border}`, cursor: "pointer", padding: "5px 12px", fontFamily: T.sans, fontSize: "10px", letterSpacing: "0.12em", color: showFilters ? "#fff" : T.gray, transition: "all 0.2s" }}>
              <SlidersHorizontal size={12} strokeWidth={1.5} />
              סינון
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
                  <p style={{ fontFamily: T.sans, fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: T.light, marginBottom: "10px" }}>חומר</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {MATERIALS.map(m => (
                      <button key={m} onClick={() => setMaterial(m)} style={{ padding: "4px 12px", border: `1px solid ${material === m ? T.black : T.border}`, background: material === m ? T.black : "transparent", color: material === m ? "#fff" : T.gray, fontFamily: T.sans, fontSize: "10px", cursor: "pointer", transition: "all 0.18s" }}>
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div style={{ minWidth: "220px" }}>
                  <p style={{ fontFamily: T.sans, fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: T.light, marginBottom: "10px" }}>
                    תקציב
                  </p>
                  {/* Quick range buttons */}
                  <div style={{ display: "flex", gap: "6px", marginBottom: "12px", flexWrap: "wrap" }}>
                    {[
                      { label: "עד ₪2,000",  val: 2000 },
                      { label: "₪2,000–₪8,000", val: 8000 },
                      { label: "₪8,000+",    val: 25000 },
                    ].map(btn => (
                      <button key={btn.val} onClick={() => setMaxPrice(btn.val)}
                        style={{ padding: "4px 10px", border: `1px solid ${maxPrice === btn.val ? T.black : T.border}`, background: maxPrice === btn.val ? T.black : "transparent", color: maxPrice === btn.val ? "#fff" : T.gray, fontFamily: T.sans, fontSize: "10px", cursor: "pointer", transition: "all 0.18s", whiteSpace: "nowrap" }}>
                        {btn.label}
                      </button>
                    ))}
                  </div>
                  {/* Precise slider */}
                  <p style={{ fontFamily: T.sans, fontSize: "9px", color: T.light, marginBottom: "6px" }}>
                    עד ₪{maxPrice.toLocaleString()}
                  </p>
                  <input type="range" min={500} max={25000} step={500} value={maxPrice}
                    onChange={e => setMaxPrice(Number(e.target.value))}
                    style={{ width: "100%", accentColor: T.gold }} />
                </div>

                {/* Toggles */}
                <div>
                  <p style={{ fontFamily: T.sans, fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: T.light, marginBottom: "10px" }}>סטטוס</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {[
                      { label: "חדש בלבד", val: onlyNew, set: setOnlyNew },
                      { label: "נמכר ביותר", val: onlyBestseller, set: setOnlyBestseller },
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
            <X size={32} strokeWidth={1} color={T.light} />
            <p style={{ fontFamily: T.serif, fontSize: "1.2rem", color: T.light, fontWeight: 300 }}>לא נמצאו פריטים</p>
            <button onClick={() => { setActiveCategory("all"); clearFilters(); }}
              style={{ marginTop: "8px", padding: "10px 24px", border: `1px solid ${T.border}`, background: "none", cursor: "pointer", fontFamily: T.sans, fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: T.gray, transition: "all 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T.black; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "none"; (e.currentTarget as HTMLElement).style.color = T.gray; }}>
              הצג הכל
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
