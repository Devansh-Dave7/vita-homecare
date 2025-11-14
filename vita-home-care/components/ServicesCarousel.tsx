"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import "./ServicesCarousel.css";

type Service = {
  title: string;
  copy: string;
  img: string;
  icon: React.ReactNode;
};

const services: Service[] = [
  {
    title: "Personal Care",
    copy:
      "Bathing, grooming, dressing, and mobility support to help maintain independence and dignity with personalized assistance.",
    img:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#2563eb]" aria-hidden>
        <path fill="currentColor" d="M12 2a4 4 0 110 8 4 4 0 010-8zm0 10c4.42 0 8 1.79 8 4v3H4v-3c0-2.21 3.58-4 8-4z" />
      </svg>
    ),
  },
  {
    title: "Domestic Help",
    copy:
      "Professional housekeeping, meal preparation, laundry, and shopping services to keep your home comfortable and organized.",
    img:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#2563eb]" aria-hidden>
        <path fill="currentColor" d="M12 3l9 8h-2v9h-6v-6H11v6H5v-9H3l9-8z" />
      </svg>
    ),
  },
  {
    title: "Companionship",
    copy:
      "Emotional support and social engagement to reduce loneliness and provide meaningful conversation and friendship.",
    img:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#2563eb]" aria-hidden>
        <path fill="currentColor" d="M15 11H3v2h12v-2zm0-4H3v2h12V7zM3 16h12v-2H3v2zm13.5-3.5L22 9v9l-5.5-3.5z" />
      </svg>
    ),
  },
  {
    title: "Flexible Scheduling",
    copy:
      "Hourly, daily, or 24-hour care options tailored to your specific needs and lifestyle requirements.",
    img:
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=1200&q=80",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#2563eb]" aria-hidden>
        <path fill="currentColor" d="M7 2v2H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2h-2V2h-2v2H9V2H7zm12 6H5v10h14V8z" />
      </svg>
    ),
  },
  {
    title: "Live-In Care",
    copy:
      "Continuous in-home support providing round-the-clock care and companionship in the comfort of your own home.",
    img:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#2563eb]" aria-hidden>
        <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
  },
  {
    title: "Transport & Escort",
    copy:
      "Safe and reliable transportation services to appointments, social events, and other important destinations.",
    img:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#2563eb]" aria-hidden>
        <path fill="currentColor" d="M18 8h-1V6c0-2.76-2.24-5-5-5s-5 2.24-5 5v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6-2c1.66 0 3 1.34 3 3v2h-6V9c0-1.66 1.34-3 3-3z" />
      </svg>
    ),
  },
  {
    title: "Respite Care",
    copy:
      "Family relief services that provide consistent client comfort, giving caregivers a well-deserved break.",
    img:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#2563eb]" aria-hidden>
        <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-2.12-2.66c-.3-.38-.85-.42-1.24-.12-.37.3-.42.84-.12 1.23l2.83 3.53c.3.38.84.39 1.23.09l3.46-4.46c.37-.48.09-1.18-.39-1.54-.46-.36-1.16-.15-1.52.38z" />
      </svg>
    ),
  },
];

export default function ServicesCarousel() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  const count = services.length;

  const slide = (dir: 1 | -1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const slideEls = Array.from(scroller.querySelectorAll<HTMLElement>("[data-slide]"));
    if (!slideEls.length) return;
    const next = Math.max(0, Math.min(count - 1, active + dir));
    const el = slideEls[next];
    // Adjust scroll position to account for left padding
    scroller.scrollTo({ left: el.offsetLeft - 16, behavior: "smooth" });
    setActive(next);
  };

  // keep active in sync on manual scroll
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const onScroll = () => {
      const slideEls = Array.from(scroller.querySelectorAll<HTMLElement>("[data-slide]"));
      const center = scroller.scrollLeft + scroller.clientWidth / 2;
      let nearest = 0;
      let minDelta = Number.POSITIVE_INFINITY;
      slideEls.forEach((el, i) => {
        const mid = el.offsetLeft + el.clientWidth / 2;
        const d = Math.abs(mid - center);
        if (d < minDelta) {
          minDelta = d;
          nearest = i;
        }
      });
      setActive(nearest);
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative">
      <div className="relative md:flex md:items-center md:gap-4">
        <button
          aria-label="Previous"
          onClick={() => slide(-1)}
          className="hidden md:grid absolute left-2 top-1/2 z-20 -translate-y-1/2 h-12 w-12 place-content-center rounded-full bg-white shadow-lg text-[#2c254c] hover:text-[#2563eb] transition-all duration-300 hover:scale-110 hover:shadow-xl border-2 border-transparent hover:border-[#2563eb]/20"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden><path fill="currentColor" d="M15 19l-7-7 7-7 1.4 1.4L10.8 12l5.6 5.6L15 19z"/></svg>
        </button>
        <button
          aria-label="Next"
          onClick={() => slide(1)}
          className="hidden md:grid absolute right-2 top-1/2 z-20 -translate-y-1/2 h-12 w-12 place-content-center rounded-full bg-[#2563eb] text-white shadow-lg hover:bg-[#1e40af] transition-all duration-300 hover:scale-110 hover:shadow-xl"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden><path fill="currentColor" d="M9 5l7 7-7 7-1.4-1.4L14.2 12 7.6 6.4 9 5z"/></svg>
        </button>

        <div
          ref={scrollerRef}
          className="scrollbar-none relative mx-auto max-w-7xl snap-x snap-mandatory overflow-x-auto pl-4 pr-0 pb-4 pt-2 flex-1"
        >
          <div className="flex gap-4 sm:gap-6 md:gap-8 pr-4">
            {services.map((s, i) => (
              <article
                key={s.title}
                data-slide
                className="group snap-start shrink-0 w-[85%] sm:w-[75%] md:w-[48%] xl:w-[32%]"
              >
                <div className="relative h-full pb-8">
                  <div className="h-60 overflow-hidden rounded-3xl">
                    <img
                      src={s.img}
                      alt={s.title}
                      className="service-image h-full w-full object-cover"
                    />
                  </div>
                  <div className="relative mx-6 -mt-16 rounded-3xl bg-gradient-to-br from-[#e6f0ff] via-white to-white px-8 pb-8 pt-12 shadow-[0_25px_60px_-35px_rgba(37,99,235,0.55)] transition-all duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:shadow-[0_30px_70px_-40px_rgba(37,99,235,0.6)] border border-transparent group-hover:border-[#dbeafe]">
                    <div className="absolute -top-8 left-8 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#e6f0ff] text-[#2563eb] shadow-[0_12px_25px_-12px_rgba(37,99,235,0.6)]">
                      {s.icon}
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <h3 className="text-2xl font-semibold text-[#2c254c] transition-colors duration-300 group-hover:text-[#2563eb]">{s.title}</h3>
                        <p className="text-sm leading-6 text-[#4f4865] transition-opacity duration-300 group-hover:opacity-90">{s.copy}</p>
                      </div>
                      <a
                        href="#"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563eb] hover:text-[#1e40af] hover:underline underline-offset-4 transition-all duration-300 group"
                      >
                        View service
                        <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"><path fill="currentColor" d="M13 5l-1.4 1.4 4.2 4.1H5v2h10.8l-4.2 4.1L13 18l7-7-7-6z"/></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="mt-6 flex justify-center gap-2">
        {services.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => {
              const scroller = scrollerRef.current;
              if (!scroller) return;
              const el = scroller.querySelectorAll<HTMLElement>("[data-slide]")[i];
              // Adjust scroll position to account for left padding
              if (el) scroller.scrollTo({ left: el.offsetLeft - 16, behavior: "smooth" });
              setActive(i);
            }}
            className={
              "h-3 w-3 rounded-full transition-all duration-300 " +
              (i === active ? "bg-[#2563eb] shadow-md scale-125" : "bg-[#dbeafe] hover:bg-[#2563eb] hover:scale-110")
            }
          />
        ))}
      </div>

      {/* Mobile Arrow Buttons - Below carousel */}
      <div className="md:hidden mt-6 flex justify-center gap-4">
        <button
          aria-label="Previous"
          onClick={() => slide(-1)}
          className="grid h-12 w-12 place-content-center rounded-full bg-white shadow-lg text-[#2c254c] hover:text-[#2563eb] transition-all duration-300 hover:scale-110 hover:shadow-xl border-2 border-transparent hover:border-[#2563eb]/20"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden><path fill="currentColor" d="M15 19l-7-7 7-7 1.4 1.4L10.8 12l5.6 5.6L15 19z"/></svg>
        </button>
        <button
          aria-label="Next"
          onClick={() => slide(1)}
          className="grid h-12 w-12 place-content-center rounded-full bg-[#2563eb] text-white shadow-lg hover:bg-[#1e40af] transition-all duration-300 hover:scale-110 hover:shadow-xl"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden><path fill="currentColor" d="M9 5l7 7-7 7-1.4-1.4L14.2 12 7.6 6.4 9 5z"/></svg>
        </button>
      </div>

      {/* CTA buttons */}
      <div className="mt-10 flex items-center justify-center gap-4">
        <a href="#plans" className="rounded-full bg-[#2563eb] px-8 py-4 text-sm font-semibold text-white shadow-lg hover:bg-[#1e40af] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">Browse plans</a>
        <a href="#" className="rounded-full border-2 border-[#dbeafe] bg-white px-8 py-4 text-sm font-semibold text-[#2c254c] shadow-md hover:border-[#2563eb] hover:bg-[#e6f0ff] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">Browse services</a>
      </div>
    </div>
  );
}
