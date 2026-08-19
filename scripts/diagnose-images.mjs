import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RINGS_DIR = path.join(__dirname, '../public/rings/new');

// Only v1 images (main product thumbnail per ring)
const files = fs.readdirSync(RINGS_DIR)
  .filter(f => f.endsWith('_v1.jpg'))
  .sort();

console.log(`\nDiagnostic report — ${files.length} product thumbnails\n`);
console.log('File'.padEnd(36) + 'Dims'.padEnd(14) + 'Subject%'.padEnd(12) + 'Flag');
console.log('-'.repeat(70));

const flags = [];

for (const file of files) {
  const filePath = path.join(RINGS_DIR, file);

  const meta = await sharp(filePath).metadata();
  const totalPixels = meta.width * meta.height;

  // Trim white border (threshold 12 — keeps soft shadows, catches bright metal edges)
  let trimMeta;
  try {
    trimMeta = await sharp(filePath)
      .trim({ background: '#ffffff', threshold: 12 })
      .toBuffer({ resolveWithObject: true })
      .then(({ info }) => info);
  } catch {
    // trim may throw if the whole image is white
    trimMeta = { width: 0, height: 0 };
  }

  const subjectPixels = (trimMeta.width || 0) * (trimMeta.height || 0);
  const subjectPct = totalPixels > 0 ? (subjectPixels / totalPixels) * 100 : 0;

  const flag = subjectPct < 2 ? '⚠ non-white/gradient bg' : '';
  if (flag) flags.push({ file, subjectPct: subjectPct.toFixed(1) });

  const dims = `${meta.width}×${meta.height}`;
  console.log(
    file.padEnd(36) +
    dims.padEnd(14) +
    `${subjectPct.toFixed(1)}%`.padEnd(12) +
    flag
  );
}

console.log('\n' + '-'.repeat(70));
if (flags.length === 0) {
  console.log('✓ No images flagged — all have detectable white/near-white backgrounds.');
} else {
  console.log(`⚠ ${flags.length} image(s) flagged (subject < 2% after trim — likely non-white or gradient bg):`);
  flags.forEach(f => console.log(`  ${f.file}  subject=${f.subjectPct}%`));
}
console.log('');
