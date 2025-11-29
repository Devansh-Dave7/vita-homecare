import Link from 'next/link';
import { getAllStaffMembers } from '@/lib/data/about';
import DeleteStaffButton from '@/components/admin/DeleteStaffButton';

export default async function TeamManagementPage() {
  const staffMembers = await getAllStaffMembers();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6f0ff] via-white to-[#f2f7ff]">
      {/* Header */}
      <header className="bg-white border-b border-[#dbeafe] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-onest font-bold text-[#2c254c]">
                Manage Team Members
              </h1>
              <p className="text-sm text-[#4f4865] font-onest mt-1">
                Add, edit, and organize your team
              </p>
            </div>
            <Link
              href="/admin/about"
              className="text-sm text-[#1450d1] hover:text-[#3e5ab7] font-onest font-medium"
            >
              ← Back
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Button */}
        <div className="mb-8">
          <Link
            href="/admin/about/team/new"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1450d1] to-[#2563eb] text-white font-onest font-bold py-3 px-6 rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Team Member
          </Link>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <p className="text-sm text-blue-800 font-onest">
              <strong>Total Team Members:</strong> {staffMembers.length}
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <p className="text-sm text-green-800 font-onest">
              <strong>Displayed on About Page:</strong> All members are visible
            </p>
          </div>
        </div>

        {/* Team Members List */}
        {staffMembers.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#dbeafe] shadow-sm p-8 text-center">
            <svg className="h-12 w-12 text-[#dbeafe] mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-[#4f4865] font-onest">No team members found. Add one to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staffMembers.map((member, index) => (
              <div key={member.id} className="bg-white rounded-xl border border-[#dbeafe] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                {/* Order Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="flex items-center justify-center w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full text-[#2563eb] text-sm font-bold shadow-sm border border-[#dbeafe]">
                    {index + 1}
                  </span>
                </div>

                {/* Photo */}
                <div className="relative aspect-square bg-gray-100">
                  {member.photo_url ? (
                    <img
                      src={member.photo_url}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <svg className="h-20 w-20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-onest font-bold text-[#2c254c]">
                    {member.name}
                  </h3>
                  {member.role && (
                    <p className="text-sm text-[#2563eb] font-onest font-medium mt-1">
                      {member.role}
                    </p>
                  )}
                  {member.bio_markdown && (
                    <p className="text-sm text-[#6b7280] font-onest mt-2 line-clamp-2">
                      {member.bio_markdown}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="border-t border-[#dbeafe] mt-4 pt-4 flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/about/team/${member.id}/edit`}
                      className="inline-flex items-center gap-2 px-3 py-2 text-sm font-onest font-semibold text-[#1450d1] hover:bg-[#e0e7ff] rounded-lg transition-colors"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </Link>
                    <DeleteStaffButton
                      memberId={member.id}
                      memberName={member.name}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Banner */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex gap-4">
            <svg className="h-6 w-6 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-onest font-bold text-blue-900 mb-1">
                Team Display Order
              </h3>
              <p className="text-sm text-blue-800 font-onest">
                Team members are displayed in the order they were added. The number badge shows their position on the About page.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
