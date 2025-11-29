import Link from 'next/link';
import { getAboutPageContent, getAllStaffMembers } from '@/lib/data/about';

export default async function AboutAdminPage() {
  const content = await getAboutPageContent();
  const staffMembers = await getAllStaffMembers();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6f0ff] via-white to-[#f2f7ff]">
      {/* Header */}
      <header className="bg-white border-b border-[#dbeafe] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-onest font-bold text-[#2c254c]">
                Manage About Us Page
              </h1>
              <p className="text-sm text-[#4f4865] font-onest mt-1">
                Edit page content, gallery images, and team members
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
        {/* Quick Stats */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <p className="text-sm text-blue-800 font-onest">
              <strong>Gallery Images:</strong> 3 configured
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <p className="text-sm text-green-800 font-onest">
              <strong>Team Members:</strong> {staffMembers.length}
            </p>
          </div>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Content Management */}
          <Link
            href="/admin/about/content"
            className="group bg-white rounded-xl border border-[#dbeafe] shadow-sm hover:shadow-md transition-all duration-300 p-6"
          >
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 bg-gradient-to-br from-[#e6f0ff] to-[#f2f7ff] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="h-6 w-6 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-onest font-bold text-[#2c254c] group-hover:text-[#2563eb]">
                  Page Content
                </h3>
                <p className="text-sm text-[#4f4865] font-onest mt-1">
                  Edit headings, descriptions, vision & mission text
                </p>
                <div className="mt-4 space-y-2 text-xs text-[#6b7280] font-onest">
                  <p><strong>Hero:</strong> {content.hero_heading.substring(0, 40)}...</p>
                  <p><strong>Vision:</strong> {content.vision_text.substring(0, 40)}...</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Gallery Management */}
          <Link
            href="/admin/about/gallery"
            className="group bg-white rounded-xl border border-[#dbeafe] shadow-sm hover:shadow-md transition-all duration-300 p-6"
          >
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 bg-gradient-to-br from-[#e6f0ff] to-[#f2f7ff] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="h-6 w-6 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-onest font-bold text-[#2c254c] group-hover:text-[#2563eb]">
                  Gallery Images
                </h3>
                <p className="text-sm text-[#4f4865] font-onest mt-1">
                  Update the 3 images below the hero section
                </p>
                <div className="mt-4 flex gap-2">
                  {[content.gallery_image_1, content.gallery_image_2, content.gallery_image_3].map((img, i) => (
                    <div key={i} className="h-12 w-12 rounded-lg overflow-hidden bg-gray-100">
                      {img.url && (
                        <img src={img.url} alt={img.alt} className="h-full w-full object-cover" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Link>

          {/* Team Management */}
          <Link
            href="/admin/about/team"
            className="group bg-white rounded-xl border border-[#dbeafe] shadow-sm hover:shadow-md transition-all duration-300 p-6 md:col-span-2"
          >
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 bg-gradient-to-br from-[#e6f0ff] to-[#f2f7ff] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="h-6 w-6 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-onest font-bold text-[#2c254c] group-hover:text-[#2563eb]">
                  Team Members
                </h3>
                <p className="text-sm text-[#4f4865] font-onest mt-1">
                  Add, edit, remove, and reorder team members
                </p>
                <div className="mt-4 flex gap-2 flex-wrap">
                  {staffMembers.slice(0, 6).map((member) => (
                    <div key={member.id} className="flex items-center gap-2 bg-[#f2f7ff] rounded-full px-3 py-1">
                      {member.photo_url && (
                        <img src={member.photo_url} alt={member.name} className="h-6 w-6 rounded-full object-cover" />
                      )}
                      <span className="text-xs font-onest text-[#2c254c]">{member.name}</span>
                    </div>
                  ))}
                  {staffMembers.length > 6 && (
                    <span className="text-xs font-onest text-[#6b7280] self-center">
                      +{staffMembers.length - 6} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Preview Link */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex gap-4 items-center justify-between">
            <div className="flex gap-4">
              <svg className="h-6 w-6 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <div>
                <h3 className="font-onest font-bold text-blue-900 mb-1">
                  Preview Changes
                </h3>
                <p className="text-sm text-blue-800 font-onest">
                  See how your changes look on the live About Us page
                </p>
              </div>
            </div>
            <a
              href="/about"
              target="_blank"
              className="inline-flex items-center gap-2 bg-blue-600 text-white font-onest font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Page
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
