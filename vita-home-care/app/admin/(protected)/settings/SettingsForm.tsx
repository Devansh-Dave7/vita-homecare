'use client';

import { useState } from 'react';
import { type SiteSettings } from '@/lib/data/siteSettings';

type SettingsFormProps = {
  initialSettings: SiteSettings;
  onSubmit: (settings: SiteSettings) => Promise<{ success: boolean; error?: string }>;
};

export default function SettingsForm({ initialSettings, onSubmit }: SettingsFormProps) {
  const [formData, setFormData] = useState<SiteSettings>(initialSettings);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const result = await onSubmit(formData);
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Settings updated successfully!' });
        // Hard redirect to refresh data
        setTimeout(() => {
          window.location.href = '/admin/settings';
        }, 1000);
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to update settings' });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'An unexpected error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      <div className="bg-white rounded-xl border border-[#dbeafe] p-6 space-y-6">
        <h2 className="text-lg font-onest font-bold text-[#2c254c]">Contact Information</h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="contact_phone" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
              Phone Number
            </label>
            <input
              type="text"
              id="contact_phone"
              name="contact_phone"
              value={formData.contact_phone}
              onChange={handleChange}
              required
              placeholder="+260 7542 532477"
              className="w-full px-4 py-3 rounded-lg border border-[#dbeafe] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
            />
            <p className="mt-1 text-xs text-[#4f4865] font-onest">Include country code (e.g., +260 for Zambia)</p>
          </div>

          <div>
            <label htmlFor="contact_email" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
              Contact Email
            </label>
            <input
              type="email"
              id="contact_email"
              name="contact_email"
              value={formData.contact_email}
              onChange={handleChange}
              required
              placeholder="contact@vitahomecare.com"
              className="w-full px-4 py-3 rounded-lg border border-[#dbeafe] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="contact_location" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
              Location
            </label>
            <input
              type="text"
              id="contact_location"
              name="contact_location"
              value={formData.contact_location}
              onChange={handleChange}
              required
              placeholder="Lusaka, Zambia"
              className="w-full px-4 py-3 rounded-lg border border-[#dbeafe] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#dbeafe] p-6 space-y-6">
        <div>
          <h2 className="text-lg font-onest font-bold text-[#2c254c]">Social Media Links</h2>
          <p className="text-sm text-[#4f4865] font-onest mt-1">Add your social media URLs. Leave blank to hide the icon in the top bar.</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="social_facebook" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
              Facebook URL
            </label>
            <input
              type="url"
              id="social_facebook"
              name="social_facebook"
              value={formData.social_facebook || ''}
              onChange={handleChange}
              placeholder="https://facebook.com/yourpage"
              className="w-full px-4 py-3 rounded-lg border border-[#dbeafe] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label htmlFor="social_twitter" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
              Twitter/X URL
            </label>
            <input
              type="url"
              id="social_twitter"
              name="social_twitter"
              value={formData.social_twitter || ''}
              onChange={handleChange}
              placeholder="https://twitter.com/yourhandle"
              className="w-full px-4 py-3 rounded-lg border border-[#dbeafe] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label htmlFor="social_instagram" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
              Instagram URL
            </label>
            <input
              type="url"
              id="social_instagram"
              name="social_instagram"
              value={formData.social_instagram || ''}
              onChange={handleChange}
              placeholder="https://instagram.com/yourhandle"
              className="w-full px-4 py-3 rounded-lg border border-[#dbeafe] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label htmlFor="social_youtube" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
              YouTube URL
            </label>
            <input
              type="url"
              id="social_youtube"
              name="social_youtube"
              value={formData.social_youtube || ''}
              onChange={handleChange}
              placeholder="https://youtube.com/@yourchannel"
              className="w-full px-4 py-3 rounded-lg border border-[#dbeafe] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="social_linkedin" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
              LinkedIn URL
            </label>
            <input
              type="url"
              id="social_linkedin"
              name="social_linkedin"
              value={formData.social_linkedin || ''}
              onChange={handleChange}
              placeholder="https://linkedin.com/company/yourcompany"
              className="w-full px-4 py-3 rounded-lg border border-[#dbeafe] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#1450d1] to-[#2563eb] text-white font-onest font-bold rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isSubmitting ? 'Saving...' : 'Save Settings'}
        </button>
        
        <button
          type="button"
          onClick={() => setFormData(initialSettings)}
          disabled={isSubmitting}
          className="w-full sm:w-auto px-6 py-3 border border-[#dbeafe] text-[#2c254c] font-onest font-bold rounded-lg hover:bg-[#f8fafc] transition-colors disabled:opacity-50"
        >
          Reset Changes
        </button>
      </div>
    </form>
  );
}
