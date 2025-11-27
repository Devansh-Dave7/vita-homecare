import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/data/blog';
import { DeleteBlogButton } from './DeleteBlogButton';

export default async function BlogsPage() {
    const blogs = await getAllBlogPosts();

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e6f0ff] via-white to-[#f2f7ff]">
            {/* Header */}
            <header className="bg-white border-b border-[#dbeafe] shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-onest font-bold text-[#2c254c]">
                                Manage Blog Posts
                            </h1>
                            <p className="text-sm text-[#4f4865] font-onest mt-1">
                                Create, edit, and manage blog content
                            </p>
                        </div>
                        <Link
                            href="/admin/dashboard"
                            className="text-sm text-[#1450d1] hover:text-[#3e5ab7] font-onest font-medium"
                        >
                            ← Dashboard
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Action Button */}
                <div className="mb-8">
                    <Link
                        href="/admin/blogs/new"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1450d1] to-[#2563eb] text-white font-onest font-bold py-3 px-6 rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create New Blog Post
                    </Link>
                </div>

                {/* Stats */}
                <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                        <p className="text-sm text-blue-800 font-onest">
                            <strong>Total Posts:</strong> {blogs.length}
                        </p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                        <p className="text-sm text-green-800 font-onest">
                            <strong>Published:</strong> {blogs.filter(b => b.status === 'published').length}
                        </p>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                        <p className="text-sm text-yellow-800 font-onest">
                            <strong>Drafts:</strong> {blogs.filter(b => b.status === 'draft').length}
                        </p>
                    </div>
                </div>

                {/* Blog Posts Grid */}
                {blogs.length === 0 ? (
                    <div className="bg-white rounded-xl border border-[#dbeafe] shadow-sm p-8 text-center">
                        <svg className="h-12 w-12 text-[#dbeafe] mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        <p className="text-[#4f4865] font-onest">No blog posts found. Create one to get started.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.map((blog) => (
                            <div key={blog.id} className="bg-white rounded-xl border border-[#dbeafe] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
                                {/* Hero Image */}
                                {blog.hero_image_url && (
                                    <div className="h-48 w-full overflow-hidden rounded-t-xl">
                                        <img
                                            src={blog.hero_image_url}
                                            alt={blog.title}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                )}

                                <div className="p-6 flex-1">
                                    <div className="flex items-start justify-between mb-4">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-onest font-medium ${blog.status === 'published'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {blog.status === 'published' ? '✓ Published' : '○ Draft'}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-onest font-bold text-[#2c254c] mb-2 line-clamp-2">
                                        {blog.title}
                                    </h3>
                                    {blog.excerpt && (
                                        <p className="text-sm text-[#4f4865] font-onest mb-4 line-clamp-3">
                                            {blog.excerpt}
                                        </p>
                                    )}
                                    <div className="flex items-center gap-2 text-xs text-[#6b7280] font-onest">
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {blog.published_at
                                            ? new Date(blog.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                                            : 'Not published'}
                                    </div>
                                    <p className="text-xs text-[#6b7280] font-onest font-mono bg-gray-50 px-2 py-1 rounded inline-block mt-2">
                                        /{blog.slug}
                                    </p>
                                </div>

                                <div className="px-6 py-4 bg-[#f8fafc] border-t border-[#dbeafe] flex items-center justify-end gap-3 rounded-b-xl">
                                    <Link
                                        href={`/admin/blogs/${blog.id}/edit`}
                                        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-onest font-semibold text-[#1450d1] hover:bg-[#e0e7ff] rounded-lg transition-colors"
                                    >
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Edit
                                    </Link>
                                    <DeleteBlogButton blogId={blog.id} blogTitle={blog.title} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}


            </main>
        </div>
    );
}
