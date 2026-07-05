"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useStore } from "@/lib/store";
import type { Product } from "@/lib/products";

interface Props {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: Props) {
  const { addToCart } = useStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group"
    >
      {/* Image */}
      <Link href={`/shop/${product.id}`}>
        <div className="relative overflow-hidden mb-4" style={{ aspectRatio: "1 / 1", background: "#fafafa" }}>
          <img
            src={product.image}
            alt={product.nameHe}
            className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ objectFit: "contain" }}
            loading="lazy"
          />
          {/* Badges */}
          <div className="absolute top-4 start-4 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-[#C9A96E] text-white text-[10px] tracking-widest uppercase px-2.5 py-1">
                {"חדש"}
              </span>
            )}
            {product.isBestseller && (
              <span className="bg-[#1A1714] text-[#C9A96E] text-[10px] tracking-widest uppercase px-2.5 py-1">
                {"נמכר ביותר"}
              </span>
            )}
          </div>
          {/* Quick add overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
              className="w-full py-3 bg-[#FAFAF8] text-[#1A1714] text-xs tracking-[0.15em] uppercase flex items-center justify-center gap-2 hover:bg-[#C9A96E] hover:text-white transition-colors duration-300"
            >
              <ShoppingBag size={14} />
              {"הוסף לסל"}
            </button>
          </motion.div>
        </div>
      </Link>

      {/* Info */}
      <div>
        <Link href={`/shop/${product.id}`}>
          <h3 className="font-serif text-lg text-[#1A1714] hover:text-[#C9A96E] transition-colors duration-300 mb-1"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {product.nameHe}
          </h3>
        </Link>
        <p className="text-xs text-[#8C8578] tracking-wide mb-2">{product.material}</p>
        <p className="text-base text-[#C9A96E] font-medium">₪{product.price.toLocaleString()}</p>
      </div>
    </motion.div>
  );
}
