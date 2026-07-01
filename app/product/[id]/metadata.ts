import type { Metadata } from "next";
import { products } from "@/lib/products";

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
