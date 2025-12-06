import 'server-only';
import { createPublicSupabase, createServiceSupabase } from '../supabase/server';
import { cache } from 'react';

export type HomeHeroSettings = {
  id: string;
  hero_badge: string;
  hero_title: string;
  hero_subtitle: string;
  hero_description: string;
  hero_image_url: string;
  hero_primary_button_text: string;
  hero_primary_button_url: string;
  hero_primary_button_enabled: boolean;
  hero_secondary_button_text: string;
  hero_secondary_button_url: string | null;
  hero_secondary_button_enabled: boolean;
  created_at: string;
  updated_at: string;
};

/**
 * Fetch home hero settings from database.
 * Uses React cache() to prevent duplicate queries in the same render.
 * Uses anonymous public client for read-only access (no auth required).
 */
export const getHomeHeroSettings = cache(async (): Promise<HomeHeroSettings> => {
  const supabase = createPublicSupabase();
  
  const { data, error } = await supabase
    .from('home_settings')
    .select('*')
    .single(); // Only one row expected

  if (error || !data) {
    console.error('[getHomeHeroSettings] Error:', error);
    // Return defaults matching the migration if fetch fails
    return {
      id: '',
      hero_badge: 'Non-medical home care',
      hero_title: 'Best care for',
      hero_subtitle: 'your loved ones',
      hero_description: 'We provide non-medical home care through trained healthcare assistants and nurse assistants (not registered nurses). Our team offers personal care, companionship, and daily support—assisting with safe mobility, light domestic tasks, and medication reminders so your loved one can remain at home with confidence.',
      hero_image_url: '/new hero image.png',
      hero_primary_button_text: 'Browse plans',
      hero_primary_button_url: '/inquiry',
      hero_primary_button_enabled: true,
      hero_secondary_button_text: 'Watch our video',
      hero_secondary_button_url: null,
      hero_secondary_button_enabled: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }

  return data;
});

/**
 * Update home hero settings (admin only).
 * Uses service role client to bypass RLS for admin operations.
 */
export async function updateHomeHeroSettings(
  settings: Omit<HomeHeroSettings, 'id' | 'created_at' | 'updated_at'>
): Promise<{ success: boolean; error?: string }> {
  const supabase = createServiceSupabase();

  try {
    // Get the current record (should only be one)
    const { data: existing } = await supabase
      .from('home_settings')
      .select('id')
      .single();

    if (!existing) {
      return { success: false, error: 'Home settings record not found' };
    }

    // Update the record
    const { error } = await supabase
      .from('home_settings')
      .update({
        ...settings,
        updated_at: new Date().toISOString()
      })
      .eq('id', existing.id);

    if (error) {
      console.error('[updateHomeHeroSettings] Error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error('[updateHomeHeroSettings] Unexpected error:', err);
    return { success: false, error: err.message || 'Unexpected error occurred' };
  }
}
