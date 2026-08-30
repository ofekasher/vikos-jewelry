import { NextResponse } from "next/server";
import { products } from "@/lib/products";

const SB_URL      = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const EDGE_URL    = `${SB_URL}/functions/v1/admin-products?action=upsert`;
const EDGE_SECRET = process.env.EDGE_SECRET ?? "vikos-edge-admin-2026";

export async function POST(req: Request) {
  const { cookies } = await import("next/headers");
  const { verifySessionToken } = await import("@/lib/session");
  const jar = await cookies();
  const sessionToken = jar.get("admin_session")?.value ?? "";
  const headerToken = req.headers.get("x-admin-token") ?? "";
  const authed =
    (sessionToken && (await verifySessionToken(sessionToken))) ||
    headerToken === process.env.ADMIN_PASSWORD;
  if (!authed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

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

  const headers = { "Authorization": `Bearer ${EDGE_SECRET}`, "Content-Type": "application/json" };

  // Batch upsert in groups of 50
  let inserted = 0;
  const BATCH = 50;
  for (let i = 0; i < rows.length; i += BATCH) {
    const batch = rows.slice(i, i + BATCH);
    const res = await fetch(EDGE_URL, { method: "POST", headers, body: JSON.stringify(batch) });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return NextResponse.json({ error: err.error ?? "Edge function error", done: inserted }, { status: 500 });
    }
    const data = await res.json();
    inserted += data.inserted ?? batch.length;
  }

  return NextResponse.json({ inserted, total: rows.length });
}
