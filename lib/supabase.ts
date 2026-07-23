import { createClient } from "@supabase/supabase-js";

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL  ?? "";
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured = url.length > 0 && anon.length > 0;

export const supabase = isSupabaseConfigured
  ? createClient(url, anon)
  : null;

/* ── DB row shape (matches setup.sql) ── */
export interface DbProduct {
  id:             string;
  name_he:        string;
  name_en:        string;
  description_he: string;
  description_en: string;
  price:          number;
  category:       "rings" | "necklaces" | "bracelets" | "earrings";
  image:          string;
  hover_image:    string | null;
  images:         string[];
  material:       string;
  is_new:         boolean;
  is_bestseller:  boolean;
  in_stock:       boolean;
  discount:       number;
  created_at:     string;
  updated_at:     string;
}

/* ── UI shape (used everywhere in the app) ── */
export interface Product {
  id:             string;
  nameHe:         string;
  nameEn:         string;
  descriptionHe:  string;
  descriptionEn:  string;
  price:          number;
  category:       "rings" | "necklaces" | "bracelets" | "earrings";
  image:          string;
  hoverImage?:    string;
  images:         string[];
  material:       string;
  isNew?:         boolean;
  isBestseller?:  boolean;
  inStock:        boolean;
  discount:       number;
}

/* ── mapper ── */
export function mapProduct(p: DbProduct): Product {
  return {
    id:            p.id,
    nameHe:        p.name_he,
    nameEn:        p.name_en,
    descriptionHe: p.description_he ?? "",
    descriptionEn: p.description_en ?? "",
    price:         p.price,
    category:      p.category,
    image:         p.image || p.images?.[0] || "",
    hoverImage:    p.hover_image ?? undefined,
    images:        p.images?.length ? p.images : (p.image ? [p.image] : []),
    material:      p.material,
    isNew:         p.is_new,
    isBestseller:  p.is_bestseller,
    inStock:       p.in_stock,
    discount:      p.discount ?? 0,
  };
}

/* ── server-side client (service role — admin only) ── */
export function createServerClient() {
  const serverUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL    ?? "";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY   ?? "";
  if (!serverUrl || !serviceKey) throw new Error("Supabase not configured");
  return createClient(serverUrl, serviceKey, {
    auth: { persistSession: false },
    // Force Next.js to never cache Supabase fetch calls so admin changes appear immediately
    global: {
      fetch: (url: RequestInfo | URL, init?: RequestInit) =>
        fetch(url, { ...init, cache: "no-store" }),
    },
  });
}
