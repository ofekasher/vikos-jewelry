"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=85", alt: "Gold ring", span: "col-span-1 row-span-2" },
  { src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=85", alt: "Necklace", span: "col-span-1" },
  { src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=85", alt: "Bracelet", span: "col-span-1" },
  { src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=900&q=85", alt: "Earrings", span: "col-span-1 row-span-2" },
  { src: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=900&q=85", alt: "Ring close-up", span: "col-span-2" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85", alt: "Craft process", span: "col-span-1" },
  { src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&q=85", alt: "Diamond ring", span: "col-span-1" },
  { src: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=900&q=85", alt: "Gold collection", span: "col-span-2" },
];

export default function GalleryPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#1A1714]">
      <Navbar />
      <CartDrawer />

      {/* Header */}
      <section className="pt-40 pb-20 px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-[0.4em] uppercase text-[#C9A96E] mb-4"
        >
          {"גלריית VIKOS"}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-6xl font-serif text-[#FAFAF8]"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
        >
          {"הגלריה"}
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="gold-divider mt-6"
        />
      </section>

      {/* Masonry-like Grid */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[300px]">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: Math.min(i * 0.05, 0.35), duration: 0.6 }}
              className={`${img.span} overflow-hidden group cursor-pointer relative`}
              onClick={() => setSelected(img.src)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <ZoomIn
                  size={28}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-8"
            onClick={() => setSelected(null)}
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={selected}
              alt="Gallery detail"
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-[#FAFAF8]">
        <Footer />
      </div>
    </main>
  );
}
