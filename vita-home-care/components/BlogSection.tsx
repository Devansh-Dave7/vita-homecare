import type { FC } from "react";
import BlogCard from "./BlogCard";

const blogPosts = [
  {
    id: 1,
    category: "Articles",
    title: "10 Great activities to do with you grandchildren",
    date: "Nov 7, 2023",
    image: "https://images.unsplash.com/photo-1670251684279-67cc41b1758c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw5fHxlbGRlcmx5JTIwd29tYW4lMjBjYXJlZ2l2ZXIlMjBjb252ZXJzYXRpb24lMjBoZWFsdGhjYXJlfGVufDB8MHx8fDE3NjI5NzA0OTF8MA&ixlib=rb-4.1.0&q=85",
    attribution: "mali desha on Unsplash",
    photographerUrl: "https://unsplash.com/@malidesha"
  },
  {
    id: 2,
    category: "Resources",
    title: "How to keep your marriage strong while caregiving",
    date: "Nov 7, 2023",
    image: "https://images.unsplash.com/photo-1758686253706-5d45c46112f0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwY291cGxlJTIwc2VuaW9yJTIwcG9ydHJhaXQlMjBoYXBweSUyMHNlbmlvcnN8ZW58MHwwfHx8MTc2Mjk3MDQ5MXww&ixlib=rb-4.1.0&q=85",
    attribution: "Vitaly Gariev on Unsplash",
    photographerUrl: "https://unsplash.com/@silverkblack"
  },
  {
    id: 3,
    category: "News",
    title: "Best vitamin B12 supplement brands for older adults",
    date: "Nov 6, 2023",
    image: "https://images.unsplash.com/photo-1686052401814-d0430982f8f4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHxjYXJlZ2l2ZXIlMjBlbGRlcmx5JTIwcGVyc29uJTIwd2Fsa2VyJTIwaG9tZSUyMGNhcmV8ZW58MHwwfHx8MTc2Mjk3MDQ5MXww&ixlib=rb-4.1.0&q=85",
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
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6d55d9]">
              OUR BLOG
            </p>
            <h2 className="mt-3 text-4xl font-semibold text-[#2c254c] md:text-5xl">
              News & articles
            </h2>
          </div>
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#6d55d9] hover:text-[#FFB3A3] transition-all duration-300 group"
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