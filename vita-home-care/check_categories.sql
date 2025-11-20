-- Check all categories in services table
SELECT DISTINCT category, COUNT(*) as count
FROM services
GROUP BY category
ORDER BY category;

-- Check all services with their categories
SELECT name, category FROM services ORDER BY category, name;
