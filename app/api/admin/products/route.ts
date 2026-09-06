import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/session";

const SB_URL    = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SB_ANON   = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const EDGE_URL  = `${SB_URL}/functions/v1/admin-products`;
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

export async function GET() {
  try {
    const db = anonClient();
    const { data, error } = await db
      .from("products")
      .select("id,name_he,name_en,price,category,image,images,hover_image,is_new,is_bestseller,in_stock,discount,material,description_he,description_en,created_at")
      .order("created_at", { ascending: true });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data ?? []);
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 503 });
  }
}

export async function POST(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!EDGE_SECRET) return NextResponse.json({ error: "EDGE_SECRET not configured" }, { status: 503 });
  const body = await req.json();
  const res = await fetch(EDGE_URL, { method: "POST", headers: edgeHeaders(), body: JSON.stringify(body) });
  const data = await res.json();
  if (!res.ok) return NextResponse.json(data, { status: res.status });
  return NextResponse.json(data, { status: 201 });
}
