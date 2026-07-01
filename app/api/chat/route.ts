import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

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
  try {
    const { messages } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM,
    });

    const history = messages.slice(0, -1).map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const chat = model.startChat({ history });
    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastMessage);
    const text = result.response.text();

    return NextResponse.json({ text });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { text: "מצטערת, לא הצלחתי להתחבר כרגע. נסה שוב בעוד רגע." },
      { status: 500 }
    );
  }
}
