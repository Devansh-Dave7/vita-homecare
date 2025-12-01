"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getBrowserSupabase } from "../lib/supabase/client";

type Service = {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  hero_image_url?: string;
  category: string | null;
};

type Specialty = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
  is_active: boolean;
};

const ServicesGrid: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [header, setHeader] = useState<{ title: string; description: string } | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const supabase = getBrowserSupabase();
        
        // Fetch services
        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select('id, slug, name, short_description, hero_image_url, category')
          .order('name', { ascending: true });
        if (servicesError) throw servicesError;
        
        // Fetch specialties (only active ones)
        const { data: specialtiesData, error: specialtiesError } = await supabase
          .from('service_specialties')
          .select('id, name, slug, description, sort_order, is_active')
          .eq('is_active', true)
          .order('sort_order', { ascending: true });
        if (specialtiesError) {
          console.warn('Could not fetch specialties:', specialtiesError);
          // Don't throw, continue with empty specialties
        }

        // Fetch header settings
        const { data: headerRow, error: headerError } = await supabase
          .from('site_settings')
          .select('value_json')
          .eq('key', 'services_specialties_header')
          .maybeSingle();
        const headerVal = (headerRow?.value_json as any) || {};
        
        if (mounted) {
          setServices(servicesData as Service[]);
          setSpecialties((specialtiesData as Specialty[]) || []);
          setHeader({
            title: headerVal.title || 'What we specialise in',
            description:
              headerVal.description ||
              'Vita Homecare focuses on non-medical home care. We do not replace hospital or clinic services; instead, we provide practical, everyday support around the client in their own home.',
          });
        }
      } catch (e: unknown) {
        if (mounted) setError(e instanceof Error ? e.message : 'Failed to load services');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // Helper function to format category display
  const formatCategory = (cat: string): string => {
    if (cat === 'all') return 'All Services';
    return cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const categories: string[] = ['all', ...Array.from(new Set(services
    .map(s => s.category)
    .filter((c): c is string => !!c)))].sort();
  const filtered = activeCategory === 'all' ? services : services.filter(s => s.category === activeCategory);

  if (loading) return <p className="text-center text-sm text-[#4f4865]">Loading services...</p>;
  if (error) return <p className="text-center text-sm text-red-600">{error}</p>;

  return (
    <div className="w-full">
      <div className="mb-12 flex flex-wrap justify-center gap-3">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base ${activeCategory === cat ? 'bg-[#2563eb] text-white shadow-lg hover:bg-[#1e40af] hover:shadow-xl' : 'bg-white text-[#2c254c] border-2 border-[#dbeafe] hover:border-[#2563eb] hover:text-[#2563eb] hover:shadow-md'}`}
          >
            {formatCategory(cat)}
          </button>
        ))}
      </div>
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 auto-rows-max">
        {filtered.map((service, index) => (
          <article
            key={service.id}
            className="group flex flex-col h-full rounded-3xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-transparent hover:border-[#dbeafe] hover:bg-linear-to-br hover:from-[#f8fbff] hover:to-white"
            style={{ animation: `fadeIn 0.5s ease-out ${index * 0.1}s both` }}
          >
            <div className="relative h-56 sm:h-64 overflow-hidden">
              {service.hero_image_url && (
                <img src={service.hero_image_url} alt={service.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="flex flex-col grow p-6 sm:p-8">
              <div className="mb-4 flex items-start justify-between">
                <span className="inline-block px-3 py-1 rounded-full bg-[#e6f0ff] text-xs font-semibold text-[#2563eb] group-hover:bg-[#2563eb] group-hover:text-white transition-all duration-300">
                  {formatCategory(service.category || 'other')}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-[#2c254c] mb-3 group-hover:text-[#2563eb] transition-colors">{service.name}</h3>
              <p className="text-sm text-[#4f4865] mb-6 grow">{service.short_description}</p>
              <Link
                href={`/services/${service.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563eb] hover:text-[#1e40af] transition-all duration-300 group"
              >
                Learn more
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1"><polyline points="9 18 15 12 9 6" /></svg>
              </Link>
            </div>
          </article>
        ))}
      </div>
      
      {/* What We Specialise Section with styled background box */}
      {specialties.length > 0 && (
      <div className="mt-16 rounded-4xl border border-[#e5e7eb] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
        {/* Background accent gradient */}
        <div className="pointer-events-none absolute inset-y-0 -right-20 w-64 bg-linear-to-b from-[#eff6ff]/80 via-white to-[#eef2ff] opacity-70"></div>
        
        <div className="relative z-10 flex flex-col gap-6 md:gap-8">
            <div className="flex flex-col gap-3 md:gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#eff6ff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2563eb]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb]" />
                  Core specialisations
                </div>
                <h2 className="mt-3 text-[28px] md:text-[32px] font-bold tracking-tight text-[#181322] leading-[1.3]">
                  {header?.title || 'What we specialise in'}
                </h2>
                <p className="mt-2 text-[15px] md:text-[16px] leading-[1.7] text-[#4a435d] max-w-2xl">
                  {header?.description ||
                    'Vita Homecare focuses on non-medical home care. We do not replace hospital or clinic services; instead, we provide practical, everyday support around the client in their own home.'}
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
              {/* First column - first half of specialties */}
              <div className="space-y-3 text-[14px] md:text-[15px] text-[#374151]">
                {specialties.slice(0, Math.ceil(specialties.length / 2)).map((specialty) => (
                  <div key={specialty.id} className="rounded-2xl bg-[#f9fafb] p-4 border border-[#e5e7eb]">
                    <p className="font-semibold text-[#111827]">{specialty.name}</p>
                    {specialty.description && (
                      <p className="mt-1 leading-relaxed">
                        {specialty.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              {/* Second column - second half of specialties + disclaimer */}
              <div className="space-y-3 text-[14px] md:text-[15px] text-[#374151]">
                {specialties.slice(Math.ceil(specialties.length / 2)).map((specialty) => (
                  <div key={specialty.id} className="rounded-2xl bg-[#f9fafb] p-4 border border-[#e5e7eb]">
                    <p className="font-semibold text-[#111827]">{specialty.name}</p>
                    {specialty.description && (
                      <p className="mt-1 leading-relaxed">
                        {specialty.description}
                      </p>
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
      )}
      
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
};

export default ServicesGrid;
