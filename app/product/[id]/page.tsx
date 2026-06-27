"use client";
import { use, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { products } from "@/lib/products";
import { useStore } from "@/lib/store";
import Card3D from "@/components/Card3D";
import ProductViewer360 from "@/components/ProductViewer360";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
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
  {
    title: "משלוח והחזרה",
    content: "משלוח חינם על הזמנות מעל ₪500. זמן אספקה 3-5 ימי עסקים. ניתן להחזיר תוך 30 יום ממועד קבלה — ללא שאלות. החזרה חינם.",
  },
];

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  const { addToCart } = useStore();
  const allImages = product.images.length > 0 ? product.images : [product.image];
  const [adding, setAdding] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [wishlisted, setWishlisted] = useState(false);

  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const isRing = product.category === "rings";

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

          {/* ── 360° Product Viewer ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
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

            {/* 360 viewer */}
            <ProductViewer360 images={allImages} alt={product.nameHe} />

            {/* Wishlist + Share */}
            <div className="flex gap-2 justify-end mt-1">
              <button
                onClick={() => setWishlisted(w => !w)}
                aria-label="רשימת משאלות"
                className="w-9 h-9 rounded-full bg-[#F5F5F5] flex items-center justify-center cursor-pointer transition-colors hover:bg-[#EEECE8]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlisted ? "#C9A96E" : "none"} stroke={wishlisted ? "#C9A96E" : "#666"} strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
              <button
                onClick={handleShare}
                aria-label="שתף"
                className="w-9 h-9 rounded-full bg-[#F5F5F5] flex items-center justify-center cursor-pointer transition-colors hover:bg-[#EEECE8]"
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
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
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
                  <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill="#C9A96E">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <span className="text-[11px] text-[#AAA]" style={{ fontFamily:"'Inter',sans-serif" }}>5.0 (48 ביקורות)</span>
            </div>

            <p className="mt-4 text-[1.35rem] text-[#111]"
              style={{ fontFamily:"'Inter',sans-serif", fontWeight:300 }}>
              ₪{product.price.toLocaleString()}
            </p>

            <div className="my-6 h-px bg-[#E5E5E5]" />

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
                      className={`w-10 h-10 text-[12px] border transition-all duration-150 cursor-pointer ${
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
                className="w-full flex items-center justify-center gap-3 bg-[#111] hover:bg-[#222] disabled:bg-[#555] text-white transition-colors duration-200 px-8 py-4 text-[11px] tracking-[.22em] uppercase cursor-pointer min-h-[52px]"
                style={{ fontFamily:"'Inter',sans-serif" }}>
                {adding ? (
                  <>
                    <motion.span animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                      className="inline-block w-3.5 h-3.5 border border-white/40 border-t-white rounded-full" />
                    מוסיף...
                  </>
                ) : "הוסף לסל"}
              </button>
              <Link href="/custom"
                className="w-full flex items-center justify-center gap-2 border border-[#E5E5E5] hover:border-[#111] text-[#111] transition-colors duration-200 px-8 py-4 text-[11px] tracking-[.22em] uppercase min-h-[52px]"
                style={{ fontFamily:"'Inter',sans-serif" }}>
                הזמנה אישית
              </Link>
            </div>

            {/* Trust signals */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                "משלוח חינם מ-₪500",
                "החזרה חינם 30 יום",
                "אחריות לכל החיים",
                "תעודת אמינות",
              ].map((label) => (
                <div key={label} className="flex items-start gap-2">
                  <span className="text-[#C9A96E] text-[8px] mt-0.5">✦</span>
                  <span className="text-[11px] text-[#888] leading-snug"
                    style={{ fontFamily:"'Frank Ruhl Libre',serif", fontWeight:300 }}>
                    {label}
                  </span>
                </div>
              ))}
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
    </div>
  );
}
