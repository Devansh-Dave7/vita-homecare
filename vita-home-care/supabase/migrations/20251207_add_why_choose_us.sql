-- Create tables for Why Choose Us settings and features
create table if not exists public.why_choose_us_settings (
  id uuid primary key default gen_random_uuid(),
  badge_text text,
  heading_main text,
  heading_highlight text,
  heading_suffix text,
  description text,
  primary_button_text text,
  primary_button_url text,
  primary_button_enabled boolean not null default true,
  secondary_button_text text,
  secondary_button_url text,
  secondary_button_enabled boolean not null default true,
  image_url_1 text,
  image_url_2 text,
  image_url_3 text,
  updated_at timestamptz not null default now()
);

create table if not exists public.why_choose_us_features (
  id uuid primary key default gen_random_uuid(),
  settings_id uuid not null references public.why_choose_us_settings(id) on delete cascade,
  sort_order int not null,
  title text,
  icon_name text,
  enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Ensure one settings row exists
insert into public.why_choose_us_settings (badge_text, heading_main, heading_highlight, heading_suffix, description,
  primary_button_text, primary_button_url, primary_button_enabled,
  secondary_button_text, secondary_button_url, secondary_button_enabled,
  image_url_1, image_url_2, image_url_3)
select 'Our Promise', 'Why Choose', 'Vita Home Care', 'in Lusaka', 'We provide compassionate, reliable, and personalized home care services.',
  'Get Care Now', '/contact', true,
  'Call Us', 'tel:+260XXXXXXXXX', true,
  null, null, null
where not exists (select 1 from public.why_choose_us_settings);

-- Seed four features if missing
with s as (
  select id from public.why_choose_us_settings limit 1
)
insert into public.why_choose_us_features (settings_id, sort_order, title, icon_name, enabled)
select s.id, f.sort_order, f.title, f.icon_name, true
from s,
  (values
    (1, '24/7 Home Care Support', 'clock'),
    (2, 'Personal Care at Home', 'user'),
    (3, 'Non-medical Daily Support', 'home'),
    (4, 'Trained Care Assistant', 'star')
  ) as f(sort_order, title, icon_name)
where not exists (select 1 from public.why_choose_us_features where settings_id = s.id);

-- Indexes for performance
create index if not exists why_choose_us_features_settings_order_idx on public.why_choose_us_features(settings_id, sort_order);

-- Backfill columns if table existed without timestamps
alter table public.why_choose_us_features
  add column if not exists created_at timestamptz not null default now();
alter table public.why_choose_us_features
  add column if not exists updated_at timestamptz not null default now();

-- RLS policies: public read, admin write
alter table public.why_choose_us_settings enable row level security;
alter table public.why_choose_us_features enable row level security;

-- Public read policy (PostgreSQL does not support IF NOT EXISTS for policies)
do $$
begin
  begin
    create policy why_choose_us_settings_public_read on public.why_choose_us_settings
      for select using (true);
  exception when duplicate_object then
    null; -- policy already exists
  end;

  begin
    create policy why_choose_us_features_public_read on public.why_choose_us_features
      for select using (true);
  exception when duplicate_object then
    null; -- policy already exists
  end;
end$$;

-- Admin write via service role (handled by server-side key), so no update policy for anon
