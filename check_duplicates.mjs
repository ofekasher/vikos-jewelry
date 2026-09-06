import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const { data, error } = await supabase
  .from('products')
  .select('id, name_he, name_en, image, hover_image, category')
  .eq('category', 'bracelets')
  .order('image');

if (error) { console.error(error); process.exit(1); }

// Find duplicate main images
const imageMap = {};
for (const p of data) {
  const img = p.image;
  if (!imageMap[img]) imageMap[img] = [];
  imageMap[img].push(p);
}

const duplicates = Object.entries(imageMap).filter(([, products]) => products.length > 1);

if (duplicates.length === 0) {
  console.log('✅ No duplicate images found!');
} else {
  console.log(`❌ Found ${duplicates.length} images shared between multiple products:\n`);
  for (const [img, products] of duplicates) {
    console.log(`  🖼️  ${img}`);
    for (const p of products) {
      console.log(`      → [${p.id}] ${p.name_he || p.name_en}`);
    }
    console.log('');
  }
}

// Also check hover duplicates
const hoverMap = {};
for (const p of data) {
  if (!p.hover_image) continue;
  if (!hoverMap[p.hover_image]) hoverMap[p.hover_image] = [];
  hoverMap[p.hover_image].push(p);
}

const hoverDupes = Object.entries(hoverMap).filter(([, products]) => products.length > 1);
if (hoverDupes.length > 0) {
  console.log(`\n⚠️  Also ${hoverDupes.length} hover images shared between multiple products:`);
  for (const [img, products] of hoverDupes) {
    console.log(`  🖼️  ${img}`);
    for (const p of products) console.log(`      → [${p.id}] ${p.name_he}`);
    console.log('');
  }
}
