'use client';

import { submitInquiryForm } from '@/lib/data/submissions';
import { useState } from 'react';

export default function InquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const formData = new FormData(event.currentTarget);

    try {
      const result = await submitInquiryForm(formData);

      if (result.success) {
        setMessage({ 
          type: 'success', 
          text: 'Thank you! Your inquiry has been received. Our team will review it and get back to you soon with personalized care options and pricing guidance.' 
        });
        (event.target as HTMLFormElement).reset();
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <form className="space-y-10" onSubmit={handleSubmit}>
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

      {/* Section 1: Your Details */}
      <section aria-labelledby="your-details-heading" className="space-y-6 rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] p-6 md:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 id="your-details-heading" className="text-lg md:text-xl font-semibold text-[#181322]">
              1. Your details
            </h2>
            <p className="mt-1 text-sm text-[#6b7280]">Tell us how we can reach you.</p>
          </div>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2563eb]">Required</span>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <label htmlFor="fullName" className="mb-1 block text-sm font-semibold text-[#111827]">
              Full name <span className="text-red-500">*</span>
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              disabled={isSubmitting}
              className="block w-full rounded-xl border border-[#d1d5db] bg-white px-3.5 py-2.5 text-sm text-[#111827] shadow-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/30 disabled:opacity-50"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-semibold text-[#111827]">
              Email address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              disabled={isSubmitting}
              className="block w-full rounded-xl border border-[#d1d5db] bg-white px-3.5 py-2.5 text-sm text-[#111827] shadow-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/30 disabled:opacity-50"
            />
          </div>

          <div>
            <label htmlFor="phone" className="mb-1 block text-sm font-semibold text-[#111827]">
              Phone number <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              disabled={isSubmitting}
              className="block w-full rounded-xl border border-[#d1d5db] bg-white px-3.5 py-2.5 text-sm text-[#111827] shadow-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/30 disabled:opacity-50"
            />
          </div>
        </div>
      </section>

      {/* Section 2: Care Information */}
      <section aria-labelledby="care-info-heading" className="space-y-6 rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] p-6 md:p-8">
        <div>
          <h2 id="care-info-heading" className="text-lg md:text-xl font-semibold text-[#181322]">
            2. Care information
          </h2>
          <p className="mt-1 text-sm text-[#6b7280]">
            Help us understand who needs support and what prompted your inquiry.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label htmlFor="address" className="mb-1 block text-sm font-semibold text-[#111827]">
              Residential area / address <span className="text-red-500">*</span>
            </label>
            <input
              id="address"
              name="address"
              type="text"
              required
              disabled={isSubmitting}
              className="block w-full rounded-xl border border-[#d1d5db] bg-white px-3.5 py-2.5 text-sm text-[#111827] shadow-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/30 disabled:opacity-50"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="careFor" className="mb-1 block text-sm font-semibold text-[#111827]">
                Who is the care for?
              </label>
              <select
                id="careFor"
                name="careFor"
                disabled={isSubmitting}
                className="block w-full rounded-xl border border-[#d1d5db] bg-white px-3.5 py-2.5 text-sm text-[#111827] shadow-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/30 disabled:opacity-50"
                defaultValue=""
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="Spouse">Spouse</option>
                <option value="Parent">Parent</option>
                <option value="Yourself">Yourself</option>
                <option value="Someone else">Someone else</option>
              </select>
            </div>

            <div>
              <label htmlFor="startDate" className="mb-1 block text-sm font-semibold text-[#111827]">
                When do you need care to start? <span className="text-red-500">*</span>
              </label>
              <input
                id="startDate"
                name="startDate"
                type="text"
                placeholder="e.g. Immediately, within 1–2 weeks"
                required
                disabled={isSubmitting}
                className="block w-full rounded-xl border border-[#d1d5db] bg-white px-3.5 py-2.5 text-sm text-[#111827] shadow-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/30 disabled:opacity-50"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="reason" className="mb-1 block text-sm font-semibold text-[#111827]">
                Reason for needing care
              </label>
              <select
                id="reason"
                name="reason"
                disabled={isSubmitting}
                className="block w-full rounded-xl border border-[#d1d5db] bg-white px-3.5 py-2.5 text-sm text-[#111827] shadow-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/30 disabled:opacity-50"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a reason
                </option>
                <option value="Hospital discharge">Discharge from hospital</option>
                <option value="Alzheimer's or dementia">Alzheimer's / dementia diagnosis</option>
                <option value="24-hour care">24-hour care required</option>
                <option value="Lifestyle change">Lifestyle change / new diagnosis</option>
                <option value="Family unable to support">Family unable to support</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="hoursPerWeek" className="mb-1 block text-sm font-semibold text-[#111827]">
                Hours of care needed per week
              </label>
              <input
                id="hoursPerWeek"
                name="hoursPerWeek"
                type="number"
                min="0"
                step="1"
                placeholder="e.g. 12, 30, 48"
                disabled={isSubmitting}
                className="block w-full rounded-xl border border-[#d1d5db] bg-white px-3.5 py-2.5 text-sm text-[#111827] shadow-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/30 disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <label htmlFor="referrer" className="mb-1 block text-sm font-semibold text-[#111827]">
              Hospital or healthcare facility recommending homecare
            </label>
            <input
              id="referrer"
              name="referrer"
              type="text"
              placeholder="If applicable"
              disabled={isSubmitting}
              className="block w-full rounded-xl border border-[#d1d5db] bg-white px-3.5 py-2.5 text-sm text-[#111827] shadow-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/30 disabled:opacity-50"
            />
          </div>
        </div>
      </section>

      {/* Section 3: Pricing notice */}
      <section aria-labelledby="pricing-notice-heading" className="space-y-5 rounded-2xl border border-[#dbeafe] bg-[#eff6ff] p-6 md:p-8">
        <div>
          <h2 id="pricing-notice-heading" className="text-lg md:text-xl font-semibold text-[#0f172a]">
            3. Pricing notice
          </h2>
          <p className="mt-2 text-sm md:text-base text-[#1e3a8a] font-medium">
            Services typically range from <span className="font-semibold">K150 to K300+ per day</span>, depending on
            the level of care required, hours per week, and whether you choose an agency-employed caregiver,
            private contractor, or direct placement.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="canAfford" className="mb-1 block text-sm font-semibold text-[#0f172a]">
            Can you afford our rates? <span className="text-red-500">*</span>
          </label>
          <p className="text-xs md:text-sm text-[#1e3a8a] mb-2">
            Daily rates generally fall between <span className="font-semibold">K150 and K300+ per day</span>,
            depending on care needs. Please confirm that this range is within your budget.
          </p>
          <select
            id="canAfford"
            name="canAfford"
            required
            disabled={isSubmitting}
            className="block w-full rounded-xl border border-[#bfdbfe] bg-white px-3.5 py-2.5 text-sm text-[#0f172a] shadow-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/40 disabled:opacity-50"
            defaultValue=""
          >
            <option value="" disabled>
              Please choose an option
            </option>
            <option value="Yes, within budget">Yes, this range is within my budget</option>
            <option value="Unsure, need guidance">I&apos;m unsure and would like guidance</option>
            <option value="Not within budget">No, this range is above my budget</option>
          </select>
        </div>
      </section>

      {/* Section 4: Preferred caregiving option */}
      <section aria-labelledby="care-option-heading" className="space-y-6 rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] p-6 md:p-8">
        <div>
          <h2 id="care-option-heading" className="text-lg md:text-xl font-semibold text-[#181322]">
            4. Preferred caregiving option
          </h2>
          <p className="mt-1 text-sm text-[#6b7280]">
            Choose the type of arrangement you&apos;re most interested in. We&apos;ll discuss the pros, cons, and
            pricing implications with you.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="serviceOption" className="mb-1 block text-sm font-semibold text-[#111827]">
              Service option
            </label>
            <select
              id="serviceOption"
              name="serviceOption"
              disabled={isSubmitting}
              className="block w-full rounded-xl border border-[#d1d5db] bg-white px-3.5 py-2.5 text-sm text-[#111827] shadow-sm focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/30 disabled:opacity-50"
              defaultValue=""
            >
              <option value="" disabled>
                Select a caregiving option
              </option>
              <option value="Agency-employed caregiver">Hire a caregiver employed by agency</option>
              <option value="Private contractor (agency-managed)">Hire a private contractor (agency-managed)</option>
              <option value="Direct placement (facilitation)">Establish direct relationship (one-time facilitation fee)</option>
            </select>
          </div>

          <div className="space-y-3 text-sm text-[#4b5563] bg-white border border-dashed border-[#d1d5db] rounded-xl p-4">
            <h3 className="text-sm font-semibold text-[#111827]">How the options generally work</h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <span className="font-semibold">Hire a caregiver employed by agency</span> – we are the legal
                employer, handle vetting, scheduling, supervision, and replacements. Daily rates sit toward the
                higher end of the range, reflecting full management and backup support.
              </li>
              <li>
                <span className="font-semibold">Hire a private contractor (agency-managed)</span> – the caregiver
                is engaged as an independent contractor but we coordinate placement, basic oversight, and invoicing.
                Rates are usually mid-range, with some flexibility based on hours and duties.
              </li>
              <li>
                <span className="font-semibold">Establish direct relationship (one-time setup/facilitation fee)</span>
                – we help you find and vet a suitable caregiver, then you become the direct employer. Daily rates
                can be lower, but you take on payroll, supervision, and day-to-day management.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center rounded-full bg-[#2563eb] px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#1e40af] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2563eb] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit inquiry'}
        </button>
        <p className="mt-3 text-xs text-center text-[#6b7280]">
          By submitting this form, you&apos;re requesting a no-obligation conversation about care options and
          approximate daily rates. We do not offer instant online checkout.
        </p>
      </div>
    </form>
  );
}
