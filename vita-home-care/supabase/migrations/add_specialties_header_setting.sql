-- Seed default header for specialties section in Services page
INSERT INTO site_settings (key, value_json, updated_at)
VALUES (
  'services_specialties_header',
  '{"title":"What we specialise in","description":"Vita Homecare focuses on non-medical home care. We do not replace hospital or clinic services; instead, we provide practical, everyday support around the client in their own home."}',
  now()
)
ON CONFLICT (key) DO NOTHING;

-- Verify
select key, value_json from site_settings where key = 'services_specialties_header';
