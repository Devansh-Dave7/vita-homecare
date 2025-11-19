import React from "react";
import TopBar from "../../components/TopBar";
import HeaderNav from "../../components/HeaderNav";
import Footer from "../../components/Footer";
import BlogCard from "../../components/BlogCard";
import { getPublishedBlogSummariesWithMeta } from "../../lib/data/blog";

// Force dynamic so newly inserted posts appear immediately until we implement proper tag/path revalidation.
export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const posts = await getPublishedBlogSummariesWithMeta();
  return (
    <main className="min-h-screen bg-white text-[#2c254c] font-onest overflow-x-hidden">
      <TopBar />
      <HeaderNav />
      <section className="relative bg-[#f8fafc] py-20 px-4 md:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2563eb] mb-4">OUR BLOG</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2c254c] mb-6">News, Articles & Resources</h1>
          <p className="max-w-2xl mx-auto text-lg text-[#4f4865]">Stay informed with the latest updates, expert advice, and helpful resources for home care and senior living.</p>
        </div>
      </section>
      <section className="py-16 px-4 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post as any} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
