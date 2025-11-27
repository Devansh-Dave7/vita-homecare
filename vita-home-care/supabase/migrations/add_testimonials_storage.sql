-- Create storage bucket for testimonial images
-- Run this in Supabase SQL Editor

-- Step 1: Create the testimonials bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'testimonials', 
  'testimonials', 
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

-- Step 2: Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
DROP POLICY IF EXISTS "Service role can manage all" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access" ON storage.objects;
DROP POLICY IF EXISTS "Allow all operations for service role" ON storage.objects;

-- Step 3: Allow public read access to the testimonials bucket
CREATE POLICY "Allow public read access" ON storage.objects
  FOR SELECT 
  TO public
  USING (bucket_id = 'testimonials');

-- Step 4: Allow all operations for service role (used by admin)
-- The service role key bypasses RLS by default, but we add this for completeness
CREATE POLICY "Allow all operations for service role" ON storage.objects
  FOR ALL 
  TO service_role
  USING (bucket_id = 'testimonials')
  WITH CHECK (bucket_id = 'testimonials');

-- Note: After running this migration:
-- 1. The service role key (SUPABASE_SERVICE_ROLE_KEY) is required for uploads
-- 2. Optionally enable Image Transformations in Supabase Dashboard:
--    Storage > Settings > Enable Image Transformations
