-- Add form submissions tables for Contact and Inquiry forms
-- Run this migration in Supabase SQL editor

-- CONTACT SUBMISSIONS TABLE -----------------------------------------------
create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null,
  preferred_time text,
  service_type text,
  message text,
  submitted_at timestamptz default now(),
  status text default 'new' -- 'new', 'contacted', 'closed'
);

-- INQUIRY SUBMISSIONS TABLE -----------------------------------------------
create table if not exists inquiry_submissions (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  address text not null,
  care_for text,
  start_date text not null,
  reason text,
  hours_per_week text,
  referrer text,
  can_afford text not null,
  service_option text,
  submitted_at timestamptz default now(),
  status text default 'new' -- 'new', 'contacted', 'closed'
);

-- ENABLE RLS ---------------------------------------------------------------
alter table contact_submissions enable row level security;
alter table inquiry_submissions enable row level security;

-- ADMIN READ/WRITE POLICIES ------------------------------------------------
-- Only admins can view and manage submissions
create policy "Admin read contact_submissions" on contact_submissions
  for select 
  using (
    auth.role() = 'authenticated' 
    and (select role from profiles where id = auth.uid()) = 'admin'
  );

create policy "Admin read inquiry_submissions" on inquiry_submissions
  for select 
  using (
    auth.role() = 'authenticated' 
    and (select role from profiles where id = auth.uid()) = 'admin'
  );

create policy "Admin update contact_submissions" on contact_submissions
  for update 
  using (
    auth.role() = 'authenticated' 
    and (select role from profiles where id = auth.uid()) = 'admin'
  );

create policy "Admin update inquiry_submissions" on inquiry_submissions
  for update 
  using (
    auth.role() = 'authenticated' 
    and (select role from profiles where id = auth.uid()) = 'admin'
  );

create policy "Admin delete contact_submissions" on contact_submissions
  for delete 
  using (
    auth.role() = 'authenticated' 
    and (select role from profiles where id = auth.uid()) = 'admin'
  );

create policy "Admin delete inquiry_submissions" on inquiry_submissions
  for delete 
  using (
    auth.role() = 'authenticated' 
    and (select role from profiles where id = auth.uid()) = 'admin'
  );

-- PUBLIC INSERT POLICY (for form submissions) -----------------------------
-- Allow anyone to submit forms (using service role key from server action)
create policy "Public insert contact_submissions" on contact_submissions
  for insert 
  with check (true);

create policy "Public insert inquiry_submissions" on inquiry_submissions
  for insert 
  with check (true);

-- CREATE INDEXES -----------------------------------------------------------
create index if not exists idx_contact_submissions_submitted_at 
  on contact_submissions(submitted_at desc);

create index if not exists idx_inquiry_submissions_submitted_at 
  on inquiry_submissions(submitted_at desc);

create index if not exists idx_contact_submissions_status 
  on contact_submissions(status);

create index if not exists idx_inquiry_submissions_status 
  on inquiry_submissions(status);
