'use server';

import { createServiceSupabase } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export type ContactSubmission = {
  id: string;
  name: string;
  phone: string;
  email: string;
  preferred_time: string | null;
  service_type: string | null;
  message: string | null;
  submitted_at: string;
  status: string;
};

export type InquirySubmission = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  care_for: string | null;
  start_date: string;
  reason: string | null;
  hours_per_week: string | null;
  referrer: string | null;
  can_afford: string;
  service_option: string | null;
  submitted_at: string;
  status: string;
};

/**
 * Submit contact form data
 */
export async function submitContactForm(formData: FormData) {
  const supabase = createServiceSupabase();

  const submission = {
    name: formData.get('name') as string,
    phone: formData.get('phone') as string,
    email: formData.get('email') as string,
    preferred_time: formData.get('preferredTime') as string,
    service_type: formData.get('serviceType') as string,
    message: formData.get('message') as string,
  };

  const { error } = await supabase
    .from('contact_submissions')
    .insert([submission]);

  if (error) {
    console.error('[submitContactForm] Error:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Submit inquiry form data
 */
export async function submitInquiryForm(formData: FormData) {
  const supabase = createServiceSupabase();

  const submission = {
    full_name: formData.get('fullName') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    address: formData.get('address') as string,
    care_for: formData.get('careFor') as string,
    start_date: formData.get('startDate') as string,
    reason: formData.get('reason') as string,
    hours_per_week: formData.get('hoursPerWeek') as string,
    referrer: formData.get('referrer') as string,
    can_afford: formData.get('canAfford') as string,
    service_option: formData.get('serviceOption') as string,
  };

  const { error } = await supabase
    .from('inquiry_submissions')
    .insert([submission]);

  if (error) {
    console.error('[submitInquiryForm] Error:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Get all contact submissions (admin only)
 */
export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  const supabase = createServiceSupabase();

  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('submitted_at', { ascending: false });

  if (error) {
    console.error('[getContactSubmissions] Error:', error);
    return [];
  }

  return data as ContactSubmission[];
}

/**
 * Get all inquiry submissions (admin only)
 */
export async function getInquirySubmissions(): Promise<InquirySubmission[]> {
  const supabase = createServiceSupabase();

  const { data, error } = await supabase
    .from('inquiry_submissions')
    .select('*')
    .order('submitted_at', { ascending: false });

  if (error) {
    console.error('[getInquirySubmissions] Error:', error);
    return [];
  }

  return data as InquirySubmission[];
}

/**
 * Update contact submission status (admin only)
 */
export async function updateContactSubmissionStatus(id: string, status: string) {
  const supabase = createServiceSupabase();

  const { error } = await supabase
    .from('contact_submissions')
    .update({ status })
    .eq('id', id);

  if (error) {
    console.error('[updateContactSubmissionStatus] Error:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/contact-submissions');
  return { success: true };
}

/**
 * Update inquiry submission status (admin only)
 */
export async function updateInquirySubmissionStatus(id: string, status: string) {
  const supabase = createServiceSupabase();

  const { error } = await supabase
    .from('inquiry_submissions')
    .update({ status })
    .eq('id', id);

  if (error) {
    console.error('[updateInquirySubmissionStatus] Error:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/inquiry-submissions');
  return { success: true };
}

/**
 * Delete contact submission (admin only)
 */
export async function deleteContactSubmission(id: string) {
  const supabase = createServiceSupabase();

  const { error } = await supabase
    .from('contact_submissions')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('[deleteContactSubmission] Error:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/contact-submissions');
  return { success: true };
}

/**
 * Delete inquiry submission (admin only)
 */
export async function deleteInquirySubmission(id: string) {
  const supabase = createServiceSupabase();

  const { error } = await supabase
    .from('inquiry_submissions')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('[deleteInquirySubmission] Error:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/inquiry-submissions');
  return { success: true };
}
