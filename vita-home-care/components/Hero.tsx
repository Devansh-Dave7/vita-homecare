import React from "react";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white pb-50 pt-12">
      <div className="absolute inset-0 -z-10">
        {/* Background hero image */}
        <img
          src="/new hero image.png"
          alt="Senior couple receiving compassionate care"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-white/40" />
      </div>
      <div className="mx-auto flex max-w-7xl flex-col px-4 lg:flex-row lg:items-center lg:gap-12">
        <div className="max-w-xl py-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2563eb]">Non-medical home care</p>
          <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#181322]">
            Best care for
            <br />
            your <span className="relative inline-block">
              loved ones
              <span className="absolute left-0 bottom-1 h-1 sm:h-1.5 w-full rounded bg-[#2563eb]" aria-hidden="true"></span>
            </span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-[#4a435d]">
            We provide non-medical home care through trained healthcare assistants and nurse assistants (not registered nurses). Our team offers
            personal care, companionship, and daily support&mdash;assisting with safe mobility, light domestic tasks, and
            medication reminders so your loved one can remain at home with confidence.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href="/inquiry"
              className="rounded-full bg-[#1d5be1] px-6 sm:px-8 py-3 sm:py-4 text-sm font-semibold text-white shadow-lg hover:bg-[#1e40af] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl whitespace-nowrap"
            >
              Browse plans
            </a>
            <button
              type="button"
              className="group inline-flex items-center gap-2 sm:gap-3 text-sm font-medium text-[#2c254c] hover:text-[#2563eb] transition-colors duration-300"
            >
              <span className="grid h-10 w-10 sm:h-12 sm:w-12 place-content-center rounded-full border-2 border-[#2563eb]/30 bg-white text-[#2563eb] shadow-md transition-all duration-300 group-hover:border-[#2563eb] group-hover:bg-[#2563eb] group-hover:text-white group-hover:scale-110 shrink-0">
                <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6 fill-current" aria-hidden="true">
                  <path d="M8 6v12l10-6-10-6z" />
                </svg>
              </span>
              <span className="whitespace-nowrap">Watch our video</span>
            </button>
          </div>
        </div>
        <div className="hidden lg:block lg:flex-1" />
      </div>
    </section>
  );
}
