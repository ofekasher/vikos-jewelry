/**
 * v4: rebuild the 4 homepage category images from Magnific-upscaled
 * (ultra-photo 2x) sources instead of the raw WhatsApp-compressed
 * originals, so the tight editorial crops stay sharp instead of
 * pixelating. Same crop composition as v3, coordinates scaled 2x to
 * match the upscaled source resolution. Output kept at a sane file
 * size (resize down from the huge upscaled source + mozjpeg).
 */
import sharp from 'sharp';
import path from 'path';

const SRC_DIR = "C:/Users/ofeka/AppData/Local/Temp/claude/C--Users-ofeka-OneDrive-Desktop-cloude-project/93a1386c-d37f-4412-916f-85bf3a0f68fa/scratchpad";
const OUT_DIR = path.join(process.cwd(), 'public');
const TARGET_RATIO = 4 / 3;
const OUT_W = 1100; // plenty sharp for a ~450-700px display tile at 2x DPR, without bloating file size
const OUT_H = Math.round(OUT_W / TARGET_RATIO);

async function checkDims(file) {
  const m = await sharp(path.join(SRC_DIR, file)).metadata();
  console.log(file, m.width, 'x', m.height);
  return m;
}

async function coverCropToRatio(buf) {
  const meta = await sharp(buf).metadata();
  const { width: w, height: h } = meta;
  const currentRatio = w / h;
  let cropW = w, cropH = h;
  if (currentRatio > TARGET_RATIO) {
    cropW = Math.round(h * TARGET_RATIO);
  } else {
    cropH = Math.round(w / TARGET_RATIO);
  }
  const left = Math.floor((w - cropW) / 2);
  const top = Math.floor((h - cropH) / 2);
  return sharp(buf).extract({ left, top, width: cropW, height: cropH }).toBuffer();
}

async function finish(buf, outName, outW = OUT_W) {
  const outH = Math.round(outW / TARGET_RATIO);
  const final = await sharp(buf)
    .resize(outW, outH, { fit: 'fill' })
    .jpeg({ quality: 78, mozjpeg: true })
    .toBuffer();
  await sharp(final).toFile(path.join(OUT_DIR, outName));
  const kb = Math.round(final.length / 1024);
  console.log('✓', outName, `${outW}x${outH}`, `${kb}KB`);
}

async function run() {
  await checkDims('up_bracelet.jpg');
  await checkDims('up_earrings.jpg');
  await checkDims('up_ring.jpg');
  await checkDims('up_necklace.jpg');

  // Bracelet — cover-crop to 4:3
  {
    const trimmed = await sharp(path.join(SRC_DIR, 'up_bracelet.jpg')).trim({ threshold: 15 }).toBuffer();
    const cropped = await coverCropToRatio(trimmed);
    await finish(cropped, 'cat-bracelets-v2.jpg');
  }

  // Earrings — cover-crop to 4:3
  {
    const trimmed = await sharp(path.join(SRC_DIR, 'up_earrings.jpg')).trim({ threshold: 15 }).toBuffer();
    const cropped = await coverCropToRatio(trimmed);
    await finish(cropped, 'cat-earrings-v2.jpg');
  }

  // Ring — tight crop on just 2 diamonds + prongs, fills the frame completely
  {
    const trimmed = await sharp(path.join(SRC_DIR, 'up_ring.jpg')).trim({ threshold: 15 }).toBuffer();
    const cropped = await sharp(trimmed).extract({ left: 0, top: 500, width: 750, height: 562 }).toBuffer();
    await finish(cropped, 'cat-rings-v2.jpg');
  }

  // Necklace — dense close-up on the diamond line itself (no plain chain,
  // no hollow center) instead of the clasp/tag wide shot, which still had
  // too much bare white next to the busy bracelet/earrings tiles.
  {
    const trimmed = await sharp(path.join(SRC_DIR, 'up_necklace.jpg')).trim({ threshold: 15 }).toBuffer();
    const cropped = await sharp(trimmed).extract({ left: 2380, top: 1750, width: 320, height: 240 }).toBuffer();
    await finish(cropped, 'cat-necklaces-v2.jpg', 640);
  }

  console.log('done');
}

run();
