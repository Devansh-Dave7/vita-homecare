import Link from 'next/link';
import { getAllServiceCategories } from '@/lib/data/serviceCategories';
import CategoryManager from './CategoryManager';

export default async function CategoriesPage() {
  const categories = await getAllServiceCategories();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6f0ff] via-white to-[#f2f7ff]">
      {/* Header */}
      <header className="bg-white border-b border-[#dbeafe] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-onest font-bold text-[#2c254c]">
                Manage Service Categories
              </h1>
              <p className="text-sm text-[#4f4865] font-onest mt-1">
                Add, edit, or remove service categories
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
        <CategoryManager initialCategories={categories} />
      </main>
    </div>
  );
}
