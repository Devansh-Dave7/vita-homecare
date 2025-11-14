import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-[#efe9fb] to-[#e5dcf8] border-t border-[#d4c7f0]">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center text-center">
          
          {/* Phone Section */}
          <div className="flex flex-col items-center gap-3">
            <div className="h-16 w-16 rounded-full bg-[#6d55d9] flex items-center justify-center shadow-lg">
              <svg 
                viewBox="0 0 24 24" 
                className="h-8 w-8 fill-white"
                aria-hidden="true"
              >
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
              </svg>
            </div>
            <div>
              <a 
                href="tel:02393694551" 
                className="text-2xl font-bold text-[#2c254c] hover:text-[#6d55d9] transition-colors duration-300"
              >
                +44 1234567890
              </a>
            </div>
          </div>

          {/* Logo and Address Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="mb-2">
              <Image
                src="/logo.jpg"
                alt="Astercare - Care Without Compromise"
                width={200}
                height={60}
                className="h-auto w-auto max-w-[200px]"
                priority
              />
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="h-16 w-16 rounded-full bg-[#6d55d9] flex items-center justify-center shadow-lg mb-3">
                <svg 
                  viewBox="0 0 24 24" 
                  className="h-8 w-8 fill-white"
                  aria-hidden="true"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <p className="text-base font-semibold text-[#2c254c] leading-relaxed">
                382 lusaka Road, Chongwe , Portsmouth,
              </p>
              <p className="text-base font-semibold text-[#2c254c]">
                Hants, PO2 9SD
              </p>
            </div>
          </div>

          {/* Email Section */}
          <div className="flex flex-col items-center gap-3">
            <div className="h-16 w-16 rounded-full bg-[#6d55d9] flex items-center justify-center shadow-lg">
              <svg 
                viewBox="0 0 24 24" 
                className="h-8 w-8 fill-white"
                aria-hidden="true"
              >
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
            <div>
              <a 
                href="mailto:info@vitahomecare.com" 
                className="text-lg font-semibold text-[#2c254c] hover:text-[#6d55d9] transition-colors duration-300 break-all"
              >
                info@vitahomecare.com
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-[#d4c7f0]">
          <p className="text-center text-sm text-[#4a435d]">
            © {new Date().getFullYear()} Astercare. All rights reserved. | Care Without Compromise
          </p>
        </div>
      </div>
    </footer>
  );
}
