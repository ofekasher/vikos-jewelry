"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./products";

interface CartItem {
  product: Product;
  quantity: number;
}

interface StoreState {
  cart: CartItem[];
  wishlist: Product[];
  isCartOpen: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  toggleCart: () => void;
  cartTotal: () => number;
  cartCount: () => number;
  toggleWishlist: (product: Product) => void;
  isWishlisted: (id: string) => boolean;
  wishlistCount: () => number;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      isCartOpen: false,

      addToCart: (product) => {
        const cart = get().cart;
        const existing = cart.find((i) => i.product.id === product.id);
        if (existing) {
          set({ cart: cart.map((i) => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i) });
        } else {
          set({ cart: [...cart, { product, quantity: 1 }] });
        }
        set({ isCartOpen: true });
      },

      removeFromCart: (id) =>
        set({ cart: get().cart.filter((i) => i.product.id !== id) }),

      updateQuantity: (id, qty) => {
        if (qty <= 0) { get().removeFromCart(id); return; }
        set({ cart: get().cart.map((i) => i.product.id === id ? { ...i, quantity: qty } : i) });
      },

      toggleCart: () => set({ isCartOpen: !get().isCartOpen }),

      cartTotal: () =>
        get().cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0),

      cartCount: () =>
        get().cart.reduce((sum, i) => sum + i.quantity, 0),

      toggleWishlist: (product) => {
        const wishlist = get().wishlist;
        const exists = wishlist.find((p) => p.id === product.id);
        set({ wishlist: exists ? wishlist.filter((p) => p.id !== product.id) : [...wishlist, product] });
      },

      isWishlisted: (id) => !!get().wishlist.find((p) => p.id === id),

      wishlistCount: () => get().wishlist.length,
    }),
    { name: "vikos-store", partialize: (s) => ({ cart: s.cart, wishlist: s.wishlist }) }
  )
);
