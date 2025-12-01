'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AboutPageContent, updateAboutPageContent } from '@/lib/data/about';

interface ContentFormProps {
  initialContent: AboutPageContent;
  specialtiesHeader: { title: string; description: string };
}

export default function AboutContentForm({ initialContent, specialtiesHeader }: ContentFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    hero_heading: initialContent.hero_heading,
    hero_description: initialContent.hero_description,
    vision_text: initialContent.vision_text,
    mission_text: initialContent.mission_text,
    team_heading: initialContent.team_heading,
    team_description: initialContent.team_description,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await updateAboutPageContent(formData);

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
                Edit Page Content
              </h1>
              <p className="text-sm text-[#4f4865] font-onest mt-1">
                Update headings, descriptions, and text content
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
        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800 font-onest">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800 font-onest">Content updated successfully!</p>
            </div>
          )}

          {/* Hero Section */}
          <div className="bg-white rounded-xl border border-[#dbeafe] shadow-sm p-6">
            <h2 className="text-lg font-onest font-bold text-[#2c254c] mb-4 flex items-center gap-2">
              <svg className="h-5 w-5 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Hero Section
            </h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="hero_heading" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
                  Hero Heading
                </label>
                <input
                  type="text"
                  id="hero_heading"
                  name="hero_heading"
                  value={formData.hero_heading}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent font-onest"
                  placeholder="Why we love what we do"
                />
              </div>

              <div>
                <label htmlFor="hero_description" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
                  Hero Description
                </label>
                <textarea
                  id="hero_description"
                  name="hero_description"
                  value={formData.hero_description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent font-onest"
                  placeholder="We believe home is where care is most meaningful..."
                />
              </div>
            </div>
          </div>

          {/* Vision & Mission */}
          <div className="bg-white rounded-xl border border-[#dbeafe] shadow-sm p-6">
            <h2 className="text-lg font-onest font-bold text-[#2c254c] mb-4 flex items-center gap-2">
              <svg className="h-5 w-5 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Vision & Mission
            </h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="vision_text" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
                  Vision Statement
                </label>
                <textarea
                  id="vision_text"
                  name="vision_text"
                  value={formData.vision_text}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent font-onest"
                  placeholder="To be Zambia's most trusted home care provider..."
                />
              </div>

              <div>
                <label htmlFor="mission_text" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
                  Mission Statement
                </label>
                <textarea
                  id="mission_text"
                  name="mission_text"
                  value={formData.mission_text}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent font-onest"
                  placeholder="Provide high-quality, flexible non-medical home care..."
                />
              </div>
            </div>
          </div>

          {/* Specialties Section - Link Card */}
          <div className="bg-gradient-to-br from-[#f0f7ff] to-[#e8f4ff] rounded-xl border border-[#bfdbfe] shadow-sm p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-onest font-bold text-[#2c254c] mb-2 flex items-center gap-2">
                  <svg className="h-5 w-5 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  Specialties Section
                </h2>
                <p className="text-sm text-[#4f4865] font-onest mb-4">
                  The specialties section (heading, description, and specialty items) is managed from the Services admin area. Changes there will update both the Services and About pages.
                </p>
                
                {/* Preview */}
                <div className="bg-white/70 rounded-lg border border-[#dbeafe] p-4">
                  <p className="text-xs uppercase tracking-wider font-onest text-[#6b7280] mb-2">Current Preview</p>
                  <h4 className="text-base font-bold text-[#181322] font-onest">{specialtiesHeader.title}</h4>
                  <p className="mt-1 text-sm text-[#4a435d] font-onest line-clamp-2">{specialtiesHeader.description}</p>
                </div>
              </div>
              
              <Link
                href="/admin/services/specialties"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1450d1] to-[#2563eb] text-white font-onest font-bold py-2.5 px-5 rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300 whitespace-nowrap"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Manage Specialties
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Team Section */}
          <div className="bg-white rounded-xl border border-[#dbeafe] shadow-sm p-6">
            <h2 className="text-lg font-onest font-bold text-[#2c254c] mb-4 flex items-center gap-2">
              <svg className="h-5 w-5 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Team Section
            </h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="team_heading" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
                  Team Section Heading
                </label>
                <input
                  type="text"
                  id="team_heading"
                  name="team_heading"
                  value={formData.team_heading}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent font-onest"
                  placeholder="Meet our professionals"
                />
              </div>

              <div>
                <label htmlFor="team_description" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
                  Team Section Description
                </label>
                <textarea
                  id="team_description"
                  name="team_description"
                  value={formData.team_description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent font-onest"
                  placeholder="Our caregivers provide personal care, companionship..."
                />
              </div>
            </div>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
