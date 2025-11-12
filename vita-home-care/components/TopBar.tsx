import React from "react";

export default function TopBar() {
  return (
    <div className="w-full bg-[#efe9fb] text-sm text-[#3b3060]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 flex-wrap gap-2 md:gap-0">
        <div className="flex flex-wrap items-center gap-3 md:gap-6 text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <span className="text-xs">✉️</span>
            <a href="mailto:contact@elderlycare.com" className="hover:underline truncate">
              contact@elderlycare.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs">📞</span>
            <a href="tel:2534561189" className="hover:underline whitespace-nowrap">
              (253) 456 - 1189
            </a>
          </div>
        </div>
        <div className="flex items-center gap-3 md:gap-4 text-[#4c3c88]">
          {socialIcons.map(icon => (
            <a
              key={icon.label}
              href={icon.href}
              aria-label={icon.label}
              className="transition-colors hover:text-[#6d55d9]"
            >
              {icon.svg}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

const iconClass = "h-4 w-4 fill-current";

const socialIcons = [
  {
    label: "Facebook",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden="true">
        <path d="M13.5 9H16V6h-2.5A3.5 3.5 0 0010 9.5V11H8v3h2v6h3v-6h2.1l.4-3H13v-1.5c0-.3.2-.5.5-.5z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden="true">
        <path d="M8 19c7.2 0 11.3-6 11.3-11.3v-.5A8 8 0 0021 5.5a7.7 7.7 0 01-2.2.6 3.8 3.8 0 001.7-2.1 7.6 7.6 0 01-2.4.9A3.8 3.8 0 0012 8.9a10.8 10.8 0 01-7.8-4 3.8 3.8 0 001.2 5.1 3.7 3.7 0 01-1.7-.5v.1a3.8 3.8 0 003 3.7 3.8 3.8 0 01-1.7.1 3.8 3.8 0 003.6 2.7A7.7 7.7 0 014 17.5 10.8 10.8 0 008 19" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden="true">
        <path d="M16.5 3h-9A4.5 4.5 0 003 7.5v9A4.5 4.5 0 007.5 21h9a4.5 4.5 0 004.5-4.5v-9A4.5 4.5 0 0016.5 3zm3 13.5a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9a3 3 0 013-3h9a3 3 0 013 3v9z" />
        <path d="M12 8a4 4 0 100 8 4 4 0 000-8zm0 6.5A2.5 2.5 0 119 12a2.5 2.5 0 013 2.5zM16.75 7.25a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden="true">
        <path d="M21.8 8.2A2.8 2.8 0 0019.9 6C18 5.6 12 5.6 12 5.6s-6 0-7.9.4A2.8 2.8 0 001.8 8.2 29 29 0 001.4 12a29 29 0 00.4 3.8 2.8 2.8 0 001.9 2.2c1.9.4 7.9.4 7.9.4s6 0 7.9-.4a2.8 2.8 0 001.9-2.2 29 29 0 00.4-3.8 29 29 0 00-.4-3.8zM10 15V9l5 3-5 3z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden="true">
        <path d="M6.5 9h2.7v9H6.5zM7.9 6.3a1.6 1.6 0 110 3.3 1.6 1.6 0 010-3.3zM18 9.1c-1.2 0-2 .6-2.4 1.3v-1h-2.7v9h2.7v-5.1c0-.9.6-1.6 1.5-1.6.9 0 1.3.6 1.3 1.6v5h2.7v-5.3c0-2.3-1-3.9-3.1-3.9z" />
      </svg>
    ),
  },
];
