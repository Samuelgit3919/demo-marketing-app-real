-- ============================================================================
-- Extra editorial fields for the homepage "Closet Transformations" section
-- (before/after labels, location, date, and a headline stat per project)
-- ============================================================================

ALTER TABLE public.before_after
  ADD COLUMN IF NOT EXISTS location     TEXT,
  ADD COLUMN IF NOT EXISTS project_date TEXT,
  ADD COLUMN IF NOT EXISTS before_label TEXT,
  ADD COLUMN IF NOT EXISTS after_label  TEXT,
  ADD COLUMN IF NOT EXISTS tagline      TEXT,
  ADD COLUMN IF NOT EXISTS stat_value   TEXT,
  ADD COLUMN IF NOT EXISTS stat_label   TEXT;
