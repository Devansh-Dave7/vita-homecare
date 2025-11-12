import React from "react";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white pb-50 pt-12">
      <div className="absolute inset-0 -z-10">
        {/* Background hero image */}
        <img
          src="/hero image.jpg"
          alt="Senior couple receiving compassionate care"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-white/40" />
      </div>
      <div className="mx-auto flex max-w-7xl flex-col px-4 lg:flex-row lg:items-center lg:gap-12">
        <div className="max-w-xl py-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6d55d9]">Senior Care Services</p>
          <h1 className="mt-5 text-5xl font-bold leading-tight text-[#181322]">
            Best elder care for
            <br />
            your <span className="relative inline-block">
              loved ones
              <span className="absolute left-0 bottom-1 h-[6px] w-full rounded bg-[#6d55d9]" aria-hidden="true"></span>
            </span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-[#4a435d]">
            Elit amet enim, pretium consequat lectus odio ut sed enim at leo, vel, adipiscing orci, sed aliquam cras et,
            gravida elementum non egestas suspendisse felis morbi tempus morbi magna ultrices.
          </p>
          <div className="mt-8 flex items-center gap-6">
            <a
              href="#plans"
              className="rounded-full bg-[#6d55d9] px-8 py-4 text-sm font-semibold text-white shadow-lg hover:bg-[#FFB3A3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6d55d9] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
            >
              Browse plans
            </a>
            <button
              type="button"
              className="group inline-flex items-center gap-3 text-sm font-medium text-[#2c254c] hover:text-[#6d55d9] transition-colors duration-300"
            >
              <span className="grid h-12 w-12 place-content-center rounded-full border-2 border-[#6d55d9]/30 bg-white text-[#6d55d9] shadow-md transition-all duration-300 group-hover:border-[#6d55d9] group-hover:bg-[#FFB3A3] group-hover:text-white group-hover:scale-110">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
                  <path d="M8 6v12l10-6-10-6z" />
                </svg>
              </span>
              Watch our video
            </button>
          </div>
        </div>
        <div className="hidden lg:block lg:flex-1" />
      </div>
    </section>
  );
}
