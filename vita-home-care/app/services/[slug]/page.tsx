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

  return (
    <main className="min-h-screen bg-white text-[#2c254c] font-onest overflow-x-hidden">
      <TopBar />
      <HeaderNav />
      <article className="max-w-5xl mx-auto px-4 py-12 md:py-20">
        <div className="mb-10 text-center">
          <span className="inline-block rounded-full border border-[#2563eb] bg-blue-50 px-4 py-1 text-sm font-semibold text-[#2563eb] mb-4">
            {service.category || 'Service'}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">{service.name}</h1>
          <p className="text-[#4f4865] max-w-2xl mx-auto">{service.short_description}</p>
        </div>
        {service.hero_image_url && (
          <div className="relative h-64 md:h-96 w-full rounded-3xl overflow-hidden mb-12 shadow-lg">
            <img src={service.hero_image_url} alt={service.name} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="prose prose-lg mx-auto text-[#4f4865]">
          <ReactMarkdown>{service.body_markdown || ''}</ReactMarkdown>
          {service.audience_markdown && (
            <section>
              <h2>Who This Is For</h2>
              <ReactMarkdown>{service.audience_markdown}</ReactMarkdown>
            </section>
          )}
          {service.features_markdown && (
            <section>
              <h2>Key Features</h2>
              <ReactMarkdown>{service.features_markdown}</ReactMarkdown>
            </section>
          )}
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between items-center flex-wrap gap-4">
          <Link href="/services" className="inline-flex items-center text-[#2563eb] font-semibold hover:underline">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all services
          </Link>
          <Link href="/contact" className="inline-flex items-center text-sm font-semibold text-white bg-[#2563eb] px-5 py-2 rounded-full shadow hover:bg-[#1e40af] transition-colors">
            Book a consultation
          </Link>
        </div>
      </article>
      <Footer />
    </main>
  );
}