"use client";
import React, { useState } from "react";

type Service = {
  title: string;
  copy: string;
  img: string;
  icon: React.ReactNode;
  category: "Personal Care" | "Support" | "Scheduling";
};

type CategoryType = "all" | "Personal Care" | "Support" | "Scheduling";

const services: Service[] = [
  {
    title: "Personal Care",
    copy:
      "Bathing, grooming, dressing, and mobility support to help maintain independence and dignity with personalized assistance.",
    img:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 text-[#2563eb]" aria-hidden>
        <path fill="currentColor" d="M12 2a4 4 0 110 8 4 4 0 010-8zm0 10c4.42 0 8 1.79 8 4v3H4v-3c0-2.21 3.58-4 8-4z" />
      </svg>
    ),
    category: "Personal Care",
  },
  {
    title: "Domestic Help",
    copy:
      "Professional housekeeping, meal preparation, laundry, and shopping services to keep your home comfortable and organized.",
    img:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 text-[#2563eb]" aria-hidden>
        <path fill="currentColor" d="M12 3l9 8h-2v9h-6v-6H11v6H5v-9H3l9-8z" />
      </svg>
    ),
    category: "Personal Care",
  },
  {
    title: "Companionship",
    copy:
      "Emotional support and social engagement to reduce loneliness and provide meaningful conversation and friendship.",
    img:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 text-[#2563eb]" aria-hidden>
        <path fill="currentColor" d="M15 11H3v2h12v-2zm0-4H3v2h12V7zM3 16h12v-2H3v2zm13.5-3.5L22 9v9l-5.5-3.5z" />
      </svg>
    ),
    category: "Support",
  },
  {
    title: "Flexible Scheduling",
    copy:
      "Hourly, daily, or 24-hour care options tailored to your specific needs and lifestyle requirements.",
    img:
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=1200&q=80",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 text-[#2563eb]" aria-hidden>
        <path fill="currentColor" d="M7 2v2H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2h-2V2h-2v2H9V2H7zm12 6H5v10h14V8z" />
      </svg>
    ),
    category: "Scheduling",
  },
  {
    title: "Live-In Care",
    copy:
      "Continuous in-home support providing round-the-clock care and companionship in the comfort of your own home.",
    img:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 text-[#2563eb]" aria-hidden>
        <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
    category: "Scheduling",
  },
  {
    title: "Transport & Escort",
    copy:
      "Safe and reliable transportation services to appointments, social events, and other important destinations.",
    img:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 text-[#2563eb]" aria-hidden>
        <path fill="currentColor" d="M18 8h-1V6c0-2.76-2.24-5-5-5s-5 2.24-5 5v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6-2c1.66 0 3 1.34 3 3v2h-6V9c0-1.66 1.34-3 3-3z" />
      </svg>
    ),
    category: "Support",
  },
  {
    title: "Respite Care",
    copy:
      "Family relief services that provide consistent client comfort, giving caregivers a well-deserved break.",
    img:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 text-[#2563eb]" aria-hidden>
        <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-2.12-2.66c-.3-.38-.85-.42-1.24-.12-.37.3-.42.84-.12 1.23l2.83 3.53c.3.38.84.39 1.23.09l3.46-4.46c.37-.48.09-1.18-.39-1.54-.46-.36-1.16-.15-1.52.38z" />
      </svg>
    ),
    category: "Support",
  },
];

export default function ServicesGrid() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>("all");

  const filteredServices =
    activeCategory === "all"
      ? services
      : services.filter((s) => s.category === activeCategory);

  const categories: { id: CategoryType; label: string }[] = [
    { id: "all", label: "All Services" },
    { id: "Personal Care", label: "Personal Care" },
    { id: "Support", label: "Support" },
    { id: "Scheduling", label: "Scheduling" },
  ];

  return (
    <div className="w-full">
      {/* Category Filter Buttons */}
      <div className="mb-12 flex flex-wrap justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base ${
              activeCategory === cat.id
                ? "bg-[#2563eb] text-white shadow-lg hover:bg-[#1e40af] hover:shadow-xl"
                : "bg-white text-[#2c254c] border-2 border-[#dbeafe] hover:border-[#2563eb] hover:text-[#2563eb] hover:shadow-md"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 auto-rows-max">
        {filteredServices.map((service, index) => (
          <article
            key={service.title}
            className="group flex flex-col h-full rounded-3xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-transparent hover:border-[#dbeafe] hover:bg-gradient-to-br hover:from-[#f8fbff] hover:to-white"
            style={{
              animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
            }}
          >
            {/* Image Section */}
            <div className="relative h-56 sm:h-64 overflow-hidden">
              <img
                src={service.img}
                alt={service.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content Section */}
            <div className="flex flex-col flex-grow p-6 sm:p-8">
              {/* Icon and Category Badge */}
              <div className="mb-4 flex items-start justify-between">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#e6f0ff] text-[#2563eb] shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                  {service.icon}
                </div>
                <span className="inline-block px-3 py-1 rounded-full bg-[#e6f0ff] text-xs font-semibold text-[#2563eb] group-hover:bg-[#2563eb] group-hover:text-white transition-all duration-300">
                  {service.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-semibold text-[#2c254c] mb-3 transition-colors duration-300 group-hover:text-[#2563eb]">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base leading-6 text-[#4f4865] mb-6 flex-grow transition-opacity duration-300 group-hover:opacity-95">
                {service.copy}
              </p>

              {/* CTA Link */}
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563eb] hover:text-[#1e40af] transition-all duration-300 group/link"
              >
                Learn more
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1"
                >
                  <path fill="currentColor" d="M13 5l-1.4 1.4 4.2 4.1H5v2h10.8l-4.2 4.1L13 18l7-7-7-6z" />
                </svg>
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Animation styles */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
