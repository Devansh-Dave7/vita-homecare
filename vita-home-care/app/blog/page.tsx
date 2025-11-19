import React from "react";
import TopBar from "../../components/TopBar";
import HeaderNav from "../../components/HeaderNav";
import Footer from "../../components/Footer";
import BlogCard from "../../components/BlogCard";

const blogPosts = [
  {
    id: 1,
    category: "Articles",
    title: "10 Great activities to do with you grandchildren",
    date: "Nov 7, 2023",
    image: "/blog1.jpg",
    attribution: "mali desha on Unsplash",
    photographerUrl: "https://unsplash.com/@malidesha"
  },
  {
    id: 2,
    category: "Resources",
    title: "How to keep your marriage strong while caregiving",
    date: "Nov 7, 2023",
    image: "/blog2.jpg",
    attribution: "Vitaly Gariev on Unsplash",
    photographerUrl: "https://unsplash.com/@silverkblack"
  },
  {
    id: 3,
    category: "News",
    title: "Best vitamin B12 supplement brands for older adults",
    date: "Nov 6, 2023",
    image: "/blog3.jpg",
    attribution: "Ernst-Günther Krause (NID) on Unsplash",
    photographerUrl: "https://unsplash.com/@nichtraucherinitiative"
  }
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white text-[#2c254c] font-onest overflow-x-hidden">
      <TopBar />
      <HeaderNav />
      
      {/* Blog Hero Section */}
      <section className="relative bg-[#f8fafc] py-20 px-4 md:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2563eb] mb-4">
            OUR BLOG
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2c254c] mb-6">
            News, Articles & Resources
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-[#4f4865]">
            Stay informed with the latest updates, expert advice, and helpful resources for home care and senior living.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
