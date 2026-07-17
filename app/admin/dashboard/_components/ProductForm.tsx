"use client";
import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

interface DbProduct {
  id?: string;
  name: string;
  price: number;
  category: "rings" | "necklaces" | "bracelets" | "earrings";
  images: string[];
  badge: "נמכר ביותר" | "חדש" | null;
  description: string | null;
  in_stock: boolean;
  sizes: string[] | null;
  material: string | null;
}

const EMPTY: DbProduct = {
  name: "", price: 0, category: "rings", images: [],
  badge: null, description: null, in_stock: true, sizes: null, material: null,
};

export default function ProductForm({ initialData, productId }: { initialData?: DbProduct; productId?: string }) {
  const router   = useRouter();
  const isEdit   = !!productId;
  const [form, setForm]       = useState<DbProduct>(initialData ?? EMPTY);
  const [saving, setSaving]   = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function update(key: keyof DbProduct, val: unknown) {
    setForm(f => ({ ...f, [key]: val }));
  }

  async function uploadFiles(files: File[]) {
    setUploading(true);
    const urls: string[] = [];
    for (const file of files) {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const { url, error } = await res.json();
      if (error) { alert(`שגיאה בהעלאת ${file.name}: ${error}`); continue; }
      urls.push(url);
    }
    setForm(f => ({ ...f, images: [...f.images, ...urls] }));
    setUploading(false);
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
    if (files.length) uploadFiles(files);
  }, []);

  function removeImage(idx: number) {
    setForm(f => ({ ...f, images: f.images.filter((_, i) => i !== idx) }));
  }

  function moveImage(from: number, to: number) {
    setForm(f => {
      const imgs = [...f.images];
      const [item] = imgs.splice(from, 1);
      imgs.splice(to, 0, item);
      return { ...f, images: imgs };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return alert("נדרש שם מוצר");
    if (form.price <= 0)   return alert("נדרש מחיר תקין");
    setSaving(true);
    try {
      const url    = isEdit ? `/api/admin/products/${productId}` : "/api/admin/products";
      const method = isEdit ? "PATCH" : "POST";
      const res    = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "שגיאה");
      router.push("/admin/dashboard");
    } catch (err: unknown) {
      alert((err as Error).message);
      setSaving(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "10px 12px", border: "1px solid #E0E0E0",
    fontSize: "14px", outline: "none", boxSizing: "border-box", fontFamily: "inherit",
    background: "#fff",
  };

  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: "11px", letterSpacing: "0.1em",
    textTransform: "uppercase", color: "#666", marginBottom: "6px",
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Images */}
      <section>
        <label style={labelStyle}>תמונות</label>

        {/* Drop zone */}
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => fileRef.current?.click()}
          style={{
            border: `2px dashed ${dragOver ? "#8B7355" : "#E0E0E0"}`,
            padding: "32px", textAlign: "center", cursor: "pointer",
            background: dragOver ? "#F5F5F5" : "#FAFAF8",
            transition: "all 0.15s", marginBottom: "12px",
            color: uploading ? "#8B7355" : "#aaa", fontSize: "13px",
          }}
        >
          {uploading ? "מעלה תמונות..." : "גרור ושחרר תמונות, או לחץ לבחירה"}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={e => { if (e.target.files?.length) uploadFiles(Array.from(e.target.files)); }}
        />

        {/* Image previews */}
        {form.images.length > 0 && (
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {form.images.map((url, idx) => (
              <div key={url} style={{ position: "relative", width: "100px" }}>
                <img src={url} alt="" style={{ width: "100px", height: "130px", objectFit: "cover", display: "block", background: "#F7F7F5" }} />
                {idx === 0 && (
                  <span style={{ position: "absolute", top: "4px", right: "4px", fontSize: "9px", background: "#111", color: "#fff", padding: "2px 5px", letterSpacing: "0.08em" }}>ראשי</span>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                  {idx > 0 && (
                    <button type="button" onClick={() => moveImage(idx, idx - 1)} style={{ fontSize: "11px", background: "none", border: "1px solid #ddd", cursor: "pointer", padding: "2px 6px" }}>→</button>
                  )}
                  <button type="button" onClick={() => removeImage(idx)} style={{ fontSize: "11px", background: "none", border: "1px solid #ddd", cursor: "pointer", padding: "2px 6px", color: "#e53e3e", marginRight: "auto" }}>✕</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Name */}
      <div>
        <label style={labelStyle}>שם מוצר *</label>
        <input style={inputStyle} value={form.name} onChange={e => update("name", e.target.value)} placeholder="שם המוצר בעברית" required />
      </div>

      {/* Price + Category */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <label style={labelStyle}>מחיר (₪) *</label>
          <input style={inputStyle} type="number" min={0} value={form.price} onChange={e => update("price", Number(e.target.value))} required />
        </div>
        <div>
          <label style={labelStyle}>קטגוריה</label>
          <select style={inputStyle} value={form.category} onChange={e => update("category", e.target.value)}>
            <option value="rings">טבעות</option>
            <option value="bracelets">צמידים</option>
            <option value="necklaces">שרשראות</option>
            <option value="earrings">עגילים</option>
          </select>
        </div>
      </div>

      {/* Material */}
      <div>
        <label style={labelStyle}>חומר</label>
        <input style={inputStyle} value={form.material ?? ""} onChange={e => update("material", e.target.value || null)} placeholder="לדוגמה: זהב 14K, כסף 925" />
      </div>

      {/* Description */}
      <div>
        <label style={labelStyle}>תיאור</label>
        <textarea
          style={{ ...inputStyle, height: "100px", resize: "vertical" }}
          value={form.description ?? ""}
          onChange={e => update("description", e.target.value || null)}
          placeholder="תיאור המוצר..."
        />
      </div>

      {/* Badge + in_stock */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <label style={labelStyle}>תג</label>
          <select style={inputStyle} value={form.badge ?? ""} onChange={e => update("badge", e.target.value || null)}>
            <option value="">ללא תג</option>
            <option value="חדש">חדש</option>
            <option value="נמכר ביותר">נמכר ביותר</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>מלאי</label>
          <select style={inputStyle} value={form.in_stock ? "1" : "0"} onChange={e => update("in_stock", e.target.value === "1")}>
            <option value="1">במלאי</option>
            <option value="0">אזל</option>
          </select>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <label style={labelStyle}>מידות (מופרדות בפסיקים)</label>
        <input
          style={inputStyle}
          value={(form.sizes ?? []).join(", ")}
          onChange={e => update("sizes", e.target.value ? e.target.value.split(",").map(s => s.trim()) : null)}
          placeholder="לדוגמה: 5, 6, 7, 8"
        />
      </div>

      {/* Submit */}
      <div style={{ display: "flex", gap: "12px", paddingTop: "8px" }}>
        <button
          type="submit"
          disabled={saving || uploading}
          style={{ padding: "13px 32px", background: (saving || uploading) ? "#999" : "#111", color: "#fff", border: "none", fontSize: "12px", letterSpacing: "0.18em", textTransform: "uppercase", cursor: (saving || uploading) ? "not-allowed" : "pointer" }}
        >
          {saving ? "שומר..." : isEdit ? "שמור שינויים" : "צור מוצר"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/dashboard")}
          style={{ padding: "13px 24px", background: "none", color: "#555", border: "1px solid #E0E0E0", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer" }}
        >
          ביטול
        </button>
      </div>
    </form>
  );
}
