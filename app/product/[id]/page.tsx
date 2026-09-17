import type { Metadata } from "next";
import { products } from "@/lib/products";
import type { Product } from "@/lib/products";
import { getProduct } from "@/lib/products-server";
import { SITE_URL } from "@/lib/site-url";
import ProductClient from "./ProductClient";

// Pre-generate a static page for every product in lib/products.ts at build time.
// New products added only via Supabase (not in the static list) are still handled
// at runtime via the dynamic fallback.
export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = await getProduct(id);
  if (!p) return { title: "מוצר | VIKOS Jewelry" };
  return {
    title: `${p.nameHe} | VIKOS Jewelry`,
    description: p.descriptionHe,
    openGraph: {
      title: p.nameHe,
      description: p.descriptionHe,
      images: [{ url: p.image, width: 800, height: 1067, alt: p.nameHe }],
      type: "website",
      locale: "he_IL",
      siteName: "VIKOS Jewelry",
    },
    twitter: {
      card: "summary_large_image",
      title: p.nameHe,
      description: p.descriptionHe,
      images: [p.image],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = await getProduct(id);

  const jsonLd = p ? {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.nameHe,
    description: p.descriptionHe,
    image: p.image,
    sku: p.id,
    brand: { "@type": "Brand", name: "VIKOS Jewelry" },
    offers: {
      "@type": "Offer",
      price: p.price,
      priceCurrency: "ILS",
      availability: p.inStock === false ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
      url: `${SITE_URL}/product/${p.id}`,
    },
  } : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ProductClient productId={id} staticProduct={p} />
    </>
  );
}
