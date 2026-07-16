-- Flexible key/value content store for editable site sections
-- (homepage hero/services/CTA, How It Works steps, etc.).
-- Each row is one section: `key` is a stable slug, `value` is a JSON blob
-- whose shape is defined in src/lib/siteContent.ts.
CREATE TABLE IF NOT EXISTS public.site_content (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- RLS Policies: anyone can read, only admins can write.
CREATE POLICY "Allow public read access to site_content"
  ON public.site_content FOR SELECT USING (true);

CREATE POLICY "Admins can manage site_content"
  ON public.site_content FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- Timestamps trigger
CREATE TRIGGER update_site_content_updated_at
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
