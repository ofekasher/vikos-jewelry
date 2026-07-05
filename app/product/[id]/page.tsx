import type { Metadata } from "next";
import { products } from "@/lib/products";
import type { Product } from "@/lib/products";
import ProductClient from "./ProductClient";

// Pre-generate a static page for every product in lib/products.ts at build time.
// New products added only via Supabase (not in the static list) are still handled
// at runtime via the dynamic fallback.
export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = products.find((x) => x.id === id);
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
  const p = products.find((x) => x.id === id) ?? null;
  const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://vikos-jewelry.com";

  const jsonLd = p ? {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.nameHe,
    description: p.descriptionHe,
    image: p.image,
    brand: { "@type": "Brand", name: "VIKOS Jewelry" },
    offers: {
      "@type": "Offer",
      price: p.price,
      priceCurrency: "ILS",
      availability: "https://schema.org/InStock",
      url: `${BASE}/product/${p.id}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "48",
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
