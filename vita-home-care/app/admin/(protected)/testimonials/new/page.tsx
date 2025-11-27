'use client';

import Link from 'next/link';
import TestimonialForm from '@/components/admin/TestimonialForm';

export default function NewTestimonialPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6f0ff] via-white to-[#f2f7ff]">
      {/* Header */}
      <header className="bg-white border-b border-[#dbeafe] shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-onest font-bold text-[#2c254c]">
                Create New Testimonial
              </h1>
              <p className="text-sm text-[#4f4865] font-onest mt-1">
                Add a new customer testimonial
              </p>
            </div>
            <Link
              href="/admin/testimonials"
              className="text-sm text-[#1450d1] hover:text-[#3e5ab7] font-onest font-medium"
            >
              ← Back
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl border border-[#dbeafe] shadow-sm p-8">
          <TestimonialForm
            onSubmit={() => {
              window.location.href = '/admin/testimonials';
            }}
          />
        </div>
      </main>
    </div>
  );
}
