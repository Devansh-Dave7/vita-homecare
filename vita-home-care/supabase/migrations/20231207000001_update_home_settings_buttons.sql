-- Migration: Update home_settings table to add button visibility and URL options
-- This adds the ability to enable/disable buttons and set optional URL for secondary button

-- Add new columns for button visibility and secondary button URL
alter table home_settings
  add column if not exists hero_primary_button_enabled boolean not null default true,
  add column if not exists hero_secondary_button_url text default null,
  add column if not exists hero_secondary_button_enabled boolean not null default true;

-- Update existing row to set default values
update home_settings
set 
  hero_primary_button_enabled = true,
  hero_secondary_button_url = null,
  hero_secondary_button_enabled = true
where hero_primary_button_enabled is null 
   or hero_secondary_button_enabled is null;
