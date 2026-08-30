"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ── same tokens as the shop ── */
const T = {
  gold:   "#8B7355",
  black:  "#111111",
  gray:   "#6B6B6B",
  light:  "#AAAAAA",
  border: "#E8E8E8",
  serif:  "'Cormorant Garamond', Georgia, serif",
  sans:   "'Inter', system-ui, sans-serif",
};

interface AdminProduct {
  id: string;
  name_he: string;
  name_en: string;
  price: number;
  category: string;
  is_new: boolean;
  is_bestseller: boolean;
  in_stock: boolean;
  discount: number;
  images: string[];
  image: string;
  hover_image: string | null;
  material: string;
  description_he: string;
  description_en: string;
}

const CATS = [
  { id: "all",       labelHe: "הכל" },
  { id: "rings",     labelHe: "טבעות" },
  { id: "bracelets", labelHe: "צמידים" },
  { id: "necklaces", labelHe: "שרשראות" },
  { id: "earrings",  labelHe: "עגילים" },
];

export default function Dashboard() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading]   = useState(true);
  const [cat, setCat]           = useState("all");
  const [editTarget, setEditTarget] = useState<AdminProduct | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form, setForm]         = useState<Partial<AdminProduct>>({});
  const [saving, setSaving]     = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products");
      if (!res.ok) throw new Error();
      setProducts(await res.json());
    } catch { /* silent */ }
    finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);

  function openEdit(p: AdminProduct) {
    setEditTarget(p);
    const imgs = [...(p.images ?? [])];
    if (p.image && !imgs.includes(p.image)) imgs.unshift(p.image);
    setForm({ ...p, images: imgs });
    setDrawerOpen(true);
  }
  function closeDrawer() { setDrawerOpen(false); setTimeout(() => setEditTarget(null), 320); }
  function upd<K extends keyof AdminProduct>(key: K, val: AdminProduct[K]) { setForm(f => ({ ...f, [key]: val })); }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData(); fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error();
      const { url } = await res.json();
      upd("images", [...(form.images ?? []), url] as string[] & AdminProduct["images"]);
    } catch { alert("שגיאה בהעלאת תמונה"); }
    finally { setUploading(false); if (fileRef.current) fileRef.current.value = ""; }
  }

  async function saveProduct() {
    if (!editTarget) return;
    setSaving(true);
    try {
      const imgs = (form.images ?? []).filter(Boolean);
      const payload = { ...form, price: Number(form.price) || 0, discount: Math.min(100, Math.max(0, Math.round(Number(form.discount) || 0))), images: imgs, image: imgs[0] ?? "", hover_image: imgs[1] ?? null };
      const res = await fetch(`/api/admin/products/${editTarget.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error((await res.json()).error);
      const updated = await res.json();
      setProducts(prev => prev.map(p => p.id === editTarget.id ? { ...p, ...updated } : p));
      closeDrawer();
    } catch (err: unknown) { alert("שגיאה: " + (err as Error).message); }
    finally { setSaving(false); }
  }

  async function deleteProduct(p: AdminProduct) {
    if (!confirm(`למחוק את "${p.name_he}"?`)) return;
    setDeleting(p.id);
    try {
      const res = await fetch(`/api/admin/products/${p.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setProducts(prev => prev.filter(x => x.id !== p.id));
      if (editTarget?.id === p.id) closeDrawer();
    } catch { alert("שגיאה במחיקה"); }
    finally { setDeleting(null); }
  }

  async function toggleStock(p: AdminProduct) {
    await fetch(`/api/admin/products/${p.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ in_stock: !p.in_stock }) });
    setProducts(prev => prev.map(x => x.id === p.id ? { ...x, in_stock: !p.in_stock } : x));
  }

  async function runMigration() {
    if (!confirm("לטעון את כל המוצרים מהקטלוג?")) return;
    setLoading(true);
    const res = await fetch("/api/admin/migrate", { method: "POST" });
    if (res.ok) { const { inserted } = await res.json(); alert(`✓ הועלו ${inserted} מוצרים`); await load(); }
    else { alert("שגיאה"); setLoading(false); }
  }

  const displayed = cat === "all" ? products : products.filter(p => p.category === cat);
  const discountedPrice = (form.discount ?? 0) > 0 ? Math.round((form.price ?? 0) * (1 - (form.discount ?? 0) / 100)) : null;

  const inputSx: React.CSSProperties = { width: "100%", padding: "9px 12px", border: `1px solid ${T.border}`, fontSize: "13px", outline: "none", boxSizing: "border-box", background: "#fff", fontFamily: T.sans, borderRadius: 0 };
  const labelSx: React.CSSProperties = { display: "block", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", marginBottom: "5px" };

  return (
    <>
      <style>{`
        /* grid — same as shop */
        .adm-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 48px 20px; }
        @media (max-width: 1100px) { .adm-grid { grid-template-columns: repeat(3,1fr); } }
        @media (max-width: 700px)  { .adm-grid { grid-template-columns: repeat(2,1fr); gap: 20px 12px; } }

        /* card hover overlay — desktop only */
        @media (hover: hover) {
          .adm-card:hover .adm-ov  { opacity: 1 !important; }
          .adm-card:hover .adm-del { opacity: 1 !important; }
        }
        /* mobile: always show edit bar */
        @media (hover: none) {
          .adm-ov  { opacity: 1 !important; }
          .adm-del { opacity: 1 !important; }
        }

        /* drawer: desktop slides from right, mobile slides from bottom */
        .adm-drawer {
          position: fixed; top: 0; right: 0;
          width: 520px; max-width: 100vw; height: 100dvh;
          background: #fff; z-index: 200;
          box-shadow: -6px 0 40px rgba(0,0,0,0.14);
          display: flex; flex-direction: column; direction: rtl;
          transform: translateX(100%);
          transition: transform 0.32s cubic-bezier(0.23,1,0.32,1);
        }
        .adm-drawer.open { transform: translateX(0); }

        @media (max-width: 600px) {
          .adm-drawer {
            top: auto; bottom: 0; right: 0; left: 0;
            width: 100%; height: 90dvh;
            border-radius: 18px 18px 0 0;
            transform: translateY(100%);
            transition: transform 0.32s cubic-bezier(0.23,1,0.32,1);
            box-shadow: 0 -6px 40px rgba(0,0,0,0.14);
          }
          .adm-drawer.open { transform: translateY(0); }
        }

        /* toolbar mobile */
        @media (max-width: 480px) {
          .adm-toolbar-label { display: none !important; }
          .adm-toolbar-count { display: none !important; }
        }

        /* tabs mobile */
        @media (max-width: 600px) {
          .adm-tabs { top: 60px !important; padding: 0 12px !important; }
          .adm-tabs button { padding: 12px 14px !important; font-size: 10px !important; }
        }

        /* main mobile */
        @media (max-width: 600px) {
          .adm-main { padding: 24px 16px 100px !important; }
        }

        /* no horizontal scroll on body */
        body { overflow-x: hidden; }

        /* drawer form grids collapse on very narrow screens */
        @media (max-width: 400px) {
          .adm-form-2col { grid-template-columns: 1fr !important; }
          .adm-form-3col { grid-template-columns: 1fr 1fr !important; }
        }

        /* larger touch targets in drawer */
        @media (max-width: 600px) {
          .adm-drawer input, .adm-drawer select, .adm-drawer textarea { font-size: 16px !important; padding: 11px 14px !important; }
          .adm-drawer button[type=button] { min-height: 44px; }
        }

        /* drawer handle bar on mobile */
        .adm-handle { display: none; }
        @media (max-width: 600px) {
          .adm-handle { display: block; width: 40px; height: 4px; background: #ddd; border-radius: 2px; margin: 12px auto 0; }
        }
      `}</style>

      {/* Real shop navbar */}
      <Navbar />

      {/* Category tabs — same style as shop */}
      <div className="adm-tabs" style={{ position: "sticky", top: "76px", zIndex: 40, borderBottom: `1px solid ${T.border}`, background: "#FAFAFA", padding: "0 40px", display: "flex", overflowX: "auto", direction: "rtl", scrollbarWidth: "none" }}>
        {CATS.map(c => {
          const count = c.id === "all" ? products.length : products.filter(p => p.category === c.id).length;
          const active = cat === c.id;
          return (
            <button key={c.id} onClick={() => setCat(c.id)} style={{ padding: "14px 20px", background: "none", border: "none", borderBottom: active ? `2px solid ${T.black}` : "2px solid transparent", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: active ? T.black : T.light, cursor: "pointer", whiteSpace: "nowrap", fontFamily: T.sans, transition: "color 0.15s", flexShrink: 0 }}>
              {c.labelHe} <span style={{ color: "#ddd", fontSize: "10px" }}>({count})</span>
            </button>
          );
        })}
      </div>

      {/* Product grid — shop-identical */}
      <main className="adm-main" style={{ maxWidth: "1200px", margin: "0 auto", padding: "56px 40px 120px", direction: "rtl" }}>
        {loading ? (
          /* Skeleton — same as shop */
          <div className="adm-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i}>
                <div style={{ aspectRatio: "1/1", background: "#F5F4F1", marginBottom: "14px", opacity: 0.6 + i * 0.02 }} />
                <div style={{ height: "16px", background: "#F0EEEB", marginBottom: "6px", width: "70%" }} />
                <div style={{ height: "12px", background: "#F5F4F1", width: "40%" }} />
              </div>
            ))}
          </div>
        ) : displayed.length === 0 ? (
          <div style={{ textAlign: "center", padding: "120px 0", color: T.light }}>
            {products.length === 0 ? "אין מוצרים — לחץ «⬆ טען» בסרגל האדמין" : "אין מוצרים בקטגוריה זו"}
          </div>
        ) : (
          <div className="adm-grid">
            {displayed.map((p, i) => (
              <AdminCard
                key={p.id}
                p={p}
                index={i}
                deleting={deleting === p.id}
                onEdit={() => openEdit(p)}
                onDelete={() => deleteProduct(p)}
                onToggleStock={() => toggleStock(p)}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />

      {/* ── Fixed admin toolbar at bottom ── */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 90, background: T.black, color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", height: "52px", direction: "rtl", fontFamily: T.sans, gap: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          <span style={{ fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: T.gold, border: `1px solid ${T.gold}`, padding: "3px 7px", whiteSpace: "nowrap" }}>✏ עריכה</span>
          <span className="adm-toolbar-count" style={{ fontSize: "11px", color: "#555", whiteSpace: "nowrap" }}>{products.length} מוצרים</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {products.length === 0 && !loading && (
            <button onClick={runMigration} style={{ padding: "6px 10px", background: T.gold, color: "#fff", border: "none", fontSize: "10px", cursor: "pointer", fontFamily: T.sans, whiteSpace: "nowrap" }}>⬆ טען</button>
          )}
          <a href="/admin/dashboard/new" style={{ padding: "6px 12px", background: "#fff", color: T.black, textDecoration: "none", fontSize: "10px", fontFamily: T.sans, whiteSpace: "nowrap" }}>+ חדש</a>
          <a href="/admin/orders" style={{ padding: "6px 10px", background: "transparent", color: "#aaa", textDecoration: "none", fontSize: "10px", fontFamily: T.sans, border: "1px solid #333", whiteSpace: "nowrap" }}>הזמנות</a>
          <button onClick={async () => { await fetch("/api/admin/auth", { method: "DELETE" }); window.location.href = "/admin/login"; }} style={{ padding: "6px 8px", background: "none", border: "none", color: "#555", fontSize: "12px", cursor: "pointer", fontFamily: T.sans }}>↩</button>
        </div>
      </div>

      {/* ── Backdrop ── */}
      <div onClick={closeDrawer} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 199, opacity: drawerOpen ? 1 : 0, pointerEvents: drawerOpen ? "auto" : "none", transition: "opacity 0.3s" }} />

      {/* ── Edit drawer — uses CSS class for both desktop (translateX) and mobile (translateY) ── */}
      <aside className={`adm-drawer${drawerOpen ? " open" : ""}`}>
        {/* Mobile drag handle */}
        <div className="adm-handle" />
        {/* Drawer header */}
        <div style={{ padding: "18px 24px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, background: "#FAFAFA" }}>
          <div>
            <div style={{ fontFamily: T.serif, fontSize: "1.1rem", color: T.black }}>{form.name_he || "עריכת מוצר"}</div>
            <div style={{ fontSize: "10px", color: "#bbb", marginTop: "2px" }}>{editTarget?.id}</div>
          </div>
          <button onClick={closeDrawer} style={{ background: "none", border: `1px solid ${T.border}`, width: "32px", height: "32px", cursor: "pointer", fontSize: "14px", color: "#555", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>

        {editTarget && (
          <div style={{ flex: 1, overflowY: "auto", padding: "24px", display: "flex", flexDirection: "column", gap: "18px" }}>
            {/* Images */}
            <div>
              <label style={labelSx}>תמונות ({(form.images ?? []).filter(Boolean).length})</label>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "8px" }}>
                {(form.images ?? []).filter(Boolean).map((src, i) => (
                  <div key={i} style={{ position: "relative" }}>
                    <img src={src} alt="" style={{ width: "72px", height: "72px", objectFit: "cover", background: "#F5F4F1", border: i === 0 ? `2px solid ${T.black}` : `1px solid ${T.border}` }} />
                    {i === 0 && <span style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,0.55)", color: "#fff", fontSize: "8px", textAlign: "center", padding: "2px" }}>ראשי</span>}
                    <button onClick={() => upd("images", (form.images ?? []).filter((_, j) => j !== i) as string[] & AdminProduct["images"])} style={{ position: "absolute", top: "-6px", left: "-6px", width: "18px", height: "18px", background: "#e53e3e", border: "none", cursor: "pointer", color: "#fff", fontSize: "10px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
                  </div>
                ))}
                <button onClick={() => fileRef.current?.click()} disabled={uploading} style={{ width: "72px", height: "72px", border: `1px dashed ${T.border}`, background: "#FAFAFA", cursor: "pointer", fontSize: "24px", color: "#ccc", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {uploading ? "…" : "+"}
                </button>
              </div>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />
              <p style={{ fontSize: "11px", color: T.light, margin: 0 }}>תמונה ראשונה = ראשית · שנייה = hover</p>
            </div>

            <div className="adm-form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div><label style={labelSx}>שם בעברית</label><input style={inputSx} value={form.name_he ?? ""} onChange={e => upd("name_he", e.target.value)} /></div>
              <div><label style={labelSx}>English Name</label><input style={inputSx} value={form.name_en ?? ""} onChange={e => upd("name_en", e.target.value)} dir="ltr" /></div>
            </div>
            <div className="adm-form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div><label style={labelSx}>מחיר (₪)</label><input style={inputSx} type="number" min={0} value={form.price ?? 0} onChange={e => upd("price", Number(e.target.value))} /></div>
              <div><label style={labelSx}>הנחה (%)</label><input style={inputSx} type="number" min={0} max={100} value={form.discount ?? 0} onChange={e => upd("discount", Number(e.target.value))} /></div>
            </div>
            {discountedPrice && (
              <div style={{ padding: "10px 14px", background: "#FFF3F3", fontSize: "13px", color: "#C0392B", border: "1px solid #fbc0c0" }}>
                מחיר לאחר הנחה: <strong>₪{discountedPrice.toLocaleString()}</strong>
              </div>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={labelSx}>קטגוריה</label>
                <select style={inputSx} value={form.category ?? "rings"} onChange={e => upd("category", e.target.value)}>
                  <option value="rings">טבעות</option>
                  <option value="bracelets">צמידים</option>
                  <option value="necklaces">שרשראות</option>
                  <option value="earrings">עגילים</option>
                </select>
              </div>
              <div><label style={labelSx}>חומר</label><input style={inputSx} value={form.material ?? ""} onChange={e => upd("material", e.target.value)} placeholder="זהב 14K" /></div>
            </div>
            <div className="adm-form-3col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
              <div><label style={labelSx}>מלאי</label><select style={inputSx} value={form.in_stock ? "1" : "0"} onChange={e => upd("in_stock", e.target.value === "1")}><option value="1">במלאי ✓</option><option value="0">אזל ✗</option></select></div>
              <div><label style={labelSx}>חדש</label><select style={inputSx} value={form.is_new ? "1" : "0"} onChange={e => upd("is_new", e.target.value === "1")}><option value="0">לא</option><option value="1">כן ✓</option></select></div>
              <div><label style={labelSx}>נמכר ביותר</label><select style={inputSx} value={form.is_bestseller ? "1" : "0"} onChange={e => upd("is_bestseller", e.target.value === "1")}><option value="0">לא</option><option value="1">כן ✓</option></select></div>
            </div>
            <div><label style={labelSx}>תיאור בעברית</label><textarea style={{ ...inputSx, height: "80px", resize: "vertical" }} value={form.description_he ?? ""} onChange={e => upd("description_he", e.target.value)} /></div>
            <div><label style={labelSx}>Description in English</label><textarea style={{ ...inputSx, height: "80px", resize: "vertical", direction: "ltr" }} value={form.description_en ?? ""} onChange={e => upd("description_en", e.target.value)} /></div>
          </div>
        )}

        <div style={{ padding: "16px 24px", borderTop: `1px solid ${T.border}`, display: "flex", gap: "10px", flexShrink: 0 }}>
          <button onClick={saveProduct} disabled={saving} style={{ flex: 1, padding: "12px", background: saving ? "#888" : T.black, color: "#fff", border: "none", fontSize: "12px", letterSpacing: "0.16em", textTransform: "uppercase", cursor: saving ? "not-allowed" : "pointer", fontFamily: T.sans }}>
            {saving ? "שומר..." : "שמור שינויים"}
          </button>
          <button onClick={closeDrawer} style={{ padding: "12px 18px", background: "none", border: `1px solid ${T.border}`, fontSize: "12px", color: "#555", cursor: "pointer", fontFamily: T.sans }}>ביטול</button>
        </div>
      </aside>
    </>
  );
}

/* ── Card that looks exactly like the shop's ProductCard, with admin edit overlay ── */
function AdminCard({ p, index, deleting, onEdit, onDelete, onToggleStock }: {
  p: AdminProduct; index: number; deleting: boolean;
  onEdit: () => void; onDelete: () => void; onToggleStock: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const imgSrc   = p.images?.[0] || p.image || "";
  const hoverImg = p.images?.[1] || p.hover_image || null;
  const finalPrice = p.discount > 0 ? Math.round(p.price * (1 - p.discount / 100)) : null;

  return (
    <motion.article
      className="adm-card"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.32, delay: Math.min(index * 0.05, 0.3), ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: "pointer", display: "flex", flexDirection: "column",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "transform 0.45s cubic-bezier(0.23,1,0.32,1), box-shadow 0.45s cubic-bezier(0.23,1,0.32,1)",
        boxShadow: hovered ? "0 12px 32px rgba(0,0,0,0.09)" : "none",
      }}
    >
      {/* Image block — identical to shop */}
      <div style={{ position: "relative", overflow: "hidden", background: "#fffdf9", aspectRatio: "1/1", marginBottom: "14px" }}>

        {/* Main image */}
        {imgSrc && (
          <Image
            src={imgSrc} alt={p.name_he} fill
            style={{ objectFit: "contain", transition: "transform 0.6s cubic-bezier(0.23,1,0.32,1)", transform: hovered ? "scale(1.05)" : "scale(1)" }}
            sizes="(max-width:700px) 50vw, (max-width:1100px) 33vw, 25vw"
          />
        )}

        {/* Hover / second image */}
        {hoverImg && (
          <Image
            src={hoverImg} alt="" fill
            style={{ objectFit: "contain", opacity: hovered ? 1 : 0, transition: "opacity 0.45s ease", position: "absolute", inset: 0 }}
            sizes="(max-width:700px) 50vw, 25vw"
          />
        )}

        {/* Badge — same as shop */}
        {(p.is_new || p.is_bestseller || finalPrice) && (
          <span style={{ position: "absolute", top: "12px", right: "12px", background: finalPrice ? "#C0392B" : p.is_bestseller ? T.gold : T.black, color: "#fff", fontSize: "8px", letterSpacing: "0.14em", textTransform: "uppercase", padding: "4px 9px", zIndex: 2 }}>
            {finalPrice ? `-${p.discount}%` : p.is_bestseller ? "נמכר ביותר" : "חדש"}
          </span>
        )}

        {/* Out of stock overlay */}
        {!p.in_stock && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.65)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "#888", letterSpacing: "0.14em", textTransform: "uppercase", zIndex: 2 }}>
            אזל מהמלאי
          </div>
        )}

        {/* Admin overlay — replaces the "add to cart" bar of the shop */}
        <div className="adm-ov" onClick={onEdit} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.36)", opacity: 0, transition: "opacity 0.22s", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", zIndex: 3 }}>
          <button style={{ width: "100%", padding: "12px 0", background: "#fff", border: "none", cursor: "pointer", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: T.sans, fontWeight: 500, color: T.black }}>
            ✏ עריכה
          </button>
        </div>

        {/* Delete X — top-left corner, appears on hover */}
        <button
          className="adm-del"
          onClick={e => { e.stopPropagation(); onDelete(); }}
          disabled={deleting}
          style={{ position: "absolute", top: "10px", left: "10px", width: "28px", height: "28px", background: "rgba(0,0,0,0.55)", border: "none", cursor: "pointer", color: "#fff", fontSize: "11px", opacity: 0, transition: "opacity 0.2s", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 4 }}
          title="מחיקה"
        >
          {deleting ? "…" : "✕"}
        </button>
      </div>

      {/* Product info — same as shop */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "6px" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontFamily: T.serif, fontSize: "1rem", fontWeight: 400, color: T.black, marginBottom: "4px", lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {p.name_he}
          </p>
          {p.material && (
            <p style={{ fontSize: "10px", color: T.light, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "5px" }}>{p.material}</p>
          )}
          {finalPrice ? (
            <div style={{ fontSize: "13px" }}>
              <span style={{ textDecoration: "line-through", color: "#ccc", marginLeft: "6px" }}>₪{p.price.toLocaleString()}</span>
              <span style={{ color: "#C0392B", fontWeight: 500 }}>₪{finalPrice.toLocaleString()}</span>
            </div>
          ) : (
            <p style={{ fontSize: "13px", color: T.gray, fontWeight: 300 }}>₪{p.price.toLocaleString()}</p>
          )}
        </div>

        {/* Stock toggle — small pill */}
        <button onClick={e => { e.stopPropagation(); onToggleStock(); }} title={p.in_stock ? "לחץ להסרה מהמלאי" : "לחץ להוספה למלאי"}
          style={{ fontSize: "9px", padding: "3px 8px", cursor: "pointer", flexShrink: 0, marginTop: "2px", border: `1px solid ${p.in_stock ? "#c8e6c9" : "#fbc0c0"}`, color: p.in_stock ? "#2E7D32" : "#c0392b", background: "none", fontFamily: T.sans }}>
          {p.in_stock ? "✓" : "✗"}
        </button>
      </div>
    </motion.article>
  );
}
