"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BlogPost } from '@/lib/data/blog';
import { createBlogPostAction, updateBlogPostAction } from './actions';

type BlogFormProps = {
    blog?: BlogPost;
    isEditing?: boolean;
};

export function BlogForm({ blog, isEditing = false }: BlogFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: blog?.title || '',
        slug: blog?.slug || '',
        excerpt: blog?.excerpt || '',
        body_markdown: blog?.body_markdown || '',
        hero_image_url: blog?.hero_image_url || '',
        seo_title: blog?.seo_title || '',
        seo_description: blog?.seo_description || '',
        status: blog?.status || 'draft' as 'draft' | 'published',
        published_at: blog?.published_at ? new Date(blog.published_at).toISOString().split('T')[0] : '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Auto-generate slug from title
        if (name === 'title' && !isEditing) {
            const slug = value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');
            setFormData(prev => ({ ...prev, slug }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const dataToSubmit = {
                ...formData,
                published_at: formData.status === 'published' && formData.published_at
                    ? formData.published_at
                    : formData.status === 'published'
                        ? new Date().toISOString()
                        : undefined,
            };

            let result;
            if (isEditing && blog) {
                result = await updateBlogPostAction(blog.id, dataToSubmit);
            } else {
                result = await createBlogPostAction(dataToSubmit);
            }

            if (result.success) {
                router.push('/admin/blogs');
                router.refresh();
            } else {
                setError(result.error || 'Failed to save blog post');
                setLoading(false);
            }
        } catch (err) {
            setError(String(err));
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            {/* Basic Information */}
            <div className="bg-white rounded-xl border border-[#dbeafe] shadow-sm p-6">
                <h2 className="text-xl font-onest font-bold text-[#2c254c] mb-6">Basic Information</h2>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
                            Title *
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1450d1] font-onest"
                            placeholder="Enter blog post title"
                        />
                    </div>

                    <div>
                        <label htmlFor="slug" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
                            Slug *
                        </label>
                        <input
                            type="text"
                            id="slug"
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1450d1] font-onest font-mono text-sm"
                            placeholder="blog-post-url-slug"
                        />
                        <p className="mt-1 text-xs text-[#6b7280] font-onest">
                            URL-friendly version of the title (auto-generated)
                        </p>
                    </div>

                    <div>
                        <label htmlFor="excerpt" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
                            Excerpt
                        </label>
                        <textarea
                            id="excerpt"
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-2 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1450d1] font-onest"
                            placeholder="Brief summary of the blog post"
                        />
                    </div>

                    <div>
                        <label htmlFor="hero_image_url" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
                            Hero Image URL
                        </label>
                        <input
                            type="url"
                            id="hero_image_url"
                            name="hero_image_url"
                            value={formData.hero_image_url}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1450d1] font-onest"
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl border border-[#dbeafe] shadow-sm p-6">
                <h2 className="text-xl font-onest font-bold text-[#2c254c] mb-6">Content</h2>

                <div>
                    <label htmlFor="body_markdown" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
                        Body Content (Markdown) *
                    </label>
                    <textarea
                        id="body_markdown"
                        name="body_markdown"
                        value={formData.body_markdown}
                        onChange={handleChange}
                        required
                        rows={15}
                        className="w-full px-4 py-2 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1450d1] font-onest font-mono text-sm"
                        placeholder="Write your blog post content in Markdown format..."
                    />
                    <p className="mt-1 text-xs text-[#6b7280] font-onest">
                        Supports Markdown formatting
                    </p>
                </div>
            </div>

            {/* SEO */}
            <div className="bg-white rounded-xl border border-[#dbeafe] shadow-sm p-6">
                <h2 className="text-xl font-onest font-bold text-[#2c254c] mb-6">SEO Settings</h2>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="seo_title" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
                            SEO Title
                        </label>
                        <input
                            type="text"
                            id="seo_title"
                            name="seo_title"
                            value={formData.seo_title}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1450d1] font-onest"
                            placeholder="Leave blank to use the post title"
                        />
                    </div>

                    <div>
                        <label htmlFor="seo_description" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
                            SEO Description
                        </label>
                        <textarea
                            id="seo_description"
                            name="seo_description"
                            value={formData.seo_description}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-2 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1450d1] font-onest"
                            placeholder="Meta description for search engines"
                        />
                    </div>
                </div>
            </div>

            {/* Publishing */}
            <div className="bg-white rounded-xl border border-[#dbeafe] shadow-sm p-6">
                <h2 className="text-xl font-onest font-bold text-[#2c254c] mb-6">Publishing</h2>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="status" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
                            Status *
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1450d1] font-onest"
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>

                    {formData.status === 'published' && (
                        <div>
                            <label htmlFor="published_at" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
                                Publish Date
                            </label>
                            <input
                                type="date"
                                id="published_at"
                                name="published_at"
                                value={formData.published_at}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1450d1] font-onest"
                            />
                            <p className="mt-1 text-xs text-[#6b7280] font-onest">
                                Leave blank to use current date/time
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-3 border border-[#dbeafe] text-[#4f4865] font-onest font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-gradient-to-r from-[#1450d1] to-[#2563eb] text-white font-onest font-bold rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Saving...' : isEditing ? 'Update Blog Post' : 'Create Blog Post'}
                </button>
            </div>
        </form>
    );
}
