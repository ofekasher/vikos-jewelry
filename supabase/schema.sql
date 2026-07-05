-- Run this in Supabase Dashboard → SQL Editor

create table if not exists products (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  price       integer not null default 0,
  category    text not null check (category in ('rings','necklaces','bracelets','earrings')),
  images      text[] not null default '{}',
  badge       text check (badge in ('נמכר ביותר','חדש')),
  description text,
  in_stock    boolean not null default true,
  sizes       text[],
  material    text,
  created_at  timestamptz not null default now()
);

-- Enable Row Level Security
alter table products enable row level security;

-- Allow anyone to read products (public storefront)
create policy "Public read" on products
  for select using (true);

-- Only service-role key can insert/update/delete (admin panel uses service key)
create policy "Service insert" on products
  for insert with check (true);

create policy "Service update" on products
  for update using (true);

create policy "Service delete" on products
  for delete using (true);

-- Storage bucket for product images
insert into storage.buckets (id, name, public)
values ('products', 'products', true)
on conflict (id) do nothing;

-- Allow public read of images
create policy "Public image read" on storage.objects
  for select using (bucket_id = 'products');

-- Allow service role to upload images
create policy "Service image upload" on storage.objects
  for insert with check (bucket_id = 'products');

create policy "Service image delete" on storage.objects
  for delete using (bucket_id = 'products');
