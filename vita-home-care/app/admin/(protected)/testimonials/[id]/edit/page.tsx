import Link from 'next/link';
import EditTestimonialClient from '@/components/admin/EditTestimonialClient';
import { getTestimonialById } from '@/lib/data/testimonials';
import { notFound } from 'next/navigation';

interface EditTestimonialPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditTestimonialPage({ params }: EditTestimonialPageProps) {
  const { id } = await params;
  const testimonial = await getTestimonialById(id);

  if (!testimonial) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6f0ff] via-white to-[#f2f7ff]">
      {/* Header */}
      <header className="bg-white border-b border-[#dbeafe] shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-onest font-bold text-[#2c254c]">
                Edit Testimonial
              </h1>
              <p className="text-sm text-[#4f4865] font-onest mt-1">
                Update {testimonial.name}'s testimonial
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
          <EditTestimonialClient testimonial={testimonial} />
        </div>
      </main>
    </div>
  );
}
