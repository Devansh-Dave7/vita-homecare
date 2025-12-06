import AdminShell from '@/components/admin/AdminShell';
import AdminHeader from '@/components/admin/AdminHeader';
import { getHomeHeroSettings } from '@/lib/data/homeSettings';
import HomeHeroForm from '../HomeHeroForm';

export const dynamic = 'force-dynamic';

export default async function HeroSettingsPage() {
  const settings = await getHomeHeroSettings();

  return (
    <AdminShell>
      <AdminHeader />

      {/* Preview Card */}
      <div className="mb-8 bg-white rounded-xl border border-[#dbeafe] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#dbeafe]">
          <h2 className="text-lg font-onest font-bold text-[#2c254c]">Current Hero Section</h2>
          <p className="text-sm text-[#4f4865] font-onest mt-1">Preview of how the hero section appears on the homepage</p>
        </div>
        <div className="relative h-64 sm:h-80">
          <img src={settings.hero_image_url} alt="Hero preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-white/40" />
          <div className="absolute inset-0 flex items-center px-8">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#2563eb] mb-2">{settings.hero_badge}</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#181322]">
                {settings.hero_title}<br />
                {settings.hero_subtitle}
              </h2>
              <p className="mt-3 text-sm text-[#4a435d] line-clamp-3">{settings.hero_description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <HomeHeroForm initialSettings={settings} />

      {/* Info Box */}
      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
        <h3 className="text-sm font-onest font-bold text-blue-900 mb-3">About the Hero Section:</h3>
        <ul className="text-sm text-blue-800 space-y-2 font-onest">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            The hero section is the first thing visitors see on your homepage
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            Changes are cached for performance and appear immediately after saving
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            Use high-quality images (at least 1920x1080px) for best results
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            Keep text concise and compelling to capture visitor attention
          </li>
        </ul>
      </div>
    </AdminShell>
  );
}
