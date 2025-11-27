import Link from 'next/link';
import { getAllTestimonials } from '@/lib/data/testimonials';
import DeleteTestimonialButton from '@/components/admin/DeleteTestimonialButton';
import TogglePublishButton from '@/components/admin/TogglePublishTestimonial';

export default async function TestimonialsPage() {
  const testimonials = await getAllTestimonials();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6f0ff] via-white to-[#f2f7ff]">
      {/* Header */}
      <header className="bg-white border-b border-[#dbeafe] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-onest font-bold text-[#2c254c]">
                Manage Testimonials
              </h1>
              <p className="text-sm text-[#4f4865] font-onest mt-1">
                Create, edit, and manage customer testimonials
              </p>
            </div>
            <Link
              href="/admin/dashboard"
              className="text-sm text-[#1450d1] hover:text-[#3e5ab7] font-onest font-medium"
            >
              ← Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Button */}
        <div className="mb-8">
          <Link
            href="/admin/testimonials/new"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1450d1] to-[#2563eb] text-white font-onest font-bold py-3 px-6 rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Testimonial
          </Link>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <p className="text-sm text-blue-800 font-onest">
              <strong>Total Testimonials:</strong> {testimonials.length}
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <p className="text-sm text-green-800 font-onest">
              <strong>Published:</strong> {testimonials.filter((t) => t.published).length}
            </p>
          </div>
        </div>

        {/* Testimonials List */}
        {testimonials.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#dbeafe] shadow-sm p-8 text-center">
            <svg className="h-12 w-12 text-[#dbeafe] mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            <p className="text-[#4f4865] font-onest">No testimonials found. Create one to get started.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-xl border border-[#dbeafe] shadow-sm hover:shadow-md transition-all duration-300 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {testimonial.avatar_url && (
                        <img
                          src={testimonial.avatar_url}
                          alt={testimonial.name}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <h3 className="text-lg font-onest font-bold text-[#2c254c]">
                          {testimonial.name}
                        </h3>
                        {testimonial.location && (
                          <p className="text-sm text-[#4f4865] font-onest">
                            {testimonial.location}
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-[#6b7280] font-onest italic mb-3 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    {testimonial.attribution && (
                      <p className="text-xs text-[#9ca3af] font-onest">
                        Photo: {testimonial.attribution}
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-onest font-medium ${
                        testimonial.published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {testimonial.published ? '✓ Published' : '○ Hidden'}
                    </span>
                  </div>
                </div>

                <div className="border-t border-[#dbeafe] pt-4 flex items-center justify-end gap-3">
                  <TogglePublishButton
                    testimonialId={testimonial.id}
                    isPublished={testimonial.published}
                  />
                  <Link
                    href={`/admin/testimonials/${testimonial.id}/edit`}
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm font-onest font-semibold text-[#1450d1] hover:bg-[#e0e7ff] rounded-lg transition-colors"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </Link>
                  <DeleteTestimonialButton
                    testimonialId={testimonial.id}
                    testimonialName={testimonial.name}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
