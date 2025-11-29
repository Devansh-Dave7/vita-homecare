'use server';

import { createServiceSupabase, createPublicSupabase } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export type AboutPageContent = {
  hero_heading: string;
  hero_description: string;
  gallery_image_1: { url: string; alt: string };
  gallery_image_2: { url: string; alt: string };
  gallery_image_3: { url: string; alt: string };
  vision_text: string;
  mission_text: string;
  team_heading: string;
  team_description: string;
};

export type StaffMember = {
  id: string;
  name: string;
  role: string | null;
  photo_url: string | null;
  bio_markdown: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

/**
 * Get about page content (public)
 */
export async function getAboutPageContent(): Promise<AboutPageContent> {
  const supabase = createPublicSupabase();

  const { data, error } = await supabase
    .from('about_page_content')
    .select('key, value_json');

  if (error) {
    console.error('[getAboutPageContent] Error:', error);
    // Return defaults if fetch fails
    return {
      hero_heading: 'Why we love what we do',
      hero_description: 'We believe home is where care is most meaningful. Our healthcare assistants and nurse assistants (not registered nurses) provide flexible, non-medical support that preserves dignity, builds independence, and keeps families closely connected. They offer personal care, companionship, and daily support—assisting with safe mobility, light domestic tasks, and medication reminders.',
      gallery_image_1: { url: 'https://images.pexels.com/photos/7551677/pexels-photo-7551677.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&dpr=1', alt: 'Warm embrace between senior couple' },
      gallery_image_2: { url: '/caregiver with a black man.png', alt: 'Caregiver with senior smiling' },
      gallery_image_3: { url: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&dpr=1', alt: 'Senior exercising with caregiver support' },
      vision_text: "To be Zambia's most trusted home care provider, delivering compassionate and reliable support at home.",
      mission_text: "Provide high-quality, flexible non-medical home care through trained caregivers, ensuring clients' dignity, independence, and family connection",
      team_heading: 'Meet our professionals',
      team_description: 'Our caregivers provide personal care, companionship, and everyday support. They assist with safe mobility, light domestic tasks, and timely medication reminders. Every team member is certified by the Healthcare Givers Association of Zambia (HCAZ) and completes our in‑house training program covering record keeping, care standards, and client safety.'
    };
  }

  // Transform array of key-value pairs into object
  const content: Record<string, any> = {};
  (data || []).forEach((row: any) => {
    content[row.key] = row.value_json;
  });

  return {
    hero_heading: content.hero_heading || 'Why we love what we do',
    hero_description: content.hero_description || 'We believe home is where care is most meaningful...',
    gallery_image_1: content.gallery_image_1 || { url: '', alt: '' },
    gallery_image_2: content.gallery_image_2 || { url: '', alt: '' },
    gallery_image_3: content.gallery_image_3 || { url: '', alt: '' },
    vision_text: content.vision_text || '',
    mission_text: content.mission_text || '',
    team_heading: content.team_heading || 'Meet our professionals',
    team_description: content.team_description || ''
  };
}

/**
 * Update about page content (admin only)
 */
export async function updateAboutPageContent(
  content: Partial<AboutPageContent>
): Promise<{ success: boolean; error?: string }> {
  const supabase = createServiceSupabase();

  try {
    const updates = Object.entries(content).map(([key, value]) => ({
      key,
      value_json: value,
      updated_at: new Date().toISOString()
    }));

    for (const update of updates) {
      const { error } = await supabase
        .from('about_page_content')
        .upsert(update, { onConflict: 'key' });

      if (error) {
        console.error(`[updateAboutPageContent] Error updating ${update.key}:`, error);
        return { success: false, error: error.message };
      }
    }

    revalidatePath('/about');
    revalidatePath('/admin/about');
    return { success: true };
  } catch (err: any) {
    console.error('[updateAboutPageContent] Unexpected error:', err);
    return { success: false, error: err.message };
  }
}

// ============================================================================
// STAFF MEMBERS
// ============================================================================

/**
 * Get all staff members (ordered by sort_order)
 */
export async function getAllStaffMembers(): Promise<StaffMember[]> {
  const supabase = createPublicSupabase();

  const { data, error } = await supabase
    .from('staff_members')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[getAllStaffMembers] Error:', error);
    return [];
  }

  return data as StaffMember[];
}

/**
 * Get staff member by ID
 */
export async function getStaffMemberById(id: string): Promise<StaffMember | null> {
  const supabase = createPublicSupabase();

  const { data, error } = await supabase
    .from('staff_members')
    .select('*')
    .eq('id', id)
    .limit(1);

  if (error) {
    console.error('[getStaffMemberById] Error:', error);
    return null;
  }

  if (!data || data.length === 0) {
    return null;
  }

  return data[0] as StaffMember;
}

/**
 * Create a new staff member
 */
export async function createStaffMember(formData: FormData) {
  const supabase = createServiceSupabase();

  // Get max sort_order
  const { data: maxData } = await supabase
    .from('staff_members')
    .select('sort_order')
    .order('sort_order', { ascending: false })
    .limit(1);

  const nextSortOrder = maxData && maxData.length > 0 ? maxData[0].sort_order + 1 : 1;

  const staffMember = {
    name: formData.get('name') as string,
    role: formData.get('role') as string || null,
    photo_url: formData.get('photoUrl') as string || null,
    bio_markdown: formData.get('bio') as string || null,
    sort_order: nextSortOrder,
  };

  // Validate required fields
  if (!staffMember.name) {
    return { success: false, error: 'Name is required' };
  }

  const { error } = await supabase
    .from('staff_members')
    .insert([staffMember]);

  if (error) {
    console.error('[createStaffMember] Error:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/about/team');
  revalidatePath('/about');
  return { success: true };
}

/**
 * Update staff member
 */
export async function updateStaffMember(id: string, formData: FormData) {
  const supabase = createServiceSupabase();

  const updates = {
    name: formData.get('name') as string,
    role: formData.get('role') as string || null,
    photo_url: formData.get('photoUrl') as string || null,
    bio_markdown: formData.get('bio') as string || null,
  };

  // Validate required fields
  if (!updates.name) {
    return { success: false, error: 'Name is required' };
  }

  const { error } = await supabase
    .from('staff_members')
    .update(updates)
    .eq('id', id);

  if (error) {
    console.error('[updateStaffMember] Error:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/about/team');
  revalidatePath('/about');
  return { success: true };
}

/**
 * Delete staff member
 */
export async function deleteStaffMember(id: string) {
  const supabase = createServiceSupabase();

  const { error } = await supabase
    .from('staff_members')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('[deleteStaffMember] Error:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/about/team');
  revalidatePath('/about');
  return { success: true };
}

/**
 * Reorder staff members
 */
export async function reorderStaffMembers(orderedIds: string[]) {
  const supabase = createServiceSupabase();

  try {
    for (let i = 0; i < orderedIds.length; i++) {
      const { error } = await supabase
        .from('staff_members')
        .update({ sort_order: i + 1 })
        .eq('id', orderedIds[i]);

      if (error) {
        console.error('[reorderStaffMembers] Error:', error);
        return { success: false, error: error.message };
      }
    }

    revalidatePath('/admin/about/team');
    revalidatePath('/about');
    return { success: true };
  } catch (err: any) {
    console.error('[reorderStaffMembers] Unexpected error:', err);
    return { success: false, error: err.message };
  }
}
