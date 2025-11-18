import TopBar from "../components/TopBar";
import HeaderNav from "../components/HeaderNav";
import Hero from "../components/Hero";
import InfoCards from "../components/InfoCards";
import ServicesGrid from "../components/ServicesGrid";
import WhyChooseUs from "../components/WhyChooseUs";
import Link from "next/link";
// import TestimonialsSection from "../components/TestimonialsSection";
import BlogSection from "../components/BlogSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#2c254c] font-onest overflow-x-hidden">
      <TopBar />
      <HeaderNav />
      <Hero />
      <InfoCards />
      <section className="bg-neutral-100 overflow-hidden py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center md:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2563eb]">
            Our Services
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-[#2c254c] md:text-4xl">
            Compassionate care tailored to every family
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#4f4865]">
            Explore the range of support options we provide—from daily assistance to
            specialized programs designed to help your loved ones thrive at home.
          </p>
        </div>
        <div className="mt-12 sm:mt-16 md:mt-20 mx-auto max-w-7xl px-4 md:px-8">
          <ServicesGrid />
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

      {/* Why Choose Us section */}
      <WhyChooseUs />

      {/* Testimonials section (temporarily disabled for localization) */}
      {/** <TestimonialsSection /> */}

      {/* Blog section */}
      <BlogSection />

      {/* Non-medical care disclaimer */}
      <section className="bg-white py-8 text-center text-xs text-[#6b7280] px-4">
        <p className="mx-auto max-w-3xl">
          Vita Homecare provides non-medical home care services delivered by healthcare assistants and nurse assistants.
          We do not offer clinical nursing procedures or hospital-level treatment; all medical decisions remain with your
          doctor or hospital team.
        </p>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
