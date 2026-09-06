import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const { data, error } = await supabase
  .from('products')
  .select('id, name_he, name_en, image, hover_image, images')
  .eq('category', 'bracelets')
  .order('id');

if (error) { console.error(error); process.exit(1); }

let ok = 0, noHover = 0, badImage = 0;
for (const p of data) {
  const imgOk = p.image && !p.image.includes('placeholder');
  const hoverOk = p.hover_image && p.hover_image !== p.image;
  const status = imgOk && hoverOk ? '✅' : imgOk ? '⚠️ no-hover' : '❌ bad-img';
  if (!imgOk) badImage++;
  else if (!hoverOk) noHover++;
  else ok++;
  console.log(`${status} [${p.id}] ${p.name_he || p.name_en}`);
  console.log(`     image: ${p.image}`);
  console.log(`     hover: ${p.hover_image || 'NONE'}`);
}
console.log(`\nSummary: ✅ ${ok} ok | ⚠️ ${noHover} no hover | ❌ ${badImage} bad image`);
console.log(`Total: ${data.length} bracelets`);
