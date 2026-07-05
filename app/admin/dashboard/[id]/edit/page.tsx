"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductForm from "../../_components/ProductForm";

export default function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  useEffect(() => {
    fetch(`/api/admin/products/${id}`)
      .then(r => r.json())
      .then(d => { setProduct(d); setLoading(false); })
      .catch(() => { setError("לא נמצא מוצר"); setLoading(false); });
  }, [id]);

  if (loading) return <div style={{ padding: "60px", textAlign: "center", color: "#888" }}>טוען...</div>;
  if (error)   return <div style={{ padding: "24px", color: "#e53e3e" }}>{error}</div>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2rem", fontWeight: 300, color: "#111", marginBottom: "32px" }}>עריכת מוצר</h1>
      <ProductForm initialData={product!} productId={id} />
    </div>
  );
}
