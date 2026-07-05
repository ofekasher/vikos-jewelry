import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { products } from "@/lib/products";

// One-time migration: POST /api/admin/migrate
// Only works in development (or with correct admin token)
export async function POST(req: Request) {
  const token = req.headers.get("x-admin-token");
  if (token !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = createServerClient();
  const rows = products.map(p => ({
    name:        p.nameHe,
    price:       p.price,
    category:    p.category,
    images:      p.images ?? [p.image],
    badge:       p.isBestseller ? "נמכר ביותר" : p.isNew ? "חדש" : null,
    description: p.descriptionHe ?? null,
    in_stock:    true,
    material:    p.material ?? null,
    sizes:       null,
  }));

  const { data, error } = await db
    .from("products")
    .insert(rows)
    .select("id, name");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ inserted: data?.length, products: data });
}
