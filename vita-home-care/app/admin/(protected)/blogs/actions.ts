"use server";

import { createBlogPost, updateBlogPost, deleteBlogPost, type BlogPostInput } from '@/lib/data/blog';
import { revalidatePath } from 'next/cache';

export async function createBlogPostAction(formData: BlogPostInput) {
    try {
        console.log('[createBlogPostAction] Creating with data:', { ...formData, body_markdown: '...' });
        const result = await createBlogPost(formData);

        if (!result.success) {
            console.error('[createBlogPostAction] Error:', result.error);
            return result;
        }

        console.log('[createBlogPostAction] Success:', result.id);
        revalidatePath('/admin/blogs');
        revalidatePath('/blog');
        return result;
    } catch (error) {
        console.error('[createBlogPostAction] Error:', error);
        return { success: false, error: String(error) };
    }
}

export async function updateBlogPostAction(blogId: string, formData: BlogPostInput) {
    try {
        console.log('[updateBlogPostAction] Updating', blogId, 'with data:', { ...formData, body_markdown: '...' });
        const result = await updateBlogPost(blogId, formData);

        if (!result.success) {
            console.error('[updateBlogPostAction] Error:', result.error);
            return result;
        }

        console.log('[updateBlogPostAction] Success');
        revalidatePath('/admin/blogs');
        revalidatePath('/blog');
        return result;
    } catch (error) {
        console.error('[updateBlogPostAction] Error:', error);
        return { success: false, error: String(error) };
    }
}

export async function deleteBlogPostAction(blogId: string) {
    try {
        console.log('[deleteBlogPostAction] Deleting', blogId);
        const result = await deleteBlogPost(blogId);

        if (!result.success) {
            console.error('[deleteBlogPostAction] Error:', result.error);
            return result;
        }

        console.log('[deleteBlogPostAction] Success');
        revalidatePath('/admin/blogs');
        revalidatePath('/blog');
        return result;
    } catch (error) {
        console.error('[deleteBlogPostAction] Error:', error);
        return { success: false, error: String(error) };
    }
}
