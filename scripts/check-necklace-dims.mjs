import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, '..', 'public', 'necklaces', 'gfen');

const files = [
  'gfen_nk_01.png','gfen_nk_02.jpg','gfen_nk_03.jpg',
  'gfen_nk_04.jpg','gfen_nk_05.jpg','gfen_nk_06.jpg',
  'gfen_nk_07.jpg','gfen_nk_08.jpg','gfen_nk_09.jpg'
];

for (const f of files) {
  const m = await sharp(path.join(dir, f)).metadata();
  console.log(`${f}: ${m.width}x${m.height}`);
}
