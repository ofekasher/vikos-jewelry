import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { products } from "@/lib/products";

// One-time migration: POST /api/admin/migrate
// Requires x-admin-token header matching ADMIN_PASSWORD
export async function POST(req: Request) {
  const { cookies } = await import("next/headers");
  const { verifySessionToken } = await import("@/lib/session");
  const jar = await cookies();
  const sessionToken = jar.get("admin_session")?.value ?? "";
  const headerToken = req.headers.get("x-admin-token") ?? "";
  const authed =
    (sessionToken && (await verifySessionToken(sessionToken))) ||
    headerToken === process.env.ADMIN_PASSWORD;
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = createServerClient();
  const rows = products.map(p => ({
    id:             p.id,
    name_he:        p.nameHe,
    name_en:        p.nameEn,
    description_he: p.descriptionHe ?? "",
    description_en: p.descriptionEn ?? "",
    price:          p.price,
    category:       p.category,
    image:          p.image,
    hover_image:    p.hoverImage ?? null,
    images:         p.images?.length ? p.images : [p.image],
    material:       p.material ?? "",
    is_new:         p.isNew ?? false,
    is_bestseller:  p.isBestseller ?? false,
    in_stock:       true,
    discount:       0,
  }));

  // Batch upsert in groups of 50
  let inserted = 0;
  const BATCH = 50;
  for (let i = 0; i < rows.length; i += BATCH) {
    const batch = rows.slice(i, i + BATCH);
    const { error } = await db.from("products").upsert(batch);
    if (error) return NextResponse.json({ error: error.message, done: inserted }, { status: 500 });
    inserted += batch.length;
  }

  return NextResponse.json({ inserted, total: rows.length });
}
