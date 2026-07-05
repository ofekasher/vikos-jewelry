"use client";
import { use, useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import type { Product } from "@/lib/products";
import { useStore } from "@/lib/store";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.23, 1, 0.32, 1] as const } },
};

const catLabels: Record<string, string> = {
  rings: "טבעות", necklaces: "שרשראות", bracelets: "צמידים", earrings: "עגילים",
};

const RING_SIZES = ["46", "48", "50", "52", "54", "56", "58"];

const ACCORDION_ITEMS = [
  {
    title: "פרטי המוצר",
    content: "כל תכשיט מעוצב ומיוצר ביד בסדנת ויקוס. הטבעות שלנו מתכווננות ומתאימות למגוון מידות ללא צורך במדידה מוקדמת. מסופק עם תעודת אמינות ואריזת מתנה יוקרתית.",
  },
  {
    title: "הוראות טיפול",
    content: "• שמרו הרחק מכימיקלים, בשמים ומים\n• נקו בעדינות עם מטלית רכה ויבשה\n• אחסנו בקופסת התכשיט המצורפת\n• הימנעו ממגע עם תרסיסים ודאודורנט",
  },
];

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addToCart } = useStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [notFoundState, setNotFoundState] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/products/${id}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(raw => {
        // Map DbProduct → Product shape
        const p: Product = {
          id: raw.id, nameHe: raw.name, nameEn: raw.name,
          descriptionHe: raw.description ?? "", descriptionEn: raw.description ?? "",
          price: raw.price, category: raw.category,
          image: raw.images?.[0] ?? "", images: raw.images ?? [],
          material: raw.material ?? "",
          isNew: raw.badge === "חדש", isBestseller: raw.badge === "נמכר ביותר",
        };
        setProduct(p);
      })
      .catch(() => setNotFoundState(true));
  }, [id]);

  if (notFoundState) notFound();
  if (!product) return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#aaa" }}>טוען...</div>;

  const allImages = product.images.length > 0 ? product.images : [product.image];
  const [adding, setAdding] = useState(false);
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [wishlisted, setWishlisted] = useState(false);

  const related: Product[] = [];

  const isRing = product.category === "rings";

  // Simulated live viewers (cycles between realistic numbers)
  const [viewers, setViewers] = useState(11);
  useEffect(() => {
    const id = setInterval(() => {
      setViewers(v => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        return Math.max(7, Math.min(18, v + delta));
      });
    }, 4500);
    return () => clearInterval(id);
  }, []);

  const handleAddToCart = async () => {
    if (isRing && !selectedSize) {
      toast.error("אנא בחרי מידה לפני הוספה לסל", { duration: 2500 });
      return;
    }
    setAdding(true);
    addToCart(product);
    toast.success(`${product.nameHe} נוסף לסל`, {
      description: `₪${product.price.toLocaleString()}`,
      duration: 3000,
    });
    await new Promise((r) => setTimeout(r, 600));
    setAdding(false);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: product.nameHe, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("הקישור הועתק", { duration: 2000 });
      }
    } catch {}
  };

  return (
    <div className="bg-white" dir="rtl">
      <Navbar />
      <CartDrawer />

      <main className="max-w-[1200px] mx-auto px-6 lg:px-10 pt-24 pb-20">

        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-10">
          <ol className="flex items-center gap-2 text-[11px] tracking-[.18em] uppercase text-[#AAA]"
            style={{ fontFamily:"'Inter',sans-serif" }}>
            <li><Link href="/" className="hover:text-[#111] transition-colors">בית</Link></li>
            <li aria-hidden>·</li>
            <li><Link href="/shop" className="hover:text-[#111] transition-colors">חנות</Link></li>
            <li aria-hidden>·</li>
            <li className="text-[#111]" aria-current="page">{product.nameHe}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12" style={{ alignItems: "start" }}>

          {/* ── Image Gallery ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col gap-3"
          >
            {/* Badges row above viewer */}
            <div className="flex gap-2">
              {product.isNew && (
                <span className="bg-[#111] text-white text-[9px] tracking-[.2em] uppercase px-2.5 py-1"
                  style={{ fontFamily:"'Inter',sans-serif" }}>חדש</span>
              )}
              {product.isBestseller && (
                <span className="bg-[#C9A96E] text-white text-[9px] tracking-[.2em] uppercase px-2.5 py-1"
                  style={{ fontFamily:"'Inter',sans-serif" }}>נמכר ביותר</span>
              )}
            </div>

            {/* Main image + gallery */}
            <div style={{ background: "#FAFAFA", border: "1px solid #E8E8E8", aspectRatio: "1/1", overflow: "hidden", position: "relative" }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={allImages[selectedImg] ?? product.image}
                  src={allImages[selectedImg] ?? product.image}
                  alt={product.nameHe}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", position: "absolute", inset: 0 }}
                />
              </AnimatePresence>
            </div>

            {/* Thumbnails — only when more than 1 image */}
            {allImages.length > 1 && (
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {allImages.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    style={{
                      width: "64px", height: "64px", padding: 0, border: "none", cursor: "pointer",
                      boxShadow: selectedImg === i ? "0 0 0 2px #C9A96E" : "0 0 0 2px transparent",
                      background: "#FAFAFA", overflow: "hidden", flexShrink: 0,
                      transition: "box-shadow 120ms ease-out",
                    }}
                  >
                    <img src={src} alt={`תמונה ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </button>
                ))}
              </div>
            )}

            {/* Wishlist + Share */}
            <div className="flex gap-2 justify-end mt-1">
              <button
                onClick={() => setWishlisted(w => !w)}
                aria-label="רשימת משאלות"
                className="w-9 h-9 rounded-full bg-[#F5F5F5] flex items-center justify-center cursor-pointer icon-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlisted ? "#C9A96E" : "none"} stroke={wishlisted ? "#C9A96E" : "#666"} strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
              <button
                onClick={handleShare}
                aria-label="שתף"
                className="w-9 h-9 rounded-full bg-[#F5F5F5] flex items-center justify-center cursor-pointer icon-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
              </button>
            </div>
          </motion.div>

          {/* ── Product details ── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col pt-2">

            <p className="text-[10px] tracking-[.3em] uppercase text-[#999] mb-3"
              style={{ fontFamily:"'Inter',sans-serif" }}>
              {catLabels[product.category]}
            </p>

            <h1 style={{ fontFamily:"'Inter',sans-serif", fontSize:"clamp(1.6rem,3vw,2.4rem)", fontWeight:300, color:"#111", lineHeight:1.15 }}>
              {product.nameHe}
            </h1>

            {/* Rating stars */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => (
                  <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill="#C9A96E">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <span className="text-[12px] text-[#555] font-medium" style={{ fontFamily:"'Inter',sans-serif" }}>5.0</span>
              <span className="text-[11px] text-[#C9A96E] underline underline-offset-2 cursor-pointer" style={{ fontFamily:"'Inter',sans-serif" }}>48 ביקורות</span>
              <span className="text-[#E5E5E5]">·</span>
              <span className="text-[11px] text-[#888]" style={{ fontFamily:"'Inter',sans-serif" }}>הוזמן 23 פעמים החודש</span>
            </div>

            {/* Price + installments */}
            <div className="mt-5">
              <p className="text-[1.55rem] text-[#111]"
                style={{ fontFamily:"'Inter',sans-serif", fontWeight:400, letterSpacing:"-0.01em" }}>
                ₪{product.price.toLocaleString()}
              </p>
              <p className="text-[12px] text-[#C9A96E] mt-1" style={{ fontFamily:"'Inter',sans-serif" }}>
                או 3 תשלומים של ₪{Math.round(product.price / 3).toLocaleString()} ללא ריבית
              </p>
            </div>

            {/* Live viewers urgency strip */}
            <div className="mt-4 flex items-center gap-3 py-2.5 px-3 bg-[#FAFAF8] border border-[#EFEFEF]">
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A96E] opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C9A96E]" />
              </span>
              <span className="text-[11px] text-[#666]" style={{ fontFamily:"'Inter',sans-serif" }}>
                <span className="font-semibold text-[#111]">{viewers} אנשים</span> צופים כרגע במוצר זה
              </span>
              <span className="mr-auto text-[11px] text-[#E05A5A] font-medium" style={{ fontFamily:"'Inter',sans-serif" }}>
                נותרו 3 יחידות בלבד
              </span>
            </div>

            <div className="my-5 h-px bg-[#E5E5E5]" />

            <p className="text-[#555] leading-relaxed"
              style={{ fontFamily:"'Frank Ruhl Libre',serif", fontSize:"14px", fontWeight:300, lineHeight:1.75 }}>
              {product.descriptionHe}
            </p>

            {/* Material row */}
            <div className="mt-5 flex items-center gap-2">
              <span className="text-[10px] tracking-[.2em] uppercase text-[#AAA]"
                style={{ fontFamily:"'Inter',sans-serif" }}>חומר</span>
              <span className="h-px flex-1 bg-[#E5E5E5]" />
              <span className="text-[12px] text-[#555]"
                style={{ fontFamily:"'Inter',sans-serif", fontWeight:300 }}>
                {product.material.split("|")[0].trim()}
              </span>
            </div>

            {/* Size selector — rings only */}
            {isRing && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] tracking-[.2em] uppercase text-[#AAA]"
                    style={{ fontFamily:"'Inter',sans-serif" }}>בחרי מידה</span>
                  <button
                    onClick={() => toast("מדריך מידות: מדדי את היקף אצבעך במ״מ. רוב הנשים בין 48-54.", { duration: 5000 })}
                    className="text-[10px] text-[#C9A96E] underline underline-offset-2 cursor-pointer"
                    style={{ fontFamily:"'Inter',sans-serif", background:"none", border:"none" }}
                  >
                    מדריך מידות
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {RING_SIZES.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-10 h-10 text-[12px] border cursor-pointer size-btn ${
                        selectedSize === size
                          ? "border-[#C9A96E] bg-[#C9A96E] text-white"
                          : "border-[#E5E5E5] text-[#555] hover:border-[#C9A96E]"
                      }`}
                      style={{ fontFamily:"'Inter',sans-serif", fontWeight:300 }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {!selectedSize && (
                  <p className="text-[10px] text-[#AAA] mt-2" style={{ fontFamily:"'Inter',sans-serif" }}>
                    * אנא בחרי מידה
                  </p>
                )}
              </div>
            )}

            {/* Add to cart */}
            <div className="mt-8 flex flex-col gap-3">
              <button onClick={handleAddToCart} disabled={adding}
                className="w-full flex items-center justify-center gap-3 transition-all duration-200 px-8 py-4 text-[12px] tracking-[.18em] uppercase cursor-pointer min-h-[56px] font-medium"
                style={{
                  fontFamily:"'Inter',sans-serif",
                  background: adding ? "#B89355" : "#C9A96E",
                  color: "#fff",
                  border: "none",
                  boxShadow: adding ? "none" : "0 4px 20px rgba(201,169,110,0.35)",
                  transform: adding ? "none" : undefined,
                  letterSpacing: ".2em",
                }}>
                {adding ? (
                  <>
                    <motion.span animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                      className="inline-block w-3.5 h-3.5 border border-white/40 border-t-white rounded-full" />
                    מוסיף...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
                    </svg>
                    הוספה לסל
                  </>
                )}
              </button>

              {/* Delivery estimate */}
              <div className="flex items-center justify-center gap-2 py-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                <span className="text-[11px] text-[#888]" style={{ fontFamily:"'Inter',sans-serif" }}>
                  הזמיני עד 14:00 — אספקה <span className="text-[#111] font-semibold">מחר</span>
                </span>
              </div>

              <Link href="/custom"
                className="w-full flex items-center justify-center gap-2 border border-[#E5E5E5] hover:border-[#C9A96E] hover:text-[#C9A96E] text-[#111] transition-colors duration-200 px-8 py-4 text-[11px] tracking-[.22em] uppercase min-h-[52px]"
                style={{ fontFamily:"'Inter',sans-serif" }}>
                הזמנה אישית ✦
              </Link>
            </div>


            {/* Accordion */}
            <div className="mt-8 border-t border-[#E5E5E5]">
              {ACCORDION_ITEMS.map((item, i) => (
                <div key={i} className="border-b border-[#E5E5E5]">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                    className="w-full flex items-center justify-between py-4 text-right cursor-pointer"
                    style={{ background:"none", border:"none" }}
                  >
                    <span className="text-[12px] tracking-[.12em] uppercase text-[#333]"
                      style={{ fontFamily:"'Inter',sans-serif", fontWeight:400 }}>
                      {item.title}
                    </span>
                    <motion.span
                      animate={{ rotate: openAccordion === i ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-[#C9A96E] text-lg leading-none select-none"
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
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <p className="pb-5 text-[13px] text-[#666] leading-relaxed whitespace-pre-line"
                          style={{ fontFamily:"'Frank Ruhl Libre',serif", fontWeight:300, lineHeight:1.8 }}>
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

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-20 border-t border-[#E5E5E5] pt-16">
            <p className="text-[10px] tracking-[.28em] uppercase text-[#999] mb-2"
              style={{ fontFamily:"'Inter',sans-serif" }}>אולי תאהב גם</p>
            <h2 style={{ fontFamily:"'Inter',sans-serif", fontSize:"1.5rem", fontWeight:300, color:"#111" }}>
              עוד מהקולקציה
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-8">
              {related.map((p, i) => (
                <Link key={p.id} href={`/product/${p.id}`} className="group block" style={{ textDecoration: "none" }}>
                  <div style={{
                    background: "#fff", border: "1px solid #EFEFEF",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                    aspectRatio: "1/1", display: "flex", alignItems: "center",
                    justifyContent: "center", padding: "20px", overflow: "hidden",
                    marginBottom: "10px",
                  }}>
                    <img src={p.image} alt={p.nameHe} loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "contain",
                        transition: "transform 0.5s ease" }}
                      className="group-hover:scale-[1.06] transition-transform duration-500" />
                  </div>
                  <p className="text-[13px] text-[#111] group-hover:text-[#C9A96E] transition-colors"
                    style={{ fontFamily:"'Inter',sans-serif", fontWeight:300 }}>{p.nameHe}</p>
                  <p className="mt-1 text-[12px] text-[#888]"
                    style={{ fontFamily:"'Inter',sans-serif", fontWeight:300 }}>
                    ₪{p.price.toLocaleString()}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />

      <style>{`
        .icon-btn {
          transition: background-color 120ms ease-out;
        }
        @media (hover: hover) and (pointer: fine) {
          .icon-btn:hover { background-color: #EEECE8; }
        }
        .icon-btn:active { transform: scale(0.94); transition: transform 100ms ease-out; }

        .size-btn {
          transition: background-color 120ms ease-out, border-color 120ms ease-out, color 120ms ease-out;
        }
        .size-btn:active { transform: scale(0.94); }
      `}</style>
    </div>
  );
}
