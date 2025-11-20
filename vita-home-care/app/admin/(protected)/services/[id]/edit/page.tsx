import Link from 'next/link';
import { getServiceById } from '@/lib/data/services';
import { ServiceForm } from '../../ServiceForm';
import { notFound } from 'next/navigation';

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let service;
  try {
    service = await getServiceById(id);
  } catch (error) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6f0ff] via-white to-[#f2f7ff]">
      {/* Header */}
      <header className="bg-white border-b border-[#dbeafe] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-onest font-bold text-[#2c254c]">
                Edit Service
              </h1>
              <p className="text-sm text-[#4f4865] font-onest mt-1">
                {service.name}
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ServiceForm service={service} isEditing={true} />
      </main>
    </div>
  );
}
