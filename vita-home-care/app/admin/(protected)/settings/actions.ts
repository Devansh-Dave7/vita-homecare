'use server';

import { updateSiteSettings, type SiteSettings } from '@/lib/data/siteSettings';
import { revalidatePath } from 'next/cache';

/**
 * Server action to update site settings.
 * Wraps the data layer function for use in client components.
 */
export async function updateSettingsAction(settings: SiteSettings) {
  console.log('[updateSettingsAction] Updating site settings:', settings);
  
  const result = await updateSiteSettings(settings);
  
  if (result.success) {
    console.log('[updateSettingsAction] Site settings updated successfully');
    // Revalidate pages that use contact settings
    revalidatePath('/');
    revalidatePath('/contact');
    revalidatePath('/inquiry');
  } else {
    console.error('[updateSettingsAction] Failed to update settings:', result.error);
  }
  
  return result;
}
