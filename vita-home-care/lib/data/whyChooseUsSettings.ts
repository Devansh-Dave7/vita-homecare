import 'server-only';
import { cache } from 'react';
import { createPublicSupabase, createServiceSupabase } from '@/lib/supabase/server';
import type { IconName } from '@/lib/icons';

export interface WhyChooseUsFeature {
  id: string;
  settings_id: string;
  title: string;
  icon_name: IconName;
  sort_order: number;
  enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface WhyChooseUsSettings {
  id: string;
  badge_text: string;
  heading_main: string;
  heading_highlight: string;
  heading_suffix: string;
  description: string;
  image_url_1: string | null;
  image_url_2: string | null;
  image_url_3: string | null;
  primary_button_text: string;
  primary_button_url: string;
  primary_button_enabled: boolean;
  secondary_button_text: string;
  secondary_button_url: string | null;
  secondary_button_enabled: boolean;
  created_at: string;
  updated_at: string;
  features: WhyChooseUsFeature[];
}

const defaultSettings: WhyChooseUsSettings = {
  id: 'default',
  badge_text: 'Why choose us',
  heading_main: 'The right care',
  heading_highlight: 'for your',
  heading_suffix: 'loved ones',
  description:
    "Our healthcare assistants and nurse assistants (not registered nurses) provide personal care, companionship, and daily support. They assist with safe mobility, light domestic tasks, and medication reminders, helping older adults live independently at home with non-medical support.",
  image_url_1: null,
  image_url_2: null,
  image_url_3: null,
  primary_button_text: 'More about us',
  primary_button_url: '/about',
  primary_button_enabled: true,
  secondary_button_text: 'Browse services',
  secondary_button_url: '/#services',
  secondary_button_enabled: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  features: [
    { id: 'f1', settings_id: 'default', title: '24/7 home care support', icon_name: 'clock', sort_order: 1, enabled: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'f2', settings_id: 'default', title: 'Personal care at home', icon_name: 'user', sort_order: 2, enabled: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'f3', settings_id: 'default', title: 'Non-medical daily support', icon_name: 'home', sort_order: 3, enabled: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 'f4', settings_id: 'default', title: 'Trained care assistant', icon_name: 'support', sort_order: 4, enabled: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  ],
};

export const getWhyChooseUsSettings = cache(async (): Promise<WhyChooseUsSettings> => {
  try {
    const supabase = createPublicSupabase();

    const { data: settings, error } = await supabase
      .from('why_choose_us_settings')
      .select('*, features:why_choose_us_features(*)')
      .single();

    if (error) {
      console.error('[getWhyChooseUsSettings] Error:', error);
      return defaultSettings;
    }

    if (!settings) return defaultSettings;

    const sorted = (settings.features || []).sort(
      (a: WhyChooseUsFeature, b: WhyChooseUsFeature) => a.sort_order - b.sort_order
    );

    return { ...settings, features: sorted } as WhyChooseUsSettings;
  } catch (err) {
    console.error('[getWhyChooseUsSettings] Unexpected:', err);
    return defaultSettings;
  }
});

export async function updateWhyChooseUsSettings(
  settings: Partial<Omit<WhyChooseUsSettings, 'id' | 'created_at' | 'updated_at' | 'features'>>,
  features?: Array<Partial<Omit<WhyChooseUsFeature, 'id' | 'settings_id' | 'created_at' | 'updated_at'>>>
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createServiceSupabase();

    const processed = {
      ...settings,
      image_url_1: settings.image_url_1 || null,
      image_url_2: settings.image_url_2 || null,
      image_url_3: settings.image_url_3 || null,
      secondary_button_url: settings.secondary_button_url || null,
      updated_at: new Date().toISOString(),
    };

    const { data: existing, error: fetchErr } = await supabase
      .from('why_choose_us_settings')
      .select('id')
      .single();

    if (fetchErr || !existing) {
      console.error('[updateWhyChooseUsSettings] Fetch current settings failed:', fetchErr);
      return { success: false, error: fetchErr?.message || 'Settings not found' };
    }

    const { error: upErr } = await supabase
      .from('why_choose_us_settings')
      .update(processed)
      .eq('id', existing.id);

    if (upErr) {
      console.error('[updateWhyChooseUsSettings] Update settings error:', upErr);
      return { success: false, error: upErr.message };
    }

    if (features && features.length > 0) {
      for (let i = 0; i < features.length; i++) {
        const f = features[i];
        const { error: fErr } = await supabase
          .from('why_choose_us_features')
          .update({
            title: f.title,
            icon_name: f.icon_name,
            enabled: f.enabled,
            updated_at: new Date().toISOString(),
          })
          .eq('settings_id', existing.id)
          .eq('sort_order', i + 1);
        if (fErr) {
          console.error(`[updateWhyChooseUsSettings] Feature ${i + 1} error:`, fErr);
          return { success: false, error: fErr.message };
        }
      }
    }

    return { success: true };
  } catch (err: any) {
    console.error('[updateWhyChooseUsSettings] Unexpected error:', err);
    return { success: false, error: err.message || 'Unexpected error' };
  }
}
