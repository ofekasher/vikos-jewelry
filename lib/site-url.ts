// Single source of truth for the canonical site URL. Used by metadata,
// sitemap, robots and structured data so they never disagree with each other.
// Set NEXT_PUBLIC_SITE_URL in Vercel once a custom domain is connected.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://vikos-jewelry.vercel.app").replace(/\/$/, "");
