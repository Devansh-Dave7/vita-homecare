-- Normalize service categories to match admin form values
-- Run this in Supabase SQL Editor

-- Update all categories to lowercase with dashes
UPDATE services
SET category = CASE
  WHEN LOWER(category) = 'support' THEN 'support'
  WHEN LOWER(REPLACE(category, ' ', '-')) = 'personal-care' THEN 'personal-care'
  WHEN LOWER(REPLACE(category, ' ', '-')) = 'personal care' THEN 'personal-care'
  WHEN LOWER(category) = 'care' THEN 'care'
  WHEN LOWER(category) = 'domestic' THEN 'domestic'
  WHEN LOWER(category) = 'transport' THEN 'transport'
  WHEN LOWER(category) = 'other' THEN 'other'
  ELSE LOWER(REPLACE(category, ' ', '-'))
END;

-- Verify the update
SELECT DISTINCT category, COUNT(*) as count
FROM services
GROUP BY category
ORDER BY category;
