import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Fetch all bracelets to find duplicates dynamically
const { data, error } = await supabase
  .from('products')
  .select('id, name_he, name_en, image, hover_image')
  .eq('category', 'bracelets')
  .order('id');

if (error) { console.error(error); process.exit(1); }

// Group by image path — find duplicates
const imageMap = {};
for (const p of data) {
  if (!imageMap[p.image]) imageMap[p.image] = [];
  imageMap[p.image].push(p);
}

// For each duplicate group: keep the FIRST (lowest sort order), delete the rest
const toDelete = [];
const toKeep = [];

for (const [img, products] of Object.entries(imageMap)) {
  if (products.length <= 1) continue;
  // Keep first, delete rest
  toKeep.push(products[0]);
  for (let i = 1; i < products.length; i++) {
    toDelete.push(products[i]);
  }
}

console.log(`Found ${toDelete.length} duplicate products to delete:\n`);
for (const p of toDelete) {
  console.log(`  🗑  [${p.id}] ${p.name_he || p.name_en}`);
  console.log(`       image: ${p.image}`);
}

console.log(`\nKeeping ${toKeep.length + (data.length - toKeep.length - toDelete.length)} unique products.`);

// Delete duplicates
console.log('\n=== DELETING ===');
let ok = 0, fail = 0;
for (const p of toDelete) {
  const { error: delErr } = await supabase
    .from('products')
    .delete()
    .eq('id', p.id);

  if (delErr) {
    console.log(`  ❌ [${p.id}] ${p.name_he}: ${delErr.message}`);
    fail++;
  } else {
    console.log(`  ✅ Deleted [${p.id}] ${p.name_he || p.name_en}`);
    ok++;
  }
}

console.log(`\n=== SUMMARY ===`);
console.log(`✅ Deleted: ${ok}`);
console.log(`❌ Failed:  ${fail}`);
console.log(`📦 Remaining unique bracelets: ${data.length - ok}`);
