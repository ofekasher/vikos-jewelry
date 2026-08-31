import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/session";
import { createClient } from "@supabase/supabase-js";

function adminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}

async function isAuthed(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get("admin_session")?.value;
  return token ? verifySessionToken(token) : false;
}

export async function GET() {
  if (!(await isAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sb = adminClient();
  const { data, error } = await sb
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const sb = adminClient();
  const { data, error } = await sb.from("orders").insert([{
    customer_name:    body.customer_name ?? "",
    customer_email:   body.customer_email ?? "",
    customer_phone:   body.customer_phone ?? null,
    items:            body.items ?? [],
    total:            Number(body.total) || 0,
    status:           body.status ?? "new",
    notes:            body.notes ?? null,
    shipping_address: body.shipping_address ?? null,
  }]).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
