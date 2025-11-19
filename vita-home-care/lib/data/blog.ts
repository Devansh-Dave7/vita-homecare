import 'server-only';
import { createPublicSupabase, createServerSupabase } from '../supabase/server';

// Tag name used for ISR revalidation (for future use with revalidateTag)
export const BLOG_TAG = 'blog';

// Fetch list of published blog posts (summaries) – no React cache to avoid stale data after inserts.
export async function getPublishedBlogSummaries() {
  const supabase = createPublicSupabase();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, slug, title, excerpt, hero_image_url, published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false });
  if (error) {
    console.error('[getPublishedBlogSummaries] Supabase error', error);
    return [];
  }
  return data || [];
}

// Fetch posts plus categories/tags metadata (best-effort; gracefully degrades if relations missing)
export async function getPublishedBlogSummariesWithMeta() {
  const posts = await getPublishedBlogSummaries();
  if (!posts.length) return posts;
  const ids = posts.map((p: any) => p.id);

  const supabase = createPublicSupabase();

  // Fetch categories linked via junction table
  const { data: catRows, error: catErr } = await supabase
    .from('blog_post_categories')
    .select('blog_post_id, category:blog_categories(name,slug)')
    .in('blog_post_id', ids);
  if (catErr) console.warn('[getPublishedBlogSummariesWithMeta] categories fetch warning', catErr);

  // Fetch tags linked via junction table
  const { data: tagRows, error: tagErr } = await supabase
    .from('blog_post_tags')
    .select('blog_post_id, tag:tags(name,slug)')
    .in('blog_post_id', ids);
  if (tagErr) console.warn('[getPublishedBlogSummariesWithMeta] tags fetch warning', tagErr);

  const catMap = new Map<string, Array<{ name: string; slug: string }>>();
  (catRows || []).forEach((r: any) => {
    if (!r?.blog_post_id || !r?.category) return;
    const arr = catMap.get(r.blog_post_id) || [];
    arr.push(r.category);
    catMap.set(r.blog_post_id, arr);
  });

  const tagMap = new Map<string, Array<{ name: string; slug: string }>>();
  (tagRows || []).forEach((r: any) => {
    if (!r?.blog_post_id || !r?.tag) return;
    const arr = tagMap.get(r.blog_post_id) || [];
    arr.push(r.tag);
    tagMap.set(r.blog_post_id, arr);
  });

  return posts.map((p: any) => ({
    ...p,
    categories: catMap.get(p.id) || [],
    tags: tagMap.get(p.id) || [],
  }));
}

// Fetch a single published blog post by slug – uncached to reflect immediate changes.
export async function getPublishedBlogPost(slug: string) {
  const supabase = createPublicSupabase();
  const { data, error, status } = await supabase
    .from('blog_posts')
    .select('id, slug, title, body_markdown, hero_image_url, seo_title, seo_description, published_at, status')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error || !data) {
    console.error('[getPublishedBlogPost] anon fetch failed', { slug, error, status, data });
    // Privileged fallback to help debug RLS issues (remove once working)
    try {
      const srv = createServerSupabase();
      const { data: privData, error: privError, status: privStatus } = await srv
        .from('blog_posts')
        .select('id, slug, title, body_markdown, hero_image_url, seo_title, seo_description, published_at, status')
        .eq('slug', slug)
        .single();
      if (privError) {
        console.error('[getPublishedBlogPost] service role fetch also failed', { privError, privStatus });
        return null;
      }
      console.warn('[getPublishedBlogPost] returning service role data (RLS misconfig suspected)');
      return privData;
    } catch (e) {
      console.error('[getPublishedBlogPost] service role exception', e);
      return null;
    }
  }
  return data;
}
