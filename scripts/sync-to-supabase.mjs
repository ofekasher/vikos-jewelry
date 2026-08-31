// Syncs all products from lib/products.ts to Supabase via the admin migrate API
import { config } from 'dotenv';
config({ path: '.env.local' });

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
if (!ADMIN_PASSWORD) { console.error('ADMIN_PASSWORD not set in .env.local'); process.exit(1); }

const BASE_URL = 'http://localhost:3000';

async function main() {
  console.log('Syncing products to Supabase...');
  const res = await fetch(`${BASE_URL}/api/admin/migrate`, {
    method: 'POST',
    headers: { 'x-admin-token': ADMIN_PASSWORD, 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });
  const data = await res.json();
  if (!res.ok) {
    console.error('Error:', data);
    process.exit(1);
  }
  console.log(`✅ Synced ${data.inserted} / ${data.total} products to Supabase`);
}

main().catch(console.error);
