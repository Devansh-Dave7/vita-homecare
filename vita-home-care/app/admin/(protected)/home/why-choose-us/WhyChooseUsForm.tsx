'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { WhyChooseUsSettings } from '@/lib/data/whyChooseUsSettings';
import { availableIcons, getIconByName } from '@/lib/icons';
import { updateWhyChooseUsAction } from './actions';

interface WhyChooseUsFormProps {
  initialSettings: WhyChooseUsSettings;
}

export default function WhyChooseUsForm({ initialSettings }: WhyChooseUsFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [badgeText, setBadgeText] = useState(initialSettings.badge_text);
  const [headingMain, setHeadingMain] = useState(initialSettings.heading_main);
  const [headingHighlight, setHeadingHighlight] = useState(initialSettings.heading_highlight);
  const [headingSuffix, setHeadingSuffix] = useState(initialSettings.heading_suffix);
  const [description, setDescription] = useState(initialSettings.description);

  const [primaryButtonText, setPrimaryButtonText] = useState(initialSettings.primary_button_text);
  const [primaryButtonUrl, setPrimaryButtonUrl] = useState(initialSettings.primary_button_url);
  const [primaryButtonEnabled, setPrimaryButtonEnabled] = useState(initialSettings.primary_button_enabled);

  const [secondaryButtonText, setSecondaryButtonText] = useState(initialSettings.secondary_button_text);
  const [secondaryButtonUrl, setSecondaryButtonUrl] = useState(initialSettings.secondary_button_url || '');
  const [secondaryButtonEnabled, setSecondaryButtonEnabled] = useState(initialSettings.secondary_button_enabled);

  const [features, setFeatures] = useState(initialSettings.features);

  const [image1Url, setImage1Url] = useState(initialSettings.image_url_1 || '');
  const [image2Url, setImage2Url] = useState(initialSettings.image_url_2 || '');
  const [image3Url, setImage3Url] = useState(initialSettings.image_url_3 || '');

  const [image1File, setImage1File] = useState<File | null>(null);
  const [image2File, setImage2File] = useState<File | null>(null);
  const [image3File, setImage3File] = useState<File | null>(null);

  function handleFeatureChange(index: number, key: 'title' | 'icon_name' | 'enabled', value: any) {
    setFeatures(prev => prev.map((f, i) => i === index ? { ...f, [key]: key === 'enabled' ? Boolean(value) : value } : f));
  }

  async function fileToBase64(file: File) {
    const reader = new FileReader();
    return new Promise<string>((resolve, reject) => {
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append('badge_text', badgeText);
      formData.append('heading_main', headingMain);
      formData.append('heading_highlight', headingHighlight);
      formData.append('heading_suffix', headingSuffix);
      formData.append('description', description);

      formData.append('primary_button_text', primaryButtonText);
      formData.append('primary_button_url', primaryButtonUrl);
      formData.append('primary_button_enabled', primaryButtonEnabled.toString());

      formData.append('secondary_button_text', secondaryButtonText);
      formData.append('secondary_button_url', secondaryButtonUrl);
      formData.append('secondary_button_enabled', secondaryButtonEnabled.toString());

      formData.append('image_url_1', image1Url);
      formData.append('image_url_2', image2Url);
      formData.append('image_url_3', image3Url);

      const featurePayload = features
        .sort((a, b) => a.sort_order - b.sort_order)
        .map(f => ({ title: f.title, icon_name: f.icon_name, enabled: f.enabled }));
      formData.append('features', JSON.stringify(featurePayload));

      if (image1File) {
        formData.append('image_1', JSON.stringify({
          base64: await fileToBase64(image1File),
          fileName: image1File.name,
          contentType: image1File.type,
        }));
      }
      if (image2File) {
        formData.append('image_2', JSON.stringify({
          base64: await fileToBase64(image2File),
          fileName: image2File.name,
          contentType: image2File.type,
        }));
      }
      if (image3File) {
        formData.append('image_3', JSON.stringify({
          base64: await fileToBase64(image3File),
          fileName: image3File.name,
          contentType: image3File.type,
        }));
      }

      const result = await updateWhyChooseUsAction(formData);
      if (result.success) {
        setMessage({ type: 'success', text: 'Settings updated successfully!' });
        setImage1File(null);
        setImage2File(null);
        setImage3File(null);
        router.refresh();
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to update settings' });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Unexpected error' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-white rounded-xl border border-[#dbeafe] shadow-sm">
      <div>
        <h2 className="text-lg font-onest font-bold text-[#2c254c]">Edit Why Choose Us</h2>
        <p className="text-sm text-[#4f4865] font-onest mt-1">Update heading, features, buttons, and images</p>
      </div>

      {/* Headings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-onest font-medium text-[#2c254c] mb-2">Badge Text</label>
          <input value={badgeText} onChange={e => setBadgeText(e.target.value)} className="w-full px-4 py-3 border border-[#dbeafe] rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-sm" />
        </div>
        <div>
          <label className="block text-sm font-onest font-medium text-[#2c254c] mb-2">Heading Main</label>
          <input value={headingMain} onChange={e => setHeadingMain(e.target.value)} className="w-full px-4 py-3 border border-[#dbeafe] rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-sm" />
        </div>
        <div>
          <label className="block text-sm font-onest font-medium text-[#2c254c] mb-2">Heading Highlight</label>
          <input value={headingHighlight} onChange={e => setHeadingHighlight(e.target.value)} className="w-full px-4 py-3 border border-[#dbeafe] rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-sm" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-onest font-medium text-[#2c254c] mb-2">Heading Suffix</label>
          <input value={headingSuffix} onChange={e => setHeadingSuffix(e.target.value)} className="w-full px-4 py-3 border border-[#dbeafe] rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-sm" />
        </div>
        <div>
          <label className="block text-sm font-onest font-medium text-[#2c254c] mb-2">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} className="w-full px-4 py-3 border border-[#dbeafe] rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-sm resize-none" />
        </div>
      </div>

      {/* Features */}
      <div className="space-y-4 pb-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-[#2c254c]">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div key={feature.id} className="rounded-lg border border-[#dbeafe] p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-[#2c254c]">Feature {index + 1}</span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={feature.enabled} onChange={e => handleFeatureChange(index, 'enabled', e.target.checked)} className="w-4 h-4 text-[#2563eb] border-gray-300 rounded focus:ring-[#2563eb]" />
                  <span className="text-xs text-[#4f4865]">Enabled</span>
                </label>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-[#4f4865] mb-1">Title</label>
                  <input value={feature.title} onChange={e => handleFeatureChange(index, 'title', e.target.value)} disabled={!feature.enabled} className="w-full px-3 py-2 border border-[#dbeafe] rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-sm disabled:bg-gray-100 disabled:text-gray-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#4f4865] mb-1">Icon</label>
                  <select value={feature.icon_name} onChange={e => handleFeatureChange(index, 'icon_name', e.target.value)} disabled={!feature.enabled} className="w-full px-3 py-2 border border-[#dbeafe] rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-sm disabled:bg-gray-100 disabled:text-gray-500">
                    {availableIcons.map(icon => (
                      <option key={icon.value} value={icon.value}>{icon.label} - {icon.description}</option>
                    ))}
                  </select>
                  <div className="mt-2 flex items-center space-x-2 text-sm text-[#4f4865]">
                    <span>Preview:</span>
                    {getIconByName(feature.icon_name, 'w-5 h-5 text-amber-600')}
                    <span>{availableIcons.find(i => i.value === feature.icon_name)?.label}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Images */}
      <div className="space-y-4 pb-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-[#2c254c]">Images (3 images)</h3>
        <p className="text-sm text-[#4f4865]">Upload new images or keep existing ones. Max size: 10MB per image.</p>

        {[1,2,3].map(n => (
          <div key={n} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="md:col-span-1">
              <div className="relative w-full h-32 rounded-lg overflow-hidden border border-[#dbeafe] bg-[#f8fafc]">
                <img src={(n===1?image1Url:n===2?image2Url:image3Url) || (n===1?'/personal care.jpg':n===2?'/companionship.jpg':'/domestic help.jpg')} alt={`Image ${n}`} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="block">
                <input type="file" accept="image/*" className="hidden" onChange={e => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  if (file.size > 10*1024*1024) { setMessage({ type: 'error', text: 'Image must be < 10MB' }); return; }
                  if (n===1) setImage1File(file);
                  if (n===2) setImage2File(file);
                  if (n===3) setImage3File(file);
                }} />
                <span className="block w-full px-4 py-3 border border-[#dbeafe] rounded-lg text-center cursor-pointer hover:bg-[#f8fafc] transition-colors text-sm text-[#4f4865]">Choose New Image</span>
              </label>
              <input type="url" placeholder="Or paste image URL" value={n===1?image1Url:n===2?image2Url:image3Url} onChange={e => {
                if (n===1) setImage1Url(e.target.value);
                if (n===2) setImage2Url(e.target.value);
                if (n===3) setImage3Url(e.target.value);
              }} className="px-4 py-3 border border-[#dbeafe] rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-sm" />
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-[#dbeafe] rounded-lg p-6 bg-[#f8fafc]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-onest font-bold text-[#2c254c]">Primary Button</h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={primaryButtonEnabled} onChange={e => setPrimaryButtonEnabled(e.target.checked)} className="w-4 h-4 text-[#2563eb] border-gray-300 rounded focus:ring-[#2563eb]" />
              <span className="text-sm text-[#4f4865]">Show button</span>
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#2c254c] mb-2">Button Text</label>
              <input value={primaryButtonText} onChange={e => setPrimaryButtonText(e.target.value)} disabled={!primaryButtonEnabled} className="w-full px-4 py-3 border border-[#dbeafe] rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-sm disabled:bg-gray-100 disabled:text-gray-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2c254c] mb-2">Button URL</label>
              <input value={primaryButtonUrl} onChange={e => setPrimaryButtonUrl(e.target.value)} disabled={!primaryButtonEnabled} className="w-full px-4 py-3 border border-[#dbeafe] rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-sm disabled:bg-gray-100 disabled:text-gray-500" />
            </div>
          </div>
        </div>

        <div className="border border-[#dbeafe] rounded-lg p-6 bg-[#f8fafc]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-onest font-bold text-[#2c254c]">Secondary Button</h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={secondaryButtonEnabled} onChange={e => setSecondaryButtonEnabled(e.target.checked)} className="w-4 h-4 text-[#2563eb] border-gray-300 rounded focus:ring-[#2563eb]" />
              <span className="text-sm text-[#4f4865]">Show button</span>
            </label>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#2c254c] mb-2">Button Text</label>
              <input value={secondaryButtonText} onChange={e => setSecondaryButtonText(e.target.value)} disabled={!secondaryButtonEnabled} className="w-full px-4 py-3 border border-[#dbeafe] rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-sm disabled:bg-gray-100 disabled:text-gray-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2c254c] mb-2">Button URL <span className="text-xs text-[#6b7280]">(Optional)</span></label>
              <input value={secondaryButtonUrl} onChange={e => setSecondaryButtonUrl(e.target.value)} disabled={!secondaryButtonEnabled} className="w-full px-4 py-3 border border-[#dbeafe] rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-sm disabled:bg-gray-100 disabled:text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-lg border ${message.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <p className={`text-sm ${message.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>{message.text}</p>
        </div>
      )}

      <div className="flex justify-end pt-4 border-t border-[#dbeafe]">
        <button type="submit" disabled={loading} className="px-6 py-3 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-onest font-medium text-sm">
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}
