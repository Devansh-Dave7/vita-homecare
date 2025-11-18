import type { FC } from "react";
import BlogCard from "./BlogCard";

const blogPosts = [
  {
    id: 1,
    category: "Articles",
    title: "10 Great activities to do with you grandchildren",
    date: "Nov 7, 2023",
    image: "blog1.jpg",
    attribution: "mali desha on Unsplash",
    photographerUrl: "https://unsplash.com/@malidesha"
  },
  {
    id: 2,
    category: "Resources",
    title: "How to keep your marriage strong while caregiving",
    date: "Nov 7, 2023",
    image: "blog2.jpg",
    attribution: "Vitaly Gariev on Unsplash",
    photographerUrl: "https://unsplash.com/@silverkblack"
  },
  {
    id: 3,
    category: "News",
    title: "Best vitamin B12 supplement brands for older adults",
    date: "Nov 6, 2023",
    image: "blog3.jpg",
    attribution: "Ernst-Günther Krause (NID) on Unsplash",
    photographerUrl: "https://unsplash.com/@nichtraucherinitiative"
  }
];

const BlogSection: FC = () => {
  return (
    <section className="bg-neutral-50 py-20 px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2563eb]">
              OUR BLOG
            </p>
            <h2 className="mt-3 text-4xl font-semibold text-[#2c254c] md:text-5xl">
              News & articles
            </h2>
          </div>
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563eb] hover:text-[#1e40af] transition-all duration-300 group"
          >
            Browse all articles
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;