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

async function finish(buf, outName) {
  const final = await sharp(buf)
    .resize(OUT_W, OUT_H, { fit: 'fill' })
    .jpeg({ quality: 78, mozjpeg: true })
    .toBuffer();
  await sharp(final).toFile(path.join(OUT_DIR, outName));
  const kb = Math.round(final.length / 1024);
  console.log('✓', outName, `${kb}KB`);
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

  // Ring — band-crop across the diamond row, coords x2 vs v3 (source is 2x now)
  {
    const trimmed = await sharp(path.join(SRC_DIR, 'up_ring.jpg')).trim({ threshold: 15 }).toBuffer();
    const m = await sharp(trimmed).metadata();
    console.log('ring trimmed:', m.width, m.height);
    const cropped = await sharp(trimmed).extract({ left: 0, top: 560, width: m.width, height: 980 }).toBuffer();
    await finish(cropped, 'cat-rings-v2.jpg');
  }

  // Necklace — close-up on clasp + VIKOS tag + diamond sweep, coords x2 vs v3
  {
    const trimmed = await sharp(path.join(SRC_DIR, 'up_necklace.jpg')).trim({ threshold: 15 }).toBuffer();
    const m = await sharp(trimmed).metadata();
    console.log('necklace trimmed:', m.width, m.height);
    const cropped = await sharp(trimmed).extract({ left: 1190, top: 0, width: 1640, height: 1230 }).toBuffer();
    await finish(cropped, 'cat-necklaces-v2.jpg');
  }

  console.log('done');
}

run();
