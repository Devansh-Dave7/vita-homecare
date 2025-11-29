'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { AboutPageContent, updateAboutPageContent } from '@/lib/data/about';
import { uploadAboutImage } from '@/lib/storage/images';

interface GalleryFormProps {
  initialContent: AboutPageContent;
}

type GalleryImage = { url: string; alt: string };

export default function AboutGalleryForm({ initialContent }: GalleryFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [images, setImages] = useState<GalleryImage[]>([
    initialContent.gallery_image_1,
    initialContent.gallery_image_2,
    initialContent.gallery_image_3,
  ]);

  const fileInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleImageChange = (index: number, field: 'url' | 'alt', value: string) => {
    setImages(prev => {
      const newImages = [...prev];
      newImages[index] = { ...newImages[index], [field]: value };
      return newImages;
    });
  };

  async function handleFileUpload(index: number, e: React.ChangeEvent<HTMLInputElement>) {
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

    setUploadingIndex(index);
    setError(null);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;

      try {
        const result = await uploadAboutImage({
          base64,
          fileName: file.name,
          contentType: file.type,
          folder: 'gallery'
        });

        if (result.success && result.url) {
          handleImageChange(index, 'url', result.url);
        } else {
          setError(result.error || 'Failed to upload image');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to upload image');
      } finally {
        setUploadingIndex(null);
      }
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await updateAboutPageContent({
        gallery_image_1: images[0],
        gallery_image_2: images[1],
        gallery_image_3: images[2],
      });

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          router.refresh();
        }, 1500);
      } else {
        setError(result.error || 'An error occurred');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6f0ff] via-white to-[#f2f7ff]">
      {/* Header */}
      <header className="bg-white border-b border-[#dbeafe] shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-onest font-bold text-[#2c254c]">
                Edit Gallery Images
              </h1>
              <p className="text-sm text-[#4f4865] font-onest mt-1">
                Update the 3 images displayed below the hero section
              </p>
            </div>
            <Link
              href="/admin/about"
              className="text-sm text-[#1450d1] hover:text-[#3e5ab7] font-onest font-medium"
            >
              ← Back
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800 font-onest">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800 font-onest">Gallery images updated successfully!</p>
            </div>
          )}

          {/* Preview */}
          <div className="bg-white rounded-xl border border-[#dbeafe] shadow-sm p-6">
            <h2 className="text-lg font-onest font-bold text-[#2c254c] mb-4">Current Preview</h2>
            <div className="grid grid-cols-3 gap-4">
              {images.map((img, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                  {img.url ? (
                    <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Image Editors */}
          {images.map((img, index) => (
            <div key={index} className="bg-white rounded-xl border border-[#dbeafe] shadow-sm p-6">
              <h2 className="text-lg font-onest font-bold text-[#2c254c] mb-4 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 bg-[#e6f0ff] rounded-full text-[#2563eb] text-sm font-bold">
                  {index + 1}
                </span>
                Image {index + 1}
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Image Preview & Upload */}
                <div>
                  <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 mb-4">
                    {img.url ? (
                      <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* File Upload */}
                  <div className="border-2 border-dashed border-[#dbeafe] rounded-lg p-4 hover:border-[#2563eb] transition-colors">
                    <input
                      ref={fileInputRefs[index]}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      onChange={(e) => handleFileUpload(index, e)}
                      className="hidden"
                      id={`image-upload-${index}`}
                      disabled={uploadingIndex !== null}
                    />
                    <label
                      htmlFor={`image-upload-${index}`}
                      className="flex flex-col items-center justify-center cursor-pointer py-2"
                    >
                      {uploadingIndex === index ? (
                        <>
                          <svg className="animate-spin h-6 w-6 text-[#2563eb] mb-2" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span className="text-sm text-[#4f4865] font-onest">Uploading...</span>
                        </>
                      ) : (
                        <>
                          <svg className="h-6 w-6 text-[#2563eb] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                          <span className="text-sm font-onest font-medium text-[#2563eb]">Upload new image</span>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                {/* URL & Alt Text */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
                      Image URL
                    </label>
                    <input
                      type="text"
                      value={img.url}
                      onChange={(e) => handleImageChange(index, 'url', e.target.value)}
                      className="w-full px-4 py-2 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent font-onest text-sm"
                      placeholder="https://..."
                    />
                    <p className="text-xs text-[#6b7280] mt-1 font-onest">
                      Upload a file or paste an external URL
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
                      Alt Text
                    </label>
                    <input
                      type="text"
                      value={img.alt}
                      onChange={(e) => handleImageChange(index, 'alt', e.target.value)}
                      className="w-full px-4 py-2 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent font-onest text-sm"
                      placeholder="Describe the image..."
                    />
                    <p className="text-xs text-[#6b7280] mt-1 font-onest">
                      Helps with accessibility and SEO
                    </p>
                  </div>

                  {img.url && (
                    <button
                      type="button"
                      onClick={() => handleImageChange(index, 'url', '')}
                      className="text-sm text-red-600 hover:text-red-700 font-onest font-medium"
                    >
                      Clear image
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Submit Button */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading || uploadingIndex !== null}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Gallery
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
