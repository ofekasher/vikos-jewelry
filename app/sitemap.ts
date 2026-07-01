import type { MetadataRoute } from "next";
import { products, categories } from "@/lib/products";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://vikos-jewelry.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const productUrls = products.map((p) => ({
    url: `${BASE}/product/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryUrls = categories
    .filter((c) => c.id !== "all")
    .map((c) => ({
      url: `${BASE}/shop?cat=${c.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/shop`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/gallery`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    ...categoryUrls,
    ...productUrls,
  ];
}
