import React from 'react';
import TopBar from '../../../components/TopBar';
import HeaderNav from '../../../components/HeaderNav';
import Footer from '../../../components/Footer';
import { getPublishedBlogPost } from '../../../lib/data/blog';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export const revalidate = 3600;
export const dynamic = 'force-dynamic'; // ensure fresh fetch in dev & after edits without manual tag revalidation yet

// Next.js 16 (Turbopack) sometimes passes params as a Promise during RSC streaming.
type ParamsPromiseOrObject = { params: { slug: string } } | { params: Promise<{ slug: string }> };

export default async function BlogPostPage(props: ParamsPromiseOrObject) {
  const resolvedParams = 'then' in (props as any).params ? await (props as any).params : (props as any).params;
  const slug: string | undefined = resolvedParams?.slug;
  const post = slug ? await getPublishedBlogPost(slug).catch(() => null) : null;
  if (!post) {
    return (
      <main className="min-h-screen bg-white text-[#2c254c] font-onest">
        <TopBar />
        <HeaderNav />
        <div className="py-20 text-center">
          <h1 className="text-3xl font-bold">Post not found</h1>
          <Link href="/blog" className="text-[#2563eb] hover:underline mt-4 inline-block">Back to Blog</Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-[#2c254c] font-onest overflow-x-hidden">
      <TopBar />
      <HeaderNav />
      <article className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2c254c] mb-4 leading-tight">{post.title}</h1>
          <div className="text-[#9ca3af] text-sm">
            <time>{post.published_at ? new Date(post.published_at).toLocaleDateString() : ''}</time> • <span>By Vita Home Care Team</span>
          </div>
        </div>
        {post.hero_image_url && (
          <div className="relative h-64 md:h-96 w-full rounded-3xl overflow-hidden mb-12 shadow-lg">
            <img src={post.hero_image_url} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="prose prose-lg mx-auto text-[#4f4865]">
          <ReactMarkdown>{post.body_markdown || ''}</ReactMarkdown>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/blog" className="inline-flex items-center text-[#2563eb] font-semibold hover:underline">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all articles
          </Link>
        </div>
      </article>
      <Footer />
    </main>
  );
}