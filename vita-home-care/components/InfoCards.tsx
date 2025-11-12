import React from "react";

export default function InfoCards() {
  return (
    <div className="relative z-10 -mt-32 pb-16">
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="rounded-xl border border-[#ece7f9] bg-white/90 shadow-[0_8px_24px_-8px_rgba(93,70,176,0.15)] backdrop-blur supports-[backdrop-filter]:bg-white">
          <div className="grid divide-y divide-[#e9e3f7] md:grid-cols-3 md:divide-x md:divide-y-0">
            {cards.map(card => (
              <div key={card.title} className="flex flex-col gap-4 p-8 md:p-10">
                <div className="flex items-center gap-4">
                  <span className="grid h-14 w-14 place-content-center rounded-full bg-[#efe9fb] text-[#6d55d9]">
                    {card.icon}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-[#2c254c]">{card.title}</h3>
                    <p className="mt-1 text-sm text-[#4f4865]">{card.detail}</p>
                  </div>
                </div>
                <a
                  href={card.href}
                  className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#6d55d9] hover:text-[#FFB3A3] transition-all duration-300 group"
                >
                  {card.cta}
                  <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
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

const iconClass = "h-7 w-7";

const cards = [
  {
    title: "Call us",
    detail: "(414) 850 - 0417",
    cta: "Make us a call",
    href: "tel:4148500417",
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass}>
        <path
          fill="currentColor"
          d="M6.6 3c-.9 0-1.6.7-1.6 1.6C4.4 11 13 19.6 19.4 19.6c.9 0 1.6-.7 1.6-1.6v-2.7c0-.9-.7-1.6-1.6-1.6-1.8 0-3.5-.3-5.1-1-.5-.2-1.2-.1-1.5.3l-1.6 1.6c-2.5-1.3-4.6-3.4-5.9-5.9l1.6-1.6c.4-.4.6-1 .3-1.5-.7-1.6-1-3.3-1-5.1C8.2 3.7 7.5 3 6.6 3z"
        />
      </svg>
    ),
  },
  {
    title: "Email us",
    detail: "contact@elderlycare.com",
    cta: "Send us a email",
    href: "mailto:contact@elderlycare.com",
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
    detail: "8400 Division Ave Staten Island, NY 10314",
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
