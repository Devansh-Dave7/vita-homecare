import 'server-only';
import { createPublicSupabase } from '../supabase/server';

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
