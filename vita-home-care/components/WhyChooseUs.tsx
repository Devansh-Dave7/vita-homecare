"use client";
import React from "react";

// A reusable section that mirrors the design in the screenshot.
// It uses the same color system as other components (#6d55d9 accents, #2c254c body).
export default function WhyChooseUs() {
  const features: { title: string; icon: React.ReactNode }[] = [
    {
      title: "24/7 Nursing Staff",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#6d55d9]" aria-hidden>
          <path
            fill="currentColor"
            d="M12 3c3.9 0 7 1.6 7 3.5S15.9 10 12 10 5 8.4 5 6.5 8.1 3 12 3zm6.8 8.8A9.6 9.6 0 0112 14c-2.6 0-5-.6-6.8-1.2C4.5 18.2 7.9 21 12 21s7.5-2.8 6.8-9.2z"
          />
        </svg>
      ),
    },
    {
      title: "Resident Care",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#6d55d9]" aria-hidden>
          <path fill="currentColor" d="M12 12a4 4 0 100-8 4 4 0 000 8zm6 8H6v-1a5 5 0 015-5h2a5 5 0 015 5v1z" />
        </svg>
      ),
    },
    {
      title: "Quality Support",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#6d55d9]" aria-hidden>
          <path fill="currentColor" d="M12 17l-5.2 3 1-5.8-4.2-4.1 5.8-.8L12 4l2.6 5.3 5.8.8-4.2 4.1 1 5.8z" />
        </svg>
      ),
    },
    {
      title: "Caring Staff",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#6d55d9]" aria-hidden>
          <path fill="currentColor" d="M12.1 21.3l-1.1-1C6.1 16.1 3 13.3 3 9.8 3 7.5 4.7 5.8 7 5.8c1.3 0 2.6.6 3.4 1.6.8-1 2.1-1.6 3.4-1.6 2.3 0 4 1.7 4 4 0 3.5-3.1 6.3-8 10.5l-1.1 1z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative mx-auto mt-24 max-w-7xl px-4 text-[#2c254c] md:px-8">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Left: bento-box image layout */}
        <div className="relative order-2 lg:order-1 min-h-[520px]">
          {/* Grid container for images */}
          <div className="relative grid grid-cols-2 gap-4 h-[520px] max-w-[540px] mx-auto">
            {/* Left column - two stacked images */}
            <div className="flex flex-col gap-4">
              {/* Image 1: top-left - elderly couple at laptop */}
              <div className="h-[250px] overflow-hidden rounded-[28px] shadow-[0_20px_45px_-25px_rgba(93,70,176,0.45)]">
                <img
                  src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80"
                  alt="Elderly couple using laptop together"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Image 2: bottom-left - woman with hat and flowers */}
              <div className="h-[250px] overflow-hidden rounded-[28px] shadow-[0_20px_45px_-25px_rgba(93,70,176,0.45)]">
                <img
                  src="https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800&q=80"
                  alt="Senior woman with hat holding flowers outdoors"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Right column - single large image */}
            <div className="h-full overflow-hidden rounded-[36px] shadow-[0_35px_70px_-35px_rgba(93,70,176,0.60)]">
              <img
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
                alt="Elderly couple embracing warmly"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right: content */}
        <div className="order-1 lg:order-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6d55d9]">Why choose us</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight text-[#181322] md:text-5xl">
            The <span className="relative inline-block">
              right care
              <span className="absolute -bottom-1 left-0 h-2 w-full rounded bg-[#6d55d9]" aria-hidden />
            </span>{" "}
            for your
            <br /> loved ones
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#4f4865]">
            Semper cras condimentum habitasse amet, sit donec consequat scelerisque imperdiet sed
            tincidunt ipsum fusce cras varius.
          </p>

          {/* Features grid */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {features.map((f) => (
              <div key={f.title} className="flex items-center gap-4">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#efe9fb] text-[#6d55d9] shadow-[0_12px_25px_-12px_rgba(93,70,176,0.6)]">
                  {f.icon}
                </span>
                <span className="text-lg font-semibold">{f.title}</span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#about"
              className="rounded-full bg-[#6d55d9] px-8 py-4 text-sm font-semibold text-white shadow-lg hover:bg-[#FFB3A3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6d55d9] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
            >
              More about us
            </a>
            <a
              href="#services"
              className="rounded-full border-2 border-[#e9e3f7] bg-white px-8 py-4 text-sm font-semibold text-[#2c254c] shadow-md hover:border-[#FFB3A3] hover:bg-[#FFB3A3]/10 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
            >
              Browse services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
