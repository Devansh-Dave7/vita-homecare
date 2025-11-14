import TopBar from "../components/TopBar";
import HeaderNav from "../components/HeaderNav";
import Hero from "../components/Hero";
import InfoCards from "../components/InfoCards";
import ServicesCarousel from "../components/ServicesCarousel";
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
      <section className="bg-neutral-100 overflow-hidden py-20">
        <div className="mx-auto max-w-6xl px-4 text-center md:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6d55d9]">
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
        <div className="mt-14">
          <ServicesCarousel />
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
