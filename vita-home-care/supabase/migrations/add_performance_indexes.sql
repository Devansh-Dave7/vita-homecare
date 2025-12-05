-- Performance indexes for service_specialties and related tables
-- Run this in Supabase SQL Editor

-- Index for filtering active specialties with ordering
CREATE INDEX IF NOT EXISTS idx_service_specialties_active_sort 
  ON service_specialties (is_active, sort_order) 
  WHERE is_active = true;

-- Index for site_settings key lookups
CREATE INDEX IF NOT EXISTS idx_site_settings_key 
  ON site_settings (key);

-- Index for staff members ordering
CREATE INDEX IF NOT EXISTS idx_staff_members_sort 
  ON staff_members (sort_order);

-- Index for services by category and name
CREATE INDEX IF NOT EXISTS idx_services_category_name 
  ON services (category, name);

-- Index for about_page_content key lookups
CREATE INDEX IF NOT EXISTS idx_about_page_content_key 
  ON about_page_content (key);

-- Analyze tables to update statistics for query planner
ANALYZE service_specialties;
ANALYZE site_settings;
ANALYZE staff_members;
ANALYZE services;
ANALYZE about_page_content;
