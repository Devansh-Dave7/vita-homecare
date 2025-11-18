import React from "react";

export default function InfoCards() {
  return (
    <div className="relative z-10 -mt-32 pb-20">
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="rounded-2xl border border-[#dbeafe] bg-white/95 shadow-[0_20px_60px_-15px_rgba(37,99,235,0.25)] backdrop-blur supports-[backdrop-filter]:bg-white">
          <div className="grid divide-y divide-[#dbeafe] md:grid-cols-3 md:divide-x md:divide-y-0">
            {cards.map(card => (
              <div key={card.title} className="flex flex-col gap-6 p-10 md:p-12">
                <div className="flex items-center gap-5">
                  <span className="grid h-16 w-16 place-content-center rounded-2xl bg-gradient-to-br from-[#e6f0ff] to-[#f2f7ff] text-[#2563eb] shadow-lg">
                    {card.icon}
                  </span>
                  <div>
                    <h3 className="text-xl font-onest font-bold text-[#2c254c]">{card.title}</h3>
                    <p className="mt-2 text-base font-onest font-medium text-[#4f4865]">{card.detail}</p>
                  </div>
                </div>
                <a
                  href={card.href}
                  className="mt-auto inline-flex items-center gap-3 text-base font-onest font-bold text-[#1450d1] hover:text-[#3e5ab7] transition-all duration-300 group hover:scale-105"
                >
                  {card.cta}
                  <svg viewBox="0 0 24 24" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                    <path fill="currentColor" d="M13 5l-1.4 1.4 4.2 4.1H5v2h10.8l-4.2 4.1L13 18l7-7-7-6z" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const iconClass = "h-8 w-8";

const cards = [
  {
    title: "Call us",
    detail: "+44 7542 532477",
    cta: "Make us a call",
    href: "tel:7542532477",
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass}>
        <path
          fill="currentColor"
          d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"
        />
      </svg>
    ),
  },
  {
    title: "Email us",
    detail: "contact@vitahomecare.com",
    cta: "Send us a email",
    href: "mailto:contact@vitahomecare.com",
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass}>
        <path
          fill="currentColor"
          d="M4 6c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2H4zm0 2l8 5 8-5v2l-8 5-8-5V8z"
        />
      </svg>
    ),
  },
  {
    title: "Visit us",
    detail: "Lusaka, Zambia",
    cta: "View our locations",
    href: "#locations",
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass}>
        <path
          fill="currentColor"
          d="M12 3a7 7 0 00-7 7c0 5.2 6.1 10.3 6.4 10.6.3.2.9.2 1.2 0 .3-.3 6.4-5.4 6.4-10.6a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"
        />
      </svg>
    ),
  },
];
