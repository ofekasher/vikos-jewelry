import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const { data, error } = await supabase
  .from('products')
  .select('id, category, image, hover_image')
  .is('hover_image', null)
  .in('category', ['rings', 'necklaces', 'earrings'])
  .order('category')
  .order('id');

if (error) { console.error(error); process.exit(1); }

console.log(`Found ${data.length} products without hover images\n`);

function nextNum(n, max) {
  return n < max ? n + 1 : n - 1;
}
function pad(n) {
  return String(n).padStart(2, '0');
}

function getHover(category, imgPath) {
  if (!imgPath) return null;
  const file = imgPath.split('/').pop();
  const dir = '/' + category + '/';

  if (category === 'rings') {
    // Standard hand shot: {set}_hand_{num}.png
    const hand = file.match(/^(.+)_hand_(\d+)\.png$/);
    if (hand) {
      const num = parseInt(hand[2], 10);
      return dir + hand[1] + '_hand_' + pad(nextNum(num, 10)) + '.png';
    }
    // Gemini ring: Gemini_Generated_Image_{id}_ring_{num}.png
    const gem = file.match(/^(Gemini_Generated_Image_[a-z0-9]+)_ring_(\d+)\.png$/);
    if (gem) {
      const num = parseInt(gem[2], 10);
      return dir + gem[1] + '_ring_' + pad(nextNum(num, 10)) + '.png';
    }
  }

  if (category === 'necklaces') {
    // Base → first neck shot
    const base = file.match(/^(.+)_base\.png$/);
    if (base) return dir + base[1] + '_neck_01.png';
    // Neck shot → adjacent
    const neck = file.match(/^(.+)_neck_(\d+)\.png$/);
    if (neck) {
      const num = parseInt(neck[2], 10);
      return dir + neck[1] + '_neck_' + pad(nextNum(num, 9)) + '.png';
    }
  }

  if (category === 'earrings') {
    // Base: ea_base_01 → ea_prod_01
    const base = file.match(/^(e[a-c])_base_\d+\.png$/);
    if (base) return dir + base[1] + '_prod_01.png';
    // Prod: ea_prod_{num} → next prod
    const prod = file.match(/^(e[a-c])_prod_(\d+)\.png$/);
    if (prod) {
      const num = parseInt(prod[2], 10);
      return dir + prod[1] + '_prod_' + pad(nextNum(num, 10)) + '.png';
    }
  }

  return null;
}

let updated = 0, skipped = 0;

for (const p of data) {
  const hover = getHover(p.category, p.image);

  if (!hover || hover === p.image) {
    console.log(`⚠️  [${p.id}] no hover rule for: ${p.image}`);
    skipped++;
    continue;
  }

  const { error: err } = await supabase
    .from('products')
    .update({ hover_image: hover })
    .eq('id', p.id);

  if (err) {
    console.log(`❌ [${p.id}] ${err.message}`);
  } else {
    console.log(`✅ [${p.id}] ${p.category}: ${hover}`);
    updated++;
  }
}

console.log(`\nDone — updated: ${updated}, skipped: ${skipped}`);
