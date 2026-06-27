"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const T = {
  gold:   "#C9A96E",
  black:  "#111111",
  gray:   "#6B6B6B",
  light:  "#AAAAAA",
  border: "rgba(201,169,110,0.25)",
  warm:   "#FAFAF8",
  serif:  "'Cormorant Garamond', Georgia, serif",
  sans:   "'Inter', system-ui, sans-serif",
};

const reviews = [
  {
    name: "מיכל כ.",
    initials: "מ",
    date: "מרץ 2025",
    stars: 5,
    text: "קיבלתי את הטבעת כמתנה ליום הנישואים שלי ואני פשוט לא מצליחה להוריד אותה. עבודת יד מדהימה, איכות שמרגישים בה מיד.",
    product: "טבעת ערוגה",
  },
  {
    name: "שירה ל.",
    initials: "ש",
    date: "פברואר 2025",
    stars: 5,
    text: "השרשרת הכי יפה שקיבלתי אי פעם. כל מי שרואה אותה שואלת מאיפה. שירות מדהים ומשלוח מהיר מהצפוי.",
    product: "שרשרת שחר",
  },
  {
    name: "רותם א.",
    initials: "ר",
    date: "ינואר 2025",
    stars: 5,
    text: "הזמנתי עגילים לאמא שלי ליום הולדת — היא פרצה בבכי מרוב שמחה. התכשיט נראה יקר פי עשרה ממחירו.",
    product: "עגילי פנינה",
  },
  {
    name: "דנה מ.",
    initials: "ד",
    date: "אפריל 2025",
    stars: 5,
    text: "הטבעת המתכווננת מתאימה בדיוק — לא צריך לדעת מידה מראש! עבודת היד מרהיבה והאריזה הרגישה יוקרתית ממש.",
    product: "טבעת שחר",
  },
  {
    name: "נועה ס.",
    initials: "נ",
    date: "מרץ 2025",
    stars: 5,
    text: "קניתי תכשיטים בהרבה מקומות אבל ויקוס זה ברמה אחרת לגמרי. השרשרת שקיבלתי עדינה, אלגנטית, ובדיוק כמו שתואר.",
    product: "שרשרת לונה",
  },
  {
    name: "תמר ב.",
    initials: "ת",
    date: "פברואר 2025",
    stars: 5,
    text: "הצמיד היה מתנה לחתונת אחותי. כולם שאלו מאיפה — כבר שלחנו 4 חברות אליכם. מוצר מדהים ושירות יוצא מן הכלל.",
    product: "צמיד שקט",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: "2px", marginBottom: "12px" }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: T.gold, fontSize: "13px" }}>★</span>
      ))}
    </div>
  );
}

function ReviewCard({ review, delay }: { review: typeof reviews[0]; delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        border: `1px solid ${hovered ? "rgba(201,169,110,0.5)" : T.border}`,
        padding: "28px 24px",
        display: "flex", flexDirection: "column", gap: "8px",
        boxShadow: hovered ? "0 8px 32px rgba(201,169,110,0.12)" : "0 2px 12px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.3s, border-color 0.3s",
        height: "100%",
      }}
    >
      {/* Avatar + name + date */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
        <div style={{
          width: "40px", height: "40px", borderRadius: "50%",
          background: T.gold, color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: T.serif, fontSize: "1.1rem", fontWeight: 500,
          flexShrink: 0,
        }}>
          {review.initials}
        </div>
        <div>
          <p style={{ fontFamily: T.sans, fontSize: "13px", fontWeight: 500, color: T.black, margin: 0 }}>
            {review.name}
          </p>
          <p style={{ fontFamily: T.sans, fontSize: "10px", color: T.light, margin: 0 }}>
            {review.date}
          </p>
        </div>
      </div>

      <Stars count={review.stars} />

      <p style={{
        fontFamily: T.sans, fontSize: "13px", color: T.gray, lineHeight: 1.8, fontWeight: 300,
        display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
        flexGrow: 1,
      }}>
        {review.text}
      </p>

      {/* Product tag */}
      <div style={{ marginTop: "8px" }}>
        <span style={{
          fontFamily: T.sans, fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase",
          color: T.gold, border: `1px solid ${T.border}`, padding: "3px 10px",
        }}>
          {review.product}
        </span>
      </div>
    </div>
  );
}

const VISIBLE = 3;
const AUTO_INTERVAL = 4000;

export default function ReviewsCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = reviews.length;
  const maxIndex = total - VISIBLE;

  const go = useCallback((dir: 1 | -1) => {
    setDirection(dir);
    setIndex(prev => {
      let next = prev + dir;
      if (next > maxIndex) next = 0;
      if (next < 0) next = maxIndex;
      return next;
    });
  }, [maxIndex]);

  const resetTimer = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => go(1), AUTO_INTERVAL);
  };

  useEffect(() => {
    timer.current = setInterval(() => go(1), AUTO_INTERVAL);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [go]);

  const visible = reviews.slice(index, index + VISIBLE);

  return (
    <section style={{ background: "#fff", padding: "96px 32px" }}>
      <div style={{ maxWidth: "1160px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{ fontFamily: T.sans, fontSize: "9px", letterSpacing: "0.36em", textTransform: "uppercase", color: T.gold, marginBottom: "14px" }}>
            ביקורות אמיתיות
          </p>
          <h2 style={{ fontFamily: T.serif, fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 300, color: T.black, margin: "0 0 16px" }}>
            מה הלקוחות אומרים
          </h2>
          <div style={{ width: "40px", height: "1px", background: T.gold, margin: "0 auto" }} />
        </div>

        {/* Carousel */}
        <div style={{ position: "relative" }}>
          {/* Desktop: 3 cards */}
          <div className="reviews-desktop"
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" }}
          >
            {visible.map((r, i) => (
              <ReviewCard key={r.name} review={r} delay={i * 0.08} />
            ))}
          </div>

          {/* Mobile: 1 card */}
          <div className="reviews-mobile">
            <ReviewCard review={reviews[index]} delay={0} />
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", marginTop: "40px" }}>
          <button
            aria-label="ביקורת קודמת"
            onClick={() => { go(-1); resetTimer(); }}
            style={{
              width: "44px", height: "44px", borderRadius: "50%",
              border: `1px solid ${T.border}`, background: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "border-color 0.2s, background 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = T.gold; (e.currentTarget as HTMLElement).style.background = "rgba(201,169,110,0.06)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = T.border; (e.currentTarget as HTMLElement).style.background = "none"; }}
          >
            <ChevronRight size={16} color={T.gold} strokeWidth={1.5} />
          </button>

          {/* Dots */}
          <div style={{ display: "flex", gap: "8px" }}>
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                aria-label={`עמוד ${i + 1}`}
                onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); resetTimer(); }}
                style={{
                  width: i === index ? "20px" : "6px", height: "6px",
                  borderRadius: "3px",
                  background: i === index ? T.gold : "rgba(201,169,110,0.3)",
                  border: "none", cursor: "pointer", padding: 0,
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>

          <button
            aria-label="ביקורת הבאה"
            onClick={() => { go(1); resetTimer(); }}
            style={{
              width: "44px", height: "44px", borderRadius: "50%",
              border: `1px solid ${T.border}`, background: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "border-color 0.2s, background 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = T.gold; (e.currentTarget as HTMLElement).style.background = "rgba(201,169,110,0.06)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = T.border; (e.currentTarget as HTMLElement).style.background = "none"; }}
          >
            <ChevronLeft size={16} color={T.gold} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <style>{`
        .reviews-desktop { display: block; }
        .reviews-mobile  { display: none; }
        @media (max-width: 768px) {
          .reviews-desktop { display: none; }
          .reviews-mobile  { display: block; }
        }
      `}</style>
    </section>
  );
}
