'use server';

import { createPublicSupabase, createServiceSupabase } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export type SpecialtiesHeader = {
  title: string;
  description: string;
};

const DEFAULT_HEADER: SpecialtiesHeader = {
  title: 'What we specialise in',
  description:
    'Vita Homecare focuses on non-medical home care. We do not replace hospital or clinic services; instead, we provide practical, everyday support around the client in their own home.',
};

export async function getSpecialtiesHeader(): Promise<SpecialtiesHeader> {
  const supabase = createPublicSupabase();
  const { data, error } = await supabase
    .from('site_settings')
    .select('value_json')
    .eq('key', 'services_specialties_header')
    .maybeSingle();

  if (error) {
    console.error('[getSpecialtiesHeader] Error:', error);
    return DEFAULT_HEADER;
  }

  if (!data || !data.value_json) return DEFAULT_HEADER;
  const val = data.value_json as any;
  return {
    title: (val?.title as string) || DEFAULT_HEADER.title,
    description: (val?.description as string) || DEFAULT_HEADER.description,
  };
}

export async function updateSpecialtiesHeader(formData: FormData): Promise<{ success: boolean; error?: string }>{
  const title = (formData.get('title') as string)?.trim();
  const description = (formData.get('description') as string)?.trim();
  if (!title) return { success: false, error: 'Title is required' };

  const supabase = createServiceSupabase();
  const { error } = await supabase
    .from('site_settings')
    .upsert(
      {
        key: 'services_specialties_header',
        value_json: { title, description: description || '' },
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'key' }
    );

  if (error) {
    console.error('[updateSpecialtiesHeader] Error:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/services/specialties');
  revalidatePath('/services');
  revalidatePath('/about');
  return { success: true };
}
