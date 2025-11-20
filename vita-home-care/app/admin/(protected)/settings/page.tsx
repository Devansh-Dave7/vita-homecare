import { getContactSettings } from '@/lib/data/siteSettings';
import { updateSettingsAction } from './actions';
import SettingsForm from './SettingsForm';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const settings = await getContactSettings();

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>
          <p className="mt-2 text-gray-600">
            Manage contact information and other site-wide settings. Changes will be reflected immediately on the website.
          </p>
        </div>

        <SettingsForm 
          initialSettings={settings}
          onSubmit={updateSettingsAction}
        />

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">Where these settings appear:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Homepage info cards (Call us, Email us, Visit us)</li>
            <li>• Contact page</li>
            <li>• Inquiry form</li>
            <li>• Footer contact information</li>
            <li>• Top bar (phone, email, and social media icons)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
