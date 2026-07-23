-- ════════════════════════════════════════════
-- VIKOS JEWELRY — Supabase Setup
-- הדבק את כל הקובץ הזה ב: SQL Editor → Run
-- ════════════════════════════════════════════

-- טבלת מוצרים
CREATE TABLE IF NOT EXISTS public.products (
  id               TEXT        PRIMARY KEY,
  name_he          TEXT        NOT NULL DEFAULT '',
  name_en          TEXT        NOT NULL DEFAULT '',
  description_he   TEXT        DEFAULT '',
  description_en   TEXT        DEFAULT '',
  price            INTEGER     NOT NULL DEFAULT 0,
  category         TEXT        NOT NULL DEFAULT 'rings',
  image            TEXT        DEFAULT '',
  hover_image      TEXT,
  images           TEXT[]      DEFAULT '{}',
  material         TEXT        DEFAULT '',
  is_new           BOOLEAN     DEFAULT false,
  is_bestseller    BOOLEAN     DEFAULT false,
  in_stock         BOOLEAN     DEFAULT true,
  discount         INTEGER     DEFAULT 0 CHECK (discount >= 0 AND discount <= 100),
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- עדכון אוטומטי של updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_products_updated ON public.products;
CREATE TRIGGER trg_products_updated
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- אבטחה (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- כל אחד יכול לקרוא מוצרים
DROP POLICY IF EXISTS "Public read" ON public.products;
CREATE POLICY "Public read" ON public.products
  FOR SELECT USING (true);

-- רק service_role יכול לכתוב (פאנל אדמין)
DROP POLICY IF EXISTS "Service write" ON public.products;
CREATE POLICY "Service write" ON public.products
  FOR ALL USING (auth.role() = 'service_role');
