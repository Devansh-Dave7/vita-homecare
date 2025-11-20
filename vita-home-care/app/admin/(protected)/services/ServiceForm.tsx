"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Service } from '@/lib/data/services';
import { createServiceAction, updateServiceAction } from './actions';

type ServiceFormProps = {
  service?: Service;
  isEditing?: boolean;
};

export function ServiceForm({ service, isEditing = false }: ServiceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: service?.name || '',
    slug: service?.slug || '',
    short_description: service?.short_description || '',
    category: service?.category || '',
    hero_image_url: service?.hero_image_url || '',
    body_markdown: service?.body_markdown || '',
    audience_markdown: service?.audience_markdown || '',
    features_markdown: service?.features_markdown || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // If editing and hero_image_url is empty, keep the existing one
      const dataToSubmit = {
        ...formData,
        hero_image_url: isEditing && !formData.hero_image_url && service?.hero_image_url 
          ? service.hero_image_url 
          : formData.hero_image_url,
      };

      console.log('[ServiceForm] Submitting:', { isEditing, serviceId: service?.id, data: { ...dataToSubmit, body_markdown: '...' } });

      if (isEditing && service) {
        const result = await updateServiceAction(service.id, dataToSubmit);
        console.log('[ServiceForm] Update result:', result);
      } else {
        const result = await createServiceAction(dataToSubmit);
        console.log('[ServiceForm] Create result:', result);
      }
      
      console.log('[ServiceForm] Redirecting to services list');
      // Use window.location for a hard redirect to ensure state is cleared
      window.location.href = '/admin/services';
    } catch (err: any) {
      console.error('[ServiceForm] Error:', err);
      setError(err.message || 'Failed to save service');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Basic Info */}
      <div className="bg-white rounded-xl border border-[#dbeafe] p-6">
        <h2 className="text-lg font-onest font-bold text-[#2c254c] mb-4">Basic Information</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
              Service Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-[#dbeafe] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
              placeholder="e.g., Personal Care Services"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
              URL Slug *
            </label>
            <input
              id="slug"
              name="slug"
              type="text"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-[#dbeafe] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
              placeholder="e.g., personal-care-lusaka"
              disabled={loading}
            />
            <p className="text-xs text-[#4f4865] font-onest mt-1">
              Used in URL: /services/{formData.slug}
            </p>
          </div>

          <div>
            <label htmlFor="short_description" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
              Short Description *
            </label>
            <textarea
              id="short_description"
              name="short_description"
              value={formData.short_description}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-[#dbeafe] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all resize-none"
              placeholder="Brief description shown in listings"
              rows={3}
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-[#dbeafe] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
                disabled={loading}
              >
                <option value="">Select Category</option>
                <option value="care">Care</option>
                <option value="personal-care">Personal Care</option>
                <option value="domestic">Domestic</option>
                <option value="transport">Transport</option>
                <option value="support">Support</option>
                <option value="other">Other</option>
              </select>
              {isEditing && service && (
                <p className="text-xs text-[#4f4865] font-onest mt-1">
                  Current: {service.category}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="hero_image_url" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
                Hero Image URL {!isEditing && '*'}
              </label>
              <input
                id="hero_image_url"
                name="hero_image_url"
                type="url"
                value={formData.hero_image_url}
                onChange={handleChange}
                required={!isEditing}
                className="w-full px-4 py-3 rounded-lg border border-[#dbeafe] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
                placeholder="https://..."
                disabled={loading}
              />
              {isEditing && service?.hero_image_url && (
                <p className="text-xs text-[#4f4865] font-onest mt-1">
                  Current image will be kept if left empty
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Markdown Content */}
      <div className="bg-white rounded-xl border border-[#dbeafe] p-6">
        <h2 className="text-lg font-onest font-bold text-[#2c254c] mb-4">Content</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="body_markdown" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
              Main Content (Markdown) *
            </label>
            <textarea
              id="body_markdown"
              name="body_markdown"
              value={formData.body_markdown}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-[#dbeafe] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all font-mono text-sm resize-none"
              placeholder="# Service Details\nDescribe your service..."
              rows={6}
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="audience_markdown" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
              Target Audience (Markdown)
            </label>
            <textarea
              id="audience_markdown"
              name="audience_markdown"
              value={formData.audience_markdown}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-[#dbeafe] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all font-mono text-sm resize-none"
              placeholder="Who would benefit from this service?"
              rows={4}
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="features_markdown" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
              Features & Benefits (Markdown)
            </label>
            <textarea
              id="features_markdown"
              name="features_markdown"
              value={formData.features_markdown}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-[#dbeafe] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all font-mono text-sm resize-none"
              placeholder="- Feature 1\n- Feature 2\n- Feature 3"
              rows={4}
              disabled={loading}
            />
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-gradient-to-r from-[#1450d1] to-[#2563eb] text-white font-onest font-bold rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {loading ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update Service' : 'Create Service')}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          disabled={loading}
          className="px-6 py-3 border border-[#dbeafe] text-[#2c254c] font-onest font-bold rounded-lg hover:bg-[#f8fafc] transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
