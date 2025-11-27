import React from 'react';
import TopBar from '../../../components/TopBar';
import HeaderNav from '../../../components/HeaderNav';
import Footer from '../../../components/Footer';
import { getServiceBySlug } from '../../../lib/data/services';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

type ParamsPromiseOrObject = { params: { slug: string } } | { params: Promise<{ slug: string }> };

export default async function ServicePage(props: ParamsPromiseOrObject) {
  const resolvedParams = 'then' in (props as any).params ? await (props as any).params : (props as any).params;
  const slug: string | undefined = resolvedParams?.slug;
  const service = slug ? await getServiceBySlug(slug) : null;

  if (!service) {
    return (
      <main className="min-h-screen bg-white text-[#2c254c] font-onest">
        <TopBar />
        <HeaderNav />
        <div className="py-20 text-center">
          <h1 className="text-3xl font-bold">Service not found</h1>
          <Link href="/services" className="text-[#2563eb] hover:underline mt-4 inline-block">Back to Services</Link>
        </div>
        <Footer />
      </main>
    );
  }

  // Parse Core Tasks
  let coreTasks: Array<{ title: string; description: string }> = [];
  let isLegacyFeatures = true;

  if (service.features_markdown) {
    try {
      const parsed = JSON.parse(service.features_markdown);
      if (Array.isArray(parsed)) {
        coreTasks = parsed;
        isLegacyFeatures = false;
      }
    } catch (e) {
      // Not JSON, treat as markdown
    }
  }

  return (
    <main className="min-h-screen bg-white text-[#2c254c] font-onest overflow-x-hidden">
      <TopBar />
      <HeaderNav />

      {/* Hero Section */}
      <section className="bg-neutral-50 border-b border-[#e5e7eb]">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2563eb]">
            {service.category || 'Service'}
          </p>
          <h1 className="mt-3 text-3xl md:text-4xl font-semibold text-[#111827]">
            {service.name}
          </h1>
          <p className="mt-4 max-w-2xl text-sm md:text-base text-[#4b5563]">
            {service.short_description}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="mx-auto max-w-5xl px-4 py-12 md:py-16 grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1.5fr)] items-start">
        <div className="space-y-8 text-sm md:text-base text-[#374151] leading-relaxed">

          {/* ABOUT THIS SERVICE */}
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-semibold text-[#111827] uppercase">
              About This Service
            </h2>
            <div className="prose prose-sm md:prose-base max-w-none text-[#374151]">
              <ReactMarkdown>{service.body_markdown || ''}</ReactMarkdown>
            </div>
          </div>

          {/* Who this service is for */}
          {service.audience_markdown && (
            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold text-[#111827]">
                Who this service is for
              </h2>
              <div className="prose prose-sm md:prose-base max-w-none text-[#374151]">
                <ReactMarkdown>{service.audience_markdown}</ReactMarkdown>
              </div>
            </div>
          )}

          {/* What’s included in the service? */}
          {(coreTasks.length > 0 || (isLegacyFeatures && service.features_markdown)) && (
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-[#111827]">
                What&apos;s included in the service?
              </h2>

              {!isLegacyFeatures ? (
                <div className="grid gap-5 md:grid-cols-2">
                  {coreTasks.map((task, index) => (
                    <div key={index} className="relative overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#bfdbfe]">
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#eff6ff]/60 via-transparent to-white opacity-80" />
                      <div className="relative z-10">
                        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#eff6ff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2563eb]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb]" />
                          Core task
                        </div>
                        <p className="font-semibold text-[#111827]">{task.title}</p>
                        <p className="mt-1.5 text-[13px] md:text-sm text-[#4b5563]">
                          {task.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="prose prose-sm md:prose-base max-w-none text-[#374151]">
                  <ReactMarkdown>{service.features_markdown}</ReactMarkdown>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar / Images */}
        <div className="space-y-6">
          {service.hero_image_url && (
            <div className="overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white shadow-sm">
              <div className="h-56 w-full overflow-hidden">
                <img
                  src={service.hero_image_url}
                  alt={service.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          )}
          <div className="rounded-3xl border border-[#e5e7eb] bg-[#f3f4ff] p-5 text-sm md:text-base text-[#111827]">
            <p className="font-semibold">Ready to talk about {service.name.toLowerCase()}?</p>
            <p className="mt-1 text-[13px] md:text-sm text-[#4b5563]">
              Share a few details about your situation and budget and we will help you plan support that fits your family.
            </p>
            <Link
              href="/inquiry"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-[#2563eb] px-5 py-2.5 text-xs md:text-sm font-semibold text-white shadow-sm transition hover:bg-[#1d4ed8]"
            >
              Discuss pricing and care options
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}