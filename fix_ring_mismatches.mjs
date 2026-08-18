import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// r5: hover=RA_hand_05 → main should also be RA (different shot)
// r9: hover=RA_hand_09 → main should also be RA (different shot)
// r24: hover=RC_hand_04 → main should also be RC (different shot)

const fixes = [
  { id: 'r5',  image: '/rings/RA_hand_01.png', hover_image: '/rings/RA_hand_05.png' },
  { id: 'r9',  image: '/rings/RA_hand_03.png', hover_image: '/rings/RA_hand_09.png' },
  { id: 'r24', image: '/rings/RC_hand_01.png', hover_image: '/rings/RC_hand_04.png' },
];

for (const fix of fixes) {
  const { error } = await supabase
    .from('products')
    .update({ image: fix.image, hover_image: fix.hover_image })
    .eq('id', fix.id);

  if (error) {
    console.log(`❌ [${fix.id}] ${error.message}`);
  } else {
    console.log(`✅ [${fix.id}] main=${fix.image} | hover=${fix.hover_image}`);
  }
}

console.log('\nDone. All 3 ring mismatches fixed.');
