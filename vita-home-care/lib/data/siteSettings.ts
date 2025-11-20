import 'server-only';
import { createPublicSupabase, createServiceSupabase } from '../supabase/server';

export type SiteSettings = {
  contact_phone: string;
  contact_email: string;
  contact_location: string;
  social_facebook?: string;
  social_twitter?: string;
  social_instagram?: string;
  social_youtube?: string;
  social_linkedin?: string;
};

/**
 * Fetch contact information from site_settings table.
 * Uses anonymous public client for read-only access.
 */
export async function getContactSettings(): Promise<SiteSettings> {
  const supabase = createPublicSupabase();
  
  const { data, error } = await supabase
    .from('site_settings')
    .select('key, value_json')
    .in('key', ['contact_phone', 'contact_email', 'contact_location', 'social_facebook', 'social_twitter', 'social_instagram', 'social_youtube', 'social_linkedin']);

  if (error) {
    console.error('[getContactSettings] Error:', error);
    // Return defaults if fetch fails
    return {
      contact_phone: '+260 7542 532477',
      contact_email: 'contact@vitahomecare.com',
      contact_location: 'Lusaka, Zambia',
      social_facebook: '',
      social_twitter: '',
      social_instagram: '',
      social_youtube: '',
      social_linkedin: ''
    };
  }

  // Transform array of key-value pairs into object
  const settings: any = {};
  (data || []).forEach((row: any) => {
    settings[row.key] = row.value_json;
  });

  return {
    contact_phone: settings.contact_phone || '+260 7542 532477',
    contact_email: settings.contact_email || 'contact@vitahomecare.com',
    contact_location: settings.contact_location || 'Lusaka, Zambia',
    social_facebook: settings.social_facebook || '',
    social_twitter: settings.social_twitter || '',
    social_instagram: settings.social_instagram || '',
    social_youtube: settings.social_youtube || '',
    social_linkedin: settings.social_linkedin || ''
  };
}

/**
 * Update site settings (admin only).
 * Uses service role client to bypass RLS for admin operations.
 */
export async function updateSiteSettings(settings: SiteSettings): Promise<{ success: boolean; error?: string }> {
  const supabase = createServiceSupabase();

  try {
    // Update each setting individually
    const updates = [
      { key: 'contact_phone', value_json: settings.contact_phone },
      { key: 'contact_email', value_json: settings.contact_email },
      { key: 'contact_location', value_json: settings.contact_location },
      { key: 'social_facebook', value_json: settings.social_facebook || '' },
      { key: 'social_twitter', value_json: settings.social_twitter || '' },
      { key: 'social_instagram', value_json: settings.social_instagram || '' },
      { key: 'social_youtube', value_json: settings.social_youtube || '' },
      { key: 'social_linkedin', value_json: settings.social_linkedin || '' }
    ];

    for (const update of updates) {
      const { error } = await supabase
        .from('site_settings')
        .upsert(
          {
            key: update.key,
            value_json: update.value_json,
            updated_at: new Date().toISOString()
          },
          { onConflict: 'key' }
        );

      if (error) {
        console.error(`[updateSiteSettings] Error updating ${update.key}:`, error);
        return { success: false, error: error.message };
      }
    }

    return { success: true };
  } catch (err: any) {
    console.error('[updateSiteSettings] Unexpected error:', err);
    return { success: false, error: err.message };
  }
}
