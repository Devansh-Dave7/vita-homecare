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
    <header className="w-full bg-white/90 backdrop-blur supports-backdrop-filter:bg-white/80 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="font-semibold text-lg tracking-tight text-[#2c254c]">ElderlyCare X</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav aria-label="Main" className="hidden md:flex items-center gap-8 text-sm font-medium text-[#3e3566]">
          {navItems.map(item => (
            <a key={item} href="#" className="hover:text-[#6d55d9] transition-colors">
              {item}
            </a>
          ))}
          <button className="relative -ml-2 flex items-center gap-1 hover:text-[#6d55d9]">
            <span>Pages</span>
            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4">
              <path fill="currentColor" d="M5.5 7l4.5 5 4.5-5H5.5z" />
            </svg>
          </button>
          <Link href="/services" className="hover:text-[#6d55d9]">Services</Link>
          <a href="#" className="hover:text-[#6d55d9]">Cart(0)</a>
          <a
            href="#plans"
            className="rounded-full bg-[#6d55d9] px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-[#FFB3A3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6d55d9] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
          >
            Browse plans
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-[#3e3566] hover:text-[#6d55d9] focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3 space-y-3">
            {navItems.map(item => (
              <a
                key={item}
                href="#"
                className="block py-2 text-sm font-medium text-[#3e3566] hover:text-[#6d55d9] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button className="w-full text-left py-2 flex items-center gap-1 text-sm font-medium text-[#3e3566] hover:text-[#6d55d9]">
              <span>Pages</span>
              <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4">
                <path fill="currentColor" d="M5.5 7l4.5 5 4.5-5H5.5z" />
              </svg>
            </button>
            <Link
              href="/services"
              className="block py-2 text-sm font-medium text-[#3e3566] hover:text-[#6d55d9] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <a
              href="#"
              className="block py-2 text-sm font-medium text-[#3e3566] hover:text-[#6d55d9] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Cart(0)
            </a>
            <a
              href="#plans"
              className="block w-full text-center rounded-full bg-[#6d55d9] px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-[#FFB3A3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6d55d9] transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Browse plans
            </a>
          </div>
        </nav>
      )}
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

const navItems = ["Home", "About", "Blog"]; // plus Pages, Services, Cart handled separately
