"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "sonner";
import { CheckCircle, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import { useStore } from "@/lib/store";

const T = {
  gold: "#C9A96E",
  black: "#111111",
  gray: "#6B6B6B",
  border: "#E8E8E8",
  warm: "#F9F7F4",
  serif: "'Cormorant Garamond', Georgia, serif",
  sans: "'Inter', system-ui, sans-serif",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  border: `1px solid ${T.border}`,
  background: "#fff",
  fontFamily: T.sans,
  fontSize: "13px",
  color: T.black,
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{ fontFamily: T.sans, fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#888" }}>
        {label}
      </label>
      <input
        {...props}
        style={inputStyle}
        onFocus={e => (e.currentTarget.style.borderColor = T.gold)}
        onBlur={e => (e.currentTarget.style.borderColor = T.border)}
      />
    </div>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, cart: cartItems } = useStore();
  const total = cartTotal();
  const [step, setStep] = useState<"details" | "payment" | "success">("details");
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", zip: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [summaryOpen, setSummaryOpen] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "שם חובה";
    if (!form.email.includes("@")) e.email = "אימייל לא תקין";
    if (!form.phone.trim()) e.phone = "טלפון חובה";
    if (!form.address.trim()) e.address = "כתובת חובה";
    if (!form.city.trim()) e.city = "עיר חובה";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setStep("payment");
  };

  const handleSuccess = () => {
    setStep("success");
  };

  if (cartItems.length === 0 && step !== "success") {
    return (
      <div style={{ background: "#fff", minHeight: "100vh" }} dir="rtl">
        <Navbar /><CartDrawer />
        <div style={{ textAlign: "center", padding: "120px 32px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          <p style={{ fontFamily: T.serif, fontSize: "1.4rem", fontWeight: 300, color: "#AAA" }}>הסל ריק</p>
          <Link href="/shop" style={{ padding: "12px 32px", background: T.black, color: "#fff", fontFamily: T.sans, fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", textDecoration: "none" }}>
            לחנות
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }} dir="rtl">
      <Navbar />
      <CartDrawer />

      {/* Header */}
      <section style={{ paddingTop: "72px", paddingBottom: "28px", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 32px" }}>
          <p style={{ fontFamily: T.sans, fontSize: "9px", letterSpacing: "0.38em", textTransform: "uppercase", color: T.gold, marginBottom: "8px" }}>
            תשלום
          </p>
          <h1 style={{ fontFamily: T.serif, fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, color: T.black, margin: 0 }}>
            סיום הזמנה
          </h1>
        </div>
      </section>

      <AnimatePresence mode="wait">
        {step === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ maxWidth: "520px", margin: "80px auto", padding: "0 32px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}
          >
            <CheckCircle size={52} color={T.gold} strokeWidth={1} />
            <h2 style={{ fontFamily: T.serif, fontSize: "2rem", fontWeight: 300, color: T.black }}>
              ההזמנה אושרה!
            </h2>
            <p style={{ fontFamily: T.sans, fontSize: "13px", color: T.gray, lineHeight: 1.7, fontWeight: 300 }}>
              תודה על הרכישה. אישור ישלח לאימייל <strong>{form.email}</strong>.<br />
              זמן אספקה 3–5 ימי עסקים.
            </p>
            <Link href="/shop" style={{ marginTop: "16px", padding: "14px 40px", background: T.gold, color: "#fff", fontFamily: T.sans, fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", textDecoration: "none" }}>
              המשך קנייה
            </Link>
          </motion.div>
        ) : (
          <motion.main
            key="checkout"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 32px 80px" }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "48px", alignItems: "start" }} className="checkout-grid">

              {/* Left: form */}
              <div>
                {/* Step indicator */}
                <div style={{ display: "flex", gap: "12px", marginBottom: "32px", alignItems: "center" }}>
                  {["פרטים", "תשלום"].map((s, i) => (
                    <div key={s} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{
                        width: "24px", height: "24px", borderRadius: "50%",
                        background: i === (step === "details" ? 0 : 1) ? T.gold : (i < (step === "payment" ? 1 : 0) ? T.black : "#E5E5E5"),
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: T.sans, fontSize: "10px", color: "#fff",
                        transition: "background 0.3s",
                      }}>
                        {i + 1}
                      </div>
                      <span style={{ fontFamily: T.sans, fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: i === (step === "details" ? 0 : 1) ? T.black : "#AAA" }}>
                        {s}
                      </span>
                      {i === 0 && <ChevronDown size={12} color="#CCC" style={{ transform: "rotate(-90deg)" }} />}
                    </div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {step === "details" && (
                    <motion.form
                      key="details"
                      initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                      onSubmit={handleDetailsSubmit}
                      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
                    >
                      <h2 style={{ fontFamily: T.sans, fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", color: T.black, fontWeight: 500, margin: 0 }}>
                        פרטים אישיים
                      </h2>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                        <div>
                          <Field label="שם מלא *" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="ישראל ישראלי" />
                          {errors.name && <p style={{ fontFamily: T.sans, fontSize: "10px", color: "#E55", marginTop: "4px" }}>{errors.name}</p>}
                        </div>
                        <div>
                          <Field label="אימייל *" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" />
                          {errors.email && <p style={{ fontFamily: T.sans, fontSize: "10px", color: "#E55", marginTop: "4px" }}>{errors.email}</p>}
                        </div>
                      </div>

                      <div>
                        <Field label="טלפון *" type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="050-0000000" />
                        {errors.phone && <p style={{ fontFamily: T.sans, fontSize: "10px", color: "#E55", marginTop: "4px" }}>{errors.phone}</p>}
                      </div>

                      <h2 style={{ fontFamily: T.sans, fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", color: T.black, fontWeight: 500, margin: "8px 0 0" }}>
                        כתובת משלוח
                      </h2>

                      <div>
                        <Field label="רחוב ומספר *" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} placeholder="רחוב הרצל 1" />
                        {errors.address && <p style={{ fontFamily: T.sans, fontSize: "10px", color: "#E55", marginTop: "4px" }}>{errors.address}</p>}
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                        <div>
                          <Field label="עיר *" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} placeholder="תל אביב" />
                          {errors.city && <p style={{ fontFamily: T.sans, fontSize: "10px", color: "#E55", marginTop: "4px" }}>{errors.city}</p>}
                        </div>
                        <Field label="מיקוד" value={form.zip} onChange={e => setForm(f => ({ ...f, zip: e.target.value }))} placeholder="12345" />
                      </div>

                      <button type="submit" style={{
                        marginTop: "8px", padding: "16px", background: T.black, color: "#fff",
                        border: "none", cursor: "pointer", fontFamily: T.sans,
                        fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase",
                        transition: "background 0.2s",
                      }}
                        onMouseEnter={e => (e.currentTarget.style.background = T.gold)}
                        onMouseLeave={e => (e.currentTarget.style.background = T.black)}
                      >
                        המשך לתשלום →
                      </button>
                    </motion.form>
                  )}

                  {step === "payment" && (
                    <motion.div
                      key="payment"
                      initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                      style={{ display: "flex", flexDirection: "column", gap: "24px" }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h2 style={{ fontFamily: T.sans, fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", color: T.black, fontWeight: 500, margin: 0 }}>
                          תשלום באמצעות PayPal
                        </h2>
                        <button onClick={() => setStep("details")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: T.sans, fontSize: "11px", color: T.gold, textDecoration: "underline" }}>
                          ← חזור לפרטים
                        </button>
                      </div>

                      <div style={{ padding: "20px", background: T.warm, borderRadius: "2px" }}>
                        <p style={{ fontFamily: T.sans, fontSize: "12px", color: T.gray, marginBottom: "4px" }}>שולם על ידי</p>
                        <p style={{ fontFamily: T.sans, fontSize: "13px", color: T.black, fontWeight: 400 }}>{form.name} · {form.email}</p>
                      </div>

                      <PayPalScriptProvider options={{
                        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
                        currency: "ILS",
                        locale: "he_IL",
                      }}>
                        <PayPalButtons
                          style={{ layout: "vertical", color: "gold", shape: "rect", label: "pay", height: 48 }}
                          createOrder={(_data, actions) => {
                            return actions.order.create({
                              intent: "CAPTURE",
                              purchase_units: [{
                                amount: { currency_code: "ILS", value: total.toString() },
                                description: "VIKOS Jewelry",
                              }],
                            });
                          }}
                          onApprove={async (_data, actions) => {
                            await actions.order?.capture();
                            handleSuccess();
                          }}
                          onError={() => toast.error("שגיאה בתשלום, נסה שוב")}
                        />
                      </PayPalScriptProvider>

                      <p style={{ fontFamily: T.sans, fontSize: "10px", color: "#AAA", textAlign: "center", lineHeight: 1.6 }}>
                        התשלום מאובטח ומוצפן. VIKOS לא שומרת פרטי כרטיס אשראי.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right: order summary — accordion on mobile */}
              <div style={{ position: "sticky", top: "90px" }} className="checkout-summary">
                {/* Mobile accordion header */}
                <button onClick={() => setSummaryOpen(v => !v)} className="summary-toggle"
                  style={{ width: "100%", display: "none", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", background: T.warm, border: "none", cursor: "pointer", fontFamily: T.sans, fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: T.black }}>
                  <span>סיכום הזמנה · ₪{(total + (total >= 500 ? 0 : 30)).toLocaleString()}</span>
                  <ChevronDown size={16} style={{ transform: summaryOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} />
                </button>
              <div style={{ background: T.warm, padding: "28px" }} className={summaryOpen ? "summary-body open" : "summary-body"}>
                <h3 style={{ fontFamily: T.sans, fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: T.black, marginBottom: "20px", fontWeight: 500 }}>
                  סיכום הזמנה
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "20px" }}>
                  {cartItems.map(item => (
                    <div key={item.product.id} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                      <div style={{ width: "56px", height: "56px", flexShrink: 0, overflow: "hidden", background: "#fff" }}>
                        <img src={item.product.image} alt={item.product.nameHe} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: T.sans, fontSize: "12px", color: T.black, fontWeight: 300, marginBottom: "2px" }}>
                          {item.product.nameHe}
                        </p>
                        <p style={{ fontFamily: T.sans, fontSize: "11px", color: "#AAA" }}>כמות: {item.quantity}</p>
                      </div>
                      <p style={{ fontFamily: T.sans, fontSize: "13px", color: T.black, fontWeight: 300, flexShrink: 0 }}>
                        ₪{(item.product.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: T.sans, fontSize: "12px", color: T.gray }}>סכום ביניים</span>
                    <span style={{ fontFamily: T.sans, fontSize: "12px", color: T.gray }}>₪{total.toLocaleString()}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: T.sans, fontSize: "12px", color: T.gray }}>משלוח</span>
                    <span style={{ fontFamily: T.sans, fontSize: "12px", color: total >= 500 ? "#4CAF50" : T.gray }}>
                      {total >= 500 ? "חינם" : "₪30"}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", borderTop: `1px solid ${T.border}`, paddingTop: "12px", marginTop: "4px" }}>
                    <span style={{ fontFamily: T.serif, fontSize: "1rem", color: T.black }}>סה״כ לתשלום</span>
                    <span style={{ fontFamily: T.serif, fontSize: "1.2rem", color: T.gold, fontWeight: 400 }}>
                      ₪{(total + (total >= 500 ? 0 : 30)).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .checkout-grid { grid-template-columns: 1fr !important; }
          .checkout-summary { position: static !important; }
          .summary-toggle { display: flex !important; }
          .summary-body { display: none; padding: 20px !important; }
          .summary-body.open { display: block; }
        }
      `}</style>
    </div>
  );
}
