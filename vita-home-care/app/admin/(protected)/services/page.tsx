import Link from 'next/link';
import { getAllServices } from '@/lib/data/services';
import { DeleteServiceButton } from './DeleteServiceButton';

export default async function ServicesPage() {
  const services = await getAllServices();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6f0ff] via-white to-[#f2f7ff]">
      {/* Header */}
      <header className="bg-white border-b border-[#dbeafe] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-onest font-bold text-[#2c254c]">
                Manage Services
              </h1>
              <p className="text-sm text-[#4f4865] font-onest mt-1">
                Create, edit, and delete service offerings
              </p>
            </div>
            <Link
              href="/admin/dashboard"
              className="text-sm text-[#1450d1] hover:text-[#3e5ab7] font-onest font-medium"
            >
              ← Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Button */}
        <div className="mb-8">
          <Link
            href="/admin/services/new"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1450d1] to-[#2563eb] text-white font-onest font-bold py-3 px-6 rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New Service
          </Link>
        </div>

        {/* Services Grid */}
        {services.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#dbeafe] shadow-sm p-8 text-center">
            <svg className="h-12 w-12 text-[#dbeafe] mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p className="text-[#4f4865] font-onest">No services found. Create one to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-xl border border-[#dbeafe] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
                <div className="p-6 flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-onest font-medium bg-[#f2f7ff] text-[#2563eb]">
                      {service.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-onest font-bold text-[#2c254c] mb-2">
                    {service.name}
                  </h3>
                  <p className="text-sm text-[#4f4865] font-onest mb-4 line-clamp-3">
                    {service.short_description}
                  </p>
                  <p className="text-xs text-[#6b7280] font-onest font-mono bg-gray-50 px-2 py-1 rounded inline-block">
                    /{service.slug}
                  </p>
                </div>
                
                <div className="px-6 py-4 bg-[#f8fafc] border-t border-[#dbeafe] flex items-center justify-end gap-3 rounded-b-xl">
                  <Link
                    href={`/admin/services/${service.id}/edit`}
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm font-onest font-semibold text-[#1450d1] hover:bg-[#e0e7ff] rounded-lg transition-colors"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </Link>
                  <DeleteServiceButton serviceId={service.id} serviceName={service.name} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <p className="text-sm text-blue-800 font-onest">
            <strong>Total Services:</strong> {services.length}
          </p>
        </div>
      </main>
    </div>
  );
}
