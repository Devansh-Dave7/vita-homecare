import 'server-only';
import { createPublicSupabase } from '../supabase/server';
import { createServerSupabase } from '../supabase/server';

export type Service = {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  hero_image_url: string | null;
  category: string;
  body_markdown: string;
  audience_markdown: string;
  features_markdown: string;
  updated_at: string;
};

export type ServiceInput = Omit<Service, 'id' | 'updated_at'>;

export async function getServices() {
  const supabase = createPublicSupabase();
  const { data, error } = await supabase
    .from('services')
    .select('id, slug, name, short_description, hero_image_url, category')
    .order('name', { ascending: true });
  if (error) {
    console.error('[getServices] error', error);
    return [];
  }
  return data || [];
}

export async function getServiceBySlug(slug: string) {
  const supabase = createPublicSupabase();
  const { data, error } = await supabase
    .from('services')
    .select('id, slug, name, short_description, hero_image_url, body_markdown, audience_markdown, features_markdown, category, updated_at')
    .eq('slug', slug)
    .single();
  if (error) {
    console.error('[getServiceBySlug] error', error);
    return null;
  }
  return data;
}

// Admin CRUD operations
export async function getAllServices() {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('name', { ascending: true });
  
  if (error) {
    console.error('[getAllServices] error', error);
    throw error;
  }
  
  return (data || []) as Service[];
}

export async function getServiceById(id: string) {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('[getServiceById] error', error);
    throw error;
  }
  
  return data as Service;
}

export async function createService(service: ServiceInput) {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from('services')
    .insert([{
      slug: service.slug,
      name: service.name,
      short_description: service.short_description,
      hero_image_url: service.hero_image_url,
      category: service.category,
      body_markdown: service.body_markdown,
      audience_markdown: service.audience_markdown,
      features_markdown: service.features_markdown,
    }])
    .select()
    .single();
  
  if (error) {
    console.error('[createService] error', error);
    throw error;
  }
  
  return data as Service;
}

export async function updateService(id: string, service: Partial<ServiceInput>) {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from('services')
    .update(service)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('[updateService] error', error);
    throw error;
  }
  
  return data as Service;
}

export async function deleteService(id: string) {
  const supabase = await createServerSupabase();
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('[deleteService] error', error);
    throw error;
  }
}
