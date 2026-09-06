import sharp from 'sharp';
import path from 'path';

const sourceDir = "C:\\Users\\ofeka\\OneDrive\\Desktop\\cloude project\\J-M project\\‏‏תיקיה חדשה";
const outDir = "./public/bracelets";

const crops = {
  front:   { left: 0,   top: 145, width: 575, height: 420 },
  angle45: { left: 961, top: 145, width: 575, height: 420 },
  side:    { left: 638, top: 165, width: 260, height: 680 },
  back:    { left: 0,   top: 565, width: 575, height: 459 },
  closeup: { left: 961, top: 565, width: 575, height: 459 },
};

const files = [
  { src: "צמיד חמסה.jpeg",    name: "hamsa_bracelet" },
  { src: "צמיד לב .jpeg",     name: "pink_heart_bracelet" },
  { src: "צמיד לבבות.jpeg",   name: "red_heart_ring" },
  { src: "צמיד מושלש.jpeg",   name: "triangle_tennis_bracelet" },
  { src: "צמיד סמיילי.jpeg",  name: "smiley_tennis_bracelet" },
  { src: "צמיד.jpeg",         name: "fish_ring" },
];

const angleNames = {
  front:   'front',
  angle45: '45angle',
  side:    'side',
  back:    'back',
  closeup: 'closeup',
};

for (const file of files) {
  const srcPath = path.join(sourceDir, file.src);
  console.log(`\nProcessing: ${file.src}`);

  for (const [key, crop] of Object.entries(crops)) {
    const outName = `${file.name}_${angleNames[key]}.jpg`;
    const outPath = path.join(outDir, outName);

    await sharp(srcPath)
      .extract(crop)
      .jpeg({ quality: 92 })
      .toFile(outPath);

    console.log(`  ✓ ${outName}`);
  }
}

console.log('\nDone!');
