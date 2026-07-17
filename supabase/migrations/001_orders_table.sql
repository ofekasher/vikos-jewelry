-- Orders table for Vikos Jewelry
create table if not exists orders (
  id            uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  address       text,
  items         jsonb not null default '[]',
  subtotal      numeric(10,2) not null,
  shipping      numeric(10,2) not null default 0,
  total         numeric(10,2) not null,
  paypal_order_id text,
  status        text not null default 'paid',
  created_at    timestamptz not null default now()
);

-- Allow the service role to insert (used from API routes with service key)
alter table orders enable row level security;

create policy "service role full access" on orders
  using (true)
  with check (true);
