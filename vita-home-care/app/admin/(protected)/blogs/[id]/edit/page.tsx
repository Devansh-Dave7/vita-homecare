import { getBlogPostById } from '@/lib/data/blog';
import { BlogForm } from '../../BlogForm';
import { notFound } from 'next/navigation';

type PageProps = {
    params: Promise<{ id: string }> | { id: string };
};

export default async function EditBlogPage(props: PageProps) {
    const resolvedParams = 'then' in props.params ? await props.params : props.params;
    const blog = await getBlogPostById(resolvedParams.id);

    if (!blog) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e6f0ff] via-white to-[#f2f7ff]">
            {/* Header */}
            <header className="bg-white border-b border-[#dbeafe] shadow-sm">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <h1 className="text-3xl font-onest font-bold text-[#2c254c]">
                        Edit Blog Post
                    </h1>
                    <p className="text-sm text-[#4f4865] font-onest mt-1">
                        Update &quot;{blog.title}&quot;
                    </p>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <BlogForm blog={blog} isEditing={true} />
            </main>
        </div>
    );
}
