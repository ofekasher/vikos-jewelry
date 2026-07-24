"use client";
import { useEffect, useState } from "react";

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
  { id: "all",       label: "הכל" },
  { id: "rings",     label: "טבעות" },
  { id: "bracelets", label: "צמידים" },
  { id: "necklaces", label: "שרשראות" },
  { id: "earrings",  label: "עגילים" },
];

export default function Dashboard() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");
  const [cat, setCat]           = useState("all");
  const [editTarget, setEditTarget] = useState<AdminProduct | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form, setForm]         = useState<Partial<AdminProduct>>({});
  const [saving, setSaving]     = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/products");
      if (!res.ok) throw new Error();
      setProducts(await res.json());
    } catch {
      setError("שגיאה בטעינת מוצרים — ודא שהרצת את setup.sql");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { load(); }, []);

  function openEdit(p: AdminProduct) {
    setEditTarget(p);
    setForm({ ...p });
    setDrawerOpen(true);
  }
  function closeDrawer() {
    setDrawerOpen(false);
    setTimeout(() => setEditTarget(null), 320);
  }
  function upd<K extends keyof AdminProduct>(key: K, val: AdminProduct[K]) {
    setForm(f => ({ ...f, [key]: val }));
  }

  async function saveProduct() {
    if (!editTarget) return;
    setSaving(true);
    try {
      const payload = {
        ...form,
        price:       Number(form.price) || 0,
        discount:    Math.min(100, Math.max(0, Math.round(Number(form.discount) || 0))),
        image:       form.images?.[0] ?? form.image ?? "",
        hover_image: form.images?.[1] ?? form.hover_image ?? null,
      };
      const res = await fetch(`/api/admin/products/${editTarget.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error((await res.json()).error || "שגיאה");
      const updated = await res.json();
      setProducts(prev => prev.map(p => p.id === editTarget.id ? { ...p, ...updated } : p));
      closeDrawer();
    } catch (err: unknown) {
      alert("שגיאה: " + (err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function deleteProduct(p: AdminProduct) {
    if (!confirm(`למחוק את "${p.name_he}"?`)) return;
    setDeleting(p.id);
    try {
      const res = await fetch(`/api/admin/products/${p.id}`, { method: "DELETE" });
      if (res.status === 401) { alert("פג תוקף הכניסה — מתחבר/ת מחדש..."); window.location.href = "/admin/login"; return; }
      if (!res.ok) { const body = await res.json().catch(() => ({})); throw new Error(body?.error || `שגיאה ${res.status}`); }
      setProducts(prev => prev.filter(x => x.id !== p.id));
    } catch (e: unknown) {
      alert("שגיאה במחיקה: " + (e instanceof Error ? e.message : "נסה שנית"));
    } finally {
      setDeleting(null);
    }
  }

  async function toggleStock(p: AdminProduct) {
    try {
      await fetch(`/api/admin/products/${p.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ in_stock: !p.in_stock }),
      });
      setProducts(prev => prev.map(x => x.id === p.id ? { ...x, in_stock: !p.in_stock } : x));
    } catch { alert("שגיאה"); }
  }

  async function runMigration() {
    if (!confirm("לטעון את כל המוצרים מהקטלוג לסופאבייס?")) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/migrate", { method: "POST" });
      if (!res.ok) throw new Error((await res.json()).error || "שגיאה");
      const { inserted } = await res.json();
      alert(`✓ הועלו ${inserted} מוצרים`);
      await load();
    } catch (err: unknown) {
      alert("שגיאה: " + (err as Error).message);
      setLoading(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    window.location.href = "/admin/login";
  }

  const displayed = cat === "all" ? products : products.filter(p => p.category === cat);
  const discountedPrice = (form.discount ?? 0) > 0 ? Math.round((form.price ?? 0) * (1 - (form.discount ?? 0) / 100)) : null;

  const inputSx: React.CSSProperties = {
    width: "100%", padding: "9px 12px", border: "1px solid #e0e0e0",
    fontSize: "13px", outline: "none", boxSizing: "border-box",
    background: "#fff", fontFamily: "inherit", borderRadius: 0,
  };
  const labelSx: React.CSSProperties = {
    display: "block", fontSize: "10px", letterSpacing: "0.1em",
    textTransform: "uppercase", color: "#888", marginBottom: "5px",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F8F8F6", direction: "rtl", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        @media (max-width: 640px) {
          .adm-bar { flex-wrap: wrap; height: auto !important; padding: 10px 14px !important; row-gap: 8px !important; }
          .adm-count { display: none !important; }
          .adm-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; padding: 16px !important; }
          .adm-tip { display: none !important; }
          .adm-drawer { right: auto !important; left: 0 !important; bottom: 0 !important; top: auto !important; width: 100% !important; height: 85dvh !important; border-radius: 16px 16px 0 0 !important; transition: bottom 0.35s cubic-bezier(0.32,0.72,0,1) !important; }
          .adm-drawer-hidden { bottom: -100% !important; }
          .adm-edit-btn { transform: translateY(0) !important; opacity: 1 !important; }
          .adm-delete-btn { opacity: 0.9 !important; }
        }
      `}</style>

      {/* ── Admin bar ── */}
      <header className="adm-bar" style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "#111", color: "#fff",
        display: "flex", alignItems: "center", gap: "12px",
        padding: "0 28px", height: "52px",
      }}>
        <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.2rem", letterSpacing: "0.12em", lineHeight: 1 }}>VIKOS</span>
        <span style={{ fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#8B7355", border: "1px solid #8B7355", padding: "2px 7px", whiteSpace: "nowrap" }}>מצב עריכה</span>
        <div style={{ flex: 1 }} />
        <span className="adm-count" style={{ fontSize: "12px", color: "#777", whiteSpace: "nowrap" }}>{products.length} מוצרים</span>
        <a href="/shop" target="_blank" rel="noreferrer"
          style={{ fontSize: "11px", color: "#999", textDecoration: "none", letterSpacing: "0.06em", padding: "5px 10px", border: "1px solid #333", whiteSpace: "nowrap" }}>
          חנות ↗
        </a>
        {products.length === 0 && !loading && (
          <button onClick={runMigration}
            style={{ padding: "6px 12px", background: "#8B7355", color: "#fff", border: "none", fontSize: "11px", cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit" }}>
            ⬆ טען
          </button>
        )}
        <a href="/admin/dashboard/new"
          style={{ padding: "6px 14px", background: "#fff", color: "#111", textDecoration: "none", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
          + חדש
        </a>
        <button onClick={handleLogout}
          style={{ background: "none", border: "none", color: "#666", fontSize: "11px", cursor: "pointer", padding: "5px", whiteSpace: "nowrap", fontFamily: "inherit" }}>
          יציאה
        </button>
      </header>

      {/* ── Category tabs ── */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E8E8E4", padding: "0 28px", display: "flex", overflowX: "auto" }}>
        {CATS.map(c => {
          const count = c.id === "all" ? products.length : products.filter(p => p.category === c.id).length;
          return (
            <button key={c.id} onClick={() => setCat(c.id)} style={{
              padding: "13px 22px", background: "none", border: "none",
              borderBottom: cat === c.id ? "2px solid #111" : "2px solid transparent",
              fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase",
              color: cat === c.id ? "#111" : "#999", cursor: "pointer",
              whiteSpace: "nowrap", transition: "color 0.15s", fontFamily: "inherit",
            }}>
              {c.label} <span style={{ color: "#bbb", fontSize: "10px" }}>({count})</span>
            </button>
          );
        })}
      </div>

      {/* ── Tip bar ── */}
      <div className="adm-tip" style={{ background: "#FFFBF0", borderBottom: "1px solid #F0E8D0", padding: "10px 28px", fontSize: "12px", color: "#8B7355", display: "flex", alignItems: "center", gap: "8px" }}>
        <span>💡</span>
        <span>רחף על מוצר ולחץ <strong>עריכה</strong> לשינוי מחיר, שם, הנחה ועוד</span>
      </div>

      {/* ── Product grid ── */}
      <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "32px 28px" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "80px", color: "#aaa", fontSize: "14px" }}>טוען...</div>
        ) : error ? (
          <div style={{ padding: "24px", background: "#fff5f5", color: "#e53e3e", fontSize: "14px", borderRadius: "4px" }}>{error}</div>
        ) : displayed.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px", color: "#aaa", fontSize: "14px" }}>
            {products.length === 0 ? "אין מוצרים — לחץ על «⬆ טען» בסרגל העליון" : "אין מוצרים בקטגוריה זו"}
          </div>
        ) : (
          <div className="adm-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "24px" }}>
            {displayed.map(p => (
              <ProductCard
                key={p.id}
                p={p}
                deleting={deleting === p.id}
                onEdit={() => openEdit(p)}
                onDelete={() => deleteProduct(p)}
                onToggleStock={() => toggleStock(p)}
              />
            ))}
          </div>
        )}
      </main>

      {/* ── Backdrop ── */}
      <div
        onClick={closeDrawer}
        style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
          zIndex: 199, opacity: drawerOpen ? 1 : 0,
          pointerEvents: drawerOpen ? "auto" : "none",
          transition: "opacity 0.3s",
        }}
      />

      {/* ── Edit drawer ── */}
      <aside className={drawerOpen ? "adm-drawer" : "adm-drawer adm-drawer-hidden"} style={{
        position: "fixed", top: 0, right: drawerOpen ? 0 : "-540px",
        width: "520px", maxWidth: "100vw", height: "100dvh",
        background: "#fff", zIndex: 200,
        boxShadow: "-6px 0 40px rgba(0,0,0,0.14)",
        transition: "right 0.32s cubic-bezier(0.23, 1, 0.32, 1)",
        display: "flex", flexDirection: "column",
        direction: "rtl",
      }}>
        {/* Drawer header */}
        <div style={{ padding: "18px 24px", borderBottom: "1px solid #E8E8E4", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, background: "#FAFAF8" }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1rem", color: "#111" }}>
              {form.name_he || "עריכת מוצר"}
            </div>
            <div style={{ fontSize: "10px", color: "#bbb", marginTop: "2px", letterSpacing: "0.04em" }}>{editTarget?.id}</div>
          </div>
          <button onClick={closeDrawer}
            style={{ background: "none", border: "1px solid #E8E8E4", width: "32px", height: "32px", cursor: "pointer", fontSize: "14px", color: "#555", display: "flex", alignItems: "center", justifyContent: "center" }}>
            ✕
          </button>
        </div>

        {/* Drawer body */}
        {editTarget && (
          <div style={{ flex: 1, overflowY: "auto", padding: "24px", display: "flex", flexDirection: "column", gap: "18px" }}>

            {/* Image preview */}
            {(form.images?.length || form.image) ? (
              <div>
                <label style={labelSx}>תמונות המוצר</label>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {(form.images?.length ? form.images : [form.image]).filter(Boolean).map((src, i) => (
                    <div key={i} style={{ position: "relative" }}>
                      <img src={src!} alt="" style={{ width: "70px", height: "93px", objectFit: "cover", background: "#F0EEEB", display: "block", border: i === 0 ? "2px solid #111" : "1px solid #E8E8E4" }} />
                      {i === 0 && <span style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: "8px", textAlign: "center", padding: "2px", letterSpacing: "0.06em" }}>ראשי</span>}
                    </div>
                  ))}
                </div>
                <a href={`/admin/dashboard/${editTarget.id}/edit`} style={{ fontSize: "11px", color: "#8B7355", display: "block", marginTop: "8px" }}>
                  ← עריכת תמונות מלאה
                </a>
              </div>
            ) : null}

            {/* Names */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={labelSx}>שם בעברית</label>
                <input style={inputSx} value={form.name_he ?? ""} onChange={e => upd("name_he", e.target.value)} />
              </div>
              <div>
                <label style={labelSx}>English Name</label>
                <input style={inputSx} value={form.name_en ?? ""} onChange={e => upd("name_en", e.target.value)} dir="ltr" />
              </div>
            </div>

            {/* Price + Discount */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={labelSx}>מחיר (₪)</label>
                <input style={inputSx} type="number" min={0} value={form.price ?? 0} onChange={e => upd("price", Number(e.target.value))} />
              </div>
              <div>
                <label style={labelSx}>הנחה (%)</label>
                <input style={inputSx} type="number" min={0} max={100} value={form.discount ?? 0} onChange={e => upd("discount", Number(e.target.value))} />
              </div>
            </div>

            {discountedPrice && (
              <div style={{ padding: "10px 14px", background: "#FFF3F3", fontSize: "13px", color: "#C0392B", border: "1px solid #fbc0c0" }}>
                מחיר לאחר הנחה: <strong>₪{discountedPrice.toLocaleString()}</strong>
              </div>
            )}

            {/* Category + Material */}
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
              <div>
                <label style={labelSx}>חומר</label>
                <input style={inputSx} value={form.material ?? ""} onChange={e => upd("material", e.target.value)} placeholder="זהב 14K" />
              </div>
            </div>

            {/* Flags */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
              <div>
                <label style={labelSx}>מלאי</label>
                <select style={inputSx} value={form.in_stock ? "1" : "0"} onChange={e => upd("in_stock", e.target.value === "1")}>
                  <option value="1">במלאי ✓</option>
                  <option value="0">אזל ✗</option>
                </select>
              </div>
              <div>
                <label style={labelSx}>מוצר חדש</label>
                <select style={inputSx} value={form.is_new ? "1" : "0"} onChange={e => upd("is_new", e.target.value === "1")}>
                  <option value="0">לא</option>
                  <option value="1">כן ✓</option>
                </select>
              </div>
              <div>
                <label style={labelSx}>נמכר ביותר</label>
                <select style={inputSx} value={form.is_bestseller ? "1" : "0"} onChange={e => upd("is_bestseller", e.target.value === "1")}>
                  <option value="0">לא</option>
                  <option value="1">כן ✓</option>
                </select>
              </div>
            </div>

            <div>
              <label style={labelSx}>תיאור בעברית</label>
              <textarea style={{ ...inputSx, height: "88px", resize: "vertical" }} value={form.description_he ?? ""} onChange={e => upd("description_he", e.target.value)} />
            </div>

            <div>
              <label style={labelSx}>Description in English</label>
              <textarea style={{ ...inputSx, height: "88px", resize: "vertical", direction: "ltr" }} value={form.description_en ?? ""} onChange={e => upd("description_en", e.target.value)} />
            </div>
          </div>
        )}

        {/* Drawer footer */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid #E8E8E4", display: "flex", gap: "10px", flexShrink: 0 }}>
          <button onClick={saveProduct} disabled={saving} style={{
            flex: 1, padding: "12px", background: saving ? "#888" : "#111", color: "#fff",
            border: "none", fontSize: "12px", letterSpacing: "0.16em", textTransform: "uppercase",
            cursor: saving ? "not-allowed" : "pointer", fontFamily: "inherit",
          }}>
            {saving ? "שומר..." : "שמור שינויים"}
          </button>
          <button onClick={closeDrawer} style={{ padding: "12px 18px", background: "none", border: "1px solid #E8E8E4", fontSize: "12px", color: "#555", cursor: "pointer", fontFamily: "inherit" }}>
            ביטול
          </button>
        </div>
      </aside>
    </div>
  );
}

/* ─── Product card — mirrors the shop's ProductCard exactly, with edit overlay ─── */
function ProductCard({ p, deleting, onEdit, onDelete, onToggleStock }: {
  p: AdminProduct;
  deleting: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onToggleStock: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const imgSrc = p.images?.[0] || p.image || "";
  const hoverImg = p.images?.[1] || p.hover_image || null;
  const finalPrice = p.discount > 0 ? Math.round(p.price * (1 - p.discount / 100)) : null;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", cursor: "pointer" }}
    >
      {/* Image block — same styling as shop */}
      <div style={{
        position: "relative", aspectRatio: "3/4", background: "#F5F4F1",
        overflow: "hidden", marginBottom: "14px",
        transform: hovered ? "scale(1.01)" : "scale(1)",
        transition: "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
      }}>

        {/* Main image with zoom on hover */}
        {imgSrc && (
          <img src={imgSrc} alt={p.name_he} style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
          }} />
        )}

        {/* Hover / second image — fades in */}
        {hoverImg && (
          <img src={hoverImg} alt="" style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
            opacity: hovered ? 1 : 0, transition: "opacity 0.45s ease",
          }} />
        )}

        {/* Status badges */}
        {(p.is_new || p.is_bestseller || finalPrice) && (
          <span style={{
            position: "absolute", top: "12px", right: "12px",
            background: finalPrice ? "#C0392B" : p.is_bestseller ? "#8B7355" : "#111",
            color: "#fff", fontSize: "8px", letterSpacing: "0.14em",
            textTransform: "uppercase", padding: "4px 9px",
          }}>
            {finalPrice ? `-${p.discount}%` : p.is_bestseller ? "נמכר ביותר" : "חדש"}
          </span>
        )}

        {/* Out of stock overlay */}
        {!p.in_stock && (
          <div style={{
            position: "absolute", inset: 0, background: "rgba(255,255,255,0.6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "10px", color: "#888", letterSpacing: "0.14em", textTransform: "uppercase",
          }}>
            אזל מהמלאי
          </div>
        )}

        {/* Edit overlay — slides up from bottom like shop's quick-add */}
        <div className="adm-edit-btn" style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          transform: hovered ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.32s cubic-bezier(0.23, 1, 0.32, 1)",
        }}>
          <button onClick={e => { e.stopPropagation(); onEdit(); }} style={{
            width: "100%", padding: "12px 16px",
            background: "#111", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "7px",
            fontFamily: "'Inter', system-ui, sans-serif", fontSize: "10px",
            letterSpacing: "0.18em", textTransform: "uppercase", color: "#fff",
          }}>
            ✏ עריכה
          </button>
        </div>

        {/* Delete — small X top left */}
        <button
          onClick={e => { e.stopPropagation(); onDelete(); }}
          disabled={deleting}
          className="adm-delete-btn"
          style={{
            position: "absolute", top: "10px", left: "10px",
            width: "30px", height: "30px",
            background: "rgba(0,0,0,0.55)", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontSize: "11px",
            opacity: hovered ? 1 : 0, transition: "opacity 0.2s",
          }}
          title="מחיקה"
        >
          {deleting ? "…" : "✕"}
        </button>
      </div>

      {/* Info row — matches shop exactly */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "6px" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "1rem", fontWeight: 400, color: "#111",
            marginBottom: "5px", lineHeight: 1.3,
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            {p.name_he}
          </p>
          {finalPrice ? (
            <div style={{ fontSize: "12px" }}>
              <span style={{ textDecoration: "line-through", color: "#bbb", marginLeft: "6px" }}>₪{p.price.toLocaleString()}</span>
              <span style={{ color: "#C0392B", fontWeight: 500 }}>₪{finalPrice.toLocaleString()}</span>
            </div>
          ) : (
            <p style={{ fontSize: "12px", color: "#555" }}>₪{p.price.toLocaleString()}</p>
          )}
        </div>
        {/* Stock toggle */}
        <button
          onClick={e => { e.stopPropagation(); onToggleStock(); }}
          title={p.in_stock ? "לחץ להסרה מהמלאי" : "לחץ להוספה למלאי"}
          style={{
            fontSize: "9px", padding: "3px 7px", cursor: "pointer", flexShrink: 0,
            border: `1px solid ${p.in_stock ? "#c8e6c9" : "#fbc0c0"}`,
            color: p.in_stock ? "#2E7D32" : "#c0392b",
            background: "none", letterSpacing: "0.04em", fontFamily: "inherit",
          }}
        >
          {p.in_stock ? "✓" : "✗"}
        </button>
      </div>
    </div>
  );
}
