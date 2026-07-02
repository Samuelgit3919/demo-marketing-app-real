-- ============================================================================
-- Project videos: admin-managed videos shown on the Gallery page
-- ============================================================================

-- Public storage bucket for video files (thumbnails reuse the existing "images" bucket)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'videos',
  'videos',
  true,
  209715200, -- 200 MB per file
  ARRAY['video/mp4','video/webm','video/quicktime','video/ogg','video/x-msvideo']
)
ON CONFLICT (id) DO NOTHING;

-- Table
CREATE TABLE IF NOT EXISTS public.project_videos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    video_url TEXT NOT NULL,
    video_public_id TEXT NOT NULL,
    thumbnail_url TEXT,
    thumbnail_public_id TEXT,
    title TEXT NOT NULL,
    description TEXT,
    type public.gallery_item_type NOT NULL DEFAULT 'other',
    is_active BOOLEAN NOT NULL DEFAULT true,
    order_index INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.project_videos ENABLE ROW LEVEL SECURITY;

-- Public can read; admins can manage
DROP POLICY IF EXISTS "Allow public read access to project_videos" ON public.project_videos;
CREATE POLICY "Allow public read access to project_videos"
    ON public.project_videos FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage project_videos" ON public.project_videos;
CREATE POLICY "Admins can manage project_videos"
    ON public.project_videos FOR ALL TO authenticated
    USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'))
    WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

-- updated_at trigger
DROP TRIGGER IF EXISTS update_project_videos_updated_at ON public.project_videos;
CREATE TRIGGER update_project_videos_updated_at
    BEFORE UPDATE ON public.project_videos
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ----------------------------------------------------------------------------
-- Storage policies for the "videos" bucket
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public can read videos" ON storage.objects;
CREATE POLICY "Public can read videos"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'videos');

DROP POLICY IF EXISTS "Admins can upload videos" ON storage.objects;
CREATE POLICY "Admins can upload videos"
    ON storage.objects FOR INSERT TO authenticated
    WITH CHECK (
        bucket_id = 'videos'
        AND EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
    );

DROP POLICY IF EXISTS "Admins can update videos" ON storage.objects;
CREATE POLICY "Admins can update videos"
    ON storage.objects FOR UPDATE TO authenticated
    USING (
        bucket_id = 'videos'
        AND EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
    );

DROP POLICY IF EXISTS "Admins can delete videos" ON storage.objects;
CREATE POLICY "Admins can delete videos"
    ON storage.objects FOR DELETE TO authenticated
    USING (
        bucket_id = 'videos'
        AND EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
    );
