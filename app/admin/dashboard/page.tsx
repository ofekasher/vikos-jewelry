"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface AdminProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  badge: string | null;
  in_stock: boolean;
  images: string[];
  created_at: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  rings: "טבעות",
  necklaces: "שרשראות",
  bracelets: "צמידים",
  earrings: "עגילים",
};

export default function Dashboard() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [filter, setFilter]     = useState("all");

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products");
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setProducts(data);
    } catch {
      setError("שגיאה בטעינת המוצרים");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`למחוק את "${name}"?`)) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setProducts(p => p.filter(x => x.id !== id));
    } catch {
      alert("שגיאה במחיקה");
    } finally {
      setDeleting(null);
    }
  }

  const filtered = filter === "all" ? products : products.filter(p => p.category === filter);

  const stats = {
    total:     products.length,
    inStock:   products.filter(p => p.in_stock).length,
    rings:     products.filter(p => p.category === "rings").length,
    bracelets: products.filter(p => p.category === "bracelets").length,
    necklaces: products.filter(p => p.category === "necklaces").length,
    earrings:  products.filter(p => p.category === "earrings").length,
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2rem", fontWeight: 300, color: "#111", margin: 0 }}>מוצרים</h1>
          <p style={{ color: "#888", fontSize: "13px", margin: "4px 0 0" }}>{stats.total} מוצרים · {stats.inStock} במלאי</p>
        </div>
        <Link
          href="/admin/dashboard/new"
          style={{ padding: "10px 20px", background: "#111", color: "#fff", textDecoration: "none", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase" }}
        >
          + מוצר חדש
        </Link>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
        {[
          { label: "טבעות", count: stats.rings, cat: "rings" },
          { label: "צמידים", count: stats.bracelets, cat: "bracelets" },
          { label: "שרשראות", count: stats.necklaces, cat: "necklaces" },
          { label: "עגילים", count: stats.earrings, cat: "earrings" },
        ].map(s => (
          <button
            key={s.cat}
            onClick={() => setFilter(filter === s.cat ? "all" : s.cat)}
            style={{ padding: "20px", background: filter === s.cat ? "#111" : "#fff", color: filter === s.cat ? "#fff" : "#111", border: "1px solid #E8E8E4", cursor: "pointer", textAlign: "right", transition: "all 0.15s" }}
          >
            <div style={{ fontSize: "1.75rem", fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}>{s.count}</div>
            <div style={{ fontSize: "12px", color: filter === s.cat ? "#ccc" : "#888", marginTop: "2px" }}>{s.label}</div>
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#888" }}>טוען...</div>
      ) : error ? (
        <div style={{ padding: "24px", background: "#fff5f5", color: "#e53e3e", fontSize: "14px" }}>{error}</div>
      ) : (
        <div style={{ background: "#fff", border: "1px solid #E8E8E4" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #E8E8E4" }}>
                {["תמונה", "שם", "קטגוריה", "מחיר", "תג", "מלאי", "פעולות"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "right", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", fontWeight: 400 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} style={{ borderBottom: "1px solid #F0F0EC" }}>
                  <td style={{ padding: "10px 16px" }}>
                    {p.images?.[0] ? (
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        style={{ width: "48px", height: "64px", objectFit: "cover", background: "#F7F7F5" }}
                      />
                    ) : (
                      <div style={{ width: "48px", height: "64px", background: "#F7F7F5" }} />
                    )}
                  </td>
                  <td style={{ padding: "10px 16px", fontSize: "14px", color: "#111", maxWidth: "240px" }}>
                    <div style={{ fontWeight: 500 }}>{p.name}</div>
                    <div style={{ fontSize: "11px", color: "#aaa", marginTop: "2px" }}>{p.id}</div>
                  </td>
                  <td style={{ padding: "10px 16px", fontSize: "13px", color: "#555" }}>
                    {CATEGORY_LABELS[p.category] ?? p.category}
                  </td>
                  <td style={{ padding: "10px 16px", fontSize: "13px", color: "#111" }}>
                    ₪{p.price.toLocaleString()}
                  </td>
                  <td style={{ padding: "10px 16px" }}>
                    {p.badge && (
                      <span style={{ fontSize: "11px", padding: "2px 8px", background: p.badge === "חדש" ? "#F0F7F0" : "#FFF7E6", color: p.badge === "חדש" ? "#2E7D32" : "#E65100" }}>
                        {p.badge}
                      </span>
                    )}
                  </td>
                  <td style={{ padding: "10px 16px" }}>
                    <span style={{ fontSize: "11px", color: p.in_stock ? "#2E7D32" : "#c0392b" }}>
                      {p.in_stock ? "✓ במלאי" : "✗ אזל"}
                    </span>
                  </td>
                  <td style={{ padding: "10px 16px" }}>
                    <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                      <Link
                        href={`/admin/dashboard/${p.id}/edit`}
                        style={{ fontSize: "12px", color: "#555", textDecoration: "none", letterSpacing: "0.06em" }}
                      >
                        עריכה
                      </Link>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        disabled={deleting === p.id}
                        style={{ fontSize: "12px", color: "#e53e3e", background: "none", border: "none", cursor: "pointer", letterSpacing: "0.06em" }}
                      >
                        {deleting === p.id ? "..." : "מחיקה"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px", color: "#aaa", fontSize: "14px" }}>
              {products.length === 0 ? "אין מוצרים עדיין — צור מוצר חדש" : "אין מוצרים בקטגוריה זו"}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
