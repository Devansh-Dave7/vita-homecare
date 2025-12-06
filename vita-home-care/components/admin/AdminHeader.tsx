'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from '@/lib/auth/actions';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Settings, 
  LogOut,
  ChevronDown,
  Quote,
  Briefcase,
  Info
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function AdminHeader({ userEmail }: { userEmail?: string }) {
  const pathname = usePathname();
  const [isContentOpen, setIsContentOpen] = useState(false);
  const [isInquiriesOpen, setIsInquiriesOpen] = useState(false);
  
  const contentRef = useRef<HTMLDivElement>(null);
  const inquiriesRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => pathname?.startsWith(path);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
        setIsContentOpen(false);
      }
      if (inquiriesRef.current && !inquiriesRef.current.contains(event.target as Node)) {
        setIsInquiriesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/admin/dashboard" className="text-xl font-bold text-blue-600 tracking-tight">
                Vita Admin
              </Link>
            </div>
            <nav className="hidden sm:ml-8 sm:flex sm:space-x-8">
              <Link
                href="/admin/dashboard"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                  pathname === '/admin/dashboard'
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </Link>

              {/* Content Dropdown */}
              <div className="relative inline-flex items-center" ref={contentRef}>
                <button
                  onClick={() => setIsContentOpen(!isContentOpen)}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    isActive('/admin/blogs') || isActive('/admin/services') || isActive('/admin/testimonials') || isActive('/admin/about')
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Content
                  <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isContentOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isContentOpen && (
                  <div className="absolute top-full left-0 w-56 bg-white shadow-lg rounded-lg py-2 border border-gray-100 mt-1 animate-in fade-in zoom-in-95 duration-100">
                    <Link 
                      href="/admin/blogs" 
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                      onClick={() => setIsContentOpen(false)}
                    >
                      <FileText className="w-4 h-4 mr-3 text-gray-400" /> Blogs
                    </Link>
                    <Link 
                      href="/admin/services" 
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                      onClick={() => setIsContentOpen(false)}
                    >
                      <Briefcase className="w-4 h-4 mr-3 text-gray-400" /> Services
                    </Link>
                    <Link 
                      href="/admin/testimonials" 
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                      onClick={() => setIsContentOpen(false)}
                    >
                      <Quote className="w-4 h-4 mr-3 text-gray-400" /> Testimonials
                    </Link>
                    <Link 
                      href="/admin/about" 
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                      onClick={() => setIsContentOpen(false)}
                    >
                      <Info className="w-4 h-4 mr-3 text-gray-400" /> About Page
                    </Link>
                  </div>
                )}
              </div>

              {/* Inquiries Dropdown */}
              <div className="relative inline-flex items-center" ref={inquiriesRef}>
                <button
                  onClick={() => setIsInquiriesOpen(!isInquiriesOpen)}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    isActive('/admin/contact-submissions') || isActive('/admin/inquiry-submissions')
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Inquiries
                  <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isInquiriesOpen ? 'rotate-180' : ''}`} />
                </button>

                {isInquiriesOpen && (
                  <div className="absolute top-full left-0 w-60 bg-white shadow-lg rounded-lg py-2 border border-gray-100 mt-1 animate-in fade-in zoom-in-95 duration-100">
                    <Link 
                      href="/admin/contact-submissions" 
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                      onClick={() => setIsInquiriesOpen(false)}
                    >
                      <MessageSquare className="w-4 h-4 mr-3 text-gray-400" /> Contact Submissions
                    </Link>
                    <Link 
                      href="/admin/inquiry-submissions" 
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                      onClick={() => setIsInquiriesOpen(false)}
                    >
                      <Briefcase className="w-4 h-4 mr-3 text-gray-400" /> Service Inquiries
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/admin/settings"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                  isActive('/admin/settings')
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-4">
              <span className="text-sm text-gray-600 hidden md:block">{userEmail}</span>
              <form action={signOut} className="inline-block">
                <button
                  type="submit"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
