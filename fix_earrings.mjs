import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Replace Pexels URLs with local earring images across 3 sets (ea, eb, ec)
const fixes = [
  // ea set (5 earrings)
  { id: 'e1',  image: '/earrings/ea_base_01.png', hover_image: '/earrings/ea_prod_01.png' },
  { id: 'e2',  image: '/earrings/ea_prod_02.png', hover_image: '/earrings/ea_prod_03.png' },
  { id: 'e3',  image: '/earrings/ea_prod_04.png', hover_image: '/earrings/ea_prod_05.png' },
  { id: 'e5',  image: '/earrings/ea_prod_06.png', hover_image: '/earrings/ea_prod_07.png' },
  { id: 'e8',  image: '/earrings/ea_prod_08.png', hover_image: '/earrings/ea_prod_09.png' },
  // eb set (5 earrings)
  { id: 'e9',  image: '/earrings/eb_base_01.png', hover_image: '/earrings/eb_prod_01.png' },
  { id: 'e12', image: '/earrings/eb_prod_02.png', hover_image: '/earrings/eb_prod_03.png' },
  { id: 'e15', image: '/earrings/eb_prod_04.png', hover_image: '/earrings/eb_prod_05.png' },
  { id: 'e16', image: '/earrings/eb_prod_06.png', hover_image: '/earrings/eb_prod_07.png' },
  { id: 'e17', image: '/earrings/eb_prod_08.png', hover_image: '/earrings/eb_prod_09.png' },
  // ec set (3 earrings)
  { id: 'e19', image: '/earrings/ec_base_01.png', hover_image: '/earrings/ec_prod_01.png' },
  { id: 'e22', image: '/earrings/ec_prod_02.png', hover_image: '/earrings/ec_prod_03.png' },
  { id: 'e23', image: '/earrings/ec_prod_04.png', hover_image: '/earrings/ec_prod_05.png' },
];

console.log(`Updating ${fixes.length} earring products...\n`);

for (const fix of fixes) {
  const { error } = await supabase
    .from('products')
    .update({ image: fix.image, hover_image: fix.hover_image })
    .eq('id', fix.id);

  if (error) {
    console.log(`❌ [${fix.id}] ${error.message}`);
  } else {
    console.log(`✅ [${fix.id}] ${fix.image}`);
  }
}

console.log('\nDone. All earring images updated to local files.');
