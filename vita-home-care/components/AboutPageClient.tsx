'use client';

import { useEffect, useState } from 'react';
import { getBrowserSupabase } from '@/lib/supabase/client';

type AboutPageContent = {
  hero_heading: string;
  hero_description: string;
  gallery_image_1: { url: string; alt: string };
  gallery_image_2: { url: string; alt: string };
  gallery_image_3: { url: string; alt: string };
  vision_text: string;
  mission_text: string;
  team_heading: string;
  team_description: string;
};

type SpecialtiesHeader = {
  title: string;
  description: string;
};

type Specialty = {
  id: string;
  name: string;
  description: string | null;
};

type StaffMember = {
  id: string;
  name: string;
  role: string | null;
  photo_url: string | null;
};

const defaultContent: AboutPageContent = {
  hero_heading: 'Why we love what we do',
  hero_description: 'We believe home is where care is most meaningful. Our healthcare assistants and nurse assistants (not registered nurses) provide flexible, non-medical support that preserves dignity, builds independence, and keeps families closely connected.',
  gallery_image_1: { url: 'https://images.pexels.com/photos/7551677/pexels-photo-7551677.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&dpr=1', alt: 'Warm embrace between senior couple' },
  gallery_image_2: { url: '/caregiver with a black man.png', alt: 'Caregiver with senior smiling' },
  gallery_image_3: { url: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&dpr=1', alt: 'Senior exercising with caregiver support' },
  vision_text: "To be Zambia's most trusted home care provider, delivering compassionate and reliable support at home.",
  mission_text: "Provide high-quality, flexible non-medical home care through trained caregivers, ensuring clients' dignity, independence, and family connection",
  team_heading: 'Meet our professionals',
  team_description: 'Our caregivers provide personal care, companionship, and everyday support.'
};

const defaultSpecialtiesHeader: SpecialtiesHeader = {
  title: 'What we specialise in',
  description: 'Vita Homecare focuses on non-medical home care. We do not replace hospital or clinic services; instead, we provide practical, everyday support around the client in their own home.'
};

export default function AboutPageClient() {
  const [content, setContent] = useState<AboutPageContent>(defaultContent);
  const [specialtiesHeader, setSpecialtiesHeader] = useState<SpecialtiesHeader>(defaultSpecialtiesHeader);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const supabase = getBrowserSupabase();

        // Fetch about page content
        const { data: contentData } = await supabase
          .from('about_page_content')
          .select('key, value_json');

        if (contentData) {
          const contentMap: Record<string, any> = {};
          contentData.forEach((row: any) => {
            contentMap[row.key] = row.value_json;
          });

          setContent({
            hero_heading: contentMap.hero_heading || defaultContent.hero_heading,
            hero_description: contentMap.hero_description || defaultContent.hero_description,
            gallery_image_1: contentMap.gallery_image_1 || defaultContent.gallery_image_1,
            gallery_image_2: contentMap.gallery_image_2 || defaultContent.gallery_image_2,
            gallery_image_3: contentMap.gallery_image_3 || defaultContent.gallery_image_3,
            vision_text: contentMap.vision_text || defaultContent.vision_text,
            mission_text: contentMap.mission_text || defaultContent.mission_text,
            team_heading: contentMap.team_heading || defaultContent.team_heading,
            team_description: contentMap.team_description || defaultContent.team_description,
          });
        }

        // Fetch specialties header from site_settings (same source as Services page)
        const { data: headerData } = await supabase
          .from('site_settings')
          .select('value_json')
          .eq('key', 'services_specialties_header')
          .maybeSingle();

        const headerVal = (headerData?.value_json as any) || {};
        setSpecialtiesHeader({
          title: headerVal.title || defaultSpecialtiesHeader.title,
          description: headerVal.description || defaultSpecialtiesHeader.description,
        });

        // Fetch specialties (only active ones via RLS)
        const { data: specialtiesData } = await supabase
          .from('service_specialties')
          .select('id, name, description')
          .order('sort_order', { ascending: true });

        if (specialtiesData) {
          setSpecialties(specialtiesData);
        }

        // Fetch staff members
        const { data: staffData } = await supabase
          .from('staff_members')
          .select('id, name, role, photo_url')
          .order('sort_order', { ascending: true });

        if (staffData) {
          setStaff(staffData);
        }
      } catch (err) {
        console.error('Error fetching about page data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse">
        {/* Hero Skeleton */}
        <section className="relative bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 lg:px-8">
            <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-20">
              <div>
                <div className="h-24 w-3/4 rounded-lg bg-gray-200" />
                <div className="mt-4 h-[10px] w-[260px] rounded-full bg-gradient-to-r from-[#3b82f6] to-[#60a5fa]/60 md:w-[340px] lg:w-[420px]" />
              </div>
              <div className="space-y-3">
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-4 w-3/4 rounded bg-gray-200" />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <>
      {/* About Hero */}
      <section className="relative bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 lg:px-8">
          <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-20">
            <div>
              <h1 className="font-semibold tracking-tight text-[#090717] text-[52px] leading-[1.15] md:text-[68px] lg:text-[80px]">
                {content.hero_heading.split(' ').slice(0, 3).join(' ')}
                <br />
                {content.hero_heading.split(' ').slice(3).join(' ')}
              </h1>
              <div className="mt-4 h-[10px] w-[260px] rounded-full bg-gradient-to-r from-[#3b82f6] to-[#60a5fa]/60 md:w-[340px] lg:w-[420px]" />
            </div>
            <div className="max-w-xl text-[17px] leading-[1.75] text-[#4a435d] lg:pt-4">
              {content.hero_description}
            </div>
          </div>
        </div>
      </section>

      {/* Three-image row */}
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
            <div className="absolute bottom-0 right-0 z-0 h-32 w-32 rounded-full bg-blue-50 opacity-0 transition-all duration-500 group-hover:opacity-100 blur-2xl" />
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
            <div className="absolute bottom-0 right-0 z-0 h-32 w-32 rounded-full bg-blue-50 opacity-0 transition-all duration-500 group-hover:opacity-100 blur-2xl" />
          </div>
        </div>

        {/* Specialisation list - now with dynamic heading and description */}
        <div className="mt-16 rounded-[32px] border border-[#e5e7eb] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 right-[-80px] w-64 bg-gradient-to-b from-[#eff6ff]/80 via-white to-[#eef2ff] opacity-70" />

          <div className="relative z-10 flex flex-col gap-6 md:gap-8">
            <div className="flex flex-col gap-3 md:gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#eff6ff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2563eb]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb]" />
                  Core specialisations
                </div>
                <h2 className="mt-3 text-[28px] md:text-[32px] font-bold tracking-tight text-[#181322] leading-[1.3]">
                  {specialtiesHeader.title}
                </h2>
                <p className="mt-2 text-[15px] md:text-[16px] leading-[1.7] text-[#4a435d] max-w-2xl">
                  {specialtiesHeader.description}
                </p>
              </div>
            </div>

            {/* pill-style specialisation chips */}
            <div className="flex flex-wrap gap-2.5 md:gap-3">
              {specialties.map((specialty) => (
                <span
                  key={specialty.id}
                  className="inline-flex items-center gap-2 rounded-full border border-[#dbeafe] bg-[#f3f6ff] px-3.5 py-1.5 text-[12px] md:text-[13px] font-semibold text-[#1d4ed8] shadow-sm"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#60a5fa]" />
                  {specialty.name}
                </span>
              ))}
            </div>

            {/* two-column detail list */}
            <div className="grid gap-4 md:gap-6 md:grid-cols-2">
              <div className="space-y-3 text-[14px] md:text-[15px] text-[#374151]">
                {specialties.slice(0, Math.ceil(specialties.length / 2)).map((specialty) => (
                  <div key={specialty.id} className="rounded-2xl bg-[#f9fafb] p-4 border border-[#e5e7eb]">
                    <p className="font-semibold text-[#111827]">{specialty.name}</p>
                    {specialty.description && (
                      <p className="mt-1 leading-relaxed">{specialty.description}</p>
                    )}
                  </div>
                ))}
              </div>
              <div className="space-y-3 text-[14px] md:text-[15px] text-[#374151]">
                {specialties.slice(Math.ceil(specialties.length / 2)).map((specialty) => (
                  <div key={specialty.id} className="rounded-2xl bg-[#f9fafb] p-4 border border-[#e5e7eb]">
                    <p className="font-semibold text-[#111827]">{specialty.name}</p>
                    {specialty.description && (
                      <p className="mt-1 leading-relaxed">{specialty.description}</p>
                    )}
                  </div>
                ))}

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

      {/* Our Staff */}
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
    </>
  );
}
