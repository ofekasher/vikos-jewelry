import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Get ALL bracelets including out-of-stock
const { data, error } = await supabase
  .from('products')
  .select('id, name_he, name_en, image, hover_image, in_stock')
  .eq('category', 'bracelets')
  .order('id');

if (error) { console.error(error); process.exit(1); }

const inStock = data.filter(p => p.in_stock);
const outOfStock = data.filter(p => !p.in_stock);

console.log(`Total bracelets in DB: ${data.length}`);
console.log(`  ✅ In stock (visible): ${inStock.length}`);
console.log(`  ❌ Out of stock (hidden): ${outOfStock.length}`);

// Check for any remaining duplicate images
const imageMap = {};
for (const p of inStock) {
  if (!imageMap[p.image]) imageMap[p.image] = [];
  imageMap[p.image].push(p);
}
const dupes = Object.entries(imageMap).filter(([, ps]) => ps.length > 1);
console.log(`\n${dupes.length === 0 ? '✅ No duplicate images' : `❌ ${dupes.length} duplicate image groups`}`);

console.log(`\n=== ALL BRACELETS ===`);
for (const p of data) {
  const stock = p.in_stock ? '🟢' : '🔴';
  const hover = p.hover_image ? '✓hover' : '      ';
  console.log(`${stock} [${p.id}] ${p.name_he || p.name_en} | ${hover} | ${p.image}`);
}
