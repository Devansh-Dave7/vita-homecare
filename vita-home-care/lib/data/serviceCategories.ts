'use server';

import { createServerSupabase, createPublicSupabase } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export type ServiceCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

// Get all categories (public)
export async function getServiceCategories(): Promise<ServiceCategory[]> {
  const supabase = createPublicSupabase();
  const { data, error } = await supabase
    .from('service_categories')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[getServiceCategories] Error:', error);
    return [];
  }

  return data || [];
}

// Get all categories (admin)
export async function getAllServiceCategories(): Promise<ServiceCategory[]> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from('service_categories')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[getAllServiceCategories] Error:', error);
    return [];
  }

  return data || [];
}

// Create a new category
export async function createServiceCategory(formData: FormData): Promise<{
  success: boolean;
  error?: string;
  category?: ServiceCategory;
}> {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;

  if (!name?.trim()) {
    return { success: false, error: 'Category name is required' };
  }

  // Generate slug from name
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const supabase = await createServerSupabase();

  // Get max sort_order
  const { data: maxOrder } = await supabase
    .from('service_categories')
    .select('sort_order')
    .order('sort_order', { ascending: false })
    .limit(1);

  const nextOrder = (maxOrder?.[0]?.sort_order || 0) + 1;

  const { data, error } = await supabase
    .from('service_categories')
    .insert({
      name: name.trim(),
      slug,
      description: description?.trim() || null,
      sort_order: nextOrder,
    })
    .select()
    .single();

  if (error) {
    console.error('[createServiceCategory] Error:', error);
    if (error.code === '23505') {
      return { success: false, error: 'A category with this name already exists' };
    }
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/services');
  revalidatePath('/admin/services/categories');

  return { success: true, category: data };
}

// Update a category
export async function updateServiceCategory(
  id: string,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;

  if (!name?.trim()) {
    return { success: false, error: 'Category name is required' };
  }

  // Generate slug from name
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const supabase = await createServerSupabase();

  const { error } = await supabase
    .from('service_categories')
    .update({
      name: name.trim(),
      slug,
      description: description?.trim() || null,
    })
    .eq('id', id);

  if (error) {
    console.error('[updateServiceCategory] Error:', error);
    if (error.code === '23505') {
      return { success: false, error: 'A category with this name already exists' };
    }
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/services');
  revalidatePath('/admin/services/categories');

  return { success: true };
}

// Delete a category
export async function deleteServiceCategory(id: string): Promise<{
  success: boolean;
  error?: string;
}> {
  const supabase = await createServerSupabase();

  // Check if any services use this category
  const { data: category } = await supabase
    .from('service_categories')
    .select('slug')
    .eq('id', id)
    .single();

  if (category) {
    const { data: services } = await supabase
      .from('services')
      .select('id')
      .eq('category', category.slug)
      .limit(1);

    if (services && services.length > 0) {
      return {
        success: false,
        error: 'Cannot delete category that is being used by services. Please reassign those services first.',
      };
    }
  }

  const { error } = await supabase
    .from('service_categories')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('[deleteServiceCategory] Error:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/services');
  revalidatePath('/admin/services/categories');

  return { success: true };
}

// Reorder categories
export async function reorderServiceCategories(
  orderedIds: string[]
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createServerSupabase();

  const updates = orderedIds.map((id, index) => ({
    id,
    sort_order: index + 1,
  }));

  for (const update of updates) {
    const { error } = await supabase
      .from('service_categories')
      .update({ sort_order: update.sort_order })
      .eq('id', update.id);

    if (error) {
      console.error('[reorderServiceCategories] Error:', error);
      return { success: false, error: error.message };
    }
  }

  revalidatePath('/admin/services');
  revalidatePath('/admin/services/categories');

  return { success: true };
}
