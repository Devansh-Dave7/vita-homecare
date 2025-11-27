'use client';

import { useState } from 'react';
import { toggleTestimonialPublished } from '@/lib/data/testimonials';
import { useRouter } from 'next/navigation';

interface TogglePublishButtonProps {
  testimonialId: string;
  isPublished: boolean;
}

export default function TogglePublishButton({
  testimonialId,
  isPublished,
}: TogglePublishButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleToggle() {
    setLoading(true);
    try {
      const result = await toggleTestimonialPublished(testimonialId, isPublished);
      if (result.success) {
        router.refresh();
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`inline-flex items-center gap-2 px-3 py-2 text-sm font-onest font-semibold rounded-lg transition-colors ${
        isPublished
          ? 'bg-green-100 text-green-700 hover:bg-green-200'
          : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
      } disabled:opacity-50`}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Updating...
        </>
      ) : (
        <>
          {isPublished ? (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Published
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.604-3.368A9.967 9.967 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.079 10.079 0 01-9.543 7c-4.377 0-8.12-2.807-9.404-6.569m0 0a6.008 6.008 0 011.532-5.581m0 0a6 6 0 018.306 8.306m5.532-5.581a6 6 0 10-8.306 8.306" />
              </svg>
              Hidden
            </>
          )}
        </>
      )}
    </button>
  );
}
