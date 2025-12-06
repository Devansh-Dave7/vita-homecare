import AdminShell from '@/components/admin/AdminShell';
import AdminHeader from '@/components/admin/AdminHeader';
import WhyChooseUsForm from './WhyChooseUsForm';
import { getWhyChooseUsSettings } from '@/lib/data/whyChooseUsSettings';

export default async function Page() {
  const settings = await getWhyChooseUsSettings();

  return (
    <AdminShell>
      <AdminHeader title="Manage Why Choose Us" description="Edit heading, features, buttons, and images" />
      <div className="grid grid-cols-1 gap-6">
        <WhyChooseUsForm initialSettings={settings} />
      </div>
    </AdminShell>
  );
}
