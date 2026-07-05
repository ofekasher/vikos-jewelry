import { NextResponse } from "next/server";
import { createServerClient, mapProduct } from "@/lib/supabase";

export const revalidate = 60; // ISR: refresh every 60 seconds

export async function GET() {
  try {
    const db = createServerClient();
    const { data, error } = await db
      .from("products")
      .select("*")
      .eq("in_stock", true)
      .order("created_at", { ascending: true });

    if (error) throw error;
    return NextResponse.json((data ?? []).map(mapProduct));
  } catch (err) {
    console.error("[api/products] Supabase error:", err);
    // Fallback to hardcoded data so the site never breaks
    const { products } = await import("@/lib/products");
    return NextResponse.json(products);
  }
}
