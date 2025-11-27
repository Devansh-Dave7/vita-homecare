-- Create service_categories table for dynamic category management
-- Run this in Supabase SQL Editor

-- Create the table
CREATE TABLE IF NOT EXISTS service_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;

-- Public read policy
CREATE POLICY "Public read service_categories" ON service_categories 
  FOR SELECT USING (true);

-- Admin write policy
CREATE POLICY "Admin modify service_categories" ON service_categories 
  FOR ALL USING (auth.role() = 'authenticated') 
  WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Add updated_at trigger
CREATE TRIGGER trg_service_categories_updated 
  BEFORE UPDATE ON service_categories
  FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

-- Seed with existing categories from services table
INSERT INTO service_categories (name, slug, sort_order) VALUES
  ('Care', 'care', 1),
  ('Personal Care', 'personal-care', 2),
  ('Domestic', 'domestic', 3),
  ('Transport', 'transport', 4),
  ('Support', 'support', 5),
  ('Other', 'other', 6)
ON CONFLICT (name) DO NOTHING;
