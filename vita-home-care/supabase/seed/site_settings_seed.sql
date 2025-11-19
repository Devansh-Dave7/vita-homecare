-- Seed data for site_settings table
-- Store contact information that can be edited via admin panel
-- Run in Supabase SQL editor after schema creation

insert into site_settings (key, value_json)
values
('contact_phone', '"7542532477"'::jsonb),
('contact_phone_display', '"+44 7542 532477"'::jsonb),
('contact_email', '"contact@vitahomecare.com"'::jsonb),
('contact_location', '"Lusaka, Zambia"'::jsonb)
on conflict (key) do update
set value_json = excluded.value_json,
    updated_at = now();

-- Verify
select key, value_json from site_settings where key like 'contact_%' order by key;
