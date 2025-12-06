import { getAdminUser } from '@/lib/auth/session';
import { signOut } from '@/lib/auth/actions';
import { getAllBlogPosts } from '@/lib/data/blog';
import { getAllServices } from '@/lib/data/services';
import { getAllTestimonials } from '@/lib/data/testimonials';
import { getAllStaffMembers } from '@/lib/data/about';

export default async function AdminDashboardPage() {
  const adminUser = await getAdminUser();
  const blogs = await getAllBlogPosts();
  const services = await getAllServices();
  const testimonials = await getAllTestimonials();
  const staffMembers = await getAllStaffMembers();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6f0ff] via-white to-[#f2f7ff]">
      {/* Header */}
      <header className="bg-white border-b border-[#dbeafe] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-onest font-bold text-[#2c254c]">
                Admin Dashboard
              </h1>
              <p className="text-sm text-[#4f4865] font-onest mt-1">
                Welcome back, {adminUser?.email}
              </p>
            </div>
            <form action={signOut}>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-onest font-semibold text-[#1450d1] hover:text-[#3e5ab7] border border-[#dbeafe] rounded-lg hover:bg-[#f2f7ff] transition-all"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-[#dbeafe] p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-onest font-medium text-[#4f4865]">Total Blog Posts</p>
                <p className="text-3xl font-onest font-bold text-[#2c254c] mt-2">{blogs.length}</p>
              </div>
              <div className="h-12 w-12 bg-gradient-to-br from-[#e6f0ff] to-[#f2f7ff] rounded-lg flex items-center justify-center">
                <svg className="h-6 w-6 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#dbeafe] p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-onest font-medium text-[#4f4865]">Total Services</p>
                <p className="text-3xl font-onest font-bold text-[#2c254c] mt-2">{services.length}</p>
              </div>
              <div className="h-12 w-12 bg-gradient-to-br from-[#e6f0ff] to-[#f2f7ff] rounded-lg flex items-center justify-center">
                <svg className="h-6 w-6 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#dbeafe] p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-onest font-medium text-[#4f4865]">Total Testimonials</p>
                <p className="text-3xl font-onest font-bold text-[#2c254c] mt-2">{testimonials.length}</p>
              </div>
              <div className="h-12 w-12 bg-gradient-to-br from-[#e6f0ff] to-[#f2f7ff] rounded-lg flex items-center justify-center">
                <svg className="h-6 w-6 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#dbeafe] p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-onest font-medium text-[#4f4865]">Site Settings</p>
                <p className="text-3xl font-onest font-bold text-[#2c254c] mt-2">✓</p>
              </div>
              <div className="h-12 w-12 bg-gradient-to-br from-[#e6f0ff] to-[#f2f7ff] rounded-lg flex items-center justify-center">
                <svg className="h-6 w-6 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-[#dbeafe] shadow-sm p-6">
          <h2 className="text-xl font-onest font-bold text-[#2c254c] mb-6">
            Content Management
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <a
              href="/admin/home"
              className="group p-6 border-2 border-[#dbeafe] rounded-xl hover:border-[#2563eb] hover:bg-[#f2f7ff] transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-gradient-to-br from-[#e6f0ff] to-[#f2f7ff] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="h-6 w-6 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-onest font-bold text-[#2c254c] group-hover:text-[#2563eb]">
                    Homepage
                  </h3>
                  <p className="text-sm text-[#4f4865] font-onest">
                    Edit hero section
                  </p>
                </div>
              </div>
            </a>

            <a
              href="/admin/blogs"
              className="group p-6 border-2 border-[#dbeafe] rounded-xl hover:border-[#2563eb] hover:bg-[#f2f7ff] transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-gradient-to-br from-[#e6f0ff] to-[#f2f7ff] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="h-6 w-6 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-onest font-bold text-[#2c254c] group-hover:text-[#2563eb]">
                    Manage Blogs
                  </h3>
                  <p className="text-sm text-[#4f4865] font-onest">
                    Create and edit posts
                  </p>
                </div>
              </div>
            </a>

            <a
              href="/admin/services"
              className="group p-6 border-2 border-[#dbeafe] rounded-xl hover:border-[#2563eb] hover:bg-[#f2f7ff] transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-gradient-to-br from-[#e6f0ff] to-[#f2f7ff] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="h-6 w-6 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-onest font-bold text-[#2c254c] group-hover:text-[#2563eb]">
                    Manage Services
                  </h3>
                  <p className="text-sm text-[#4f4865] font-onest">
                    Update service offerings
                  </p>
                </div>
              </div>
            </a>

            <a
              href="/admin/about"
              className="group p-6 border-2 border-[#dbeafe] rounded-xl hover:border-[#2563eb] hover:bg-[#f2f7ff] transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-gradient-to-br from-[#e6f0ff] to-[#f2f7ff] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="h-6 w-6 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-onest font-bold text-[#2c254c] group-hover:text-[#2563eb]">
                    About Us Page
                  </h3>
                  <p className="text-sm text-[#4f4865] font-onest">
                    {staffMembers.length} team members
                  </p>
                </div>
              </div>
            </a>

            <a
              href="/admin/testimonials"
              className="group p-6 border-2 border-[#dbeafe] rounded-xl hover:border-[#2563eb] hover:bg-[#f2f7ff] transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-gradient-to-br from-[#e6f0ff] to-[#f2f7ff] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="h-6 w-6 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-onest font-bold text-[#2c254c] group-hover:text-[#2563eb]">
                    Manage Testimonials
                  </h3>
                  <p className="text-sm text-[#4f4865] font-onest">
                    Add customer feedback
                  </p>
                </div>
              </div>
            </a>

            <a
              href="/admin/settings"
              className="group p-6 border-2 border-[#dbeafe] rounded-xl hover:border-[#2563eb] hover:bg-[#f2f7ff] transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-gradient-to-br from-[#e6f0ff] to-[#f2f7ff] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="h-6 w-6 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-onest font-bold text-[#2c254c] group-hover:text-[#2563eb]">
                    Site Settings
                  </h3>
                  <p className="text-sm text-[#4f4865] font-onest">
                    Update contact info
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Form Submissions Section */}
        <div className="bg-white rounded-xl border border-[#dbeafe] shadow-sm p-6 mt-8">
          <h2 className="text-xl font-onest font-bold text-[#2c254c] mb-6">
            Form Submissions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/admin/contact-submissions"
              className="group p-6 border-2 border-[#dbeafe] rounded-xl hover:border-[#2563eb] hover:bg-[#f2f7ff] transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-gradient-to-br from-[#e6f0ff] to-[#f2f7ff] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="h-6 w-6 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-onest font-bold text-[#2c254c] group-hover:text-[#2563eb]">
                    Contact Submissions
                  </h3>
                  <p className="text-sm text-[#4f4865] font-onest">
                    View and export contact forms
                  </p>
                </div>
              </div>
            </a>

            <a
              href="/admin/inquiry-submissions"
              className="group p-6 border-2 border-[#dbeafe] rounded-xl hover:border-[#2563eb] hover:bg-[#f2f7ff] transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-gradient-to-br from-[#e6f0ff] to-[#f2f7ff] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="h-6 w-6 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-onest font-bold text-[#2c254c] group-hover:text-[#2563eb]">
                    Inquiry Submissions
                  </h3>
                  <p className="text-sm text-[#4f4865] font-onest">
                    View and export inquiry forms
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex gap-4">
            <svg className="h-6 w-6 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-onest font-bold text-blue-900 mb-1">
                Admin Panel Ready
              </h3>
              <p className="text-sm text-blue-800 font-onest">
                You can now manage your website content without redeploying. Changes will reflect instantly on the live site. CRUD interfaces coming next!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
