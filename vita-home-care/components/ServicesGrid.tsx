"use client";
import React, { useState } from "react";
import Link from "next/link";

type Service = {
  title: string;
  copy: string;
  img: string;
  icon: React.ReactNode;
  category: "Personal Care" | "Support";
};

type CategoryType = "all" | "Personal Care" | "Support";

const services: Service[] = [
  {
    title: "Personal Care",
    copy:
      "Bathing, grooming, dressing, toileting, and mobility support to help clients stay clean, comfortable, and independent at home.",
    img:
      "/personal care.jpg",
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
      "Housekeeping, meal preparation, laundry, and shopping so the home stays safe, tidy, and easy to live in.",
    img:
      "/domestic help.jpg",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 text-[#2563eb]" aria-hidden>
        <path fill="currentColor" d="M12 3l9 8h-2v9h-6v-6H11v6H5v-9H3l9-8z" />
      </svg>
    ),
    category: "Personal Care",
  },
  {
    title: "Live-In Care",
    copy:
      "Continuous non-medical support in the client’s own home, with a care assistant living in.",
    img:
      "/live in care.jpg",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 text-[#2563eb]" aria-hidden>
        <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
    category: "Personal Care",
  },
  {
    title: "Companionship",
    copy:
      "Emotional support, conversation, and social engagement to reduce loneliness and keep clients connected to everyday life.",
    img:
      "/companionship.jpg",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 text-[#2563eb]" aria-hidden>
        <path fill="currentColor" d="M15 11H3v2h12v-2zm0-4H3v2h12V7zM3 16h12v-2H3v2zm13.5-3.5L22 9v9l-5.5-3.5z" />
      </svg>
    ),
    category: "Support",
  },
  {
    title: "Transport & Escort",
    copy:
      "Safe transport and escort to appointments, church, family visits, and other important activities.",
    img:
      "/transport.jpg",
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
      "Short-term cover that gives family caregivers a break while maintaining consistent comfort for the client.",
    img:
      "respite care.jpg",
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
              <Link
                href={
                  service.title === "Personal Care"
                    ? "/services/personal-care-lusaka"
                    : service.title === "Domestic Help"
                    ? "/services/domestic-help-lusaka"
                    : service.title === "Live-In Care"
                    ? "/services/live-in-care-lusaka"
                    : service.title === "Companionship"
                    ? "/services/companionship-care-lusaka"
                    : service.title === "Transport & Escort"
                    ? "/services/transport-escort-lusaka"
                    : service.title === "Respite Care"
                    ? "/services/respite-care-lusaka"
                    : "#"
                }
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563eb] hover:text-[#1e40af] transition-all duration-300 group/link"
              >
                Learn more
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1"
                >
                  <path fill="currentColor" d="M13 5l-1.4 1.4 4.2 4.1H5v2h10.8l-4.2 4.1L13 18l7-7-7-6z" />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Our Specialisation subsection */}
      {/* Specialisation list based on slides */}
        <div className="mt-16 rounded-[32px] border border-[#e5e7eb] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
          {/* subtle background accent */}
          <div className="pointer-events-none absolute inset-y-0 right-[-80px] w-64 bg-gradient-to-b from-[#eff6ff]/80 via-white to-[#eef2ff] opacity-70" />

          <div className="relative z-10 flex flex-col gap-6 md:gap-8">
            <div className="flex flex-col gap-3 md:gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#eff6ff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2563eb]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb]" />
                  Core specialisations
                </div>
                <h2 className="mt-3 text-[28px] md:text-[32px] font-bold tracking-tight text-[#181322] leading-[1.3]">
                  What we specialise in
                </h2>
                <p className="mt-2 text-[15px] md:text-[16px] leading-[1.7] text-[#4a435d] max-w-2xl">
                  Vita Homecare focuses on non-medical home care. We do not replace hospital or
                  clinic services; instead, we provide practical, everyday support around the client
                  in their own home.
                </p>
              </div>
            </div>

            {/* pill-style specialisation chips */}
            <div className="flex flex-wrap gap-2.5 md:gap-3">
              {[
                "Elderly care",
                "Mobility support",
                "Prolonged health conditions",
                "Dementia care",
                "Chronic illness support",
              ].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-[#dbeafe] bg-[#f3f6ff] px-3.5 py-1.5 text-[12px] md:text-[13px] font-semibold text-[#1d4ed8] shadow-sm"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#60a5fa]" />
                  {label}
                </span>
              ))}
            </div>

            {/* two-column detail list */}
            <div className="grid gap-4 md:gap-6 md:grid-cols-2">
              <div className="space-y-3 text-[14px] md:text-[15px] text-[#374151]">
                <div className="rounded-2xl bg-[#f9fafb] p-4 border border-[#e5e7eb]">
                  <p className="font-semibold text-[#111827]">Elderly care</p>
                  <p className="mt-1 leading-relaxed">
                    Supporting seniors to live independently at home with personal care,
                    companionship, and daily assistance.
                  </p>
                </div>
                <div className="rounded-2xl bg-[#f9fafb] p-4 border border-[#e5e7eb]">
                  <p className="font-semibold text-[#111827]">Mobility support</p>
                  <p className="mt-1 leading-relaxed">
                    Assistance for clients with limited mobility, including safe transfers, walking
                    support, and positioning around the home.
                  </p>
                </div>
                <div className="rounded-2xl bg-[#f9fafb] p-4 border border-[#e5e7eb]">
                  <p className="font-semibold text-[#111827]">Prolonged health conditions</p>
                  <p className="mt-1 leading-relaxed">
                    Skilled non-clinical support for long-term conditions, built around the care
                    plan from your doctor or hospital.
                  </p>
                </div>
              </div>
              <div className="space-y-3 text-[14px] md:text-[15px] text-[#374151]">
                <div className="rounded-2xl bg-[#f9fafb] p-4 border border-[#e5e7eb]">
                  <p className="font-semibold text-[#111827]">Dementia care</p>
                  <p className="mt-1 leading-relaxed">
                    Compassionate, patient-focused support for clients living with dementia or
                    memory loss, with routines that feel familiar and safe.
                  </p>
                </div>
                <div className="rounded-2xl bg-[#f9fafb] p-4 border border-[#e5e7eb]">
                  <p className="font-semibold text-[#111827]">Chronic illness support</p>
                  <p className="mt-1 leading-relaxed">
                    Safe, reliable daily assistance for non-medical needs related to chronic
                    illness—help around medication reminders, meals, and everyday tasks.
                  </p>
                </div>

                {/* highlighted warning / disclaimer */}
                <div className="mt-3 rounded-2xl border border-[#f97316]/30 bg-[#fff7ed] px-4 py-3 flex gap-3 items-start">
                  <span className="mt-0.5 inline-flex h-6 w-10 items-center justify-center bg-[#f97316] text-white text-xs font-bold">
                    !
                  </span>
                  <p className="text-[13px] leading-relaxed text-[#7c2d12] font-medium">
                    We do <span className="font-semibold">not</span> provide clinical nursing procedures or hospital-level
                    interventions. Our role is to support daily life at home around any medical
                    treatment prescribed by your doctor or hospital.
                  </p>
                </div>
              </div>
            </div>
          </div>
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
