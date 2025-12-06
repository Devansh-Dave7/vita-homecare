import Link from 'next/link';
import { getHomeHeroSettings } from '@/lib/data/homeSettings';
import AdminShell from '@/components/admin/AdminShell';
import AdminHeader from '@/components/admin/AdminHeader';

export const dynamic = 'force-dynamic';

export default async function HomeSettingsPage() {
  const settings = await getHomeHeroSettings();

  return (
    <AdminShell>
      <AdminHeader />

      {/* Navigation Tiles */}
      <section aria-labelledby="home-sections" className="mt-6">
        <h2 id="home-sections" className="sr-only">Homepage sections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          <Link href="/admin/home/hero" className="group block overflow-hidden rounded-lg border border-[#e5edff] bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1.5">
                  <h3 className="text-base sm:text-lg font-onest font-semibold text-[#1f2747]">Manage Hero</h3>
                  <p className="text-xs sm:text-sm text-[#5a617a] font-onest">Update heading, description and hero image</p>
                </div>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-[#eef4ff] text-[#2563eb] group-hover:bg-[#e3ecff]">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>

          <Link href="/admin/home/why-choose-us" className="group block overflow-hidden rounded-lg border border-[#e5edff] bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1.5">
                  <h3 className="text-base sm:text-lg font-onest font-semibold text-[#1f2747]">Manage Why Choose Us</h3>
                  <p className="text-xs sm:text-sm text-[#5a617a] font-onest">Edit four points, icons, buttons, and images</p>
                </div>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-[#eef4ff] text-[#2563eb] group-hover:bg-[#e3ecff]">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Info Box */}
      <div className="mt-6 lg:mt-8">
        <div className="rounded-lg border border-[#e5edff] bg-[#f5f9ff] p-4 sm:p-5">
          <h3 className="text-sm font-onest font-semibold text-[#11315b] mb-1.5">Tip</h3>
          <p className="text-xs sm:text-sm text-[#2e4b73] font-onest">Choose a section above to edit. Changes are cached and revalidated automatically for fast loads.</p>
        </div>
      </div>
    </AdminShell>
  );
}
