import { createClient } from "@supabase/supabase-js";

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL  ?? "";
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured = url.length > 0 && anon.length > 0;

export const supabase = isSupabaseConfigured
  ? createClient(url, anon)
  : null;

/* ---------- types ---------- */

export interface DbProduct {
  id: string;
  name: string;
  price: number;
  category: "rings" | "necklaces" | "bracelets" | "earrings";
  images: string[];
  badge: "נמכר ביותר" | "חדש" | null;
  description: string | null;
  in_stock: boolean;
  sizes: string[] | null;
  material: string | null;
  created_at: string;
}

/* ---------- mapper: DbProduct → UI Product shape ---------- */

export interface Product {
  id: string;
  nameHe: string;
  nameEn: string;
  descriptionHe: string;
  descriptionEn: string;
  price: number;
  category: "rings" | "necklaces" | "bracelets" | "earrings";
  image: string;
  images: string[];
  material: string;
  isNew?: boolean;
  isBestseller?: boolean;
  inStock: boolean;
}

export function mapProduct(p: DbProduct): Product {
  return {
    id: p.id,
    nameHe: p.name,
    nameEn: p.name,
    descriptionHe: p.description ?? "",
    descriptionEn: p.description ?? "",
    price: p.price,
    category: p.category,
    image: p.images?.[0] ?? "",
    images: p.images ?? [],
    material: p.material ?? "",
    isNew: p.badge === "חדש",
    isBestseller: p.badge === "נמכר ביותר",
    inStock: p.in_stock,
  };
}

/* ---------- server-side client (uses service role key) ---------- */

export function createServerClient() {
  const serverUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  if (!serverUrl || !serviceKey) throw new Error("Supabase not configured");
  return createClient(serverUrl, serviceKey, { auth: { persistSession: false } });
}
