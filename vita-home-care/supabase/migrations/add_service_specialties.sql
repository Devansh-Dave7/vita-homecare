-- Create service_specialties table for dynamic specialty management
-- Run this in Supabase SQL Editor

-- Create the table
CREATE TABLE IF NOT EXISTS service_specialties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  sort_order int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE service_specialties ENABLE ROW LEVEL SECURITY;

-- Public read policy (only active specialties)
CREATE POLICY "Public read service_specialties" ON service_specialties 
  FOR SELECT USING (is_active = true);

-- Admin read all policy
CREATE POLICY "Admin read all service_specialties" ON service_specialties 
  FOR SELECT USING (
    auth.role() = 'authenticated' 
    AND (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- Admin write policy
CREATE POLICY "Admin modify service_specialties" ON service_specialties 
  FOR ALL USING (auth.role() = 'authenticated') 
  WITH CHECK ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Add updated_at trigger
CREATE TRIGGER trg_service_specialties_updated 
  BEFORE UPDATE ON service_specialties
  FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

-- Seed with existing specialties from ServicesGrid component
INSERT INTO service_specialties (name, slug, description, sort_order, is_active) VALUES
  (
    'Elderly care', 
    'elderly-care', 
    'Supporting seniors to live independently at home with personal care, companionship, and daily assistance.', 
    1,
    true
  ),
  (
    'Mobility support', 
    'mobility-support', 
    'Assistance for clients with limited mobility, including safe transfers, walking support, and positioning around the home.', 
    2,
    true
  ),
  (
    'Prolonged health conditions', 
    'prolonged-health-conditions', 
    'Skilled non-clinical support for long-term conditions, built around the care plan from your doctor or hospital.', 
    3,
    true
  ),
  (
    'Dementia care', 
    'dementia-care', 
    'Compassionate, patient-focused support for clients living with dementia or memory loss, with routines that feel familiar and safe.', 
    4,
    true
  ),
  (
    'Chronic illness support', 
    'chronic-illness-support', 
    'Safe, reliable daily assistance for non-medical needs related to chronic illness—help around medication reminders, meals, and everyday tasks.', 
    5,
    true
  )
ON CONFLICT (name) DO NOTHING;

-- Verify the insert
SELECT id, name, slug, description, sort_order, is_active FROM service_specialties ORDER BY sort_order;
