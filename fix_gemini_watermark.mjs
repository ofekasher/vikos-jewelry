import { createClient } from '@supabase/supabase-js';
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, 'public');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Get all products with Gemini images
const { data, error } = await supabase
  .from('products')
  .select('id, image, hover_image')
  .or('image.ilike.%Gemini%,hover_image.ilike.%Gemini%');

if (error) { console.error(error); process.exit(1); }

console.log(`Found ${data.length} products with Gemini images\n`);

// Track which files we've already fixed (don't redo)
const fixed = new Set();

async function removeWatermark(relPath) {
  if (!relPath || !relPath.includes('Gemini')) return;
  if (fixed.has(relPath)) return;

  const filePath = path.join(PUBLIC_DIR, relPath.replace(/^\//, ''));

  try {
    const img = sharp(filePath);
    const meta = await img.metadata();
    const W = meta.width, H = meta.height;

    // Scan the bottom 30% for non-white pixels to find watermark bounds
    const { data: raw, info } = await sharp(filePath).raw().toBuffer({ resolveWithObject: true });
    const C = info.channels;
    let minX = W, maxX = 0, minY = H, maxY = 0;
    const startY = Math.floor(H * 0.7);

    for (let y = startY; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const idx = (y * W + x) * C;
        const r = raw[idx], g = raw[idx+1], b = raw[idx+2];
        if (r < 200 || g < 200 || b < 200) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (maxX === 0 && maxY === 0) {
      console.log(`  ℹ️  No watermark found in ${relPath}`);
      fixed.add(relPath);
      return;
    }

    // Add padding around watermark
    const pad = 8;
    const left = Math.max(0, minX - pad);
    const top = Math.max(0, minY - pad);
    const width = Math.min(W - left, maxX - minX + pad * 2);
    const height = Math.min(H - top, maxY - minY + pad * 2);

    console.log(`  🔧 ${relPath}: watermark at x${minX}-${maxX}, y${minY}-${maxY}`);

    // Create white overlay rectangle
    const whiteRect = await sharp({
      create: { width, height, channels: 3, background: { r: 255, g: 255, b: 255 } }
    }).png().toBuffer();

    // Composite white rectangle over watermark
    await sharp(filePath)
      .composite([{ input: whiteRect, left, top }])
      .toFile(filePath + '.tmp.png');

    // Replace original with fixed
    const fs = await import('fs');
    fs.renameSync(filePath + '.tmp.png', filePath);
    fixed.add(relPath);
    console.log(`  ✅ Fixed: ${relPath}`);

  } catch (err) {
    console.log(`  ❌ Error on ${relPath}: ${err.message}`);
  }
}

for (const p of data) {
  console.log(`[${p.id}]`);
  await removeWatermark(p.image);
  await removeWatermark(p.hover_image);
}

console.log(`\n=== DONE ===`);
console.log(`Fixed ${fixed.size} images`);
