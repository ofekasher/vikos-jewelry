import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Pairing logic: white-bg grid → lifestyle grid
// d01 (white) ↔ d02 (lifestyle)
// d03 (white) ↔ d05 (lifestyle)
// d04 (white) ↔ d06 (lifestyle)
// d07 (white) ↔ d08 (lifestyle)
const GRID_PAIRS = {
  'd01': 'd02',
  'd02': 'd01', // d02 used as main = wrong, swap to d01
  'd03': 'd05',
  'd04': 'd06',
  'd05': 'd03', // d05 used as main = wrong, swap to d03
  'd06': 'd04', // d06 used as main = wrong, swap to d04
  'd07': 'd08',
  'd08': 'd07', // d08 used as main = wrong, swap to d07
};

// Lifestyle grids (should NOT be main image)
const LIFESTYLE_GRIDS = new Set(['d02', 'd05', 'd06', 'd08']);

// Pack products: front is main, 45angle is hover
const PACK_NAMES = [
  'hamsa_bracelet',
  'pink_heart_bracelet',
  'red_heart_ring',
  'triangle_tennis_bracelet',
  'smiley_tennis_bracelet',
  'fish_ring',
];

// Parse grid code from image path like /bracelets/new_d01_prod_03.png
function parseGrid(imagePath) {
  const match = imagePath.match(/new_(d\d{2})_prod_(\d{2})/);
  if (!match) return null;
  return { grid: match[1], num: match[2] };
}

// Parse pack name from image path like /bracelets/hamsa_bracelet_front.jpg
function parsePack(imagePath) {
  for (const name of PACK_NAMES) {
    if (imagePath.includes(name)) return name;
  }
  return null;
}

// Fetch all bracelet products
const { data: products, error } = await supabase
  .from('products')
  .select('id, name_he, name_en, image, hover_image')
  .eq('category', 'bracelets')
  .order('id');

if (error) { console.error(error); process.exit(1); }

console.log(`Found ${products.length} bracelet products\n`);

let updates = [];
let skipped = [];

for (const p of products) {
  const img = p.image || '';
  const gridInfo = parseGrid(img);
  const packName = parsePack(img);

  if (gridInfo) {
    const { grid, num } = gridInfo;
    const pairGrid = GRID_PAIRS[grid];

    if (!pairGrid) {
      skipped.push(`[${p.id}] ${p.name_he} — unknown grid ${grid}`);
      continue;
    }

    const isLifestyle = LIFESTYLE_GRIDS.has(grid);

    if (isLifestyle) {
      // Main image is lifestyle (wrong) — swap with white-bg version
      const correctMain = `/bracelets/new_${pairGrid}_prod_${num}.png`;
      const correctHover = img; // current path stays as hover
      updates.push({
        id: p.id,
        name: p.name_he || p.name_en,
        image: correctMain,
        hover_image: correctHover,
        note: `SWAP: ${grid}→${pairGrid} as main, ${grid} as hover`,
      });
    } else {
      // Main image is white-bg (correct) — just add hover
      const hoverPath = `/bracelets/new_${pairGrid}_prod_${num}.png`;
      updates.push({
        id: p.id,
        name: p.name_he || p.name_en,
        image: img, // keep current
        hover_image: hoverPath,
        note: `ADD HOVER: ${grid} main → ${pairGrid} hover`,
      });
    }
  } else if (packName) {
    // Pack product: front = main, 45angle = hover
    const hoverPath = `/bracelets/${packName}_45angle.jpg`;
    // Normalize main to front if needed
    const mainPath = img.includes('_front') ? img : `/bracelets/${packName}_front.jpg`;
    updates.push({
      id: p.id,
      name: p.name_he || p.name_en,
      image: mainPath,
      hover_image: hoverPath,
      note: `PACK: front as main, 45angle as hover`,
    });
  } else {
    skipped.push(`[${p.id}] ${p.name_he || p.name_en} — unrecognized image: ${img}`);
  }
}

console.log(`Updates planned: ${updates.length}`);
console.log(`Skipped: ${skipped.length}\n`);

if (skipped.length > 0) {
  console.log('=== SKIPPED ===');
  skipped.forEach(s => console.log(` ⚠️  ${s}`));
  console.log('');
}

console.log('=== APPLYING UPDATES ===');
let ok = 0, fail = 0;

for (const u of updates) {
  const { error: updateError } = await supabase
    .from('products')
    .update({ image: u.image, hover_image: u.hover_image })
    .eq('id', u.id);

  if (updateError) {
    console.log(`  ❌ [${u.id}] ${u.name}: ${updateError.message}`);
    fail++;
  } else {
    console.log(`  ✅ [${u.id}] ${u.name}`);
    console.log(`     main:  ${u.image}`);
    console.log(`     hover: ${u.hover_image}`);
    ok++;
  }
}

console.log(`\n=== SUMMARY ===`);
console.log(`✅ Updated: ${ok}`);
console.log(`❌ Failed:  ${fail}`);
console.log(`⚠️  Skipped: ${skipped.length}`);
