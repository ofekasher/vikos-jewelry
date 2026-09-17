import "server-only";
import { products as staticProducts, type Product } from "./products";
import { createServerClient, mapProduct, type DbProduct } from "./supabase";

/**
 * Server-side product access for SEO surfaces (sitemap, metadata, JSON-LD).
 * Supabase is the source of truth; the static list is only a fallback so
 * these pages still render if the database is unreachable at build/request time.
 */
export async function getAllProducts(): Promise<Product[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return staticProducts;
  }
  try {
    const db = createServerClient();
    const { data, error } = await db.from("products").select("*").order("created_at", { ascending: false });
    if (error || !data) throw error ?? new Error("no data");
    return (data as DbProduct[]).map(mapProduct);
  } catch (err) {
    console.error("getAllProducts: falling back to static list", err);
    return staticProducts;
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  // Check the static list first and skip the network call entirely when found:
  // any no-store fetch here — even one that's never reached for most ids —
  // forces Next.js to render the whole /product/[id] route dynamically instead
  // of using the pages generateStaticParams already pre-renders at build time.
  const fromStatic = staticProducts.find((p) => p.id === id);
  if (fromStatic) return fromStatic;

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return null;
  }
  try {
    const db = createServerClient();
    const { data, error } = await db.from("products").select("*").eq("id", id).maybeSingle();
    if (error) throw error;
    if (data) return mapProduct(data as DbProduct);
  } catch (err) {
    console.error(`getProduct(${id}): live lookup failed`, err);
  }
  return null;
}
