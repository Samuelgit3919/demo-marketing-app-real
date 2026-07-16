-- Create pricing_tiers table
CREATE TABLE IF NOT EXISTS public.pricing_tiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  price TEXT NOT NULL,
  label TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.pricing_tiers ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Allow public read access to pricing_tiers"
  ON public.pricing_tiers FOR SELECT USING (true);

CREATE POLICY "Admins can manage pricing_tiers"
  ON public.pricing_tiers FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- Timestamps trigger
CREATE TRIGGER update_pricing_tiers_updated_at
  BEFORE UPDATE ON public.pricing_tiers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed existing data
INSERT INTO public.pricing_tiers (price, label, order_index) VALUES
  ('$2,500+', 'Sliding Wardrobes', 0),
  ('$4,500+', 'Walk-in Closets', 1),
  ('$8,000+', 'Dressing Rooms', 2),
  ('Custom', 'Luxury Suites', 3);
