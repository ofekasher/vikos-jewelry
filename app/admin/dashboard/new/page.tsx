"use client";
import ProductForm from "../_components/ProductForm";

export default function NewProduct() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2rem", fontWeight: 300, color: "#111", marginBottom: "32px" }}>מוצר חדש</h1>
      <ProductForm />
    </div>
  );
}
