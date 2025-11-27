'use client';

import { useRouter } from 'next/navigation';
import TestimonialForm from './TestimonialForm';
import { Testimonial } from '@/lib/data/testimonials';

interface EditTestimonialClientProps {
  testimonial: Testimonial;
}

export default function EditTestimonialClient({ testimonial }: EditTestimonialClientProps) {
  const router = useRouter();

  return (
    <TestimonialForm
      testimonial={testimonial}
      onSubmit={() => {
        router.push('/admin/testimonials');
      }}
    />
  );
}
