import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/session";

async function isAuthed() {
  const jar = await cookies();
  const token = jar.get("admin_session")?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const db = createServerClient();
    const { data, error } = await db.from("products").select("*").eq("id", id).single();
    if (!error && data) return NextResponse.json(data);
  } catch {
    // fall through to static
  }

  // Fallback: static product catalogue
  const { products } = await import("@/lib/products");
  const p = products.find(x => x.id === id);
  if (!p) return NextResponse.json({ error: "Product not found" }, { status: 404 });

  return NextResponse.json({
    id:            p.id,
    name_he:       p.nameHe,
    name_en:       p.nameEn,
    description_he: p.descriptionHe ?? "",
    description_en: p.descriptionEn ?? "",
    price:         p.price,
    category:      p.category,
    image:         p.image,
    hover_image:   p.hoverImage ?? null,
    images:        p.images ?? [p.image],
    material:      p.material ?? "",
    is_new:        p.isNew ?? false,
    is_bestseller: p.isBestseller ?? false,
    in_stock:      true,
    discount:      0,
    created_at:    new Date().toISOString(),
    updated_at:    new Date().toISOString(),
  });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const db = createServerClient();
  const { data, error } = await db.from("products").update(body).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const db = createServerClient();
  const { error } = await db.from("products").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
