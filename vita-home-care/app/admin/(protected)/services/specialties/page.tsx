import Link from 'next/link';
import { getAllServiceSpecialties } from '@/lib/data/serviceSpecialties';
import { getSpecialtiesHeader } from '@/lib/data/specialtiesHeader';
import SpecialtyManager from './SpecialtyManager';
import HeaderSettingsModal from './HeaderSettingsModal';

export default async function SpecialtiesPage() {
  const [specialties, header] = await Promise.all([
    getAllServiceSpecialties(),
    getSpecialtiesHeader(),
  ]);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#e6f0ff] via-white to-[#f2f7ff]">
      {/* Header */}
      <header className="bg-white border-b border-[#dbeafe] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-onest font-bold text-[#2c254c]">
                Manage Service Specialties
              </h1>
              <p className="text-sm text-[#4f4865] font-onest mt-1">
                Add, edit, or remove the specialties displayed on your services page
              </p>
            </div>
            <Link
              href="/admin/services"
              className="text-sm text-[#1450d1] hover:text-[#3e5ab7] font-onest font-medium"
            >
              ← Back to Services
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-5 sm:space-y-6">
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 sm:p-4">
          <div className="flex gap-3">
            <svg className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm text-blue-800 font-onest font-medium">
                What are Specialties?
              </p>
              <p className="text-[13px] sm:text-sm text-blue-700 font-onest mt-1">
                Specialties appear in the &quot;What we specialise in&quot; section on your Services page. 
                They highlight the core areas of care your company focuses on.
              </p>
            </div>
          </div>
        </div>

        {/* Header Settings (Modal trigger + preview) */}
        <HeaderSettingsModal initial={header} />

        {/* Specialties Manager */}
        <SpecialtyManager initialSpecialties={specialties} />
      </main>
    </div>
  );
}
