"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Service } from '@/lib/data/services';
import { createServiceAction, updateServiceAction } from './actions';
import { uploadServiceImage } from '@/lib/storage/images';

type ServiceCategory = {
  id: string;
  name: string;
  slug: string;
};

type ServiceFormProps = {
  service?: Service;
  isEditing?: boolean;
  categories?: ServiceCategory[];
};

export function ServiceForm({ service, isEditing = false, categories = [] }: ServiceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string>(service?.hero_image_url || '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [autoSlug, setAutoSlug] = useState(!isEditing); // Auto-generate slug for new services

  // Core Task structure
  type CoreTask = {
    title: string;
    description: string;
  };

  const [coreTasks, setCoreTasks] = useState<CoreTask[]>(() => {
    if (!service?.features_markdown) return [];
    try {
      // Try to parse as JSON
      const parsed = JSON.parse(service.features_markdown);
      if (Array.isArray(parsed)) return parsed;
      return [];
    } catch (e) {
      // If not JSON, it's legacy markdown - we'll keep it in features_markdown state
      // but for now we won't populate coreTasks from it
      return [];
    }
  });

  const [formData, setFormData] = useState({
    name: service?.name || '',
    slug: service?.slug || '',
    short_description: service?.short_description || '',
    category: service?.category || '',
    hero_image_url: service?.hero_image_url || '',
    body_markdown: service?.body_markdown || '',
    audience_markdown: service?.audience_markdown || '',
    // Keep original features_markdown if it wasn't JSON, otherwise empty string
    // (since we'll rebuild it from coreTasks on submit)
    features_markdown: service?.features_markdown && !service.features_markdown.trim().startsWith('[')
      ? service.features_markdown
      : '',
  });

  // Generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Auto-update slug when name changes (if autoSlug is enabled)
  useEffect(() => {
    if (autoSlug && formData.name) {
      const newSlug = generateSlug(formData.name);
      setFormData(prev => ({ ...prev, slug: newSlug }));
    }
  }, [formData.name, autoSlug]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // If user manually edits slug, disable auto-generation
    if (name === 'slug') {
      setAutoSlug(false);
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCoreTaskChange = (index: number, field: keyof CoreTask, value: string) => {
    const newTasks = [...coreTasks];
    newTasks[index] = { ...newTasks[index], [field]: value };
    setCoreTasks(newTasks);
  };

  const addCoreTask = () => {
    setCoreTasks([...coreTasks, { title: '', description: '' }]);
  };

  const removeCoreTask = (index: number) => {
    setCoreTasks(coreTasks.filter((_, i) => i !== index));
  };

  // Handle image file selection and upload
  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
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

    // Create preview and upload
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      setPreviewUrl(base64);
      setUploading(true);
      setError('');

      try {
        const result = await uploadServiceImage({
          base64: base64,
          fileName: file.name,
          contentType: file.type,
        });

        if (result.success && result.url) {
          setFormData(prev => ({ ...prev, hero_image_url: result.url! }));
          setPreviewUrl(result.url);
        } else {
          setError(result.error || 'Failed to upload image');
          setPreviewUrl(service?.hero_image_url || '');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to upload image');
        setPreviewUrl(service?.hero_image_url || '');
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  }

  // Clear uploaded image
  function handleClearImage() {
    setFormData(prev => ({ ...prev, hero_image_url: '' }));
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Serialize coreTasks to JSON for features_markdown
      // If coreTasks is empty and we have legacy markdown in formData.features_markdown, use that
      // Otherwise use the JSON string
      let featuresContent = formData.features_markdown;
      if (coreTasks.length > 0) {
        featuresContent = JSON.stringify(coreTasks);
      }

      // If editing and hero_image_url is empty, keep the existing one
      const dataToSubmit = {
        ...formData,
        features_markdown: featuresContent,
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
        <div className="bg-red-50 border-2 border-red-200 text-red-800 px-6 py-4 rounded-2xl text-sm font-medium flex items-start gap-3">
          <svg className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Basic Info */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-gradient-to-br from-[#2563eb] to-[#1d5be1]">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Basic Information</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
              Service Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] transition-all hover:border-gray-300"
              placeholder="e.g., Personal Care Services"
              disabled={loading}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="slug" className="block text-sm font-semibold text-gray-900">
                URL Slug *
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoSlug}
                  onChange={(e) => setAutoSlug(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-[#2563eb] focus:ring-2 focus:ring-[#2563eb]"
                />
                <span className="text-xs text-gray-600">Auto-generate from title</span>
              </label>
            </div>
            <input
              id="slug"
              name="slug"
              type="text"
              value={formData.slug}
              onChange={handleChange}
              required
              className={`w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] transition-all hover:border-gray-300 ${autoSlug ? 'bg-gray-50' : ''}`}
              placeholder="e.g., personal-care-lusaka"
              disabled={loading}
              readOnly={autoSlug}
            />
            <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
              <span className="text-gray-400">→</span>
              URL: /services/{formData.slug || 'your-service-slug'}
            </p>
          </div>

          <div>
            <label htmlFor="short_description" className="block text-sm font-semibold text-gray-900 mb-2">
              Short Description *
            </label>
            <textarea
              id="short_description"
              name="short_description"
              value={formData.short_description}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] transition-all resize-none hover:border-gray-300"
              placeholder="Brief description shown in listings"
              rows={3}
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="category" className="block text-sm font-semibold text-gray-900">
                  Category *
                </label>
                <a
                  href="/admin/services/categories"
                  className="text-xs text-[#2563eb] hover:text-[#1d5be1] font-semibold transition-colors"
                >
                  Manage →
                </a>
              </div>
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] transition-all appearance-none hover:border-gray-300"
                  disabled={loading}
                >
                  <option value="">Select Category</option>
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <option key={cat.id} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="care">Care</option>
                      <option value="personal-care">Personal Care</option>
                      <option value="domestic">Domestic</option>
                      <option value="transport">Transport</option>
                      <option value="support">Support</option>
                      <option value="other">Other</option>
                    </>
                  )}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {isEditing && service && (
                <p className="text-xs text-gray-500 mt-1.5">
                  Current: <span className="font-medium text-gray-700">{service.category}</span>
                </p>
              )}
            </div>
          </div>

          {/* Hero Image Upload Section */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Hero Image {!isEditing && '*'}
            </label>

            {/* Image Preview */}
            {previewUrl && (
              <div className="mb-4 relative inline-block">
                <img 
                  src={previewUrl} 
                  alt="Hero image preview" 
                  className="h-40 w-64 rounded-2xl object-cover border-2 border-gray-200 shadow-sm" 
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
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 hover:border-[#2563eb] hover:bg-blue-50/30 transition-all duration-200">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleImageChange}
                  className="hidden"
                  id="hero-image-upload"
                  disabled={uploading || loading}
                />
                <label
                  htmlFor="hero-image-upload"
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
                      <span className="text-sm font-semibold text-[#2563eb]">Click to upload image</span>
                      <span className="text-xs text-gray-500 mt-1">JPEG, PNG, WebP, or GIF (max 5MB)</span>
                    </>
                  )}
                </label>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 border-t border-gray-200"></div>
                <span className="text-xs text-gray-500 font-medium">OR</span>
                <div className="flex-1 border-t border-gray-200"></div>
              </div>

              {/* URL Input */}
              <div>
                <input
                  type="url"
                  id="hero_image_url"
                  name="hero_image_url"
                  value={formData.hero_image_url}
                  onChange={(e) => {
                    handleChange(e);
                    setPreviewUrl(e.target.value);
                  }}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] transition-all hover:border-gray-300"
                  placeholder="Or paste an image URL here..."
                  disabled={loading}
                />
              </div>
            </div>

            {isEditing && service?.hero_image_url && !formData.hero_image_url && (
              <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Current image will be kept if no new image is uploaded
              </p>
            )}
            <p className="text-xs text-gray-500 mt-2">
              💡 Recommended size: 1200x800px or larger for best quality
            </p>
          </div>
        </div>
      </div>

      {/* Markdown Content */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Content</h2>
        </div>
        <div className="space-y-6">
          <div>
            <label htmlFor="body_markdown" className="block text-sm font-semibold text-gray-900 mb-2">
              About This Service (Markdown) *
            </label>
            <textarea
              id="body_markdown"
              name="body_markdown"
              value={formData.body_markdown}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] transition-all font-mono text-sm resize-none hover:border-gray-300 bg-gray-50"
              placeholder="# About This Service&#10;Describe your service..."
              rows={6}
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="audience_markdown" className="block text-sm font-semibold text-gray-900 mb-2">
              Who this service is for (Markdown)
            </label>
            <textarea
              id="audience_markdown"
              name="audience_markdown"
              value={formData.audience_markdown}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] transition-all font-mono text-sm resize-none hover:border-gray-300 bg-gray-50"
              placeholder="Who would benefit from this service?"
              rows={4}
              disabled={loading}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-semibold text-gray-900">
                What's included in the service? (Core Tasks)
              </label>
              <button
                type="button"
                onClick={addCoreTask}
                className="inline-flex items-center gap-1 text-sm text-[#2563eb] font-semibold hover:text-[#1d5be1] transition-colors"
                disabled={loading}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Add Task
              </button>
            </div>

            <div className="space-y-4">
              {coreTasks.map((task, index) => (
                <div key={index} className="p-5 border-2 border-gray-200 rounded-2xl bg-gray-50 relative hover:border-gray-300 transition-colors">
                  <button
                    type="button"
                    onClick={() => removeCoreTask(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    title="Remove task"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="grid gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Task Title</label>
                      <input
                        type="text"
                        value={task.title}
                        onChange={(e) => handleCoreTaskChange(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] transition-all"
                        placeholder="e.g. Bathing & grooming"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Description</label>
                      <textarea
                        value={task.description}
                        onChange={(e) => handleCoreTaskChange(index, 'description', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] resize-none transition-all"
                        placeholder="Description of the task..."
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              ))}

              {coreTasks.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50">
                  <svg className="h-12 w-12 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  <p className="text-gray-600 text-sm font-medium">No core tasks added yet</p>
                  <p className="text-gray-500 text-xs mt-1">Click "Add Task" to start building your service</p>
                </div>
              )}
            </div>

            {/* Fallback for legacy markdown editing if needed, hidden if using core tasks */}
            {coreTasks.length === 0 && formData.features_markdown && !formData.features_markdown.startsWith('[') && (
              <div className="mt-4">
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Legacy Features Markdown (Will be overwritten if you add Core Tasks)</label>
                <textarea
                  name="features_markdown"
                  value={formData.features_markdown}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] transition-all font-mono text-sm resize-none bg-gray-50"
                  rows={4}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#2563eb] to-[#1d5be1] text-white font-bold rounded-xl hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              {isEditing ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            <>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {isEditing ? 'Update Service' : 'Create Service'}
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          disabled={loading}
          className="w-full sm:w-auto px-8 py-3.5 border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
