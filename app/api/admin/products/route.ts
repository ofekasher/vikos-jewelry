import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/session";

async function isAuthed(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  const token = cookieStore.get("admin_session")?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

export async function GET() {
  try {
    const db = createServerClient();
    const { data, error } = await db
      .from("products")
      .select("id,name_he,name_en,price,category,image,images,is_new,is_bestseller,in_stock,discount,created_at")
      .order("created_at", { ascending: true });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data ?? []);
  } catch {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }
}

export async function POST(req: Request) {
  const jar = await cookies();
  if (!(await isAuthed(jar))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const db = createServerClient();
  const { data, error } = await db.from("products").insert([body]).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
