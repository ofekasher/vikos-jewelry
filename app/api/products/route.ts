import { NextResponse } from "next/server";
import { createServerClient, mapProduct } from "@/lib/supabase";
import { products as staticProducts } from "@/lib/products";

// No caching — always fetch fresh from Supabase so admin changes appear immediately
export const dynamic = "force-dynamic";

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
    return NextResponse.json(staticProducts);
  }
}
