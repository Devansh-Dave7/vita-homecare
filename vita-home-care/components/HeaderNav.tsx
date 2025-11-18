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
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 overflow-x-hidden">
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/" className="inline-block shrink-0">
            <img
              src="/new logo 3.svg"
              alt="Vita Homecare"
              className="w-auto h-8 sm:h-10 md:h-14 lg:h-16"
              style={{ minWidth: '120px', maxWidth: '100%' }}
            />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav aria-label="Main" className="hidden md:flex items-center gap-10 text-base font-onest font-semibold text-[#11296b]">
          {navItems.map(item => {
            if (item === "Home") {
              return <Link key={item} href="/" className="hover:text-[#2563eb] transition-colors duration-300">{item}</Link>;
            }
            if (item === "About") {
              return <Link key={item} href="/about" className="hover:text-[#2563eb] transition-colors duration-300">{item}</Link>;
            }
            if (item === "Services") {
              return <Link key={item} href="/services" className="hover:text-[#2563eb] transition-colors duration-300">{item}</Link>;
            }
            if (item === "Contact Us") {
              return <Link key={item} href="/contact" className="hover:text-[#2563eb] transition-colors duration-300">{item}</Link>;
            }
            return <a key={item} href="#" className="hover:text-[#2563eb] transition-colors duration-300">{item}</a>;
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-[#11296b] hover:text-[#2563eb] focus:outline-none shrink-0"
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
            if (item === "Home") {
              return (
                <Link
                  key={item}
                  href="/"
                  className="block py-3 text-base font-onest font-semibold text-[#1e3a8a] hover:text-[#2563eb] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              );
            }
            if (item === "About") {
              return (
                <Link
                  key={item}
                  href="/about"
                  className="block py-3 text-base font-onest font-semibold text-[#1e3a8a] hover:text-[#2563eb] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              );
            }
            if (item === "Services") {
              return (
                <Link
                  key={item}
                  href="/services"
                  className="block py-3 text-base font-onest font-semibold text-[#1e3a8a] hover:text-[#2563eb] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              );
            }
            if (item === "Contact Us") {
              return (
                <Link
                  key={item}
                  href="/contact"
                  className="block py-3 text-base font-onest font-semibold text-[#1e3a8a] hover:text-[#2563eb] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              );
            }
            return (
              <a
                key={item}
                href="#"
                className="block py-3 text-base font-onest font-semibold text-[#1e3a8a] hover:text-[#2563eb] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            );
          })}
        </div>
      </nav>
    </header>
  );
}

const navItems = ["Home", "About", "Services", "Blog", "Contact Us"];
