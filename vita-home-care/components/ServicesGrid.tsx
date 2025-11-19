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

const ServicesGrid: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const supabase = getBrowserSupabase();
        const { data, error } = await supabase
          .from('services')
          .select('id, slug, name, short_description, hero_image_url, category')
          .order('name', { ascending: true });
        if (error) throw error;
        if (mounted) setServices(data as any);
      } catch (e: any) {
        if (mounted) setError(e.message || 'Failed to load services');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const categories: string[] = ['all', ...Array.from(new Set(services
    .map(s => s.category)
    .filter((c): c is string => !!c)))];
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
            {cat === 'all' ? 'All Services' : cat}
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
                  {service.category || 'Service'}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#2c254c] mb-3 transition-colors duration-300 group-hover:text-[#2563eb]">{service.name}</h3>
              <p className="text-sm sm:text-base leading-6 text-[#4f4865] mb-6 grow transition-opacity duration-300 group-hover:opacity-95">{service.short_description}</p>
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

      {/* Our Specialisation subsection */}
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
};

export default ServicesGrid;
