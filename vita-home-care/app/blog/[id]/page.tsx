import React from "react";
import TopBar from "../../../components/TopBar";
import HeaderNav from "../../../components/HeaderNav";
import Footer from "../../../components/Footer";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    category: "Articles",
    title: "10 Great activities to do with you grandchildren",
    date: "Nov 7, 2023",
    image: "/blog1.jpg",
    attribution: "mali desha on Unsplash",
    photographerUrl: "https://unsplash.com/@malidesha",
    content: `
      <p class="mb-4">Spending time with grandchildren is a joy, but sometimes it can be hard to come up with new ideas. Here are 10 great activities that are fun for both of you.</p>
      <h3 class="text-xl font-semibold mb-2">1. Read a Book Together</h3>
      <p class="mb-4">Reading is a timeless activity that sparks imagination and bonding.</p>
      <h3 class="text-xl font-semibold mb-2">2. Bake Cookies</h3>
      <p class="mb-4">Baking is a fun, sensory experience that ends with a delicious treat.</p>
      <p class="mb-4">... (More content would go here) ...</p>
    `
  },
  {
    id: 2,
    category: "Resources",
    title: "How to keep your marriage strong while caregiving",
    date: "Nov 7, 2023",
    image: "/blog2.jpg",
    attribution: "Vitaly Gariev on Unsplash",
    photographerUrl: "https://unsplash.com/@silverkblack",
    content: `
      <p class="mb-4">Caregiving can be stressful, and it often takes a toll on relationships. Here are some tips to maintain a strong marriage during these times.</p>
      <h3 class="text-xl font-semibold mb-2">Communicate Openly</h3>
      <p class="mb-4">Share your feelings and frustrations with your partner.</p>
      <p class="mb-4">... (More content would go here) ...</p>
    `
  },
  {
    id: 3,
    category: "News",
    title: "Best vitamin B12 supplement brands for older adults",
    date: "Nov 6, 2023",
    image: "/blog3.jpg",
    attribution: "Ernst-Günther Krause (NID) on Unsplash",
    photographerUrl: "https://unsplash.com/@nichtraucherinitiative",
    content: `
      <p class="mb-4">Vitamin B12 is essential for energy and brain function. As we age, absorption can decrease. Here are the top brands recommended for older adults.</p>
      <h3 class="text-xl font-semibold mb-2">Why B12 Matters</h3>
      <p class="mb-4">It helps keep your body's blood and nerve cells healthy.</p>
      <p class="mb-4">... (More content would go here) ...</p>
    `
  }
];

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === parseInt(id));

  if (!post) {
    return (
      <main className="min-h-screen bg-white text-[#2c254c] font-onest">
        <TopBar />
        <HeaderNav />
        <div className="py-20 text-center">
          <h1 className="text-3xl font-bold">Post not found</h1>
          <Link href="/blog" className="text-[#2563eb] hover:underline mt-4 inline-block">
            Back to Blog
          </Link>
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
          <span className="inline-block rounded-full border border-[#2563eb] bg-blue-50 px-4 py-1 text-sm font-semibold text-[#2563eb] mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2c254c] mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="text-[#9ca3af] text-sm">
            <time>{post.date}</time> • <span>By Vita Home Care Team</span>
          </div>
        </div>

        <div className="relative h-64 md:h-96 w-full rounded-3xl overflow-hidden mb-12 shadow-lg">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 right-4 text-xs text-white/80 bg-black/30 px-2 py-1 rounded">
            Photo by <a href={post.photographerUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">{post.attribution}</a>
          </div>
        </div>

        <div className="prose prose-lg prose-blue mx-auto text-[#4f4865]">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
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
