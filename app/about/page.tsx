"use client";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import { useLang } from "@/lib/LanguageContext";

const C = {
  gold:  "#8B7355",
  black: "#111111",
  gray:  "#5A5A5A",
  warm:  "#F0F0EE",
  cream: "#FAFAF8",
  serif: "'Cormorant Garamond', Georgia, serif",
  sans:  "'Inter', system-ui, sans-serif",
  frank: "'Frank Ruhl Libre', serif",
};

const STRINGS = {
  he: {
    eyebrow:     "הסיפור שלנו",
    heroSub:     "הרבה יותר ממותג תכשיטים — סיפור של אהבה, משפחה וחלומות",
    vikiEyebrow: "מאיפה הכל התחיל",
    vikiMeta:    "ויקי · אמא · השראה",
    vikiTitle:   "השם VIKOS נולד מתוך האדם שהיווה השראה להכל",
    vikiBody:    "אמא שלי, ויקי — אישה חזקה, אלגנטית ומלאת אהבה. מאז שאני זוכרת את עצמי, התפעלתי ממנה. היא לימדה אותי שיופי אמיתי אינו נמדד רק במה שרואים מבחוץ, אלא בביטחון, בעוצמה ובדרך שבה אישה מרגישה כשהיא מסתכלת במראה.",
    quote:       '"תכשיט אמיתי הוא לא רק אבן יקרה או זהב איכותי — הוא רגש"',
    forWhomEyebrow: "עבור מי",
    forWhomTitle: "VIKOS נוצר עבור כל אישה שחולמת",
    dreams: [
      { icon: "♡", text: "עבור האישה שחולמת על אהבה" },
      { icon: "✦", text: "עבור האישה שחולמת על הצלחה" },
      { icon: "◇", text: "עבור האישה שחולמת להרגיש מיוחדת" },
      { icon: "∞", text: "עבור האישה שיודעת שמגיע לה הטוב ביותר" },
    ],
    philoEyebrow: "הפילוסופיה שלנו",
    philoTitle:   "כל תכשיט — רגע משמעותי",
    philoBody1:   "כל תכשיט ב-VIKOS נועד להיות חלק מרגע משמעותי בחייה של אישה — מתנה לעצמה, סמל לאהבה, זיכרון יקר או חלום שהפך למציאות.",
    philoBody2:   "המותג משלב עיצוב על-זמני, יוקרה מודרנית ותשומת לב לפרטים הקטנים ביותר — מתוך אמונה שתכשיט אמיתי הוא לא רק אבן יקרה או זהב איכותי. הוא רגש.",
    values: [
      { num: "01", title: "עיצוב על-זמני", body: "סגנון שנשאר רלוונטי מעבר לטרנדים ועונות" },
      { num: "02", title: "יוקרה מודרנית", body: "חומרים איכותיים בעיצוב נקי ומודרני" },
      { num: "03", title: "תשומת לב", body: "כל פרט נבדק, כל חיבור נבחן, כל אבן נבחרת בקפידה" },
      { num: "04", title: "רגש", body: "כל תכשיט נושא בתוכו רגש אנושי ואמיתי" },
    ],
    visionEyebrow: "החזון שלנו",
    visionTitle:   "להפוך למותג בינלאומי שמייצג נשיות, יוקרה והגשמת חלומות",
    visionBody:    "מתוך ההשראה של אמא שלי — ויקי — ועד לתכשיט שיגיע לידייך, הסיפור שלנו הוא סיפורך.",
    cta:           "גלי את הקולקציה",
  },
  en: {
    eyebrow:     "Our Story",
    heroSub:     "More than a jewelry brand — a story of love, family, and dreams",
    vikiEyebrow: "Where It All Began",
    vikiMeta:    "Viki · Mother · Inspiration",
    vikiTitle:   "The name VIKOS was born from the person who inspired everything",
    vikiBody:    "My mother, Viki — a strong, elegant, and loving woman. For as long as I can remember, I admired her. She taught me that true beauty is not measured only by what you see from the outside, but by confidence, strength, and the way a woman feels when she looks in the mirror.",
    quote:       '"A true piece of jewelry is not just a precious stone or quality gold — it is emotion"',
    forWhomEyebrow: "For Whom",
    forWhomTitle: "VIKOS was created for every woman who dreams",
    dreams: [
      { icon: "♡", text: "For the woman who dreams of love" },
      { icon: "✦", text: "For the woman who dreams of success" },
      { icon: "◇", text: "For the woman who dreams of feeling special" },
      { icon: "∞", text: "For the woman who knows she deserves the best" },
    ],
    philoEyebrow: "Our Philosophy",
    philoTitle:   "Every piece — a meaningful moment",
    philoBody1:   "Every piece of VIKOS jewelry is meant to be part of a meaningful moment in a woman's life — a gift to herself, a symbol of love, a precious memory, or a dream that became reality.",
    philoBody2:   "The brand combines timeless design, modern luxury, and attention to the smallest details — rooted in the belief that a true piece of jewelry is not just a precious stone or quality gold. It is emotion.",
    values: [
      { num: "01", title: "Timeless Design", body: "A style that stays relevant beyond trends and seasons" },
      { num: "02", title: "Modern Luxury", body: "Quality materials in clean, contemporary design" },
      { num: "03", title: "Attention to Detail", body: "Every detail checked, every joint inspected, every stone chosen with care" },
      { num: "04", title: "Emotion", body: "Every piece carries a genuine human emotion within it" },
    ],
    visionEyebrow: "Our Vision",
    visionTitle:   "To become an international brand that represents femininity, luxury, and the fulfillment of dreams",
    visionBody:    "From the inspiration of my mother — Viki — to the piece that reaches your hands, our story is your story.",
    cta:           "Explore the Collection",
  },
};

const fadeIn = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.7, ease: [0.22,1,0.36,1] as [number,number,number,number] } };

export default function AboutPage() {
  const { lang } = useLang();
  const s = STRINGS[lang === "en" ? "en" : "he"];

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <Navbar />
      <CartDrawer />

      {/* ── 1. HERO ── */}
      <section style={{
        background: C.black, minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "120px 32px 80px", textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            position: "absolute", top: 0, bottom: 0,
            left: `${(i + 1) * 14.28}%`, width: "1px",
            background: "rgba(201,169,110,0.06)", pointerEvents: "none",
          }} />
        ))}

        <p style={{ fontFamily: C.sans, fontSize: "10px", letterSpacing: "0.42em", textTransform: "uppercase", color: C.gold, marginBottom: "28px" }}>
          {s.eyebrow}
        </p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.05, ease: [0.22,1,0.36,1] }}
          style={{
            fontFamily: C.serif, fontSize: "clamp(3.5rem, 10vw, 8rem)",
            fontWeight: 300, color: "#FAFAF8", lineHeight: 0.95,
            letterSpacing: "-0.01em", margin: 0,
          }}
        >
          VIKOS
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.35 }}
          style={{
            fontFamily: C.frank, fontSize: "clamp(1rem, 2.2vw, 1.35rem)",
            fontWeight: 300, color: "rgba(250,250,248,0.55)",
            marginTop: "28px", maxWidth: "520px", lineHeight: 1.7,
          }}
        >
          {s.heroSub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ duration: 1, delay: 1.2 }}
          style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)" }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            style={{ width: "1px", height: "48px", background: C.gold, margin: "0 auto" }}
          />
        </motion.div>
      </section>

      {/* ── 2. VIKI ── */}
      <section style={{ background: C.warm, padding: "0 32px" }}>
        <motion.div
          {...fadeIn}
          style={{
            maxWidth: "1200px", margin: "0 auto", padding: "120px 0",
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "80px", alignItems: "center",
          }} className="about-two-col"
        >
          <div style={{ textAlign: "center" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: "clamp(180px, 28vw, 320px)", height: "clamp(180px, 28vw, 320px)",
              border: `1px solid ${C.gold}`, borderRadius: "50%",
              position: "relative",
              background: C.warm,
            }}>
              <div style={{ width: "62%", overflow: "hidden", lineHeight: 0 }}>
                <img
                  src="/logo.png"
                  alt="VIKOS"
                  style={{
                    width: "100%", display: "block",
                    mixBlendMode: "multiply",
                    clipPath: "inset(0 0 32% 0)",
                    marginBottom: "-32%",
                  }}
                />
              </div>
              <div style={{
                position: "absolute", inset: "12px", borderRadius: "50%",
                border: "1px solid rgba(201,169,110,0.25)",
              }} />
            </div>
            <p style={{
              fontFamily: C.sans, fontSize: "9px", letterSpacing: "0.35em",
              textTransform: "uppercase", color: C.gold, marginTop: "24px",
            }}>
              {s.vikiMeta}
            </p>
          </div>

          <div>
            <p style={{ fontFamily: C.sans, fontSize: "9px", letterSpacing: "0.38em", textTransform: "uppercase", color: C.gold, marginBottom: "18px" }}>
              {s.vikiEyebrow}
            </p>
            <h2 style={{ fontFamily: C.serif, fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 300, color: C.black, lineHeight: 1.2, margin: "0 0 28px" }}>
              {s.vikiTitle}
            </h2>
            <div style={{ width: "48px", height: "1px", background: C.gold, marginBottom: "28px" }} />
            <p style={{ fontFamily: C.frank, fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)", fontWeight: 300, color: C.gray, lineHeight: 1.9 }}>
              {s.vikiBody}
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── 3. QUOTE ── */}
      <section style={{
        background: C.black, padding: "140px 32px", textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: C.serif, fontSize: "32vw", fontWeight: 300,
          color: "rgba(201,169,110,0.04)", lineHeight: 1,
          pointerEvents: "none", userSelect: "none",
        }}>"</div>

        <motion.div
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{ width: "60px", height: "1px", background: C.gold, margin: "0 auto 48px", transformOrigin: "right" }}
        />
        <motion.p
          {...fadeIn}
          style={{
            fontFamily: C.serif, fontSize: "clamp(1.4rem, 3.2vw, 2.6rem)",
            fontWeight: 300, color: "#FAFAF8", lineHeight: 1.55,
            maxWidth: "720px", margin: "0 auto",
          }}
        >
          {s.quote}
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ width: "60px", height: "1px", background: C.gold, margin: "48px auto 0", transformOrigin: "left" }}
        />
      </section>

      {/* ── 4. FOR WHOM ── */}
      <section style={{ padding: "140px 32px", maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
        <motion.div {...fadeIn}>
          <p style={{ fontFamily: C.sans, fontSize: "9px", letterSpacing: "0.38em", textTransform: "uppercase", color: C.gold, marginBottom: "20px" }}>
            {s.forWhomEyebrow}
          </p>
          <h2 style={{ fontFamily: C.serif, fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300, color: C.black, margin: "0 auto 64px", maxWidth: "600px", lineHeight: 1.2 }}>
            {s.forWhomTitle}
          </h2>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1px", background: "#E8E8E8",
            maxWidth: "900px", margin: "0 auto",
          }} className="dreams-grid">
            {s.dreams.map((item, i) => (
              <div key={i}
                style={{
                  background: i % 2 === 0 ? "#fff" : C.warm,
                  padding: "64px 48px", display: "flex", flexDirection: "column",
                  alignItems: "center", gap: "20px",
                }}
              >
                <span style={{ fontFamily: C.serif, fontSize: "2rem", color: C.gold }}>{item.icon}</span>
                <p style={{ fontFamily: C.frank, fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", fontWeight: 300, color: C.black, lineHeight: 1.6 }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── 5. PHILOSOPHY ── */}
      <section style={{ background: C.warm }}>
        <motion.div
          {...fadeIn}
          style={{
            maxWidth: "1200px", margin: "0 auto", padding: "140px 32px",
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "80px", alignItems: "start",
          }}
          className="about-two-col"
        >
          <div>
            <p style={{ fontFamily: C.sans, fontSize: "9px", letterSpacing: "0.38em", textTransform: "uppercase", color: C.gold, marginBottom: "18px" }}>
              {s.philoEyebrow}
            </p>
            <h2 style={{ fontFamily: C.serif, fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 300, color: C.black, lineHeight: 1.2, margin: "0 0 28px" }}>
              {s.philoTitle}
            </h2>
            <div style={{ width: "48px", height: "1px", background: C.gold, marginBottom: "28px" }} />
            <p style={{ fontFamily: C.frank, fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)", fontWeight: 300, color: C.gray, lineHeight: 1.9, marginBottom: "20px" }}>
              {s.philoBody1}
            </p>
            <p style={{ fontFamily: C.frank, fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)", fontWeight: 300, color: C.gray, lineHeight: 1.9 }}>
              {s.philoBody2}
            </p>
          </div>

          {/* Editorial values grid — replaces the bar chart */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(201,169,110,0.2)", marginTop: "40px" }}>
            {s.values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22,1,0.36,1] }}
                style={{
                  background: i === 3 ? C.gold : C.warm,
                  padding: "36px 28px",
                  display: "flex", flexDirection: "column", gap: "12px",
                }}
              >
                <span style={{
                  fontFamily: C.sans, fontSize: "10px", letterSpacing: "0.2em",
                  color: i === 3 ? "rgba(255,255,255,0.6)" : C.gold,
                }}>
                  {v.num}
                </span>
                <p style={{
                  fontFamily: C.serif, fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)",
                  fontWeight: 300, color: i === 3 ? "#fff" : C.black,
                  margin: 0, lineHeight: 1.2,
                }}>
                  {v.title}
                </p>
                <p style={{
                  fontFamily: C.sans, fontSize: "11px", fontWeight: 300,
                  color: i === 3 ? "rgba(255,255,255,0.75)" : C.gray,
                  lineHeight: 1.7, margin: 0,
                }}>
                  {v.body}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── 6. VISION ── */}
      <motion.section
        {...fadeIn}
        style={{
          background: C.black, padding: "160px 32px", textAlign: "center",
          position: "relative", overflow: "hidden",
        }}
      >
        {(["tl","tr","bl","br"] as const).map(pos => (
          <div key={pos} style={{
            position: "absolute",
            top: pos.startsWith("t") ? 32 : "auto",
            bottom: pos.startsWith("b") ? 32 : "auto",
            right: pos.endsWith("r") ? 32 : "auto",
            left: pos.endsWith("l") ? 32 : "auto",
            width: 40, height: 40,
            borderTop: pos.startsWith("t") ? `1px solid ${C.gold}` : "none",
            borderBottom: pos.startsWith("b") ? `1px solid ${C.gold}` : "none",
            borderRight: pos.endsWith("r") ? `1px solid ${C.gold}` : "none",
            borderLeft: pos.endsWith("l") ? `1px solid ${C.gold}` : "none",
            opacity: 0.45,
          }} />
        ))}

        <p style={{ fontFamily: C.sans, fontSize: "9px", letterSpacing: "0.42em", textTransform: "uppercase", color: C.gold, marginBottom: "24px" }}>
          {s.visionEyebrow}
        </p>
        <h2 style={{
          fontFamily: C.serif, fontSize: "clamp(2rem, 5vw, 4.5rem)",
          fontWeight: 300, color: "#FAFAF8", lineHeight: 1.15,
          maxWidth: "760px", margin: "0 auto 40px",
        }}>
          {s.visionTitle}
        </h2>
        <div style={{ width: "80px", height: "1px", background: C.gold, margin: "0 auto 48px" }} />
        <p style={{
          fontFamily: C.frank, fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)",
          fontWeight: 300, color: "rgba(250,250,248,0.6)",
          maxWidth: "560px", margin: "0 auto", lineHeight: 1.9,
        }}>
          {s.visionBody}
        </p>

        <div style={{ marginTop: "56px" }}>
          <a href="/shop"
            style={{
              display: "inline-block",
              padding: "16px 48px", border: `1px solid ${C.gold}`,
              fontFamily: C.sans, fontSize: "10px", letterSpacing: "0.28em",
              textTransform: "uppercase", color: C.gold, textDecoration: "none",
              transition: "all 0.3s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = C.gold;
              (e.currentTarget as HTMLElement).style.color = C.black;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = C.gold;
            }}
          >
            {s.cta}
          </a>
        </div>
      </motion.section>

      <div style={{ background: C.cream }}>
        <Footer />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-two-col { grid-template-columns: 1fr !important; gap: 48px !important; }
          .dreams-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
