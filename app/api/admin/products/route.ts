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
  const db = createServerClient();
  const { data, error } = await db
    .from("products")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
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
