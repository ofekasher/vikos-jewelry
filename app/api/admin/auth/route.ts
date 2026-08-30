import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSessionToken } from "@/lib/session";

const USERS: Record<string, string | undefined> = {
  ofek: process.env.ADMIN_PASSWORD,
  gfen:  process.env.GFEN_PASSWORD,
};

export async function POST(req: Request) {
  const { username, password } = await req.json();
  const key = (username ?? "ofek").toLowerCase().trim();
  const expected = USERS[key];
  if (!expected || password !== expected) {
    return NextResponse.json({ error: "שם משתמש או סיסמה שגויים" }, { status: 401 });
  }
  const token = await createSessionToken(key);
  const jar = await cookies();
  jar.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const jar = await cookies();
  jar.delete("admin_session");
  return NextResponse.json({ ok: true });
}
