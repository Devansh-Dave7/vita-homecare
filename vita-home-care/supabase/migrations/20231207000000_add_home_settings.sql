-- Migration: Add home settings table for managing homepage content
-- This table stores hero section content (text and image) for the homepage

create table if not exists home_settings (
  id uuid primary key default gen_random_uuid(),
  hero_badge text not null default 'Non-medical home care',
  hero_title text not null,
  hero_subtitle text not null,
  hero_description text not null,
  hero_image_url text not null,
  hero_primary_button_text text not null default 'Browse plans',
  hero_primary_button_url text not null default '/inquiry',
  hero_primary_button_enabled boolean not null default true,
  hero_secondary_button_text text not null default 'Watch our video',
  hero_secondary_button_url text default null,
  hero_secondary_button_enabled boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS Policies for home_settings
alter table home_settings enable row level security;

-- Allow anyone to read home settings (needed for public homepage)
create policy "Anyone can view home settings"
  on home_settings for select
  using (true);

-- Only authenticated admins can modify home settings
create policy "Only admins can update home settings"
  on home_settings for update
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

create policy "Only admins can insert home settings"
  on home_settings for insert
  with check (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- Insert default content (matching current Hero component)
insert into home_settings (
  hero_badge,
  hero_title,
  hero_subtitle,
  hero_description,
  hero_image_url,
  hero_primary_button_text,
  hero_primary_button_url,
  hero_primary_button_enabled,
  hero_secondary_button_text,
  hero_secondary_button_url,
  hero_secondary_button_enabled
) values (
  'Non-medical home care',
  'Best care for',
  'your loved ones',
  'We provide non-medical home care through trained healthcare assistants and nurse assistants (not registered nurses). Our team offers personal care, companionship, and daily support—assisting with safe mobility, light domestic tasks, and medication reminders so your loved one can remain at home with confidence.',
  '/new hero image.png',
  'Browse plans',
  '/inquiry',
  true,
  'Watch our video',
  null,
  true
);

-- Add storage bucket for home page images if it doesn't exist
insert into storage.buckets (id, name, public)
values ('home-images', 'home-images', true)
on conflict (id) do nothing;

-- Storage policies for home-images bucket
create policy "Anyone can view home images"
  on storage.objects for select
  using (bucket_id = 'home-images');

create policy "Admins can upload home images"
  on storage.objects for insert
  with check (
    bucket_id = 'home-images' and
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

create policy "Admins can update home images"
  on storage.objects for update
  using (
    bucket_id = 'home-images' and
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

create policy "Admins can delete home images"
  on storage.objects for delete
  using (
    bucket_id = 'home-images' and
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- Create index for faster queries (only one row expected, but good practice)
create index if not exists idx_home_settings_updated_at on home_settings(updated_at desc);
