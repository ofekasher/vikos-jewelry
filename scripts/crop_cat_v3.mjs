/**
 * Rebuild the 4 homepage category images as true fill-the-frame 4:3 crops.
 * v2 padded mismatched aspect ratios with baked-in white bars (bad for the
 * portrait ring shot) and left the necklace's natural void untouched.
 * v3: cover-crop (no padding) for shapes already close to 4:3, and a
 * hand-picked close-up crop for the ring and necklace so every tile reads
 * as a dense, filled photograph.
 */
import sharp from 'sharp';
import path from 'path';

const SRC_DIR = "C:/Users/ofeka/AppData/Local/Temp/claude/C--Users-ofeka-OneDrive-Desktop-cloude-project/93a1386c-d37f-4412-916f-85bf3a0f68fa/scratchpad";
const OUT_DIR = path.join(process.cwd(), 'public');
const TARGET_RATIO = 4 / 3;
const OUT_W = 1400;
const OUT_H = Math.round(OUT_W / TARGET_RATIO);

async function coverCropToRatio(buf) {
  const meta = await sharp(buf).metadata();
  const { width: w, height: h } = meta;
  const currentRatio = w / h;
  let cropW = w, cropH = h;
  if (currentRatio > TARGET_RATIO) {
    // too wide — crop width
    cropW = Math.round(h * TARGET_RATIO);
  } else {
    // too tall — crop height
    cropH = Math.round(w / TARGET_RATIO);
  }
  const left = Math.floor((w - cropW) / 2);
  const top = Math.floor((h - cropH) / 2);
  return sharp(buf).extract({ left, top, width: cropW, height: cropH }).toBuffer();
}

async function finish(buf, outName) {
  const final = await sharp(buf).resize(OUT_W, OUT_H, { fit: 'fill' }).jpeg({ quality: 92 }).toBuffer();
  await sharp(final).toFile(path.join(OUT_DIR, outName));
  console.log('✓', outName);
}

async function run() {
  // Bracelet — already ~4:3 after trim, simple cover-crop
  {
    const trimmed = await sharp(path.join(SRC_DIR, 'cat_1_2143.jpg')).trim({ threshold: 15 }).toBuffer();
    const cropped = await coverCropToRatio(trimmed);
    await finish(cropped, 'cat-bracelets-v2.jpg');
  }

  // Earrings — already ~4:3 after trim, simple cover-crop
  {
    const trimmed = await sharp(path.join(SRC_DIR, 'cat_2_2144.jpg')).trim({ threshold: 15 }).toBuffer();
    const cropped = await coverCropToRatio(trimmed);
    await finish(cropped, 'cat-earrings-v2.jpg');
  }

  // Ring — tall portrait after trim (654x1108); band-crop across the
  // diamond section instead of padding out to landscape.
  {
    const trimmed = await sharp(path.join(SRC_DIR, 'cat_3_2145.jpg')).trim({ threshold: 15 }).toBuffer();
    const cropped = await sharp(trimmed).extract({ left: 0, top: 280, width: 654, height: 490 }).toBuffer();
    await finish(cropped, 'cat-rings-v2.jpg');
  }

  // Necklace — circular shape with a large internal void; close-up crop
  // on the clasp + VIKOS tag + diamond sweep instead of showing the whole
  // hollow circle (which reads as mostly empty at any crop).
  {
    const trimmed = await sharp(path.join(SRC_DIR, 'cat_4_2146.jpg')).trim({ threshold: 15 }).toBuffer();
    const cropped = await sharp(trimmed).extract({ left: 600, top: 0, width: 822, height: 617 }).toBuffer();
    await finish(cropped, 'cat-necklaces-v2.jpg');
  }

  console.log('done');
}

run();
