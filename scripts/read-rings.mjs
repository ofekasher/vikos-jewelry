import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xoquxhiqsjfsxngxnpaj.supabase.co",
  process.env.SUPABASE_SECRET_KEY,
  { auth: { persistSession: false } }
);

const { data: rings, error } = await supabase
  .from("products")
  .select("id, name_he, price")
  .eq("category", "rings")
  .order("created_at", { ascending: true });

if (error) { console.error("Error:", error.message); process.exit(1); }

console.log("=== טבעות קיימות ===");
rings.forEach((r, i) => console.log(`${i+1}. [${r.id}] ${r.name_he} | ₪${r.price}`));
console.log(`\nסה"כ: ${rings.length} טבעות`);
