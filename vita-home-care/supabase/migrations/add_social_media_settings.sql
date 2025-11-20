-- Migration script to add social media links to site_settings
-- Run this in Supabase SQL Editor

INSERT INTO site_settings (key, value_json)
VALUES
('social_facebook', '""'::jsonb),
('social_twitter', '""'::jsonb),
('social_instagram', '""'::jsonb),
('social_youtube', '""'::jsonb),
('social_linkedin', '""'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- Verify the changes
SELECT key, value_json 
FROM site_settings 
WHERE key LIKE 'social_%' 
ORDER BY key;
