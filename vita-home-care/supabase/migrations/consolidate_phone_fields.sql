-- Migration script to consolidate phone number fields
-- Run this in Supabase SQL Editor to update existing site_settings

-- Update contact_phone to include country code format
UPDATE site_settings 
SET value_json = '"+260 7542 532477"'::jsonb
WHERE key = 'contact_phone';

-- Remove the deprecated contact_phone_display field
DELETE FROM site_settings 
WHERE key = 'contact_phone_display';

-- Verify the changes
SELECT key, value_json 
FROM site_settings 
WHERE key LIKE 'contact_%' 
ORDER BY key;
