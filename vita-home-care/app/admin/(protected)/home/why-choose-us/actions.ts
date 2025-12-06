'use server';

import { revalidatePath } from 'next/cache';
import { updateWhyChooseUsSettings } from '@/lib/data/whyChooseUsSettings';
import { uploadWhyChooseUsImageFromBase64, deleteWhyChooseUsImage } from '@/lib/storage/images';
import type { IconName } from '@/lib/icons';

interface FeatureUpdate {
  title: string;
  icon_name: IconName;
  enabled: boolean;
}

export async function updateWhyChooseUsAction(formData: FormData) {
  try {
    const badge_text = formData.get('badge_text') as string;
    const heading_main = formData.get('heading_main') as string;
    const heading_highlight = formData.get('heading_highlight') as string;
    const heading_suffix = formData.get('heading_suffix') as string;
    const description = formData.get('description') as string;

    const primary_button_text = formData.get('primary_button_text') as string;
    const primary_button_url = formData.get('primary_button_url') as string;
    const primary_button_enabled = (formData.get('primary_button_enabled') as string) === 'true';

    const secondary_button_text = formData.get('secondary_button_text') as string;
    const secondary_button_url = formData.get('secondary_button_url') as string;
    const secondary_button_enabled = (formData.get('secondary_button_enabled') as string) === 'true';

    let image_url_1 = formData.get('image_url_1') as string;
    let image_url_2 = formData.get('image_url_2') as string;
    let image_url_3 = formData.get('image_url_3') as string;

    const image1Data = formData.get('image_1');
    if (image1Data && typeof image1Data === 'string') {
      const parsed = JSON.parse(image1Data);
      const upload = await uploadWhyChooseUsImageFromBase64(parsed);
      if (upload.success && upload.url) {
        if (image_url_1 && image_url_1.includes('why-choose-us-images')) {
          await deleteWhyChooseUsImage(image_url_1);
        }
        image_url_1 = upload.url;
      } else {
        return { success: false, error: upload.error || 'Failed to upload image 1' };
      }
    }

    const image2Data = formData.get('image_2');
    if (image2Data && typeof image2Data === 'string') {
      const parsed = JSON.parse(image2Data);
      const upload = await uploadWhyChooseUsImageFromBase64(parsed);
      if (upload.success && upload.url) {
        if (image_url_2 && image_url_2.includes('why-choose-us-images')) {
          await deleteWhyChooseUsImage(image_url_2);
        }
        image_url_2 = upload.url;
      } else {
        return { success: false, error: upload.error || 'Failed to upload image 2' };
      }
    }

    const image3Data = formData.get('image_3');
    if (image3Data && typeof image3Data === 'string') {
      const parsed = JSON.parse(image3Data);
      const upload = await uploadWhyChooseUsImageFromBase64(parsed);
      if (upload.success && upload.url) {
        if (image_url_3 && image_url_3.includes('why-choose-us-images')) {
          await deleteWhyChooseUsImage(image_url_3);
        }
        image_url_3 = upload.url;
      } else {
        return { success: false, error: upload.error || 'Failed to upload image 3' };
      }
    }

    const featuresData = formData.get('features') as string;
    let features: FeatureUpdate[] = [];
    if (featuresData) {
      features = JSON.parse(featuresData);
    }

    const result = await updateWhyChooseUsSettings(
      {
        badge_text,
        heading_main,
        heading_highlight,
        heading_suffix,
        description,
        image_url_1: image_url_1 || null,
        image_url_2: image_url_2 || null,
        image_url_3: image_url_3 || null,
        primary_button_text,
        primary_button_url,
        primary_button_enabled,
        secondary_button_text,
        secondary_button_url: secondary_button_url || null,
        secondary_button_enabled,
      },
      features
    );

    if (!result.success) {
      return { success: false, error: result.error || 'Failed to update settings' };
    }

    revalidatePath('/', 'page');
    revalidatePath('/admin/home/why-choose-us', 'page');
    return { success: true };
  } catch (error: any) {
    console.error('[updateWhyChooseUsAction] Error:', error);
    return { success: false, error: error.message || 'Unexpected error' };
  }
}
