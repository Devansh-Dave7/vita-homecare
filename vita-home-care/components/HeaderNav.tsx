"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function HeaderNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when resizing to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white backdrop-blur supports-backdrop-filter:bg-white/95 shadow-lg border-b border-gray-200/50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="font-monorope font-bold text-2xl tracking-tight text-[#2c254c]">Vita Homecare</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav aria-label="Main" className="hidden md:flex items-center gap-10 text-base font-monorope font-semibold text-[#3e3566]">
          {navItems.map(item => {
            if (item === "Services") {
              return <Link key={item} href="/services" className="hover:text-[#6d55d9] transition-colors duration-300">{item}</Link>;
            } else {
              return <a key={item} href="#" className="hover:text-[#6d55d9] transition-colors duration-300">{item}</a>;
            }
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-[#3e3566] hover:text-[#6d55d9] focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <nav 
        className={`md:hidden bg-white border-t border-gray-200 overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0'
        }`}
      >
        <div className={`px-4 py-4 space-y-3 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-4'
        }`}>
          {navItems.map(item => {
            if (item === "Services") {
              return (
                <Link
                  key={item}
                  href="/services"
                  className="block py-3 text-base font-monorope font-semibold text-[#3e3566] hover:text-[#6d55d9] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              );
            } else {
              return (
                <a
                  key={item}
                  href="#"
                  className="block py-3 text-base font-monorope font-semibold text-[#3e3566] hover:text-[#6d55d9] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              );
            }
          })}
        </div>
      </nav>
    </header>
  );
}

function Logo() {
  return (
  <div className="h-8 w-8 rounded-full bg-linear-to-br from-[#a78bfa] to-[#6d55d9] flex items-center justify-center">
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 2l2.6 5.3L20 8.2l-4 3.9.9 5.6L12 15.9l-4.9 1.8.9-5.6-4-3.9 5.4-.9L12 2z"
        />
      </svg>
    </div>
  );
}

const navItems = ["Home", "About", "Services", "Blog", "Contact Us"];
