import TopBar from "../../components/TopBar";
import HeaderNav from "../../components/HeaderNav";
import ServicesGrid from "../../components/ServicesGrid";
import Link from "next/link";
import { Suspense } from "react";

// Loading skeleton for ServicesGrid
function ServicesGridSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="mb-12 flex flex-wrap justify-center gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-10 w-28 rounded-full bg-gray-200" />
        ))}
      </div>
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-96 rounded-3xl bg-gray-200" />
        ))}
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white text-[#2c254c] font-onest">
      <TopBar />
      <HeaderNav />

      <section className="relative mx-auto max-w-7xl px-4 pb-8 pt-16 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2563eb]">Our services</p>
        <h1 className="mt-3 text-3xl md:text-4xl font-semibold text-[#2c254c]">
          Compassionate non-medical care for every family
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base text-[#4a435d]">
          The same services you see on our home page are listed here in more detail&mdash;from
          personal care and domestic help to companionship, live-in care, transport and escort,
          and respite care for families.
        </p>
      </section>

      <section className="bg-neutral-100 overflow-hidden py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Suspense fallback={<ServicesGridSkeleton />}>
            <ServicesGrid />
          </Suspense>
          <div className="mt-12 flex justify-center">
            <Link
              href="/inquiry"
              className="inline-flex items-center rounded-full bg-[#2563eb] px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-[#1d4ed8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2563eb]"
            >
              Discuss pricing and care options
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
