import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/session";

const SB_URL      = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SB_ANON     = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const EDGE_URL    = `${SB_URL}/functions/v1/admin-products`;
const EDGE_SECRET = process.env.EDGE_SECRET; // no hardcoded fallback — must come from env

function anonClient() {
  return createClient(SB_URL, SB_ANON, { auth: { persistSession: false } });
}

function edgeHeaders() {
  return { "Authorization": `Bearer ${EDGE_SECRET}`, "Content-Type": "application/json" };
}

async function isAuthed(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get("admin_session")?.value;
  return token ? verifySessionToken(token) : false;
}

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const db = anonClient();
    const { data, error } = await db.from("products").select("*").eq("id", id).single();
    if (!error && data) return NextResponse.json(data);
  } catch { /* fall through */ }

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
  if (!EDGE_SECRET) return NextResponse.json({ error: "EDGE_SECRET not configured" }, { status: 503 });
  const { id } = await params;
  const body = await req.json();
  const res = await fetch(`${EDGE_URL}?id=${id}`, { method: "PATCH", headers: edgeHeaders(), body: JSON.stringify(body) });
  const data = await res.json();
  if (!res.ok) return NextResponse.json(data, { status: res.status });
  return NextResponse.json(data);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!EDGE_SECRET) return NextResponse.json({ error: "EDGE_SECRET not configured" }, { status: 503 });
  const { id } = await params;
  const res = await fetch(`${EDGE_URL}?id=${id}`, { method: "DELETE", headers: edgeHeaders() });
  const data = await res.json();
  if (!res.ok) return NextResponse.json(data, { status: res.status });
  return NextResponse.json({ success: true });
}
