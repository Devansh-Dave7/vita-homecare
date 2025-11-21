import Link from 'next/link';
import { getContactSettings } from '@/lib/data/siteSettings';
import { updateSettingsAction } from './actions';
import SettingsForm from './SettingsForm';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const settings = await getContactSettings();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6f0ff] via-white to-[#f2f7ff]">
      {/* Header */}
      <header className="bg-white border-b border-[#dbeafe] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-onest font-bold text-[#2c254c]">
                Site Settings
              </h1>
              <p className="text-sm text-[#4f4865] font-onest mt-1">
                Manage contact information and other site-wide settings
              </p>
            </div>
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center text-sm text-[#1450d1] hover:text-[#3e5ab7] font-onest font-medium transition-colors"
            >
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SettingsForm 
          initialSettings={settings}
          onSubmit={updateSettingsAction}
        />

        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
          <h3 className="text-sm font-onest font-bold text-blue-900 mb-3">Where these settings appear:</h3>
          <ul className="text-sm text-blue-800 space-y-2 font-onest">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              Homepage info cards (Call us, Email us, Visit us)
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              Contact page
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              Inquiry form
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              Footer contact information
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              Top bar (phone, email, and social media icons)
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
