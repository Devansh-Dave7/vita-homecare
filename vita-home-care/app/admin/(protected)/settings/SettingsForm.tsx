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

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="contact_phone" className="block text-sm font-medium text-gray-700 mb-2">
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="mt-1 text-xs text-gray-500">Include country code (e.g., +260 for Zambia)</p>
          </div>

          <div>
            <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700 mb-2">
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="contact_location" className="block text-sm font-medium text-gray-700 mb-2">
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Social Media Links</h2>
        <p className="text-sm text-gray-600">Add your social media URLs. Leave blank to hide the icon in the top bar.</p>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="social_facebook" className="block text-sm font-medium text-gray-700 mb-2">
              Facebook URL
            </label>
            <input
              type="url"
              id="social_facebook"
              name="social_facebook"
              value={formData.social_facebook || ''}
              onChange={handleChange}
              placeholder="https://facebook.com/yourpage"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="social_twitter" className="block text-sm font-medium text-gray-700 mb-2">
              Twitter/X URL
            </label>
            <input
              type="url"
              id="social_twitter"
              name="social_twitter"
              value={formData.social_twitter || ''}
              onChange={handleChange}
              placeholder="https://twitter.com/yourhandle"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="social_instagram" className="block text-sm font-medium text-gray-700 mb-2">
              Instagram URL
            </label>
            <input
              type="url"
              id="social_instagram"
              name="social_instagram"
              value={formData.social_instagram || ''}
              onChange={handleChange}
              placeholder="https://instagram.com/yourhandle"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="social_youtube" className="block text-sm font-medium text-gray-700 mb-2">
              YouTube URL
            </label>
            <input
              type="url"
              id="social_youtube"
              name="social_youtube"
              value={formData.social_youtube || ''}
              onChange={handleChange}
              placeholder="https://youtube.com/@yourchannel"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="social_linkedin" className="block text-sm font-medium text-gray-700 mb-2">
              LinkedIn URL
            </label>
            <input
              type="url"
              id="social_linkedin"
              name="social_linkedin"
              value={formData.social_linkedin || ''}
              onChange={handleChange}
              placeholder="https://linkedin.com/company/yourcompany"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Saving...' : 'Save Settings'}
        </button>
        
        <button
          type="button"
          onClick={() => setFormData(initialSettings)}
          disabled={isSubmitting}
          className="px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed transition-colors"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
