import type { MetadataRoute } from "next";
import { categories } from "@/lib/products";
import { getAllProducts } from "@/lib/products-server";
import { SITE_URL } from "@/lib/site-url";

// Products come from Supabase so items added through the admin dashboard
// are indexed without a redeploy.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();

  const productUrls = products.map((p) => ({
    url: `${SITE_URL}/product/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryUrls = categories
    .filter((c) => c.id !== "all")
    .map((c) => ({
      url: `${SITE_URL}/shop?category=${c.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/shop`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/gallery`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/custom`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/shipping`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/returns`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    ...categoryUrls,
    ...productUrls,
  ];
}
