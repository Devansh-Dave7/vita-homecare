-- Supabase schema for Vita Home Care dynamic content
-- Run this in the SQL editor in your Supabase project AFTER creating the project.
-- Assumptions: pg crypto extension available for gen_random_uuid()

-- Enable extensions (safe if already exists)
create extension if not exists "pgcrypto";

-- AUTH PROFILE TABLE -------------------------------------------------------
create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  email text unique not null,
  role text not null default 'user', -- 'admin' for admin panel
  created_at timestamptz default now()
);

-- BLOG ---------------------------------------------------------------------
create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  hero_image_url text,
  seo_title text,
  seo_description text,
  body_markdown text not null,
  status text not null default 'draft', -- 'draft' | 'published'
  author_id uuid references profiles(id) on delete set null,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists blog_categories (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  slug text unique not null,
  created_at timestamptz default now()
);

create table if not exists tags (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  slug text unique not null,
  created_at timestamptz default now()
);

create table if not exists blog_post_categories (
  blog_post_id uuid references blog_posts(id) on delete cascade,
  category_id uuid references blog_categories(id) on delete cascade,
  primary key (blog_post_id, category_id)
);

create table if not exists blog_post_tags (
  blog_post_id uuid references blog_posts(id) on delete cascade,
  tag_id uuid references tags(id) on delete cascade,
  primary key (blog_post_id, tag_id)
);

-- SERVICES -----------------------------------------------------------------
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  short_description text,
  hero_image_url text,
  body_markdown text not null, -- main descriptive content
  audience_markdown text,      -- who is it for
  features_markdown text,      -- optional markdown list
  category text,               -- e.g. 'Personal Care' | 'Support'
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- PRICING ------------------------------------------------------------------
create table if not exists pricing_plans (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  monthly_price numeric(10,2) not null,
  yearly_price numeric(10,2),
  description text,
  badge text,                 -- e.g. 'Most Popular'
  highlighted boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists pricing_features (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid references pricing_plans(id) on delete cascade,
  feature text not null,
  sort_order int default 0
);

-- TESTIMONIALS -------------------------------------------------------------
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text,
  quote text not null,
  avatar_url text,
  attribution text,
  published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- STAFF --------------------------------------------------------------------
create table if not exists staff_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  photo_url text,
  bio_markdown text,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- INFO CARDS ---------------------------------------------------------------
create table if not exists info_cards (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  cta_label text,
  cta_href text,
  icon_name text, -- identifier for front-end icon selection
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- NAVIGATION ---------------------------------------------------------------
create table if not exists navigation_items (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  href text not null,
  sort_order int default 0,
  is_hidden boolean default false
);

-- SITE SETTINGS ------------------------------------------------------------
create table if not exists site_settings (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value_json jsonb not null,
  updated_at timestamptz default now()
);

-- SIMPLE UPDATED_AT TRIGGERS ----------------------------------------------
create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;$$ language plpgsql;

create trigger trg_blog_posts_updated before update on blog_posts
for each row execute procedure set_updated_at();
create trigger trg_services_updated before update on services
for each row execute procedure set_updated_at();
create trigger trg_pricing_plans_updated before update on pricing_plans
for each row execute procedure set_updated_at();
create trigger trg_testimonials_updated before update on testimonials
for each row execute procedure set_updated_at();
create trigger trg_staff_members_updated before update on staff_members
for each row execute procedure set_updated_at();
create trigger trg_info_cards_updated before update on info_cards
for each row execute procedure set_updated_at();

-- ROW LEVEL SECURITY -------------------------------------------------------
alter table profiles enable row level security;
alter table blog_posts enable row level security;
alter table blog_categories enable row level security;
alter table tags enable row level security;
alter table blog_post_categories enable row level security;
alter table blog_post_tags enable row level security;
alter table services enable row level security;
alter table pricing_plans enable row level security;
alter table pricing_features enable row level security;
alter table testimonials enable row level security;
alter table staff_members enable row level security;
alter table info_cards enable row level security;
alter table navigation_items enable row level security;
alter table site_settings enable row level security;

-- PUBLIC READ POLICIES -----------------------------------------------------
create policy "Public read blog_posts" on blog_posts for select using (status = 'published');
create policy "Public read blog_categories" on blog_categories for select using (true);
create policy "Public read tags" on tags for select using (true);
create policy "Public read services" on services for select using (true);
create policy "Public read pricing_plans" on pricing_plans for select using (true);
create policy "Public read pricing_features" on pricing_features for select using (true);
create policy "Public read testimonials" on testimonials for select using (published);
create policy "Public read staff_members" on staff_members for select using (true);
create policy "Public read info_cards" on info_cards for select using (true);
create policy "Public read navigation_items" on navigation_items for select using (is_hidden = false);
create policy "Public read site_settings" on site_settings for select using (true);

-- ADMIN WRITE POLICIES -----------------------------------------------------
-- Allow authenticated user with role 'admin' to modify tables.
create policy "Admin modify blog_posts" on blog_posts for all using (auth.role() = 'authenticated') with check ((select role from profiles where id = auth.uid()) = 'admin');
create policy "Admin modify services" on services for all using (auth.role() = 'authenticated') with check ((select role from profiles where id = auth.uid()) = 'admin');
create policy "Admin modify pricing_plans" on pricing_plans for all using (auth.role() = 'authenticated') with check ((select role from profiles where id = auth.uid()) = 'admin');
create policy "Admin modify pricing_features" on pricing_features for all using (auth.role() = 'authenticated') with check ((select role from profiles where id = auth.uid()) = 'admin');
create policy "Admin modify testimonials" on testimonials for all using (auth.role() = 'authenticated') with check ((select role from profiles where id = auth.uid()) = 'admin');
create policy "Admin modify staff_members" on staff_members for all using (auth.role() = 'authenticated') with check ((select role from profiles where id = auth.uid()) = 'admin');
create policy "Admin modify info_cards" on info_cards for all using (auth.role() = 'authenticated') with check ((select role from profiles where id = auth.uid()) = 'admin');
create policy "Admin modify navigation_items" on navigation_items for all using (auth.role() = 'authenticated') with check ((select role from profiles where id = auth.uid()) = 'admin');
create policy "Admin modify site_settings" on site_settings for all using (auth.role() = 'authenticated') with check ((select role from profiles where id = auth.uid()) = 'admin');
create policy "Admin modify blog_categories" on blog_categories for all using (auth.role() = 'authenticated') with check ((select role from profiles where id = auth.uid()) = 'admin');
create policy "Admin modify tags" on tags for all using (auth.role() = 'authenticated') with check ((select role from profiles where id = auth.uid()) = 'admin');
create policy "Admin modify blog_post_categories" on blog_post_categories for all using (auth.role() = 'authenticated') with check ((select role from profiles where id = auth.uid()) = 'admin');
create policy "Admin modify blog_post_tags" on blog_post_tags for all using (auth.role() = 'authenticated') with check ((select role from profiles where id = auth.uid()) = 'admin');

-- SEED DATA PLACEHOLDER ----------------------------------------------------
-- Insert initial navigation, pricing, services, testimonials here after creation.
