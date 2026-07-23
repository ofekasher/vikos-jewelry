"use client";
import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

interface DbProduct {
  id?:            string;
  name_he:        string;
  name_en:        string;
  description_he: string;
  description_en: string;
  price:          number;
  category:       "rings" | "necklaces" | "bracelets" | "earrings";
  image:          string;
  hover_image:    string;
  images:         string[];
  material:       string;
  is_new:         boolean;
  is_bestseller:  boolean;
  in_stock:       boolean;
  discount:       number;
}

const EMPTY: DbProduct = {
  name_he: "", name_en: "", description_he: "", description_en: "",
  price: 0, category: "rings",
  image: "", hover_image: "", images: [],
  material: "",
  is_new: false, is_bestseller: false,
  in_stock: true, discount: 0,
};

export default function ProductForm({ initialData, productId }: { initialData?: Partial<DbProduct>; productId?: string }) {
  const router = useRouter();
  const isEdit = !!productId;
  const [form, setForm]           = useState<DbProduct>({ ...EMPTY, ...initialData });
  const [saving, setSaving]       = useState(false);
  const [dragOver, setDragOver]   = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function update<K extends keyof DbProduct>(key: K, val: DbProduct[K]) {
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
    setForm(f => {
      const newImages = [...f.images, ...urls];
      return { ...f, images: newImages, image: newImages[0] ?? f.image };
    });
    setUploading(false);
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
    if (files.length) uploadFiles(files);
  }, []);

  function removeImage(idx: number) {
    setForm(f => {
      const imgs = f.images.filter((_, i) => i !== idx);
      return { ...f, images: imgs, image: imgs[0] ?? "" };
    });
  }

  function moveImage(from: number, to: number) {
    setForm(f => {
      const imgs = [...f.images];
      const [item] = imgs.splice(from, 1);
      imgs.splice(to, 0, item);
      return { ...f, images: imgs, image: imgs[0] ?? "" };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name_he.trim()) return alert("נדרש שם מוצר בעברית");
    if (form.price <= 0)      return alert("נדרש מחיר תקין");
    setSaving(true);
    try {
      const payload = {
        ...form,
        image:      form.images[0] ?? form.image ?? "",
        hover_image: form.images[1] ?? form.hover_image ?? null,
        discount:   Math.min(100, Math.max(0, Math.round(form.discount))),
      };
      const url    = isEdit ? `/api/admin/products/${productId}` : "/api/admin/products";
      const method = isEdit ? "PATCH" : "POST";
      const res    = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "שגיאה");
      router.refresh();
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

        {form.images.length > 0 && (
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {form.images.map((url, idx) => (
              <div key={url + idx} style={{ position: "relative", width: "100px" }}>
                <img src={url} alt="" style={{ width: "100px", height: "130px", objectFit: "cover", display: "block", background: "#F7F7F5" }} />
                {idx === 0 && (
                  <span style={{ position: "absolute", top: "4px", right: "4px", fontSize: "9px", background: "#111", color: "#fff", padding: "2px 5px", letterSpacing: "0.08em" }}>ראשי</span>
                )}
                {idx === 1 && (
                  <span style={{ position: "absolute", top: "4px", right: "4px", fontSize: "9px", background: "#8B7355", color: "#fff", padding: "2px 5px", letterSpacing: "0.08em" }}>hover</span>
                )}
                <div style={{ display: "flex", gap: "4px", marginTop: "4px" }}>
                  {idx > 0 && (
                    <button type="button" onClick={() => moveImage(idx, idx - 1)} style={{ fontSize: "11px", background: "none", border: "1px solid #ddd", cursor: "pointer", padding: "2px 6px", flex: 1 }}>→</button>
                  )}
                  <button type="button" onClick={() => removeImage(idx)} style={{ fontSize: "11px", background: "none", border: "1px solid #ddd", cursor: "pointer", padding: "2px 6px", color: "#e53e3e", flex: idx === 0 ? undefined : 1 }}>✕</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Image URL fallback */}
        <div style={{ marginTop: "12px" }}>
          <label style={{ ...labelStyle, fontSize: "10px", color: "#aaa" }}>או: URL ישיר לתמונה</label>
          <input
            style={{ ...inputStyle, fontSize: "12px", color: "#555" }}
            value={form.image}
            onChange={e => update("image", e.target.value)}
            placeholder="https://..."
          />
        </div>
      </section>

      {/* Names */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <label style={labelStyle}>שם מוצר בעברית *</label>
          <input style={inputStyle} value={form.name_he} onChange={e => update("name_he", e.target.value)} placeholder="שם בעברית" required />
        </div>
        <div>
          <label style={labelStyle}>שם מוצר באנגלית</label>
          <input style={inputStyle} value={form.name_en} onChange={e => update("name_en", e.target.value)} placeholder="Name in English" />
        </div>
      </div>

      {/* Price + Category */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
        <div>
          <label style={labelStyle}>מחיר (₪) *</label>
          <input style={inputStyle} type="number" min={0} value={form.price} onChange={e => update("price", Number(e.target.value))} required />
        </div>
        <div>
          <label style={labelStyle}>הנחה (%)</label>
          <input
            style={inputStyle}
            type="number"
            min={0}
            max={100}
            value={form.discount}
            onChange={e => update("discount", Number(e.target.value))}
            placeholder="0"
          />
        </div>
        <div>
          <label style={labelStyle}>קטגוריה</label>
          <select style={inputStyle} value={form.category} onChange={e => update("category", e.target.value as DbProduct["category"])}>
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
        <input style={inputStyle} value={form.material} onChange={e => update("material", e.target.value)} placeholder="לדוגמה: זהב 14K, כסף 925" />
      </div>

      {/* Descriptions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <label style={labelStyle}>תיאור בעברית</label>
          <textarea
            style={{ ...inputStyle, height: "100px", resize: "vertical" }}
            value={form.description_he}
            onChange={e => update("description_he", e.target.value)}
            placeholder="תיאור המוצר בעברית..."
          />
        </div>
        <div>
          <label style={labelStyle}>תיאור באנגלית</label>
          <textarea
            style={{ ...inputStyle, height: "100px", resize: "vertical" }}
            value={form.description_en}
            onChange={e => update("description_en", e.target.value)}
            placeholder="Product description in English..."
          />
        </div>
      </div>

      {/* Flags */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
        <div>
          <label style={labelStyle}>מלאי</label>
          <select style={inputStyle} value={form.in_stock ? "1" : "0"} onChange={e => update("in_stock", e.target.value === "1")}>
            <option value="1">במלאי ✓</option>
            <option value="0">אזל ✗</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>מוצר חדש</label>
          <select style={inputStyle} value={form.is_new ? "1" : "0"} onChange={e => update("is_new", e.target.value === "1")}>
            <option value="0">לא</option>
            <option value="1">כן — תג "חדש"</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>נמכר ביותר</label>
          <select style={inputStyle} value={form.is_bestseller ? "1" : "0"} onChange={e => update("is_bestseller", e.target.value === "1")}>
            <option value="0">לא</option>
            <option value="1">כן — תג "bestseller"</option>
          </select>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          {form.discount > 0 && form.price > 0 && (
            <div style={{ padding: "10px 12px", background: "#FFF3F3", border: "1px solid #fbc0c0", fontSize: "13px", color: "#C0392B", width: "100%", boxSizing: "border-box" }}>
              מחיר אחרי הנחה: ₪{Math.round(form.price * (1 - form.discount / 100)).toLocaleString()}
            </div>
          )}
        </div>
      </div>

      {/* Submit */}
      <div style={{ display: "flex", gap: "12px", paddingTop: "8px" }}>
        <button
          type="submit"
          disabled={saving || uploading}
          style={{
            padding: "13px 32px",
            background: (saving || uploading) ? "#999" : "#111",
            color: "#fff", border: "none",
            fontSize: "12px", letterSpacing: "0.18em", textTransform: "uppercase",
            cursor: (saving || uploading) ? "not-allowed" : "pointer",
          }}
        >
          {saving ? "שומר..." : isEdit ? "שמור שינויים" : "צור מוצר"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/dashboard")}
          style={{
            padding: "13px 24px",
            background: "none", color: "#555",
            border: "1px solid #E0E0E0",
            fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          ביטול
        </button>
      </div>
    </form>
  );
}
