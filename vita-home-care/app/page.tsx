import TopBar from "../components/TopBar";
import HeaderNav from "../components/HeaderNav";
import Hero from "../components/Hero";
import InfoCards from "../components/InfoCards";
import ServicesGrid from "../components/ServicesGrid";
import WhyChooseUs from "../components/WhyChooseUs";
import TestimonialsSection from "../components/TestimonialsSection";
import BlogSection from "../components/BlogSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#2c254c] font-sans">
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
        </div>
      </section>

      {/* Why Choose Us section */}
      <WhyChooseUs />

      {/* Testimonials section */}
      <TestimonialsSection />

      {/* Blog section */}
      <BlogSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
