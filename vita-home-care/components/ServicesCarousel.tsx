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
    title: "Home care",
    copy:
      "Elit amet enim, pretium consequat lectus odio ut sed enim level adipiscing sed aliquam craset.",
    img:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#6d55d9]" aria-hidden>
        <path fill="currentColor" d="M12 3l9 8h-2v9h-6v-6H11v6H5v-9H3l9-8z" />
      </svg>
    ),
  },
  {
    title: "Special needs care",
    copy:
      "Elit amet enim, pretium consequat lectus odio ut sed enim level adipiscing sed aliquam craset.",
    img:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#6d55d9]" aria-hidden>
        <path fill="currentColor" d="M12 2a5 5 0 015 5v2h1a3 3 0 013 3v8h-6v-5h-2v5H4v-8a3 3 0 013-3h1V7a5 5 0 015-5z" />
      </svg>
    ),
  },
  {
    title: "Memory care",
    copy:
      "Elit amet enim, pretium consequat lectus odio ut sed enim level adipiscing sed aliquam craset.",
    img:
      "https://images.unsplash.com/photo-1519836711297-92967f05a356?auto=format&fit=crop&w=1200&q=80",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#6d55d9]" aria-hidden>
        <path fill="currentColor" d="M17 7a5 5 0 00-9.7-1.4A5 5 0 007 16h1v2a2 2 0 002 2h4a2 2 0 002-2v-2h1a5 5 0 000-10z" />
      </svg>
    ),
  },
  {
    title: "Weekly activities",
    copy:
      "Elit amet enim, pretium consequat lectus odio ut sed enim level adipiscing sed aliquam craset.",
    img:
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=1200&q=80",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#6d55d9]" aria-hidden>
        <path fill="currentColor" d="M7 2v2H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2h-2V2h-2v2H9V2H7zm12 6H5v10h14V8z" />
      </svg>
    ),
  },
  {
    title: "Exercise care",
    copy:
      "Elit amet enim, pretium consequat lectus odio ut sed enim level adipiscing sed aliquam craset.",
    img:
      "https://images.unsplash.com/photo-1549575810-1578b5d94c1b?auto=format&fit=crop&w=1200&q=80",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#6d55d9]" aria-hidden>
        <path fill="currentColor" d="M17 2l-5 5 2 2 5-5-2-2zM2 17l5-5 2 2-5 5-2-2zm7-4l6 6 5-5-6-6-5 5z" />
      </svg>
    ),
  },
  {
    title: "Nutrition care",
    copy:
      "Elit amet enim, pretium consequat lectus odio ut sed enim level adipiscing sed aliquam craset.",
    img:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#6d55d9]" aria-hidden>
        <path fill="currentColor" d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7zm0 9.5A2.5 2.5 0 119.5 9 2.5 2.5 0 0112 11.5z" />
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
      <div className="relative">
        <button
          aria-label="Previous"
          onClick={() => slide(-1)}
          className="absolute left-2 top-1/2 z-20 -translate-y-1/2 grid h-12 w-12 place-content-center rounded-full bg-white shadow-lg text-[#2c254c] hover:text-[#6d55d9] transition-all duration-300 hover:scale-110 hover:shadow-xl border-2 border-transparent hover:border-[#6d55d9]/20"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden><path fill="currentColor" d="M15 19l-7-7 7-7 1.4 1.4L10.8 12l5.6 5.6L15 19z"/></svg>
        </button>
        <button
          aria-label="Next"
          onClick={() => slide(1)}
          className="absolute right-2 top-1/2 z-20 -translate-y-1/2 grid h-12 w-12 place-content-center rounded-full bg-[#6d55d9] text-white shadow-lg hover:bg-[#FFB3A3] transition-all duration-300 hover:scale-110 hover:shadow-xl"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden><path fill="currentColor" d="M9 5l7 7-7 7-1.4-1.4L14.2 12 7.6 6.4 9 5z"/></svg>
        </button>

        <div
          ref={scrollerRef}
          className="scrollbar-none relative mx-auto max-w-7xl snap-x snap-mandatory overflow-x-auto px-4 pb-4 pt-2"
        >
          <div className="flex gap-8 pr-8">
            {services.map((s, i) => (
              <article
                key={s.title}
                data-slide
                className="group snap-start shrink-0 w-[90%] sm:w-[70%] md:w-[48%] xl:w-[32%]"
              >
                <div className="relative h-full pb-8">
                  <div className="h-60 overflow-hidden rounded-3xl">
                    <img
                      src={s.img}
                      alt={s.title}
                      className="service-image h-full w-full object-cover"
                    />
                  </div>
                  <div className="relative mx-6 -mt-16 rounded-3xl bg-gradient-to-br from-[#f4f0ff] via-white to-white px-8 pb-8 pt-12 shadow-[0_25px_60px_-35px_rgba(93,70,176,0.55)] transition-all duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:shadow-[0_30px_70px_-40px_rgba(93,70,176,0.6)] border border-transparent group-hover:border-[#e7e0fb]">
                    <div className="absolute -top-8 left-8 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#efe9fb] text-[#6d55d9] shadow-[0_12px_25px_-12px_rgba(93,70,176,0.6)]">
                      {s.icon}
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <h3 className="text-2xl font-semibold text-[#2c254c] transition-colors duration-300 group-hover:text-[#6d55d9]">{s.title}</h3>
                        <p className="text-sm leading-6 text-[#4f4865] transition-opacity duration-300 group-hover:opacity-90">{s.copy}</p>
                      </div>
                      <a
                        href="#"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#6d55d9] hover:text-[#FFB3A3] hover:underline underline-offset-4 transition-all duration-300 group"
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
              if (el) scroller.scrollTo({ left: el.offsetLeft - 16, behavior: "smooth" });
              setActive(i);
            }}
            className={
              "h-3 w-3 rounded-full transition-all duration-300 " +
              (i === active ? "bg-[#6d55d9] shadow-md scale-125" : "bg-[#d8cff6] hover:bg-[#FFB3A3] hover:scale-110")
            }
          />
        ))}
      </div>

      {/* CTA buttons */}
      <div className="mt-10 flex items-center justify-center gap-4">
        <a href="#plans" className="rounded-full bg-[#6d55d9] px-8 py-4 text-sm font-semibold text-white shadow-lg hover:bg-[#FFB3A3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6d55d9] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">Browse plans</a>
        <a href="#" className="rounded-full border-2 border-[#e9e3f7] bg-white px-8 py-4 text-sm font-semibold text-[#2c254c] shadow-md hover:border-[#FFB3A3] hover:bg-[#FFB3A3]/10 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">Browse services</a>
      </div>
    </div>
  );
}
