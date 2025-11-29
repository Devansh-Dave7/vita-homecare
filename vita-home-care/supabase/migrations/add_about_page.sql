-- Migration for About Page Content Management
-- This adds tables for managing the About page content including hero section and gallery images

-- ABOUT PAGE CONTENT --------------------------------------------------------
-- Stores the about page hero section content and gallery images
create table if not exists about_page_content (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value_json jsonb not null,
  updated_at timestamptz default now()
);

-- Enable RLS
alter table about_page_content enable row level security;

-- Public read policy
create policy "Public read about_page_content" on about_page_content for select using (true);

-- Admin write policy
create policy "Admin modify about_page_content" on about_page_content for all 
  using (auth.role() = 'authenticated') 
  with check ((select role from profiles where id = auth.uid()) = 'admin');

-- Add trigger for updated_at
create trigger trg_about_page_content_updated before update on about_page_content
for each row execute procedure set_updated_at();

-- STAFF MEMBERS TABLE --------------------------------------------------------
create table if not exists staff_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  bio text,
  photo_url text,
  sort_order integer default 0,
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table staff_members enable row level security;

-- Public read policy (only published)
create policy "Public read staff_members" on staff_members for select using (is_published = true);

-- Admin full access
create policy "Admin modify staff_members" on staff_members for all 
  using (auth.role() = 'authenticated') 
  with check ((select role from profiles where id = auth.uid()) = 'admin');

-- Add trigger for updated_at
create trigger trg_staff_members_updated before update on staff_members
for each row execute procedure set_updated_at();

-- STORAGE BUCKET FOR ABOUT PAGE IMAGES ----------------------------------------
-- Create the 'about' storage bucket for team member photos and gallery images
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'about',
  'about',
  true,
  5242880, -- 5MB limit
  array['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
on conflict (id) do nothing;

-- Storage policies for 'about' bucket
-- Public can view images
create policy "Public read about images" on storage.objects for select
  using (bucket_id = 'about');

-- Authenticated users can upload
create policy "Authenticated upload about images" on storage.objects for insert
  with check (bucket_id = 'about' and auth.role() = 'authenticated');

-- Authenticated users can update their uploads
create policy "Authenticated update about images" on storage.objects for update
  using (bucket_id = 'about' and auth.role() = 'authenticated');

-- Authenticated users can delete
create policy "Authenticated delete about images" on storage.objects for delete
  using (bucket_id = 'about' and auth.role() = 'authenticated');

-- Seed initial about page content
insert into about_page_content (key, value_json) values
  ('hero_heading', '"Why we love what we do"'::jsonb),
  ('hero_description', '"We believe home is where care is most meaningful. Our healthcare assistants and nurse assistants (not registered nurses) provide flexible, non-medical support that preserves dignity, builds independence, and keeps families closely connected. They offer personal care, companionship, and daily support—assisting with safe mobility, light domestic tasks, and medication reminders."'::jsonb),
  ('gallery_image_1', '{"url": "https://images.pexels.com/photos/7551677/pexels-photo-7551677.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&dpr=1", "alt": "Warm embrace between senior couple"}'::jsonb),
  ('gallery_image_2', '{"url": "/caregiver with a black man.png", "alt": "Caregiver with senior smiling"}'::jsonb),
  ('gallery_image_3', '{"url": "https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&dpr=1", "alt": "Senior exercising with caregiver support"}'::jsonb),
  ('vision_text', '"To be Zambia''s most trusted home care provider, delivering compassionate and reliable support at home."'::jsonb),
  ('mission_text', '"Provide high-quality, flexible non-medical home care through trained caregivers, ensuring clients'' dignity, independence, and family connection"'::jsonb),
  ('team_heading', '"Meet our professionals"'::jsonb),
  ('team_description', '"Our caregivers provide personal care, companionship, and everyday support. They assist with safe mobility, light domestic tasks, and timely medication reminders. Every team member is certified by the Healthcare Givers Association of Zambia (HCAZ) and completes our in‑house training program covering record keeping, care standards, and client safety."'::jsonb)
on conflict (key) do nothing;

-- Seed initial staff members (if table is empty)
insert into staff_members (name, role, photo_url, sort_order) 
select * from (values
  ('Grace N.', 'Senior Caregiver', '/about us 1.jpg', 1),
  ('Peter M.', 'Care Coordinator', 'about us 2.jpg', 2),
  ('Thandi K.', 'Home Support Assistant', 'about us 3.jpg', 3),
  ('Mal S.', 'Client Liaison', 'about us 4.jpg', 4)
) as v(name, role, photo_url, sort_order)
where not exists (select 1 from staff_members limit 1);
