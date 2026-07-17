"use client";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";

const T = {
  gold:  "#8B7355",
  black: "#111111",
  gray:  "#5A5A5A",
  warm:  "#F0F0EE",
  cream: "#FAFAF8",
  serif: "'Cormorant Garamond', Georgia, serif",
  sans:  "'Inter', system-ui, sans-serif",
  frank: "'Frank Ruhl Libre', serif",
};

const fadeIn = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.7, ease: [0.22,1,0.36,1] as [number,number,number,number] } };

export default function AboutPage() {
  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <Navbar />
      <CartDrawer />

      {/* ── 1. HERO ── */}
      <section style={{
        background: T.black, minHeight: "100vh",
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

        <p style={{ fontFamily: T.sans, fontSize: "10px", letterSpacing: "0.42em", textTransform: "uppercase", color: T.gold, marginBottom: "28px" }}>
          הסיפור שלנו
        </p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.05, ease: [0.22,1,0.36,1] }}
          style={{
            fontFamily: T.serif, fontSize: "clamp(3.5rem, 10vw, 8rem)",
            fontWeight: 300, color: "#FAFAF8", lineHeight: 0.95,
            letterSpacing: "-0.01em", margin: 0,
          }}
        >
          VIKOS
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.35 }}
          style={{
            fontFamily: T.frank, fontSize: "clamp(1rem, 2.2vw, 1.35rem)",
            fontWeight: 300, color: "rgba(250,250,248,0.55)",
            marginTop: "28px", maxWidth: "480px", lineHeight: 1.7,
          }}
        >
          הרבה יותר ממותג תכשיטים — סיפור של אהבה, משפחה וחלומות
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ duration: 1, delay: 1.2 }}
          style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)" }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            style={{ width: "1px", height: "48px", background: T.gold, margin: "0 auto" }}
          />
        </motion.div>
      </section>

      {/* ── 2. VIKI ── */}
      <section style={{ background: T.warm, padding: "0 32px" }}>
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
              border: `1px solid ${T.gold}`, borderRadius: "50%",
              position: "relative",
              background: T.warm,
            }}>
              <div style={{ width: "62%", overflow: "hidden", lineHeight: 0 }}>
                <img
                  src="/logo.png"
                  alt="VIKOS"
                  style={{
                    width: "100%", display: "block",
                    mixBlendMode: "multiply",
                    /* crop bottom ~45% — the checkered transparent artifact */
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
              fontFamily: T.sans, fontSize: "9px", letterSpacing: "0.35em",
              textTransform: "uppercase", color: T.gold, marginTop: "24px",
            }}>
              ויקי · אמא · השראה
            </p>
          </div>

          <div>
            <p style={{ fontFamily: T.sans, fontSize: "9px", letterSpacing: "0.38em", textTransform: "uppercase", color: T.gold, marginBottom: "18px" }}>
              מאיפה הכל התחיל
            </p>
            <h2 style={{ fontFamily: T.serif, fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 300, color: T.black, lineHeight: 1.2, margin: "0 0 28px" }}>
              השם VIKOS נולד מתוך האדם שהיווה השראה להכל
            </h2>
            <div style={{ width: "48px", height: "1px", background: T.gold, marginBottom: "28px" }} />
            <p style={{ fontFamily: T.frank, fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)", fontWeight: 300, color: T.gray, lineHeight: 1.9 }}>
              אמא שלי, ויקי — אישה חזקה, אלגנטית ומלאת אהבה. מאז שאני זוכרת את עצמי, התפעלתי ממנה. היא לימדה אותי שיופי אמיתי אינו נמדד רק במה שרואים מבחוץ, אלא בביטחון, בעוצמה ובדרך שבה אישה מרגישה כשהיא מסתכלת במראה.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── 3. QUOTE ── */}
      <section style={{
        background: T.black, padding: "140px 32px", textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: T.serif, fontSize: "32vw", fontWeight: 300,
          color: "rgba(201,169,110,0.04)", lineHeight: 1,
          pointerEvents: "none", userSelect: "none",
        }}>"</div>

        <motion.div
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{ width: "60px", height: "1px", background: T.gold, margin: "0 auto 48px", transformOrigin: "right" }}
        />
        <motion.p
          {...fadeIn}
          style={{
            fontFamily: T.serif, fontSize: "clamp(1.4rem, 3.2vw, 2.6rem)",
            fontWeight: 300, color: "#FAFAF8", lineHeight: 1.55,
            maxWidth: "720px", margin: "0 auto",
          }}
        >
          "תכשיט אמיתי הוא לא רק אבן יקרה או זהב איכותי — הוא רגש"
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ width: "60px", height: "1px", background: T.gold, margin: "48px auto 0", transformOrigin: "left" }}
        />
      </section>

      {/* ── 4. FOR WHOM ── */}
      <section style={{ padding: "140px 32px", maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
        <motion.div {...fadeIn}>
          <p style={{ fontFamily: T.sans, fontSize: "9px", letterSpacing: "0.38em", textTransform: "uppercase", color: T.gold, marginBottom: "20px" }}>
            עבור מי
          </p>
          <h2 style={{ fontFamily: T.serif, fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300, color: T.black, margin: "0 auto 64px", maxWidth: "600px", lineHeight: 1.2 }}>
            VIKOS נוצר עבור כל אישה שחולמת
          </h2>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1px", background: "#E8E8E8",
            maxWidth: "900px", margin: "0 auto",
          }} className="dreams-grid">
            {[
              { icon: "♡", text: "עבור האישה שחולמת על אהבה" },
              { icon: "✦", text: "עבור האישה שחולמת על הצלחה" },
              { icon: "◇", text: "עבור האישה שחולמת להרגיש מיוחדת" },
              { icon: "∞", text: "עבור האישה שיודעת שמגיע לה הטוב ביותר" },
            ].map((item, i) => (
              <div key={i}
                style={{
                  background: i % 2 === 0 ? "#fff" : T.warm,
                  padding: "64px 48px", display: "flex", flexDirection: "column",
                  alignItems: "center", gap: "20px",
                }}
              >
                <span style={{ fontFamily: T.serif, fontSize: "2rem", color: T.gold }}>{item.icon}</span>
                <p style={{ fontFamily: T.frank, fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", fontWeight: 300, color: T.black, lineHeight: 1.6 }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── 5. PHILOSOPHY ── */}
      <section style={{ background: T.warm }}>
        <motion.div
          {...fadeIn}
          style={{
            maxWidth: "1200px", margin: "0 auto", padding: "140px 32px",
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "80px", alignItems: "center",
          }}
          className="about-two-col"
        >
          <div>
            <p style={{ fontFamily: T.sans, fontSize: "9px", letterSpacing: "0.38em", textTransform: "uppercase", color: T.gold, marginBottom: "18px" }}>
              הפילוסופיה שלנו
            </p>
            <h2 style={{ fontFamily: T.serif, fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 300, color: T.black, lineHeight: 1.2, margin: "0 0 28px" }}>
              כל תכשיט — רגע משמעותי
            </h2>
            <div style={{ width: "48px", height: "1px", background: T.gold, marginBottom: "28px" }} />
            <p style={{ fontFamily: T.frank, fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)", fontWeight: 300, color: T.gray, lineHeight: 1.9, marginBottom: "20px" }}>
              כל תכשיט ב-VIKOS נועד להיות חלק מרגע משמעותי בחייה של אישה — מתנה לעצמה, סמל לאהבה, זיכרון יקר או חלום שהפך למציאות.
            </p>
            <p style={{ fontFamily: T.frank, fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)", fontWeight: 300, color: T.gray, lineHeight: 1.9 }}>
              המותג משלב עיצוב על-זמני, יוקרה מודרנית ותשומת לב לפרטים הקטנים ביותר — מתוך אמונה שתכשיט אמיתי הוא לא רק אבן יקרה או זהב איכותי. הוא רגש.
            </p>
          </div>

          <div style={{ display: "flex", gap: "20px", height: "360px", alignItems: "flex-end" }}>
            {[
              { pct: "55%", label: "עיצוב על-זמני" },
              { pct: "75%", label: "יוקרה מודרנית" },
              { pct: "40%", label: "תשומת לב" },
              { pct: "90%", label: "רגש" },
            ].map((col, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
                <motion.div
                  initial={{ height: 0 }} whileInView={{ height: col.pct }}
                  viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1, ease: [0.22,1,0.36,1] }}
                  style={{
                    width: "100%",
                    background: i === 3 ? T.gold : `rgba(201,169,110,${0.2 + i * 0.12})`,
                    minHeight: 0,
                  }}
                />
                <p style={{
                  fontFamily: T.sans, fontSize: "8px", letterSpacing: "0.16em",
                  textTransform: "uppercase", color: T.gold, textAlign: "center",
                }}>{col.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── 6. VISION ── */}
      <motion.section
        {...fadeIn}
        style={{
          background: T.black, padding: "160px 32px", textAlign: "center",
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
            borderTop: pos.startsWith("t") ? `1px solid ${T.gold}` : "none",
            borderBottom: pos.startsWith("b") ? `1px solid ${T.gold}` : "none",
            borderRight: pos.endsWith("r") ? `1px solid ${T.gold}` : "none",
            borderLeft: pos.endsWith("l") ? `1px solid ${T.gold}` : "none",
            opacity: 0.45,
          }} />
        ))}

        <p style={{ fontFamily: T.sans, fontSize: "9px", letterSpacing: "0.42em", textTransform: "uppercase", color: T.gold, marginBottom: "24px" }}>
          החזון שלנו
        </p>
        <h2 style={{
          fontFamily: T.serif, fontSize: "clamp(2rem, 5vw, 4.5rem)",
          fontWeight: 300, color: "#FAFAF8", lineHeight: 1.15,
          maxWidth: "760px", margin: "0 auto 40px",
        }}>
          להפוך למותג בינלאומי שמייצג נשיות, יוקרה והגשמת חלומות
        </h2>
        <div style={{ width: "80px", height: "1px", background: T.gold, margin: "0 auto 48px" }} />
        <p style={{
          fontFamily: T.frank, fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)",
          fontWeight: 300, color: "rgba(250,250,248,0.6)",
          maxWidth: "560px", margin: "0 auto", lineHeight: 1.9,
        }}>
          מתוך ההשראה של אמא שלי — ויקי — ועד לתכשיט שיגיע לידייך, הסיפור שלנו הוא סיפורך.
        </p>

        <div style={{ marginTop: "56px" }}>
          <a href="/shop"
            style={{
              display: "inline-block",
              padding: "16px 48px", border: `1px solid ${T.gold}`,
              fontFamily: T.sans, fontSize: "10px", letterSpacing: "0.28em",
              textTransform: "uppercase", color: T.gold, textDecoration: "none",
              transition: "all 0.3s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = T.gold;
              (e.currentTarget as HTMLElement).style.color = T.black;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = T.gold;
            }}
          >
            גלי את הקולקציה
          </a>
        </div>
      </motion.section>

      <div style={{ background: T.cream }}>
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
