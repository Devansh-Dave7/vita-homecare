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
      const srv = await createServerSupabase();
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

// ============================================================================
// ADMIN FUNCTIONS (require authentication)
// ============================================================================

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  body_markdown: string;
  hero_image_url?: string;
  seo_title?: string;
  seo_description?: string;
  status: 'draft' | 'published';
  published_at?: string;
  created_at: string;
  updated_at: string;
};

export type BlogPostInput = {
  slug: string;
  title: string;
  excerpt?: string;
  body_markdown: string;
  hero_image_url?: string;
  seo_title?: string;
  seo_description?: string;
  status: 'draft' | 'published';
  published_at?: string;
};

// Get all blog posts (including drafts) for admin
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[getAllBlogPosts] Error:', error);
    return [];
  }
  return data || [];
}

// Get single blog post by ID for editing
export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('[getBlogPostById] Error:', error);
    return null;
  }
  return data;
}

// Create new blog post
export async function createBlogPost(input: BlogPostInput): Promise<{ success: boolean; id?: string; error?: string }> {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from('blog_posts')
    .insert([input])
    .select('id')
    .single();

  if (error) {
    console.error('[createBlogPost] Error:', error);
    return { success: false, error: error.message };
  }

  return { success: true, id: data.id };
}

// Update existing blog post
export async function updateBlogPost(id: string, input: BlogPostInput): Promise<{ success: boolean; error?: string }> {
  const supabase = await createServerSupabase();

  const { error } = await supabase
    .from('blog_posts')
    .update(input)
    .eq('id', id);

  if (error) {
    console.error('[updateBlogPost] Error:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

// Delete blog post
export async function deleteBlogPost(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createServerSupabase();

  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('[deleteBlogPost] Error:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

