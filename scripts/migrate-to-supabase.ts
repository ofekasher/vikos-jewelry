/**
 * הרץ פעם אחת כדי לטעון את כל המוצרים לסופאבייס:
 *   npx tsx scripts/migrate-to-supabase.ts
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { products } from "../lib/products";

config({ path: ".env.local" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

if (!url || !key) {
  console.error("❌  חסרים NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY ב-.env.local");
  process.exit(1);
}

const db = createClient(url, key, { auth: { persistSession: false } });

const rows = products.map((p) => ({
  id:             p.id,
  name_he:        p.nameHe,
  name_en:        p.nameEn,
  description_he: p.descriptionHe ?? "",
  description_en: p.descriptionEn ?? "",
  price:          p.price,
  category:       p.category,
  image:          p.image,
  hover_image:    p.hoverImage ?? null,
  images:         p.images?.length ? p.images : [p.image],
  material:       p.material,
  is_new:         p.isNew ?? false,
  is_bestseller:  p.isBestseller ?? false,
  in_stock:       true,
  discount:       0,
}));

console.log(`⬆️  מעלה ${rows.length} מוצרים...`);

const BATCH = 50;
let inserted = 0;
for (let i = 0; i < rows.length; i += BATCH) {
  const batch = rows.slice(i, i + BATCH);
  const { error } = await db.from("products").upsert(batch);
  if (error) { console.error("❌  שגיאה:", error.message); process.exit(1); }
  inserted += batch.length;
  console.log(`   ${inserted}/${rows.length}`);
}

console.log(`✅  הועלו ${inserted} מוצרים בהצלחה!`);
