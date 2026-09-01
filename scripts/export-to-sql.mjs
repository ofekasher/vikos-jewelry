import { createClient } from "@supabase/supabase-js";
import { writeFileSync } from "fs";

const old = createClient(
  "https://xoquxhiqsjfsxngxnpaj.supabase.co",
  process.env.SUPABASE_SECRET_KEY,
  { auth: { persistSession: false } }
);

const { data, error } = await old.from("products").select("*");
if (error) { console.error(error.message); process.exit(1); }

const escape = v => v == null ? "NULL"
  : typeof v === "boolean" ? (v ? "TRUE" : "FALSE")
  : typeof v === "number" ? v
  : Array.isArray(v) ? `ARRAY[${v.map(x => `'${x.replace(/'/g,"''")}'`).join(",")}]::text[]`
  : `'${String(v).replace(/'/g, "''")}'`;

const cols = ["id","name_he","name_en","description_he","description_en","price","category",
              "image","hover_image","images","material","is_new","is_bestseller","in_stock","discount"];

const rows = data.map(r =>
  `(${cols.map(c => escape(r[c])).join(",")})`
).join(",\n");

const sql = `INSERT INTO public.products (${cols.join(",")}) VALUES\n${rows}\nON CONFLICT (id) DO UPDATE SET
  name_he=EXCLUDED.name_he, name_en=EXCLUDED.name_en,
  description_he=EXCLUDED.description_he, description_en=EXCLUDED.description_en,
  price=EXCLUDED.price, category=EXCLUDED.category, image=EXCLUDED.image,
  hover_image=EXCLUDED.hover_image, images=EXCLUDED.images, material=EXCLUDED.material,
  is_new=EXCLUDED.is_new, is_bestseller=EXCLUDED.is_bestseller,
  in_stock=EXCLUDED.in_stock, discount=EXCLUDED.discount;`;

writeFileSync("scripts/insert-products.sql", sql);
console.log(`✓ ${data.length} רשומות → scripts/insert-products.sql`);
