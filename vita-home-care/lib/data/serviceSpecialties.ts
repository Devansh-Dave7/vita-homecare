'use server';

import { createServerSupabase, createPublicSupabase } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export type ServiceSpecialty = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

// Get all active specialties (public) - cached for performance
// Data is revalidated when admin makes changes via revalidatePath
export async function getServiceSpecialties(): Promise<ServiceSpecialty[]> {
  const supabase = createPublicSupabase();
  const { data, error } = await supabase
    .from('service_specialties')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[getServiceSpecialties] Error:', error);
    return [];
  }

  return data || [];
}

// Get all specialties including inactive (admin)
export async function getAllServiceSpecialties(): Promise<ServiceSpecialty[]> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from('service_specialties')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[getAllServiceSpecialties] Error:', error);
    return [];
  }

  return data || [];
}

// Get a single specialty by ID
export async function getServiceSpecialtyById(id: string): Promise<ServiceSpecialty | null> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from('service_specialties')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('[getServiceSpecialtyById] Error:', error);
    return null;
  }

  return data;
}

// Create a new specialty
export async function createServiceSpecialty(formData: FormData): Promise<{
  success: boolean;
  error?: string;
  specialty?: ServiceSpecialty;
}> {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const isActive = formData.get('is_active') === 'true';

  if (!name?.trim()) {
    return { success: false, error: 'Specialty name is required' };
  }

  // Generate slug from name
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const supabase = await createServerSupabase();

  // Get max sort_order
  const { data: maxOrder } = await supabase
    .from('service_specialties')
    .select('sort_order')
    .order('sort_order', { ascending: false })
    .limit(1);

  const nextOrder = (maxOrder?.[0]?.sort_order || 0) + 1;

  const { data, error } = await supabase
    .from('service_specialties')
    .insert({
      name: name.trim(),
      slug,
      description: description?.trim() || null,
      sort_order: nextOrder,
      is_active: isActive,
    })
    .select()
    .single();

  if (error) {
    console.error('[createServiceSpecialty] Error:', error);
    if (error.code === '23505') {
      return { success: false, error: 'A specialty with this name already exists' };
    }
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/services');
  revalidatePath('/admin/services/specialties');
  revalidatePath('/services');
  revalidatePath('/about');

  return { success: true, specialty: data };
}

// Update a specialty
export async function updateServiceSpecialty(
  id: string,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const isActive = formData.get('is_active') === 'true';

  if (!name?.trim()) {
    return { success: false, error: 'Specialty name is required' };
  }

  // Generate slug from name
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const supabase = await createServerSupabase();

  const { error } = await supabase
    .from('service_specialties')
    .update({
      name: name.trim(),
      slug,
      description: description?.trim() || null,
      is_active: isActive,
    })
    .eq('id', id);

  if (error) {
    console.error('[updateServiceSpecialty] Error:', error);
    if (error.code === '23505') {
      return { success: false, error: 'A specialty with this name already exists' };
    }
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/services');
  revalidatePath('/admin/services/specialties');
  revalidatePath('/services');
  revalidatePath('/about');

  return { success: true };
}

// Delete a specialty
export async function deleteServiceSpecialty(id: string): Promise<{
  success: boolean;
  error?: string;
}> {
  const supabase = await createServerSupabase();

  const { error } = await supabase
    .from('service_specialties')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('[deleteServiceSpecialty] Error:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/services');
  revalidatePath('/admin/services/specialties');
  revalidatePath('/services');
  revalidatePath('/about');

  return { success: true };
}

// Toggle specialty active status
export async function toggleServiceSpecialtyActive(id: string, isActive: boolean): Promise<{
  success: boolean;
  error?: string;
}> {
  const supabase = await createServerSupabase();

  const { error } = await supabase
    .from('service_specialties')
    .update({ is_active: isActive })
    .eq('id', id);

  if (error) {
    console.error('[toggleServiceSpecialtyActive] Error:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/services');
  revalidatePath('/admin/services/specialties');
  revalidatePath('/services');
  revalidatePath('/about');

  return { success: true };
}

// Reorder specialties
export async function reorderServiceSpecialties(
  orderedIds: string[]
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createServerSupabase();

  const updates = orderedIds.map((id, index) => ({
    id,
    sort_order: index + 1,
  }));

  for (const update of updates) {
    const { error } = await supabase
      .from('service_specialties')
      .update({ sort_order: update.sort_order })
      .eq('id', update.id);

    if (error) {
      console.error('[reorderServiceSpecialties] Error:', error);
      return { success: false, error: error.message };
    }
  }

  revalidatePath('/admin/services');
  revalidatePath('/admin/services/specialties');
  revalidatePath('/services');
  revalidatePath('/about');

  return { success: true };
}
