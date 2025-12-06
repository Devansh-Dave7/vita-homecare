import Link from 'next/link';
import { getAllServices } from '@/lib/data/services';
import { DeleteServiceButton } from './DeleteServiceButton';
import { Plus, Tag, Shield, ArrowLeft, Briefcase } from 'lucide-react';

export default async function ServicesPage() {
  const services = await getAllServices();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-xl bg-gradient-to-br from-[#2563eb] to-[#1d5be1] shadow-lg">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                  Manage Services
                </h1>
                <p className="text-sm text-gray-600 mt-0.5">
                  Create, edit, and organize your service offerings
                </p>
              </div>
            </div>
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow"
            >
              <ArrowLeft className="h-4 w-4" />
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Action Buttons */}
        <section>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
            <p className="text-sm text-gray-600 mt-1">Manage services, categories, and specialties</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/admin/services/new"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2563eb] to-[#1d5be1] p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                  <Plus className="h-6 w-6 text-white" strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">Create New Service</h3>
                  <p className="text-sm text-blue-100 mt-0.5">Add a new service offering</p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/services/categories"
              className="group relative overflow-hidden rounded-2xl bg-white border-2 border-[#2563eb] p-6 hover:border-transparent hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb] to-[#1d5be1] opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              <div className="absolute inset-[2px] bg-white rounded-[14px] -z-10" />
              <div className="relative flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-[#2563eb] to-[#1d5be1] group-hover:bg-white/20 transition-colors">
                  <Tag className="h-6 w-6 text-white" strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-black transition-colors">Manage Categories</h3>
                  <p className="text-sm text-gray-600 group-hover:text-black mt-0.5 transition-colors">Organize service types</p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/services/specialties"
              className="group relative overflow-hidden rounded-2xl bg-white border-2 border-emerald-500 p-6 hover:border-transparent hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              <div className="absolute inset-[2px] bg-white rounded-[14px] -z-10" />
              <div className="relative flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 group-hover:bg-white/20 transition-colors">
                  <Shield className="h-6 w-6 text-white" strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-black transition-colors">Manage Specialties</h3>
                  <p className="text-sm text-gray-600 group-hover:text-black mt-0.5 transition-colors">Configure specialty areas</p>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Services Grid */}
        <section>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">All Services</h2>
            <p className="text-sm text-gray-600 mt-1">
              {services.length} {services.length === 1 ? 'service' : 'services'} available
            </p>
          </div>

          {services.length === 0 ? (
            <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 shadow-sm p-12 text-center">
              <div className="inline-flex p-4 rounded-2xl bg-gray-50 mb-4">
                <Briefcase className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">No services yet</h3>
              <p className="text-gray-600 mb-6">Get started by creating your first service offering</p>
              <Link
                href="/admin/services/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2563eb] to-[#1d5be1] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <Plus className="h-5 w-5" />
                Create First Service
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div 
                  key={service.id} 
                  className="group relative overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  {/* Gradient accent on hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2563eb] to-[#1d5be1] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  
                  <div className="p-6 flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-50 to-indigo-50 text-[#2563eb] border border-blue-100">
                        {service.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#2563eb] transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                      {service.short_description}
                    </p>
                    <div className="inline-flex items-center gap-2 text-xs text-gray-500 font-mono bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                      <span className="text-gray-400">/</span>
                      {service.slug}
                    </div>
                  </div>
                  
                  <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/services/${service.id}/edit`}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#2563eb] hover:bg-blue-50 rounded-xl transition-all duration-200"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </Link>
                    <DeleteServiceButton serviceId={service.id} serviceName={service.name} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Summary Card */}
        {services.length > 0 && (
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2563eb] to-[#1d5be1] p-8 shadow-xl">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
            
            <div className="relative flex items-center gap-4">
              <div className="flex-shrink-0 p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-blue-100 font-medium">Total Services</p>
                <p className="text-3xl font-bold text-white mt-1">{services.length}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
