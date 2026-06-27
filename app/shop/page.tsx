"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ShoppingBag, SlidersHorizontal, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import { products as staticProducts, categories } from "@/lib/products";
import { useStore } from "@/lib/store";
import { urlFor } from "@/lib/sanity";

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

/* ── Single product card ── */
function ProductCard({ p, index }: { p: typeof products[0]; index: number }) {
  const { addToCart } = useStore();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.4), ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/product/${p.id}`} style={{ textDecoration: "none", display: "block" }}>
        {/* Image wrapper — white box */}
        <div style={{
          position: "relative", overflow: "hidden",
          background: "#FFFFFF", aspectRatio: "3/4",
          marginBottom: "14px",
          border: "1px solid #EFEFEF",
          boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
        }}>
          <div style={{
            position: "absolute", inset: "12px",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <img
              src={p.image} alt={p.nameHe}
              loading={index < 6 ? "eager" : "lazy"}
              style={{
                width: "100%", height: "100%", objectFit: "contain", display: "block",
                transform: hovered ? "scale(1.06)" : "scale(1)",
                transition: "transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)",
              }}
            />
          </div>

          {/* Dark overlay on hover */}
          <div style={{
            position: "absolute", inset: 0,
            background: "rgba(10,10,10,0.38)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.35s ease",
          }} />

          {/* Add to cart button — slides up */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            transform: hovered ? "translateY(0)" : "translateY(100%)",
            transition: "transform 0.3s ease",
          }}>
            <button
              onClick={e => {
                e.preventDefault(); e.stopPropagation();
                addToCart(p);
                toast.success(`${p.nameHe} נוסף לסל`, { duration: 2200 });
              }}
              style={{
                width: "100%", padding: "14px",
                background: "rgba(255,255,255,0.96)",
                border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                fontFamily: T.sans, fontSize: "10px", letterSpacing: "0.2em",
                textTransform: "uppercase", color: T.black,
                transition: "background 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = T.gold)}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.96)")}
            >
              <ShoppingBag size={13} strokeWidth={1.5} />
              הוסף לסל
            </button>
          </div>

          {/* Badges */}
          <div style={{ position: "absolute", top: "12px", right: "12px", display: "flex", flexDirection: "column", gap: "5px" }}>
            {p.isNew && (
              <span style={{
                background: T.black, color: "#fff",
                fontFamily: T.sans, fontSize: "8px", letterSpacing: "0.15em",
                textTransform: "uppercase", padding: "3px 8px",
              }}>חדש</span>
            )}
            {p.isBestseller && (
              <span style={{
                background: T.gold, color: "#fff",
                fontFamily: T.sans, fontSize: "8px", letterSpacing: "0.15em",
                textTransform: "uppercase", padding: "3px 8px",
              }}>נמכר ביותר</span>
            )}
          </div>
        </div>

        {/* Info */}
        <p style={{
          fontFamily: T.sans, fontSize: "9px", letterSpacing: "0.18em",
          textTransform: "uppercase", color: T.light, marginBottom: "5px",
        }}>
          {p.material?.split("|")[0]?.trim()}
        </p>
        <p style={{
          fontFamily: T.serif, fontSize: "1.05rem", fontWeight: 400,
          color: T.black, marginBottom: "5px", lineHeight: 1.3,
          transition: "color 0.2s",
          ...(hovered ? { color: T.gold } : {}),
        }}>
          {p.nameHe}
        </p>
        <p style={{ fontFamily: T.sans, fontSize: "13px", color: T.gray, fontWeight: 300 }}>
          ₪{p.price.toLocaleString()}
        </p>
      </Link>
    </motion.article>
  );
}

/* ── Sort options ── */
const SORTS = [
  { id: "default", label: "מומלץ" },
  { id: "price-asc", label: "מחיר: נמוך לגבוה" },
  { id: "price-desc", label: "מחיר: גבוה לנמוך" },
  { id: "new", label: "חדש" },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [showSort, setShowSort] = useState(false);
  const [visible, setVisible] = useState(false);
  const [products, setProducts] = useState(staticProducts as any[]);

  useEffect(() => { setTimeout(() => setVisible(true), 80); }, []);

  // טוען מוצרים מ-Sanity, fallback לסטטי
  useEffect(() => {
    fetch("/api/products")
      .then(r => r.json())
      .then(data => { if (data?.length) setProducts(data); })
      .catch(() => {});
  }, []);

  const filtered = (() => {
    let list = activeCategory === "all" ? products : products.filter((p: any) => p.category === activeCategory);
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "new") list = [...list].filter(p => p.isNew).concat(list.filter(p => !p.isNew));
    return list;
  })();

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }} dir="rtl">
      <Navbar />
      <CartDrawer />

      {/* ── Page header ── */}
      <section style={{ paddingTop: "72px", paddingBottom: "36px", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px" }}>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            style={{ fontFamily: T.sans, fontSize: "9px", letterSpacing: "0.38em", textTransform: "uppercase", color: T.gold, marginBottom: "12px" }}
          >
            הקולקציה
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08 }}
            style={{ fontFamily: T.serif, fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 300, color: T.black, lineHeight: 1.05, margin: 0 }}
          >
            כל הפריטים
          </motion.h1>
        </div>
      </section>

      {/* ── Filters + sort bar ── */}
      <div style={{
        position: "sticky", top: "70px", zIndex: 30,
        background: "rgba(255,255,255,0.97)", backdropFilter: "blur(8px)",
        borderBottom: `1px solid ${T.border}`,
      }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto", padding: "0 32px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: "52px", gap: "24px",
        }}>
          {/* Category pills */}
          <div style={{ display: "flex", gap: "6px", overflowX: "auto", flexShrink: 0 }}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: "5px 16px",
                  border: `1px solid ${activeCategory === cat.id ? T.black : T.border}`,
                  background: activeCategory === cat.id ? T.black : "transparent",
                  color: activeCategory === cat.id ? "#fff" : T.gray,
                  fontFamily: T.sans, fontSize: "10px", letterSpacing: "0.16em",
                  textTransform: "uppercase", cursor: "pointer", whiteSpace: "nowrap",
                  transition: "all 0.22s ease",
                  borderRadius: "0",
                }}
              >
                {cat.labelHe}
              </button>
            ))}
          </div>

          {/* Right side: count + sort */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }}>
            <span style={{ fontFamily: T.sans, fontSize: "10px", color: T.light }}>
              {filtered.length} פריטים
            </span>

            {/* Sort dropdown */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowSort(v => !v)}
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  background: "none", border: `1px solid ${T.border}`, cursor: "pointer",
                  padding: "5px 12px",
                  fontFamily: T.sans, fontSize: "10px", letterSpacing: "0.12em",
                  color: T.gray, transition: "border-color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = T.black)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = T.border)}
              >
                <SlidersHorizontal size={12} strokeWidth={1.5} />
                {SORTS.find(s => s.id === sort)?.label}
              </button>

              <AnimatePresence>
                {showSort && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    style={{
                      position: "absolute", top: "calc(100% + 6px)", left: 0,
                      background: "#fff", border: `1px solid ${T.border}`,
                      minWidth: "180px", zIndex: 50,
                      boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                    }}
                  >
                    {SORTS.map(s => (
                      <button
                        key={s.id}
                        onClick={() => { setSort(s.id); setShowSort(false); }}
                        style={{
                          display: "block", width: "100%", padding: "10px 16px",
                          textAlign: "right", background: s.id === sort ? T.warm : "none",
                          border: "none", cursor: "pointer",
                          fontFamily: T.sans, fontSize: "11px", color: s.id === sort ? T.black : T.gray,
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = T.warm)}
                        onMouseLeave={e => (e.currentTarget.style.background = s.id === sort ? T.warm : "none")}
                      >
                        {s.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ── Product grid ── */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "56px 32px 80px" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + sort}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "32px 24px",
            }}
            className="shop-grid"
          >
            {filtered.map((p, i) => (
              <ProductCard key={p.id} p={p} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div style={{
            textAlign: "center", padding: "96px 0",
            display: "flex", flexDirection: "column", alignItems: "center", gap: "16px",
          }}>
            <X size={32} strokeWidth={1} color={T.light} />
            <p style={{ fontFamily: T.serif, fontSize: "1.2rem", color: T.light, fontWeight: 300 }}>
              אין פריטים בקטגוריה זו
            </p>
            <button
              onClick={() => setActiveCategory("all")}
              style={{
                marginTop: "8px", padding: "10px 24px",
                border: `1px solid ${T.border}`, background: "none", cursor: "pointer",
                fontFamily: T.sans, fontSize: "10px", letterSpacing: "0.2em",
                textTransform: "uppercase", color: T.gray, transition: "all 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T.black; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "none"; (e.currentTarget as HTMLElement).style.color = T.gray; }}
            >
              הצג הכל
            </button>
          </div>
        )}
      </section>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .shop-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 24px 16px !important; }
        }
        @media (max-width: 480px) {
          .shop-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 16px 10px !important; }
        }
      `}</style>
    </div>
  );
}
