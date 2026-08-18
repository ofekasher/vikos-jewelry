import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const { data, error } = await supabase
  .from('products')
  .select('id, name_he, name_en, category, image, hover_image')
  .not('hover_image', 'is', null)
  .order('category');

if (error) { console.error(error); process.exit(1); }

// Extract the "set" (prefix) from an image path
// e.g. /rings/RF_hand_04.png → "RF"
// e.g. /bracelets/new_d01_prod_03.png → "d01"
// e.g. /bracelets/pack_b08.png → "pack_b"
function getSet(imgPath) {
  if (!imgPath) return null;
  const filename = imgPath.split('/').pop().replace('.png','').replace('.jpg','');

  // bracelets: new_d01_prod_03 → d01
  const braceletMatch = filename.match(/new_(d\d+)_prod/);
  if (braceletMatch) return braceletMatch[1];

  // bracelets pack: pack_b08 → pack_b
  const packMatch = filename.match(/^(pack_[abc])/);
  if (packMatch) return packMatch[1];

  // rings: RF_hand_04 → RF
  const ringMatch = filename.match(/^([A-Z]+\d*|[a-z0-9]+)_hand_/);
  if (ringMatch) return ringMatch[1];

  // rings Gemini: Gemini_Generated_Image_xxxx_ring_01 → Gemini_xxxx
  const gemMatch = filename.match(/Gemini_Generated_Image_([a-z0-9]+)_ring/);
  if (gemMatch) return 'Gemini_' + gemMatch[1];

  // earrings: ea_prod_02 → ea
  const earMatch = filename.match(/^(e[a-z])_/);
  if (earMatch) return earMatch[1];

  // necklaces: j2ox_neck_01 → j2ox
  const neckMatch = filename.match(/^([a-z0-9]+)_neck_/);
  if (neckMatch) return neckMatch[1];

  return filename;
}

let mismatches = [];

for (const p of data) {
  const mainSet = getSet(p.image);
  const hoverSet = getSet(p.hover_image);

  if (mainSet !== hoverSet) {
    mismatches.push({ ...p, mainSet, hoverSet });
  }
}

console.log(`Checked ${data.length} products with hover images\n`);

if (mismatches.length === 0) {
  console.log('✅ No mismatched image pairs found!');
} else {
  console.log(`❌ Found ${mismatches.length} mismatched products:\n`);
  for (const p of mismatches) {
    console.log(`[${p.id}] ${p.category} — ${p.name_he || p.name_en}`);
    console.log(`  Main:  ${p.image}  (set: ${p.mainSet})`);
    console.log(`  Hover: ${p.hover_image}  (set: ${p.hoverSet})`);
    console.log();
  }
}
