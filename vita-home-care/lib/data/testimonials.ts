'use server';

import { createServiceSupabase } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export type Testimonial = {
  id: string;
  name: string;
  location: string | null;
  quote: string;
  avatar_url: string | null;
  attribution: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
};

/**
 * Get all testimonials (admin only)
 */
export async function getAllTestimonials(): Promise<Testimonial[]> {
  const supabase = createServiceSupabase();

  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[getAllTestimonials] Error:', error);
    return [];
  }

  return data as Testimonial[];
}

/**
 * Get published testimonials (public)
 */
export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  const supabase = createServiceSupabase();

  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[getPublishedTestimonials] Error:', error);
    return [];
  }

  return data as Testimonial[];
}

/**
 * Get testimonial by ID
 */
export async function getTestimonialById(id: string): Promise<Testimonial | null> {
  const supabase = createServiceSupabase();

  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('id', id)
    .limit(1);

  if (error) {
    console.error('[getTestimonialById] Error:', error);
    return null;
  }

  if (!data || data.length === 0) {
    return null;
  }

  return data[0] as Testimonial;
}

/**
 * Create a new testimonial
 */
export async function createTestimonial(formData: FormData) {
  const supabase = createServiceSupabase();

  const testimonial = {
    name: formData.get('name') as string,
    location: formData.get('location') as string || null,
    quote: formData.get('quote') as string,
    avatar_url: formData.get('avatarUrl') as string || null,
    attribution: formData.get('attribution') as string || null,
    published: formData.get('published') === 'true',
  };

  // Validate required fields
  if (!testimonial.name || !testimonial.quote) {
    return { success: false, error: 'Name and quote are required' };
  }

  const { error } = await supabase
    .from('testimonials')
    .insert([testimonial]);

  if (error) {
    console.error('[createTestimonial] Error:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/testimonials');
  return { success: true };
}

/**
 * Update testimonial
 */
export async function updateTestimonial(id: string, formData: FormData) {
  const supabase = createServiceSupabase();

  const updates = {
    name: formData.get('name') as string,
    location: formData.get('location') as string || null,
    quote: formData.get('quote') as string,
    avatar_url: formData.get('avatarUrl') as string || null,
    attribution: formData.get('attribution') as string || null,
    published: formData.get('published') === 'true',
  };

  // Validate required fields
  if (!updates.name || !updates.quote) {
    return { success: false, error: 'Name and quote are required' };
  }

  const { error } = await supabase
    .from('testimonials')
    .update(updates)
    .eq('id', id);

  if (error) {
    console.error('[updateTestimonial] Error:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/testimonials');
  return { success: true };
}

/**
 * Delete testimonial
 */
export async function deleteTestimonial(id: string) {
  const supabase = createServiceSupabase();

  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('[deleteTestimonial] Error:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/testimonials');
  return { success: true };
}

/**
 * Toggle testimonial published status
 */
export async function toggleTestimonialPublished(id: string, published: boolean) {
  const supabase = createServiceSupabase();

  const { error } = await supabase
    .from('testimonials')
    .update({ published: !published })
    .eq('id', id);

  if (error) {
    console.error('[toggleTestimonialPublished] Error:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/testimonials');
  return { success: true };
}
