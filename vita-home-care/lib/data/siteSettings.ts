import { createPublicSupabase } from '../supabase/server';

export type SiteSettings = {
  contact_phone: string;
  contact_phone_display: string;
  contact_email: string;
  contact_location: string;
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
    .in('key', ['contact_phone', 'contact_phone_display', 'contact_email', 'contact_location']);

  if (error) {
    console.error('[getContactSettings] Error:', error);
    // Return defaults if fetch fails
    return {
      contact_phone: '7542532477',
      contact_phone_display: '+44 7542 532477',
      contact_email: 'contact@vitahomecare.com',
      contact_location: 'Lusaka, Zambia'
    };
  }

  // Transform array of key-value pairs into object
  const settings: any = {};
  (data || []).forEach((row: any) => {
    settings[row.key] = row.value_json;
  });

  return {
    contact_phone: settings.contact_phone || '7542532477',
    contact_phone_display: settings.contact_phone_display || '+44 7542 532477',
    contact_email: settings.contact_email || 'contact@vitahomecare.com',
    contact_location: settings.contact_location || 'Lusaka, Zambia'
  };
}
