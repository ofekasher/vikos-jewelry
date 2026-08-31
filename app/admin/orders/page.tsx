"use client";
import { useEffect, useState } from "react";

interface OrderItem {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  items: OrderItem[];
  total: number;
  status: "new" | "processing" | "shipped" | "delivered" | "cancelled";
  notes: string | null;
  shipping_address: string | null;
  created_at: string;
}

const STATUS_LABELS: Record<Order["status"], string> = {
  new:        "חדשה",
  processing: "בטיפול",
  shipped:    "נשלחה",
  delivered:  "נמסרה",
  cancelled:  "בוטלה",
};

const STATUS_COLORS: Record<Order["status"], { bg: string; color: string; border: string }> = {
  new:        { bg: "#EFF6FF", color: "#1D4ED8", border: "#BFDBFE" },
  processing: { bg: "#FFF7ED", color: "#C2410C", border: "#FED7AA" },
  shipped:    { bg: "#F0FDF4", color: "#15803D", border: "#BBF7D0" },
  delivered:  { bg: "#F0FDF4", color: "#166534", border: "#86EFAC" },
  cancelled:  { bg: "#FEF2F2", color: "#B91C1C", border: "#FECACA" },
};

const ALL_STATUSES: Order["status"][] = ["new", "processing", "shipped", "delivered", "cancelled"];

export default function OrdersPage() {
  const [orders, setOrders]       = useState<Order[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");
  const [filter, setFilter]       = useState<Order["status"] | "all">("all");
  const [selected, setSelected]   = useState<Order | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [saving, setSaving]       = useState(false);
  const [notesDraft, setNotesDraft] = useState("");
  const [newStatus, setNewStatus] = useState<Order["status"]>("new");
  const [showNewForm, setShowNewForm] = useState(false);
  const [deleting, setDeleting]   = useState<string | null>(null);

  const [newForm, setNewForm] = useState({
    customer_name: "", customer_email: "", customer_phone: "",
    shipping_address: "", notes: "", total: "",
    item_name: "", item_price: "", item_qty: "1",
    items: [] as OrderItem[],
  });

  async function load() {
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/admin/orders");
      if (!res.ok) throw new Error();
      setOrders(await res.json());
    } catch { setError("שגיאה בטעינת הזמנות"); }
    finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);

  function openOrder(o: Order) {
    setSelected(o);
    setNewStatus(o.status);
    setNotesDraft(o.notes ?? "");
    setDrawerOpen(true);
  }
  function closeDrawer() {
    setDrawerOpen(false);
    setTimeout(() => setSelected(null), 320);
  }

  async function saveStatus() {
    if (!selected) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/orders/${selected.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, notes: notesDraft }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      const updated = await res.json();
      setOrders(prev => prev.map(o => o.id === selected.id ? { ...o, ...updated } : o));
      setSelected(prev => prev ? { ...prev, ...updated } : null);
    } catch (e: unknown) { alert("שגיאה: " + (e instanceof Error ? e.message : "")); }
    finally { setSaving(false); }
  }

  async function deleteOrder(o: Order) {
    if (!confirm(`למחוק הזמנה ${o.order_number}?`)) return;
    setDeleting(o.id);
    try {
      const res = await fetch(`/api/admin/orders/${o.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setOrders(prev => prev.filter(x => x.id !== o.id));
      if (selected?.id === o.id) closeDrawer();
    } catch { alert("שגיאה במחיקה"); }
    finally { setDeleting(null); }
  }

  function addItem() {
    const name = newForm.item_name.trim();
    const price = Number(newForm.item_price) || 0;
    const qty   = Math.max(1, Number(newForm.item_qty) || 1);
    if (!name || !price) return;
    setNewForm(f => ({
      ...f,
      items: [...f.items, { product_id: "", name, price, quantity: qty }],
      item_name: "", item_price: "", item_qty: "1",
      total: String((f.items.reduce((s, i) => s + i.price * i.quantity, 0) + price * qty)),
    }));
  }

  async function submitNewOrder(e: React.FormEvent) {
    e.preventDefault();
    const total = newForm.items.reduce((s, i) => s + i.price * i.quantity, 0) || Number(newForm.total) || 0;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name:    newForm.customer_name,
          customer_email:   newForm.customer_email,
          customer_phone:   newForm.customer_phone || null,
          shipping_address: newForm.shipping_address || null,
          notes:            newForm.notes || null,
          items:            newForm.items,
          total,
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      const created = await res.json();
      setOrders(prev => [created, ...prev]);
      setShowNewForm(false);
      setNewForm({ customer_name: "", customer_email: "", customer_phone: "", shipping_address: "", notes: "", total: "", item_name: "", item_price: "", item_qty: "1", items: [] });
    } catch (e: unknown) { alert("שגיאה: " + (e instanceof Error ? e.message : "")); }
    finally { setSaving(false); }
  }

  const displayed = filter === "all" ? orders : orders.filter(o => o.status === filter);
  const countsByStatus = (s: Order["status"]) => orders.filter(o => o.status === s).length;

  const inputSx: React.CSSProperties = { width: "100%", padding: "9px 12px", border: "1px solid #E0E0E0", fontSize: "13px", outline: "none", boxSizing: "border-box", fontFamily: "inherit", borderRadius: 0 };
  const labelSx: React.CSSProperties = { display: "block", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", marginBottom: "5px" };

  return (
    <div style={{ minHeight: "100vh", background: "#F8F8F6", direction: "rtl", fontFamily: "'Inter', system-ui, sans-serif", padding: 0 }}>
      <style>{`
        .ord-row:hover { background: #FAFAF8 !important; }
        .ord-row td { transition: background 0.12s; }
        @media (max-width: 768px) {
          .ord-table-wrap { overflow-x: auto; }
          .ord-col-hide { display: none !important; }
          .adm-drawer { right: auto !important; left: 0 !important; bottom: 0 !important; top: auto !important; width: 100% !important; height: 85dvh !important; border-radius: 16px 16px 0 0 !important; }
        }
      `}</style>

      {/* Page header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E8E8E4", padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.5rem", fontWeight: 400, color: "#111", margin: 0 }}>הזמנות</h2>
          <p style={{ fontSize: "12px", color: "#999", margin: "4px 0 0" }}>{orders.length} הזמנות בסה"כ</p>
        </div>
        <button
          onClick={() => setShowNewForm(true)}
          style={{ padding: "9px 20px", background: "#111", color: "#fff", border: "none", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit" }}
        >
          + הזמנה חדשה
        </button>
      </div>

      {/* Status filter tabs */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E8E8E4", padding: "0 32px", display: "flex", overflowX: "auto" }}>
        <button onClick={() => setFilter("all")} style={{ padding: "12px 20px", background: "none", border: "none", borderBottom: filter === "all" ? "2px solid #111" : "2px solid transparent", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: filter === "all" ? "#111" : "#999", cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit" }}>
          הכל <span style={{ color: "#bbb", fontSize: "10px" }}>({orders.length})</span>
        </button>
        {ALL_STATUSES.map(s => (
          <button key={s} onClick={() => setFilter(s)} style={{ padding: "12px 20px", background: "none", border: "none", borderBottom: filter === s ? "2px solid #111" : "2px solid transparent", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: filter === s ? "#111" : "#999", cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit" }}>
            {STATUS_LABELS[s]} <span style={{ color: "#bbb", fontSize: "10px" }}>({countsByStatus(s)})</span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ padding: "24px 32px" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "80px", color: "#aaa", fontSize: "14px" }}>טוען...</div>
        ) : error ? (
          <div style={{ padding: "24px", background: "#fff5f5", color: "#e53e3e", fontSize: "14px" }}>{error}</div>
        ) : displayed.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px" }}>
            <p style={{ color: "#aaa", fontSize: "14px" }}>אין הזמנות {filter !== "all" ? `בסטטוס "${STATUS_LABELS[filter as Order["status"]]}"` : "עדיין"}</p>
            <p style={{ color: "#ccc", fontSize: "12px", marginTop: "8px" }}>הזמנות יופיעו כאן כשלקוחות יבצעו רכישות, או הוסף ידנית</p>
          </div>
        ) : (
          <div className="ord-table-wrap" style={{ background: "#fff", border: "1px solid #E8E8E4" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ background: "#FAFAF8", borderBottom: "1px solid #E8E8E4" }}>
                  <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: 500, fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888" }}>מספר</th>
                  <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: 500, fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888" }}>לקוח</th>
                  <th className="ord-col-hide" style={{ padding: "12px 16px", textAlign: "right", fontWeight: 500, fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888" }}>פריטים</th>
                  <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: 500, fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888" }}>סכום</th>
                  <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: 500, fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888" }}>סטטוס</th>
                  <th className="ord-col-hide" style={{ padding: "12px 16px", textAlign: "right", fontWeight: 500, fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888" }}>תאריך</th>
                  <th style={{ padding: "12px 8px", width: "48px" }}></th>
                </tr>
              </thead>
              <tbody>
                {displayed.map(o => {
                  const sc = STATUS_COLORS[o.status];
                  const date = new Date(o.created_at).toLocaleDateString("he-IL", { day: "2-digit", month: "2-digit", year: "2-digit" });
                  const itemsStr = o.items.length > 0 ? o.items.map(i => `${i.name}${i.quantity > 1 ? ` ×${i.quantity}` : ""}`).join(", ") : "—";
                  return (
                    <tr key={o.id} className="ord-row" onClick={() => openOrder(o)} style={{ borderBottom: "1px solid #F0F0EE", cursor: "pointer" }}>
                      <td style={{ padding: "14px 16px", fontFamily: "monospace", fontSize: "12px", color: "#555" }}>{o.order_number}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ fontWeight: 500, color: "#111" }}>{o.customer_name || "—"}</div>
                        <div style={{ fontSize: "11px", color: "#999", marginTop: "2px" }}>{o.customer_email || ""}</div>
                      </td>
                      <td className="ord-col-hide" style={{ padding: "14px 16px", color: "#666", maxWidth: "220px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{itemsStr}</td>
                      <td style={{ padding: "14px 16px", fontWeight: 500, color: "#111", whiteSpace: "nowrap" }}>₪{o.total.toLocaleString()}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{ padding: "3px 10px", borderRadius: "2px", fontSize: "10px", letterSpacing: "0.08em", fontWeight: 500, background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>
                          {STATUS_LABELS[o.status]}
                        </span>
                      </td>
                      <td className="ord-col-hide" style={{ padding: "14px 16px", color: "#999", fontSize: "12px" }}>{date}</td>
                      <td style={{ padding: "14px 8px", textAlign: "center" }}>
                        <button
                          onClick={e => { e.stopPropagation(); deleteOrder(o); }}
                          disabled={deleting === o.id}
                          style={{ background: "none", border: "none", cursor: "pointer", color: "#ccc", fontSize: "12px", padding: "4px 8px", fontFamily: "inherit" }}
                          title="מחיקה"
                        >
                          {deleting === o.id ? "..." : "✕"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Backdrop */}
      <div onClick={closeDrawer} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 199, opacity: drawerOpen ? 1 : 0, pointerEvents: drawerOpen ? "auto" : "none", transition: "opacity 0.3s" }} />

      {/* Order detail drawer */}
      <aside className="adm-drawer" style={{
        position: "fixed", top: 0, right: drawerOpen ? 0 : "-560px",
        width: "540px", maxWidth: "100vw", height: "100dvh",
        background: "#fff", zIndex: 200,
        boxShadow: "-6px 0 40px rgba(0,0,0,0.14)",
        transition: "right 0.32s cubic-bezier(0.23, 1, 0.32, 1)",
        display: "flex", flexDirection: "column", direction: "rtl",
      }}>
        {selected && (
          <>
            {/* Header */}
            <div style={{ padding: "18px 24px", borderBottom: "1px solid #E8E8E4", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, background: "#FAFAF8" }}>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.1rem", color: "#111" }}>
                  הזמנה {selected.order_number}
                </div>
                <div style={{ fontSize: "11px", color: "#bbb", marginTop: "2px" }}>
                  {new Date(selected.created_at).toLocaleDateString("he-IL", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
              <button onClick={closeDrawer} style={{ background: "none", border: "1px solid #E8E8E4", width: "32px", height: "32px", cursor: "pointer", fontSize: "14px", color: "#555", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
            </div>

            {/* Body */}
            <div style={{ flex: 1, overflowY: "auto", padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>

              {/* Customer info */}
              <section>
                <h3 style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#888", margin: "0 0 12px" }}>פרטי לקוח</h3>
                <div style={{ background: "#FAFAF8", border: "1px solid #E8E8E4", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div style={{ fontSize: "14px", fontWeight: 500, color: "#111" }}>{selected.customer_name || "—"}</div>
                  {selected.customer_email && <div style={{ fontSize: "12px", color: "#666" }}>{selected.customer_email}</div>}
                  {selected.customer_phone && <div style={{ fontSize: "12px", color: "#666" }}>{selected.customer_phone}</div>}
                  {selected.shipping_address && (
                    <div style={{ fontSize: "12px", color: "#666", marginTop: "6px", paddingTop: "6px", borderTop: "1px solid #E8E8E4" }}>
                      📦 {selected.shipping_address}
                    </div>
                  )}
                </div>
              </section>

              {/* Items */}
              {selected.items.length > 0 && (
                <section>
                  <h3 style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#888", margin: "0 0 12px" }}>פריטים</h3>
                  <div style={{ border: "1px solid #E8E8E4" }}>
                    {selected.items.map((item, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderBottom: i < selected.items.length - 1 ? "1px solid #F0F0EE" : "none" }}>
                        <span style={{ fontSize: "13px", color: "#333" }}>{item.name}{item.quantity > 1 ? <span style={{ color: "#999", marginRight: "6px" }}>×{item.quantity}</span> : null}</span>
                        <span style={{ fontSize: "13px", fontWeight: 500, color: "#111" }}>₪{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 14px", background: "#FAFAF8", fontWeight: 600, fontSize: "14px" }}>
                      <span>סה"כ</span>
                      <span>₪{selected.total.toLocaleString()}</span>
                    </div>
                  </div>
                </section>
              )}

              {/* Status update */}
              <section>
                <h3 style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#888", margin: "0 0 12px" }}>עדכון סטטוס</h3>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
                  {ALL_STATUSES.map(s => {
                    const sc = STATUS_COLORS[s];
                    const active = newStatus === s;
                    return (
                      <button key={s} onClick={() => setNewStatus(s)} style={{
                        padding: "6px 14px", border: active ? `2px solid ${sc.color}` : "1px solid #E0E0E0",
                        background: active ? sc.bg : "#fff",
                        color: active ? sc.color : "#666",
                        fontSize: "11px", cursor: "pointer", fontFamily: "inherit",
                        fontWeight: active ? 600 : 400, transition: "all 0.15s",
                      }}>
                        {STATUS_LABELS[s]}
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Notes */}
              <section>
                <label style={labelSx}>הערות פנימיות</label>
                <textarea
                  value={notesDraft}
                  onChange={e => setNotesDraft(e.target.value)}
                  placeholder="הערות שלא נשלחות ללקוח..."
                  style={{ ...inputSx, height: "80px", resize: "vertical" }}
                />
              </section>
            </div>

            {/* Footer */}
            <div style={{ padding: "16px 24px", borderTop: "1px solid #E8E8E4", display: "flex", gap: "10px", flexShrink: 0 }}>
              <button onClick={saveStatus} disabled={saving} style={{ flex: 1, padding: "12px", background: saving ? "#888" : "#111", color: "#fff", border: "none", fontSize: "12px", letterSpacing: "0.16em", textTransform: "uppercase", cursor: saving ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
                {saving ? "שומר..." : "שמור עדכון"}
              </button>
              <button onClick={closeDrawer} style={{ padding: "12px 18px", background: "none", border: "1px solid #E8E8E4", fontSize: "12px", color: "#555", cursor: "pointer", fontFamily: "inherit" }}>
                ביטול
              </button>
            </div>
          </>
        )}
      </aside>

      {/* New order modal */}
      {showNewForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ background: "#fff", width: "100%", maxWidth: "500px", maxHeight: "90dvh", overflowY: "auto", padding: "32px", direction: "rtl" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.4rem", fontWeight: 400, color: "#111", margin: 0 }}>הזמנה חדשה</h2>
              <button onClick={() => setShowNewForm(false)} style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#888" }}>✕</button>
            </div>
            <form onSubmit={submitNewOrder} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={labelSx}>שם לקוח *</label>
                <input required style={inputSx} value={newForm.customer_name} onChange={e => setNewForm(f => ({ ...f, customer_name: e.target.value }))} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={labelSx}>אימייל</label>
                  <input style={inputSx} type="email" value={newForm.customer_email} onChange={e => setNewForm(f => ({ ...f, customer_email: e.target.value }))} />
                </div>
                <div>
                  <label style={labelSx}>טלפון</label>
                  <input style={inputSx} value={newForm.customer_phone} onChange={e => setNewForm(f => ({ ...f, customer_phone: e.target.value }))} />
                </div>
              </div>
              <div>
                <label style={labelSx}>כתובת משלוח</label>
                <input style={inputSx} value={newForm.shipping_address} onChange={e => setNewForm(f => ({ ...f, shipping_address: e.target.value }))} />
              </div>

              {/* Items section */}
              <div>
                <label style={labelSx}>הוסף פריטים</label>
                <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                  <input style={{ ...inputSx, flex: 2 }} placeholder="שם פריט" value={newForm.item_name} onChange={e => setNewForm(f => ({ ...f, item_name: e.target.value }))} />
                  <input style={{ ...inputSx, flex: 1 }} type="number" placeholder="מחיר" min={0} value={newForm.item_price} onChange={e => setNewForm(f => ({ ...f, item_price: e.target.value }))} />
                  <input style={{ ...inputSx, width: "56px", flex: "none" }} type="number" placeholder="כמות" min={1} value={newForm.item_qty} onChange={e => setNewForm(f => ({ ...f, item_qty: e.target.value }))} />
                  <button type="button" onClick={addItem} style={{ padding: "9px 14px", background: "#F0EEEB", border: "1px solid #E0E0E0", cursor: "pointer", fontSize: "12px", whiteSpace: "nowrap", fontFamily: "inherit" }}>+ הוסף</button>
                </div>
                {newForm.items.length > 0 && (
                  <div style={{ border: "1px solid #E8E8E4", marginBottom: "8px" }}>
                    {newForm.items.map((item, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", borderBottom: i < newForm.items.length - 1 ? "1px solid #F0F0EE" : "none", fontSize: "12px" }}>
                        <span>{item.name}{item.quantity > 1 ? ` ×${item.quantity}` : ""}</span>
                        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                          <span>₪{(item.price * item.quantity).toLocaleString()}</span>
                          <button type="button" onClick={() => setNewForm(f => ({ ...f, items: f.items.filter((_, j) => j !== i) }))} style={{ background: "none", border: "none", cursor: "pointer", color: "#ccc", fontSize: "12px" }}>✕</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label style={labelSx}>סכום כולל (₪){newForm.items.length > 0 ? " — מחושב אוטומטית" : ""}</label>
                <input
                  type="number" min={0}
                  value={newForm.items.length > 0 ? newForm.items.reduce((s, i) => s + i.price * i.quantity, 0) : newForm.total}
                  readOnly={newForm.items.length > 0}
                  onChange={e => setNewForm(f => ({ ...f, total: e.target.value }))}
                  style={{ ...inputSx, background: newForm.items.length > 0 ? "#F8F8F6" : "#fff" }}
                />
              </div>

              <div>
                <label style={labelSx}>הערות</label>
                <textarea style={{ ...inputSx, height: "64px", resize: "vertical" }} value={newForm.notes} onChange={e => setNewForm(f => ({ ...f, notes: e.target.value }))} />
              </div>

              <button type="submit" disabled={saving} style={{ padding: "13px", background: saving ? "#888" : "#111", color: "#fff", border: "none", fontSize: "12px", letterSpacing: "0.16em", textTransform: "uppercase", cursor: saving ? "not-allowed" : "pointer", fontFamily: "inherit", marginTop: "4px" }}>
                {saving ? "שומר..." : "צור הזמנה"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
