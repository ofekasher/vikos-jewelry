"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { useLang } from "@/lib/LanguageContext";

export default function CartDrawer() {
  const { cart, isCartOpen, toggleCart, removeFromCart, updateQuantity, cartTotal } = useStore();
  const { lang } = useLang();
  const total = cartTotal();
  const en = lang === "en";
  const strings = {
    title:    en ? "Your Bag"        : "עגלת הקניות",
    empty:    en ? "Your bag is empty" : "העגלה ריקה",
    total:    en ? "Total"           : "סה״כ",
    checkout: en ? "Checkout"        : "לתשלום",
    remove:   en ? "Remove item"     : "הסר מוצר",
    close:    en ? "Close bag"       : "סגור סל",
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/25 backdrop-blur-[2px]"
            onClick={toggleCart}
          />
          <motion.aside
            initial={{ x: -420 }} animate={{ x: 0 }} exit={{ x: -420 }}
            transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-[400px] bg-white shadow-2xl flex flex-col"
            aria-label="סל קניות"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-[#E5E5E5]">
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.4rem", fontWeight:400, color:"#111" }}>
                {strings.title}
              </h2>
              <button onClick={toggleCart} aria-label={strings.close}
                className="p-2 text-[#AAA] hover:text-[#111] transition-colors cursor-pointer">
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag size={36} strokeWidth={1} className="text-[#DDD]" />
                  <p className="text-[13px] text-[#AAA]"
                    style={{ fontFamily:"'Inter',sans-serif", fontWeight:300 }}>
                    {strings.empty}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  <AnimatePresence>
                    {cart.map((item) => (
                      <motion.div key={item.product.id}
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }} transition={{ duration: 0.25 }}
                        className="flex gap-4">
                        <div className="w-18 h-18 rounded overflow-hidden flex-shrink-0 bg-[#EEECE8]"
                          style={{ width: 72, height: 72 }}>
                          <img src={item.product.image} alt={en ? item.product.nameEn : item.product.nameHe}
                            className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between gap-2">
                            <p className="text-[13px] text-[#111] leading-snug truncate"
                              style={{ fontFamily:"'Inter',sans-serif", fontWeight:300 }}>
                              {en ? item.product.nameEn : item.product.nameHe}
                            </p>
                            <button onClick={() => removeFromCart(item.product.id)}
                              className="text-[#CCC] hover:text-[#111] transition-colors cursor-pointer flex-shrink-0"
                              aria-label={strings.remove}>
                              <X size={13} />
                            </button>
                          </div>
                          <p className="text-[11px] text-[#AAA] mt-0.5"
                            style={{ fontFamily:"'Inter',sans-serif" }}>
                            {item.product.material.split("|")[0].trim()}
                          </p>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center border border-[#E5E5E5]">
                              <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="w-7 h-7 flex items-center justify-center text-[#888] hover:text-[#111] transition-colors cursor-pointer">
                                <Minus size={11} />
                              </button>
                              <span className="w-7 text-center text-[12px] text-[#111]"
                                style={{ fontFamily:"'Inter',sans-serif" }}>
                                {item.quantity}
                              </span>
                              <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="w-7 h-7 flex items-center justify-center text-[#888] hover:text-[#111] transition-colors cursor-pointer">
                                <Plus size={11} />
                              </button>
                            </div>
                            <span className="text-[13px] text-[#C9A96E]"
                              style={{ fontFamily:"'Inter',sans-serif", fontWeight:300 }}>
                              ₪{(item.product.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="px-8 py-6 border-t border-[#E5E5E5]">
                <div className="flex justify-between items-center mb-5">
                  <span className="text-[12px] text-[#888]" style={{ fontFamily:"'Inter',sans-serif" }}>
                    {strings.total}
                  </span>
                  <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.3rem", fontWeight:400, color:"#111" }}>
                    ₪{total.toLocaleString()}
                  </span>
                </div>
                <Link href="/checkout" onClick={toggleCart}
                  className="w-full py-3.5 bg-[#111] text-white text-[11px] tracking-[.22em] uppercase hover:bg-[#C9A96E] transition-colors duration-300 cursor-pointer min-h-[48px] flex items-center justify-center"
                  style={{ fontFamily:"'Inter',sans-serif", textDecoration:"none" }}>
                  {strings.checkout}
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
