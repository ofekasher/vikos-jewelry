import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM = `אתה עוזר אישי של VIKOS Jewelry — מותג תכשיטים יוקרתי ישראלי.
תפקידך לעזור ללקוחות בעברית בצורה חמה, מקצועית ותמציתית.

מידע על המותג:
- VIKOS Jewelry מתמחה בתכשיטים מעוצבים ביד בישראל
- קטגוריות: טבעות, שרשראות, צמידים, עגילים
- חומרים: זהב 14K/18K, זהב לבן, כסף 925
- ניתן להזמין תכשיט אישי מותאם דרך דף "הזמנה אישית"
- משלוחים בכל הארץ
- יצירת קשר: דרך וואטסאפ או דף "צור קשר"

כללים:
- ענה תמיד בעברית
- תשובות קצרות ומועילות (2-4 משפטים)
- אם שואלים על מחיר ספציפי שלא יודעת — הפנה לחנות
- אל תמציא מידע שאין לך`;

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 400,
    system: SYSTEM,
    messages,
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "";
  return NextResponse.json({ text });
}
