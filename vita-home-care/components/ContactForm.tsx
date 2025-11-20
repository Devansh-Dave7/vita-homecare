'use client';

import { submitContactForm } from '@/lib/data/submissions';
import { useState } from 'react';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const formData = new FormData(event.currentTarget);

    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        setMessage({ type: 'success', text: 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.' });
        (event.target as HTMLFormElement).reset();
      } else {
        setMessage({ type: 'error', text: result.error || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {message && (
        <div
          className={`rounded-2xl p-4 ${
            message.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          <p className="text-sm font-onest">{message.text}</p>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            disabled={isSubmitting}
            className="w-full rounded-2xl border border-[#e5e7eb] bg-white px-3.5 py-2.5 text-sm text-[#111827] shadow-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#bfdbfe] disabled:opacity-50"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
            Phone number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            disabled={isSubmitting}
            className="w-full rounded-2xl border border-[#e5e7eb] bg-white px-3.5 py-2.5 text-sm text-[#111827] shadow-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#bfdbfe] disabled:opacity-50"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            disabled={isSubmitting}
            className="w-full rounded-2xl border border-[#e5e7eb] bg-white px-3.5 py-2.5 text-sm text-[#111827] shadow-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#bfdbfe] disabled:opacity-50"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="preferredTime" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
            Preferred time to reach you
          </label>
          <input
            id="preferredTime"
            name="preferredTime"
            type="text"
            placeholder="e.g. Weekday afternoons, 14:00–17:00"
            disabled={isSubmitting}
            className="w-full rounded-2xl border border-[#e5e7eb] bg-white px-3.5 py-2.5 text-sm text-[#111827] shadow-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#bfdbfe] disabled:opacity-50"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="serviceType" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
          What type of support are you looking for?
        </label>
        <select
          id="serviceType"
          name="serviceType"
          disabled={isSubmitting}
          className="w-full rounded-2xl border border-[#e5e7eb] bg-white px-3.5 py-2.5 text-sm text-[#111827] shadow-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#bfdbfe] disabled:opacity-50"
        >
          <option value="">Select an option</option>
          <option value="personal-care">Personal care</option>
          <option value="domestic-help">Domestic help</option>
          <option value="live-in-care">Live-in care</option>
          <option value="companionship">Companionship care</option>
          <option value="transport-escort">Transport &amp; escort</option>
          <option value="respite-care">Respite care</option>
          <option value="not-sure">I&apos;m not sure yet</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
          Tell us a bit about your situation
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          disabled={isSubmitting}
          className="w-full rounded-2xl border border-[#e5e7eb] bg-white px-3.5 py-2.5 text-sm text-[#111827] shadow-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#bfdbfe] disabled:opacity-50"
          placeholder="For example: who the care is for, where they live, and what kind of help you think they may need."
        />
      </div>

      <div className="space-y-3 rounded-2xl bg-[#f9fafb] px-4 py-3 text-[12px] text-[#4b5563]">
        <p>
          For detailed pricing and care planning, you can also use our inquiry form. The
          contact form here is ideal if you prefer a quick call-back or email first.
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center rounded-full bg-[#2563eb] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1d4ed8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2563eb] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : 'Send message'}
      </button>
    </form>
  );
}
