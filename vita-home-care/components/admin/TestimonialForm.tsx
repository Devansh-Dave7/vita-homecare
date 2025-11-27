'use client';

import { useState, useRef } from 'react';
import { Testimonial, createTestimonial, updateTestimonial } from '@/lib/data/testimonials';
import { uploadTestimonialImage } from '@/lib/storage/images';

interface TestimonialFormProps {
  testimonial?: Testimonial;
  onSubmit?: () => void;
}

export default function TestimonialForm({ testimonial, onSubmit }: TestimonialFormProps) {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>(testimonial?.avatar_url || '');
  const [previewUrl, setPreviewUrl] = useState<string>(testimonial?.avatar_url || '');
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEdit = !!testimonial;

  // Handle file selection and preview
  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Please upload a JPEG, PNG, WebP, or GIF image.');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size too large. Maximum size is 5MB.');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      setPreviewUrl(base64);

      // Upload to Supabase
      setUploading(true);
      setError(null);

      try {
        const result = await uploadTestimonialImage({
          base64: base64,
          fileName: file.name,
          contentType: file.type,
        });

        if (result.success && result.url) {
          setAvatarUrl(result.url);
          setPreviewUrl(result.url);
        } else {
          setError(result.error || 'Failed to upload image');
          setPreviewUrl(testimonial?.avatar_url || '');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to upload image');
        setPreviewUrl(testimonial?.avatar_url || '');
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  }

  // Clear uploaded image
  function handleClearImage() {
    setAvatarUrl('');
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    
    // Use the uploaded avatar URL if available
    if (avatarUrl) {
      formData.set('avatarUrl', avatarUrl);
    }

    try {
      const result = isEdit
        ? await updateTestimonial(testimonial.id, formData)
        : await createTestimonial(formData);

      if (result.success) {
        setSuccess(true);
        if (!isEdit && formRef.current) {
          formRef.current.reset();
          setAvatarUrl('');
          setPreviewUrl('');
          setTimeout(() => {
            onSubmit?.();
          }, 1500);
        } else {
          setTimeout(() => {
            onSubmit?.();
          }, 1000);
        }
      } else {
        setError(result.error || 'An error occurred');
        setLoading(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-800 font-onest">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-800 font-onest">
            {isEdit ? 'Testimonial updated successfully!' : 'Testimonial created successfully!'}
          </p>
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={testimonial?.name || ''}
          required
          className="w-full px-4 py-2 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent font-onest"
          placeholder="e.g., Emily Thompson"
        />
      </div>

      {/* Location */}
      <div>
        <label htmlFor="location" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          defaultValue={testimonial?.location || ''}
          className="w-full px-4 py-2 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent font-onest"
          placeholder="e.g., Seattle, WA"
        />
      </div>

      {/* Quote */}
      <div>
        <label htmlFor="quote" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
          Testimonial Quote *
        </label>
        <textarea
          id="quote"
          name="quote"
          defaultValue={testimonial?.quote || ''}
          required
          rows={5}
          className="w-full px-4 py-2 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent font-onest"
          placeholder="Enter the testimonial quote..."
        />
      </div>

      {/* Avatar Image */}
      <div>
        <label className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
          Avatar Image
        </label>
        
        {/* Image Preview */}
        {previewUrl && (
          <div className="mb-4 relative inline-block">
            <img 
              src={previewUrl} 
              alt="Avatar preview" 
              className="h-24 w-24 rounded-xl object-cover border-2 border-[#dbeafe]" 
            />
            <button
              type="button"
              onClick={handleClearImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Upload Options */}
        <div className="space-y-4">
          {/* File Upload */}
          <div className="border-2 border-dashed border-[#dbeafe] rounded-lg p-4 hover:border-[#2563eb] transition-colors">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleFileChange}
              className="hidden"
              id="avatar-upload"
              disabled={uploading}
            />
            <label
              htmlFor="avatar-upload"
              className="flex flex-col items-center justify-center cursor-pointer"
            >
              {uploading ? (
                <>
                  <svg className="animate-spin h-8 w-8 text-[#2563eb] mb-2" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span className="text-sm text-[#4f4865] font-onest">Uploading...</span>
                </>
              ) : (
                <>
                  <svg className="h-8 w-8 text-[#2563eb] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-onest font-medium text-[#2563eb]">Click to upload image</span>
                  <span className="text-xs text-[#6b7280] font-onest mt-1">JPEG, PNG, WebP, or GIF (max 5MB)</span>
                </>
              )}
            </label>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 border-t border-[#dbeafe]"></div>
            <span className="text-xs text-[#6b7280] font-onest">OR</span>
            <div className="flex-1 border-t border-[#dbeafe]"></div>
          </div>

          {/* URL Input */}
          <div>
            <input
              type="url"
              id="avatarUrl"
              name="avatarUrl"
              value={avatarUrl}
              onChange={(e) => {
                setAvatarUrl(e.target.value);
                setPreviewUrl(e.target.value);
              }}
              className="w-full px-4 py-2 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent font-onest"
              placeholder="Or paste an image URL here..."
            />
          </div>
        </div>
        <p className="text-xs text-[#6b7280] mt-2 font-onest">
          Images are automatically optimized for different screen sizes
        </p>
      </div>

      {/* Attribution */}
      <div>
        <label htmlFor="attribution" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
          Attribution
        </label>
        <input
          type="text"
          id="attribution"
          name="attribution"
          defaultValue={testimonial?.attribution || ''}
          className="w-full px-4 py-2 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent font-onest"
          placeholder="e.g., John Doe on Unsplash"
        />
        <p className="text-xs text-[#6b7280] mt-1 font-onest">Photo credit or attribution for the avatar image</p>
      </div>

      {/* Published */}
      <div>
        <label htmlFor="published" className="flex items-center gap-3">
          <input
            type="checkbox"
            id="published"
            name="published"
            value="true"
            defaultChecked={testimonial?.published !== false}
            className="h-4 w-4 rounded border-[#dbeafe] text-[#2563eb] focus:ring-2 focus:ring-[#2563eb]"
          />
          <span className="text-sm font-onest font-semibold text-[#2c254c]">Publish this testimonial</span>
        </label>
        <p className="text-xs text-[#6b7280] mt-1 font-onest ml-7">Unpublished testimonials won't appear on the website</p>
      </div>

      {/* Submit Button */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1450d1] to-[#2563eb] text-white font-onest font-bold py-3 px-6 rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Saving...
            </>
          ) : (
            <>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {isEdit ? 'Update Testimonial' : 'Create Testimonial'}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
