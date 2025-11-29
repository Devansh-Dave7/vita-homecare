'use client';

import { useState, useRef } from 'react';
import { StaffMember, createStaffMember, updateStaffMember } from '@/lib/data/about';
import { uploadAboutImage } from '@/lib/storage/images';

interface StaffMemberFormProps {
  staffMember?: StaffMember;
  onSubmit?: () => void;
}

export default function StaffMemberForm({ staffMember, onSubmit }: StaffMemberFormProps) {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string>(staffMember?.photo_url || '');
  const [previewUrl, setPreviewUrl] = useState<string>(staffMember?.photo_url || '');
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEdit = !!staffMember;

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
        const result = await uploadAboutImage({
          base64: base64,
          fileName: file.name,
          contentType: file.type,
          folder: 'staff'
        });

        if (result.success && result.url) {
          setPhotoUrl(result.url);
          setPreviewUrl(result.url);
        } else {
          setError(result.error || 'Failed to upload image');
          setPreviewUrl(staffMember?.photo_url || '');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to upload image');
        setPreviewUrl(staffMember?.photo_url || '');
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  }

  // Clear uploaded image
  function handleClearImage() {
    setPhotoUrl('');
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
    
    // Use the uploaded photo URL if available
    if (photoUrl) {
      formData.set('photoUrl', photoUrl);
    }

    try {
      const result = isEdit
        ? await updateStaffMember(staffMember.id, formData)
        : await createStaffMember(formData);

      if (result.success) {
        setSuccess(true);
        if (!isEdit && formRef.current) {
          formRef.current.reset();
          setPhotoUrl('');
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
            {isEdit ? 'Team member updated successfully!' : 'Team member added successfully!'}
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
          defaultValue={staffMember?.name || ''}
          required
          className="w-full px-4 py-2 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent font-onest"
          placeholder="e.g., Grace N."
        />
      </div>

      {/* Role */}
      <div>
        <label htmlFor="role" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
          Role / Title
        </label>
        <input
          type="text"
          id="role"
          name="role"
          defaultValue={staffMember?.role || ''}
          className="w-full px-4 py-2 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent font-onest"
          placeholder="e.g., Senior Caregiver"
        />
      </div>

      {/* Photo */}
      <div>
        <label className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
          Photo
        </label>
        
        {/* Image Preview */}
        {previewUrl && (
          <div className="mb-4 relative inline-block">
            <img 
              src={previewUrl} 
              alt="Photo preview" 
              className="h-32 w-32 rounded-xl object-cover border-2 border-[#dbeafe]" 
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
              id="photo-upload"
              disabled={uploading}
            />
            <label
              htmlFor="photo-upload"
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
                  <span className="text-sm font-onest font-medium text-[#2563eb]">Click to upload photo</span>
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
              id="photoUrl"
              name="photoUrl"
              value={photoUrl}
              onChange={(e) => {
                setPhotoUrl(e.target.value);
                setPreviewUrl(e.target.value);
              }}
              className="w-full px-4 py-2 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent font-onest"
              placeholder="Or paste an image URL here..."
            />
          </div>
        </div>
        <p className="text-xs text-[#6b7280] mt-2 font-onest">
          Square images work best (recommended: 400x400 pixels)
        </p>
      </div>

      {/* Bio */}
      <div>
        <label htmlFor="bio" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
          Bio (Optional)
        </label>
        <textarea
          id="bio"
          name="bio"
          defaultValue={staffMember?.bio_markdown || ''}
          rows={4}
          className="w-full px-4 py-2 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent font-onest"
          placeholder="A brief description about this team member..."
        />
        <p className="text-xs text-[#6b7280] mt-1 font-onest">
          Optional biography or description (not currently displayed on the public page)
        </p>
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
              {isEdit ? 'Update Team Member' : 'Add Team Member'}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
