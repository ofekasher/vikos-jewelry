"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Gem, Pen, Package, Phone, Mail, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";

const T = {
  gold:   "#8B7355",
  black:  "#111111",
  dark:   "#0D0C0A",
  cream:  "#F5F4F0",
  warm:   "#FAFAF8",
  text:   "#1A1714",
  muted:  "#8C8578",
  border: "#D8D4CB",
  serif:  "'Cormorant Garamond', Georgia, serif",
  sans:   "'Inter', system-ui, sans-serif",
};

const steps = [
  {
    icon: Pen,
    num: "01",
    title: "שיתוף החזון",
    desc: "ספרו לנו על התכשיט שחלמתם עליו — כל פרט, כל רגש, כל חומר",
  },
  {
    icon: Gem,
    num: "02",
    title: "עיצוב יחד",
    desc: "הצוות שלנו ייצור שרטוט ראשוני עבורכם ונכוונן עד לשלמות",
  },
  {
    icon: Package,
    num: "03",
    title: "יצירה ומסירה",
    desc: "הכנה בעבודת יד מקפידה ומסירה אישית עד הבית",
  },
];

/* Floating-label input */
function FloatField({
  id, label, type = "text", as, rows, value, onChange, required,
}: {
  id: string; label: string; type?: string; as?: "textarea";
  rows?: number; value: string; onChange: (v: string) => void; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  const sharedStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${lifted ? T.gold : T.border}`,
    outline: "none",
    fontFamily: T.sans,
    fontSize: "14px",
    color: T.text,
    padding: "20px 0 8px",
    transition: "border-color 0.25s",
    resize: "none" as const,
  };

  return (
    <div style={{ position: "relative", marginBottom: "28px" }}>
      <label
        htmlFor={id}
        style={{
          position: "absolute",
          top: lifted ? "2px" : "20px",
          right: 0,
          fontFamily: T.sans,
          fontSize: lifted ? "9px" : "13px",
          letterSpacing: lifted ? "0.22em" : "0",
          textTransform: lifted ? "uppercase" : "none",
          color: lifted ? T.gold : T.muted,
          transition: "all 0.22s ease",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          id={id} rows={rows || 4} value={value} required={required}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={sharedStyle}
        />
      ) : (
        <input
          id={id} type={type} value={value} required={required}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={sharedStyle}
        />
      )}
    </div>
  );
}

export default function CustomPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", budget: "", message: "" });

  const set = (k: keyof typeof form) => (v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("server error");
      setSubmitted(true);
    } catch {
      alert("שגיאה בשליחה. אנא נסו שוב או פנו אלינו ישירות.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: "100vh", background: T.warm }}>
      <Navbar />
      <CartDrawer />

      {/* ── Hero ── */}
      <section style={{ paddingTop: "140px", paddingBottom: "96px", background: T.cream, textAlign: "center", position: "relative", overflow: "hidden" }}>
        {/* Subtle background pattern */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.03,
          backgroundImage: "radial-gradient(circle, #8B7355 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ fontFamily: T.sans, fontSize: "9px", letterSpacing: "0.44em", textTransform: "uppercase", color: T.gold, marginBottom: "20px" }}
        >
          בלעדי עבורך
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ fontFamily: T.serif, fontSize: "clamp(3rem, 7vw, 5.5rem)", fontWeight: 300, color: T.text, lineHeight: 1.05, margin: "0 0 28px" }}
        >
          הזמנה<br /><em style={{ fontStyle: "italic" }}>אישית</em>
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          style={{ width: "48px", height: "1px", background: T.gold, margin: "0 auto 24px" }}
        />
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          style={{ fontFamily: T.sans, fontSize: "13px", color: T.muted, lineHeight: 1.85, maxWidth: "380px", margin: "0 auto", fontWeight: 300 }}
        >
          כל תכשיט שנוצר עבורך הוא ייחודי — פרי שיתוף פעולה בין חלומותיך לאומנות שלנו
        </motion.p>
      </section>

      {/* ── Process Steps ── */}
      <section style={{ padding: "80px 32px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0", position: "relative" }}>
          {/* Connecting line */}
          <div style={{
            position: "absolute", top: "32px", right: "16.66%", left: "16.66%",
            height: "1px", background: `linear-gradient(to left, transparent, ${T.border}, ${T.border}, transparent)`,
          }} />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.18, duration: 0.7 }}
              style={{ textAlign: "center", padding: "0 32px" }}
            >
              {/* Icon circle */}
              <div style={{
                width: "64px", height: "64px",
                border: `1px solid ${T.border}`,
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 24px",
                background: T.warm, position: "relative", zIndex: 1,
                transition: "border-color 0.25s, background 0.25s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = T.gold; (e.currentTarget as HTMLElement).style.background = "#fdf9f3"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = T.border; (e.currentTarget as HTMLElement).style.background = T.warm; }}
              >
                <step.icon size={20} strokeWidth={1.5} color={T.gold} />
              </div>

              <span style={{ fontFamily: T.sans, fontSize: "9px", letterSpacing: "0.3em", color: T.gold, display: "block", marginBottom: "10px" }}>
                {step.num}
              </span>
              <h3 style={{ fontFamily: T.serif, fontSize: "1.25rem", fontWeight: 400, color: T.text, marginBottom: "10px", lineHeight: 1.2 }}>
                {step.title}
              </h3>
              <p style={{ fontFamily: T.sans, fontSize: "12px", color: T.muted, lineHeight: 1.85, fontWeight: 300 }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Form + Info split ── */}
      <section style={{ background: T.dark }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.6fr" }}>

          {/* Left — dark info panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.75 }}
            style={{
              padding: "80px 56px",
              borderLeft: "1px solid rgba(255,255,255,0.06)",
              display: "flex", flexDirection: "column", gap: "40px",
            }}
          >
            <div>
              <p style={{ fontFamily: T.sans, fontSize: "9px", letterSpacing: "0.38em", textTransform: "uppercase", color: T.gold, marginBottom: "18px" }}>
                צרו קשר
              </p>
              <h2 style={{ fontFamily: T.serif, fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 300, color: "#fff", lineHeight: 1.15, margin: "0 0 20px" }}>
                ספרו לנו על<br /><em style={{ fontStyle: "italic" }}>החלום שלכם</em>
              </h2>
              <div style={{ width: "36px", height: "1px", background: T.gold }} />
            </div>

            <p style={{ fontFamily: T.sans, fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.9, fontWeight: 300 }}>
              כל פרויקט מתחיל בשיחה. ספרו לנו על הרגע המיוחד, האיש המיוחד, או הסיפור שאתם רוצים לספר — ואנחנו נהפוך אותו לתכשיט שיישאר לדורות.
            </p>

            {/* Contact info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {[
                { icon: Phone, text: "050-000-0000" },
                { icon: Mail, text: "studio@vikosjewelry.com" },
                { icon: MapPin, text: "תל אביב, ישראל" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <Icon size={14} strokeWidth={1.5} color={T.gold} />
                  <span style={{ fontFamily: T.sans, fontSize: "12px", color: "rgba(255,255,255,0.4)", fontWeight: 300 }}>{text}</span>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div style={{ borderRight: `2px solid ${T.gold}`, paddingRight: "16px", marginTop: "auto" }}>
              <p style={{ fontFamily: T.serif, fontSize: "1.05rem", fontStyle: "italic", color: "rgba(255,255,255,0.35)", lineHeight: 1.7 }}>
                "כל יהלום התחיל כאבן — כל תכשיט מתחיל בחלום"
              </p>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.75, delay: 0.1 }}
            style={{ padding: "80px 64px", background: T.cream }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "400px", textAlign: "center" }}
                >
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 18 }}
                    style={{
                      width: "72px", height: "72px",
                      background: T.gold, borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: "28px",
                    }}
                  >
                    <Check size={30} color="#fff" strokeWidth={2} />
                  </motion.div>
                  <h3 style={{ fontFamily: T.serif, fontSize: "2rem", fontWeight: 300, color: T.text, marginBottom: "12px" }}>
                    תודה רבה!
                  </h3>
                  <p style={{ fontFamily: T.sans, fontSize: "13px", color: T.muted, lineHeight: 1.8, maxWidth: "280px" }}>
                    קיבלנו את פנייתכם. הצוות שלנו יחזור אליכם תוך 24 שעות עם הצעה אישית.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  {/* Row: שם + טלפון */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                    <FloatField id="name" label="שם מלא" value={form.name} onChange={set("name")} required />
                    <FloatField id="phone" label="טלפון" type="tel" value={form.phone} onChange={set("phone")} required />
                  </div>

                  {/* Row: אימייל + תקציב */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                    <FloatField id="email" label="אימייל" type="email" value={form.email} onChange={set("email")} required />
                    <FloatField id="budget" label="תקציב משוער (₪)" value={form.budget} onChange={set("budget")} />
                  </div>

                  {/* Textarea */}
                  <FloatField
                    id="message" label="תארו את התכשיט שחלמתם עליו"
                    as="textarea" rows={5} value={form.message} onChange={set("message")} required
                  />

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      padding: "16px 40px",
                      background: loading ? T.muted : T.dark,
                      color: "#fff",
                      border: "none", cursor: loading ? "not-allowed" : "pointer",
                      fontFamily: T.sans, fontSize: "10px", letterSpacing: "0.26em", textTransform: "uppercase",
                      transition: "background 0.3s",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                      marginTop: "8px",
                    }}
                    onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLElement).style.background = T.gold; }}
                    onMouseLeave={e => { if (!loading) (e.currentTarget as HTMLElement).style.background = T.dark; }}
                  >
                    {loading ? (
                      <>
                        <span style={{ width: "14px", height: "14px", border: "1.5px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
                        שולח...
                      </>
                    ) : (
                      "שליחת הפנייה →"
                    )}
                  </button>

                  <p style={{ fontFamily: T.sans, fontSize: "10px", color: T.muted, marginTop: "16px", textAlign: "center", fontWeight: 300 }}>
                    * המידע נשמר בסודיות מלאה ולא יועבר לצד שלישי
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          section > div[style*="grid-template-columns: 1fr 1.6fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
