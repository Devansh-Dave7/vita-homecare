import { getAdminUser } from '@/lib/auth/session';
import { signOut } from '@/lib/auth/actions';
import { getAllBlogPosts } from '@/lib/data/blog';
import { getAllServices } from '@/lib/data/services';
import { getAllTestimonials } from '@/lib/data/testimonials';
import { getAllStaffMembers } from '@/lib/data/about';
import { 
  FileText, 
  Briefcase, 
  MessageSquare, 
  Settings, 
  Home, 
  Users, 
  Mail, 
  FileCheck,
  LogOut,
  Sparkles
} from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import NavigationCard from '@/components/admin/NavigationCard';

export default async function AdminDashboardPage() {
  const adminUser = await getAdminUser();
  const blogs = await getAllBlogPosts();
  const services = await getAllServices();
  const testimonials = await getAllTestimonials();
  const staffMembers = await getAllStaffMembers();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-600 mt-0.5">
                  Welcome back, <span className="font-semibold">{adminUser?.email}</span>
                </p>
              </div>
            </div>
            <form action={signOut}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats Overview */}
        <section>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Overview</h2>
            <p className="text-sm text-gray-600 mt-1">Quick stats about your content</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Blog Posts"
              value={blogs.length}
              icon={FileText}
              gradient="from-blue-500 to-cyan-500"
            />
            <StatCard
              title="Services"
              value={services.length}
              icon={Briefcase}
              gradient="from-purple-500 to-pink-500"
            />
            <StatCard
              title="Testimonials"
              value={testimonials.length}
              icon={MessageSquare}
              gradient="from-orange-500 to-red-500"
            />
            <StatCard
              title="Team Members"
              value={staffMembers.length}
              icon={Users}
              gradient="from-green-500 to-emerald-500"
            />
          </div>
        </section>

        {/* Content Management */}
        <section>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Content Management</h2>
            <p className="text-sm text-gray-600 mt-1">Manage your website content and settings</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <NavigationCard
              title="Homepage"
              description="Edit hero section, headlines, and featured content"
              href="/admin/home"
              icon={Home}
              gradient="from-blue-500 to-indigo-600"
            />
            <NavigationCard
              title="Blog Posts"
              description={`Manage ${blogs.length} blog posts and create new content`}
              href="/admin/blogs"
              icon={FileText}
              gradient="from-cyan-500 to-blue-500"
            />
            <NavigationCard
              title="Services"
              description={`Update ${services.length} service offerings and details`}
              href="/admin/services"
              icon={Briefcase}
              gradient="from-purple-500 to-pink-500"
            />
            <NavigationCard
              title="About Us"
              description={`Manage ${staffMembers.length} team members and company info`}
              href="/admin/about"
              icon={Users}
              gradient="from-green-500 to-emerald-500"
            />
            <NavigationCard
              title="Testimonials"
              description={`View and manage ${testimonials.length} customer testimonials`}
              href="/admin/testimonials"
              icon={MessageSquare}
              gradient="from-orange-500 to-red-500"
            />
            <NavigationCard
              title="Site Settings"
              description="Update contact information and global settings"
              href="/admin/settings"
              icon={Settings}
              gradient="from-gray-600 to-gray-800"
            />
          </div>
        </section>

        {/* Form Submissions */}
        <section>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Form Submissions</h2>
            <p className="text-sm text-gray-600 mt-1">View and export customer inquiries</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NavigationCard
              title="Contact Submissions"
              description="View and export contact form submissions"
              href="/admin/contact-submissions"
              icon={Mail}
              gradient="from-indigo-500 to-purple-600"
            />
            <NavigationCard
              title="Inquiry Submissions"
              description="View and export service inquiry forms"
              href="/admin/inquiry-submissions"
              icon={FileCheck}
              gradient="from-pink-500 to-rose-500"
            />
          </div>
        </section>

        {/* Info Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-8 shadow-xl">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
          
          <div className="relative flex items-start gap-4">
            <div className="flex-shrink-0 p-3 rounded-xl bg-white/20 backdrop-blur-sm">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-2">
                Admin Panel Ready
              </h3>
              <p className="text-sm text-blue-100 leading-relaxed">
                You can now manage your website content without redeploying. Changes will reflect instantly on the live site. All CRUD interfaces are fully functional and ready to use.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}