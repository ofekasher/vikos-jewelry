import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const { data, error } = await supabase
  .from('products')
  .select('id, name_he, name_en, category, image, hover_image, in_stock')
  .order('category')
  .order('id');

if (error) { console.error(error); process.exit(1); }

const cats = {};
for (const p of data) {
  if (!cats[p.category]) cats[p.category] = [];
  cats[p.category].push(p);
}

for (const [cat, products] of Object.entries(cats)) {
  const inStock = products.filter(p => p.in_stock);
  console.log(`\n=== ${cat.toUpperCase()} (${inStock.length} in stock, ${products.length} total) ===`);
  for (const p of products) {
    const stock = p.in_stock ? '🟢' : '🔴';
    const hover = p.hover_image ? '✓hover' : '      ';
    const gemmine = p.image?.includes('Gemini') ? ' ⚠️ GEMMINE' : '';
    const gemmine_h = p.hover_image?.includes('Gemini') ? ' ⚠️ GEMMINE-hover' : '';
    console.log(`${stock} [${p.id}] ${p.name_he || p.name_en} | ${hover} | ${p.image}${gemmine}${gemmine_h}`);
  }
}

// Summary
const gemmine = data.filter(p => p.image?.includes('Gemini') || p.hover_image?.includes('Gemini'));
const noHover = data.filter(p => p.in_stock && !p.hover_image);

console.log('\n=== SUMMARY ===');
console.log(`Total products: ${data.length}`);
console.log(`In stock: ${data.filter(p => p.in_stock).length}`);
console.log(`⚠️  With GEMMINE images: ${gemmine.length}`);
console.log(`📷  In-stock without hover: ${noHover.length}`);

if (gemmine.length > 0) {
  console.log('\n⚠️  GEMMINE PRODUCTS:');
  for (const p of gemmine) console.log(`  [${p.id}] ${p.category} — ${p.image}`);
}
