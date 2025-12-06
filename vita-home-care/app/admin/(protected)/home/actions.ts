'use server';

import { updateHomeHeroSettings, HomeHeroSettings } from '@/lib/data/homeSettings';
import { uploadHomeImageFromBase64 } from '@/lib/storage/images';
import { revalidatePath } from 'next/cache';

export async function updateHomeHeroAction(
  settings: Omit<HomeHeroSettings, 'id' | 'created_at' | 'updated_at'>
) {
  try {
    // Convert empty string to null for secondary button URL
    const sanitizedSettings = {
      ...settings,
      hero_secondary_button_url: settings.hero_secondary_button_url?.trim() || null
    };

    const result = await updateHomeHeroSettings(sanitizedSettings);

    if (result.success) {
      // Revalidate both the homepage and admin page
      revalidatePath('/', 'page');
      revalidatePath('/admin/home', 'page');
    }

    return result;
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to update home hero settings'
    };
  }
}

export async function uploadHomeImageAction(data: {
  base64: string;
  fileName: string;
  contentType: string;
}): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const result = await uploadHomeImageFromBase64(data);
    return result;
  } catch (error: any) {
    console.error('[uploadHomeImageAction] Error:', error);
    return {
      success: false,
      error: error.message || 'Failed to upload image'
    };
  }
}
