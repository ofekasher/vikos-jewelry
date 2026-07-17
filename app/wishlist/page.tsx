"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { Heart, ShoppingBag, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import { useStore } from "@/lib/store";

const T = {
  gold: "#8B7355",
  black: "#111111",
  gray: "#6B6B6B",
  border: "#E8E8E8",
  serif: "'Cormorant Garamond', Georgia, serif",
  sans: "'Inter', system-ui, sans-serif",
};

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useStore();

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }} dir="rtl">
      <Navbar />
      <CartDrawer />

      <section style={{ paddingTop: "72px", paddingBottom: "36px", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px" }}>
          <p style={{ fontFamily: T.sans, fontSize: "9px", letterSpacing: "0.38em", textTransform: "uppercase", color: T.gold, marginBottom: "12px" }}>
            שמורים
          </p>
          <h1 style={{ fontFamily: T.serif, fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, color: T.black, margin: 0, lineHeight: 1.1 }}>
            המועדפים שלי
          </h1>
        </div>
      </section>

      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "56px 32px 80px" }}>
        {wishlist.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: "center", padding: "96px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}
          >
            <Heart size={40} strokeWidth={1} color="#DDD" />
            <p style={{ fontFamily: T.serif, fontSize: "1.3rem", color: "#AAA", fontWeight: 300 }}>
              אין מוצרים במועדפים עדיין
            </p>
            <Link href="/shop" style={{
              marginTop: "8px", padding: "12px 32px",
              background: T.black, color: "#fff",
              fontFamily: T.sans, fontSize: "10px", letterSpacing: "0.22em",
              textTransform: "uppercase", textDecoration: "none",
            }}>
              לחנות
            </Link>
          </motion.div>
        ) : (
          <>
            <p style={{ fontFamily: T.sans, fontSize: "11px", color: "#AAA", marginBottom: "32px", letterSpacing: "0.1em" }}>
              {wishlist.length} פריטים
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px 20px" }} className="wishlist-grid">
              <AnimatePresence>
                {wishlist.map((p, i) => (
                  <motion.article
                    key={p.id}
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                    style={{ cursor: "pointer" }}
                  >
                    <div style={{ position: "relative", overflow: "hidden", background: "#fff", aspectRatio: "3/4", marginBottom: "12px" }}>
                      <Link href={`/product/${p.id}`}>
                        <img src={p.image} alt={p.nameHe} loading="lazy"
                          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                      </Link>

                      {/* Remove from wishlist */}
                      <button
                        onClick={() => { toggleWishlist(p); toast.success(`${p.nameHe} הוסר מהמועדפים`); }}
                        aria-label="הסר ממועדפים"
                        style={{
                          position: "absolute", top: "10px", left: "10px",
                          width: "32px", height: "32px", borderRadius: "50%",
                          background: "rgba(255,255,255,0.9)", border: "none",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        <X size={13} color="#666" />
                      </button>

                      {/* Quick add */}
                      <button
                        onClick={() => { addToCart(p); toast.success(`${p.nameHe} נוסף לסל`); }}
                        style={{
                          position: "absolute", bottom: 0, left: 0, right: 0,
                          padding: "13px", background: "rgba(255,255,255,0.92)",
                          backdropFilter: "blur(4px)", border: "none", cursor: "pointer",
                          display: "flex", alignItems: "center", justifyContent: "center", gap: "7px",
                          fontFamily: T.sans, fontSize: "10px", letterSpacing: "0.18em",
                          textTransform: "uppercase", color: T.black,
                        }}
                      >
                        <ShoppingBag size={12} strokeWidth={1.5} />
                        הוסף לסל
                      </button>
                    </div>
                    <Link href={`/product/${p.id}`} style={{ textDecoration: "none" }}>
                      <p style={{ fontFamily: T.serif, fontSize: "0.98rem", fontWeight: 400, color: T.black, marginBottom: "4px" }}>
                        {p.nameHe}
                      </p>
                      <p style={{ fontFamily: T.sans, fontSize: "13px", color: T.gray, fontWeight: 300 }}>
                        ₪{p.price.toLocaleString()}
                      </p>
                    </Link>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </section>

      <Footer />

      <style>{`
        @media (max-width: 1100px) { .wishlist-grid { grid-template-columns: repeat(3,1fr) !important; } }
        @media (max-width: 700px)  { .wishlist-grid { grid-template-columns: repeat(2,1fr) !important; gap: 24px 12px !important; } }
      `}</style>
    </div>
  );
}
