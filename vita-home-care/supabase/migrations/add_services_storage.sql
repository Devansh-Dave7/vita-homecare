-- Create storage bucket for service images
-- Run this in Supabase SQL Editor

-- Step 1: Create the services bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'services', 
  'services', 
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

-- Step 2: Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow public read access for services" ON storage.objects;
DROP POLICY IF EXISTS "Allow all operations for service role on services" ON storage.objects;

-- Step 3: Allow public read access to the services bucket
CREATE POLICY "Allow public read access for services" ON storage.objects
  FOR SELECT 
  TO public
  USING (bucket_id = 'services');

-- Step 4: Allow all operations for service role (used by admin)
CREATE POLICY "Allow all operations for service role on services" ON storage.objects
  FOR ALL 
  TO service_role
  USING (bucket_id = 'services')
  WITH CHECK (bucket_id = 'services');
