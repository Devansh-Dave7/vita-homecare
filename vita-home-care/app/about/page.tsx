import TopBar from "@/components/TopBar";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import { Onest } from "next/font/google";
import React from "react";
import { getAboutPageContent, getAllStaffMembers } from "@/lib/data/about";

const onest = Onest({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "About Us | Vita Homecare",
  description:
    "Learn about Vita Homecare's vision, mission, and compassionate caregiving team in Zambia.",
};

export default async function AboutPage() {
  const content = await getAboutPageContent();
  const staff = await getAllStaffMembers();

  return (
    <main className={`${onest.className} min-h-screen bg-white text-[#2c254c]`}>
      <TopBar />
      <HeaderNav />

      {/* About Hero - Two columns with improved spacing */}
      <section className="relative bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 lg:px-8">
          <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-20">
            {/* Left: Big Onest heading */}
            <div>
              <h1 className="font-semibold tracking-tight text-[#090717] text-[52px] leading-[1.15] md:text-[68px] lg:text-[80px]">
                {content.hero_heading.split(' ').slice(0, 3).join(' ')}
                <br />
                {content.hero_heading.split(' ').slice(3).join(' ')}
              </h1>
              <div className="mt-4 h-[10px] w-[260px] rounded-full bg-gradient-to-r from-[#3b82f6] to-[#60a5fa]/60 md:w-[340px] lg:w-[420px]" />
            </div>

            {/* Right: Supporting paragraph */}
            <div className="max-w-xl text-[17px] leading-[1.75] text-[#4a435d] lg:pt-4">
              {content.hero_description}
            </div>
          </div>
        </div>
      </section>

      {/* Three-image row with peach band background */}
      <section className="relative">
        <div className="absolute inset-x-0 bottom-0 -z-10 h-72 bg-gradient-to-b from-transparent to-[#ffefe5]" />
        <div className="mx-auto max-w-7xl px-6 pb-20 md:pb-28 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="group overflow-hidden rounded-[32px] shadow-[0_24px_60px_-12px_rgba(37,99,235,0.25)] transition-all duration-500 hover:shadow-[0_32px_80px_-12px_rgba(37,99,235,0.35)]">
              <img
                src={content.gallery_image_1.url}
                alt={content.gallery_image_1.alt}
                className="h-90 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="group overflow-hidden rounded-[32px] shadow-[0_24px_60px_-12px_rgba(37,99,235,0.25)] transition-all duration-500 hover:shadow-[0_32px_80px_-12px_rgba(37,99,235,0.35)]">
              <img
                src={content.gallery_image_2.url}
                alt={content.gallery_image_2.alt}
                className="h-90 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="group overflow-hidden rounded-[32px] shadow-[0_24px_60px_-12px_rgba(37,99,235,0.25)] transition-all duration-500 hover:shadow-[0_32px_80px_-12px_rgba(37,99,235,0.35)]">
              <img
                src={content.gallery_image_3.url}
                alt={content.gallery_image_3.alt}
                className="h-90 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="group relative rounded-[32px] border border-[#e5e7eb] bg-gradient-to-br from-white to-[#f8f9fa] p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_24px_80px_rgb(0,0,0,0.12)] hover:-translate-y-2">
            <div className="absolute inset-0 rounded-[32px] bg-gradient-to-r from-blue-50/0 via-blue-50/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="mb-6 inline-flex rounded-2xl bg-blue-100/60 px-4 py-2">
                <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 4a1 1 0 011-1h6a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4z" />
                  <path d="M13.586 3.414a2 2 0 112.828 2.828l-.793.793-2.828-2.829.793-.792z" />
                  <path d="M9.172 9.172a2 2 0 11-2.828 2.828l-.793-.793 2.828-2.828.793.793z" />
                </svg>
              </div>
              <h2 className="text-[32px] font-bold tracking-tight text-[#181322] leading-[1.3]">Vision</h2>
              <p className="mt-6 text-[17px] leading-[1.75] text-[#4a435d]">
                {content.vision_text}
              </p>
            </div>
            <div className="absolute bottom-0 right-0 -z-0 h-32 w-32 rounded-full bg-blue-50 opacity-0 transition-all duration-500 group-hover:opacity-100 blur-2xl" />
          </div>
          <div className="group relative rounded-[32px] border border-[#e5e7eb] bg-gradient-to-br from-white to-[#f8f9fa] p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_24px_80px_rgb(0,0,0,0.12)] hover:-translate-y-2">
            <div className="absolute inset-0 rounded-[32px] bg-gradient-to-r from-blue-50/0 via-blue-50/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="mb-6 inline-flex rounded-2xl bg-blue-100/60 px-4 py-2">
                <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h2 className="text-[32px] font-bold tracking-tight text-[#181322] leading-[1.3]">Mission</h2>
              <p className="mt-6 text-[17px] leading-[1.75] text-[#4a435d]">
                {content.mission_text}
              </p>
            </div>
            <div className="absolute bottom-0 right-0 -z-0 h-32 w-32 rounded-full bg-blue-50 opacity-0 transition-all duration-500 group-hover:opacity-100 blur-2xl" />
          </div>
        </div>

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
      </section>

      {/* Our Staff - with bg-neutral-100 */}
      <section className="bg-neutral-100 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#2563eb]">Our team</p>
            <h2 className="font-semibold tracking-tight text-[#090717] text-[52px] leading-[1.15] md:text-[68px] lg:text-[80px]">{content.team_heading}</h2>
            <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-[1.75] text-[#4a435d]">
              {content.team_description}
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {staff.map((m) => (
              <div
                key={m.id}
                className="group rounded-[24px] border border-[#e5e7eb] bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgb(0,0,0,0.12)]"
              >
                <div className="aspect-square overflow-hidden rounded-[20px]">
                  {m.photo_url ? (
                    <img
                      src={m.photo_url}
                      alt={`${m.name} - ${m.role || 'Team Member'}`}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-300">
                      <svg className="h-20 w-20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="pt-5 text-center">
                  <h3 className="text-[19px] font-bold tracking-tight text-[#181322] leading-[1.3]">{m.name}</h3>
                  {m.role && (
                    <p className="mt-1 text-[15px] font-medium text-[#2563eb] leading-[1.5]">{m.role}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
