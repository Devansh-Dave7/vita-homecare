'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HomeHeroSettings } from '@/lib/data/homeSettings';
import { updateHomeHeroAction, uploadHomeImageAction } from './actions';

interface HomeHeroFormProps {
  initialSettings: HomeHeroSettings;
}

export default function HomeHeroForm({ initialSettings }: HomeHeroFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    hero_badge: initialSettings.hero_badge,
    hero_title: initialSettings.hero_title,
    hero_subtitle: initialSettings.hero_subtitle,
    hero_description: initialSettings.hero_description,
    hero_image_url: initialSettings.hero_image_url,
    hero_primary_button_text: initialSettings.hero_primary_button_text,
    hero_primary_button_url: initialSettings.hero_primary_button_url,
    hero_primary_button_enabled: initialSettings.hero_primary_button_enabled,
    hero_secondary_button_text: initialSettings.hero_secondary_button_text,
    hero_secondary_button_url: initialSettings.hero_secondary_button_url || '',
    hero_secondary_button_enabled: initialSettings.hero_secondary_button_enabled,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.checked
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Validate file size (max 10MB for hero images)
    if (file.size > 10 * 1024 * 1024) {
      setError('Image size must be less than 10MB');
      return;
    }

    setUploadingImage(true);
    setError(null);

    try {
      // Convert file to base64 on client side
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const base64 = await base64Promise;

      // Call server action with base64 data
      const result = await uploadHomeImageAction({
        base64,
        fileName: file.name,
        contentType: file.type
      });

      if (result.success && result.url) {
        setFormData(prev => ({
          ...prev,
          hero_image_url: result.url
        }));
      } else {
        setError(result.error || 'Failed to upload image');
      }
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await updateHomeHeroAction(formData);

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          router.refresh();
          setSuccess(false);
        }, 2000);
      } else {
        setError(result.error || 'An error occurred');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl border border-[#dbeafe] shadow-sm overflow-hidden">
      <div className="p-6 border-b border-[#dbeafe]">
        <h2 className="text-lg font-onest font-bold text-[#2c254c]">Edit Hero Content</h2>
        <p className="text-sm text-[#4f4865] font-onest mt-1">
          Update the text, buttons, and background image
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Badge */}
        <div>
          <label htmlFor="hero_badge" className="block text-sm font-onest font-medium text-[#2c254c] mb-2">
            Badge Text
            <span className="text-xs text-[#4f4865] font-normal ml-2">(Small text above title)</span>
          </label>
          <input
            type="text"
            id="hero_badge"
            name="hero_badge"
            value={formData.hero_badge}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent font-onest text-sm"
            required
          />
        </div>

        {/* Title */}
        <div>
          <label htmlFor="hero_title" className="block text-sm font-onest font-medium text-[#2c254c] mb-2">
            Main Title
            <span className="text-xs text-[#4f4865] font-normal ml-2">(First line of heading)</span>
          </label>
          <input
            type="text"
            id="hero_title"
            name="hero_title"
            value={formData.hero_title}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent font-onest text-sm"
            required
          />
        </div>

        {/* Subtitle */}
        <div>
          <label htmlFor="hero_subtitle" className="block text-sm font-onest font-medium text-[#2c254c] mb-2">
            Subtitle
            <span className="text-xs text-[#4f4865] font-normal ml-2">(Second line with underline)</span>
          </label>
          <input
            type="text"
            id="hero_subtitle"
            name="hero_subtitle"
            value={formData.hero_subtitle}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent font-onest text-sm"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="hero_description" className="block text-sm font-onest font-medium text-[#2c254c] mb-2">
            Description
            <span className="text-xs text-[#4f4865] font-normal ml-2">(Paragraph below heading)</span>
          </label>
          <textarea
            id="hero_description"
            name="hero_description"
            value={formData.hero_description}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-3 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent font-onest text-sm resize-none"
            required
          />
        </div>

        {/* Hero Image */}
        <div>
          <label className="block text-sm font-onest font-medium text-[#2c254c] mb-2">
            Background Image
          </label>
          <div className="space-y-3">
            {formData.hero_image_url && (
              <div className="relative w-full h-48 rounded-lg overflow-hidden border border-[#dbeafe]">
                <img
                  src={formData.hero_image_url}
                  alt="Hero background"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex items-center gap-3">
              <label className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploadingImage || loading}
                />
                <span className="block w-full px-4 py-3 border border-[#dbeafe] rounded-lg text-center cursor-pointer hover:bg-[#f8fafc] transition-colors font-onest text-sm text-[#4f4865]">
                  {uploadingImage ? 'Uploading...' : 'Choose New Image'}
                </span>
              </label>
              <input
                type="url"
                name="hero_image_url"
                value={formData.hero_image_url}
                onChange={handleChange}
                placeholder="Or paste image URL"
                className="flex-1 px-4 py-3 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent font-onest text-sm"
              />
            </div>
            <p className="text-xs text-[#6b7280] font-onest">
              Recommended: 1920x1080px or larger, max 10MB
            </p>
          </div>
        </div>

        {/* Primary Button Section */}
        <div className="border border-[#dbeafe] rounded-lg p-6 bg-[#f8fafc]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-onest font-bold text-[#2c254c]">Primary Button</h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="hero_primary_button_enabled"
                checked={formData.hero_primary_button_enabled}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-[#2563eb] border-gray-300 rounded focus:ring-[#2563eb]"
              />
              <span className="text-sm font-onest text-[#4f4865]">Show button</span>
            </label>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="hero_primary_button_text" className="block text-sm font-onest font-medium text-[#2c254c] mb-2">
                Button Text
              </label>
              <input
                type="text"
                id="hero_primary_button_text"
                name="hero_primary_button_text"
                value={formData.hero_primary_button_text}
                onChange={handleChange}
                disabled={!formData.hero_primary_button_enabled}
                className="w-full px-4 py-3 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent font-onest text-sm disabled:bg-gray-100 disabled:text-gray-500"
                required={formData.hero_primary_button_enabled}
              />
            </div>
            <div>
              <label htmlFor="hero_primary_button_url" className="block text-sm font-onest font-medium text-[#2c254c] mb-2">
                Button URL
              </label>
              <input
                type="text"
                id="hero_primary_button_url"
                name="hero_primary_button_url"
                value={formData.hero_primary_button_url}
                onChange={handleChange}
                disabled={!formData.hero_primary_button_enabled}
                placeholder="/inquiry"
                className="w-full px-4 py-3 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent font-onest text-sm disabled:bg-gray-100 disabled:text-gray-500"
                required={formData.hero_primary_button_enabled}
              />
            </div>
          </div>
        </div>

        {/* Secondary Button Section */}
        <div className="border border-[#dbeafe] rounded-lg p-6 bg-[#f8fafc]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-onest font-bold text-[#2c254c]">Secondary Button</h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="hero_secondary_button_enabled"
                checked={formData.hero_secondary_button_enabled}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-[#2563eb] border-gray-300 rounded focus:ring-[#2563eb]"
              />
              <span className="text-sm font-onest text-[#4f4865]">Show button</span>
            </label>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="hero_secondary_button_text" className="block text-sm font-onest font-medium text-[#2c254c] mb-2">
                Button Text
              </label>
              <input
                type="text"
                id="hero_secondary_button_text"
                name="hero_secondary_button_text"
                value={formData.hero_secondary_button_text}
                onChange={handleChange}
                disabled={!formData.hero_secondary_button_enabled}
                className="w-full px-4 py-3 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent font-onest text-sm disabled:bg-gray-100 disabled:text-gray-500"
                required={formData.hero_secondary_button_enabled}
              />
            </div>
            <div>
              <label htmlFor="hero_secondary_button_url" className="block text-sm font-onest font-medium text-[#2c254c] mb-2">
                Button URL
                <span className="text-xs text-[#6b7280] font-normal ml-2">(Optional - leave empty for non-clickable button)</span>
              </label>
              <input
                type="text"
                id="hero_secondary_button_url"
                name="hero_secondary_button_url"
                value={formData.hero_secondary_button_url}
                onChange={handleChange}
                disabled={!formData.hero_secondary_button_enabled}
                placeholder="Leave empty for button without link"
                className="w-full px-4 py-3 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent font-onest text-sm disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800 font-onest">{error}</p>
          </div>
        )}

        {success && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800 font-onest">
              ✓ Hero section updated successfully!
            </p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end pt-4 border-t border-[#dbeafe]">
          <button
            type="submit"
            disabled={loading || uploadingImage}
            className="px-6 py-3 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-onest font-medium text-sm"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
