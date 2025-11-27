'use client';

import { useState } from 'react';
import { ServiceCategory, createServiceCategory, updateServiceCategory, deleteServiceCategory } from '@/lib/data/serviceCategories';

interface CategoryManagerProps {
  initialCategories: ServiceCategory[];
}

export default function CategoryManager({ initialCategories }: CategoryManagerProps) {
  const [categories, setCategories] = useState<ServiceCategory[]>(initialCategories);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form states
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.set('name', newName);
    formData.set('description', newDescription);

    const result = await createServiceCategory(formData);

    if (result.success && result.category) {
      setCategories([...categories, result.category]);
      setNewName('');
      setNewDescription('');
      setIsAdding(false);
      setSuccess('Category created successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } else {
      setError(result.error || 'Failed to create category');
    }

    setLoading(false);
  }

  async function handleUpdate(id: string) {
    if (!editName.trim()) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.set('name', editName);
    formData.set('description', editDescription);

    const result = await updateServiceCategory(id, formData);

    if (result.success) {
      setCategories(categories.map(cat => 
        cat.id === id 
          ? { ...cat, name: editName, slug: editName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''), description: editDescription || null }
          : cat
      ));
      setEditingId(null);
      setSuccess('Category updated successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } else {
      setError(result.error || 'Failed to update category');
    }

    setLoading(false);
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      return;
    }

    setLoading(true);
    setError(null);

    const result = await deleteServiceCategory(id);

    if (result.success) {
      setCategories(categories.filter(cat => cat.id !== id));
      setSuccess('Category deleted successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } else {
      setError(result.error || 'Failed to delete category');
    }

    setLoading(false);
  }

  function startEdit(category: ServiceCategory) {
    setEditingId(category.id);
    setEditName(category.name);
    setEditDescription(category.description || '');
    setIsAdding(false);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditName('');
    setEditDescription('');
  }

  return (
    <div className="space-y-6">
      {/* Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-800 font-onest">{error}</p>
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-800 font-onest">{success}</p>
        </div>
      )}

      {/* Add Button */}
      {!isAdding && (
        <button
          onClick={() => { setIsAdding(true); setEditingId(null); }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1450d1] to-[#2563eb] text-white font-onest font-bold py-3 px-6 rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Category
        </button>
      )}

      {/* Add Form */}
      {isAdding && (
        <div className="bg-white rounded-xl border border-[#dbeafe] shadow-sm p-6">
          <h3 className="text-lg font-onest font-bold text-[#2c254c] mb-4">Add New Category</h3>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label htmlFor="new-name" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
                Category Name *
              </label>
              <input
                type="text"
                id="new-name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-4 py-2 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent font-onest"
                placeholder="e.g., Elderly Care"
                disabled={loading}
              />
              {newName && (
                <p className="text-xs text-[#6b7280] mt-1 font-onest">
                  Slug: {newName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="new-description" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
                Description (optional)
              </label>
              <textarea
                id="new-description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full px-4 py-2 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent font-onest resize-none"
                placeholder="Brief description of this category..."
                rows={2}
                disabled={loading}
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading || !newName.trim()}
                className="px-4 py-2 bg-[#2563eb] text-white font-onest font-semibold rounded-lg hover:bg-[#1d4ed8] transition-colors disabled:opacity-50"
              >
                {loading ? 'Adding...' : 'Add Category'}
              </button>
              <button
                type="button"
                onClick={() => { setIsAdding(false); setNewName(''); setNewDescription(''); }}
                className="px-4 py-2 border border-[#dbeafe] text-[#4f4865] font-onest font-semibold rounded-lg hover:bg-[#f8fafc] transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories List */}
      <div className="bg-white rounded-xl border border-[#dbeafe] shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[#dbeafe] bg-[#f8fafc]">
          <h3 className="text-lg font-onest font-bold text-[#2c254c]">Categories ({categories.length})</h3>
        </div>

        {categories.length === 0 ? (
          <div className="p-8 text-center">
            <svg className="h-12 w-12 text-[#dbeafe] mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <p className="text-[#4f4865] font-onest">No categories yet. Add one to get started.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#dbeafe]">
            {categories.map((category) => (
              <div key={category.id} className="p-4 hover:bg-[#f8fafc] transition-colors">
                {editingId === category.id ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
                        Category Name *
                      </label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full px-4 py-2 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent font-onest"
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
                        Description
                      </label>
                      <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="w-full px-4 py-2 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent font-onest resize-none"
                        rows={2}
                        disabled={loading}
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleUpdate(category.id)}
                        disabled={loading || !editName.trim()}
                        className="px-4 py-2 bg-[#2563eb] text-white font-onest font-semibold rounded-lg hover:bg-[#1d4ed8] transition-colors disabled:opacity-50"
                      >
                        {loading ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-4 py-2 border border-[#dbeafe] text-[#4f4865] font-onest font-semibold rounded-lg hover:bg-[#f8fafc] transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-onest font-medium bg-blue-100 text-blue-800">
                          {category.slug}
                        </span>
                        <h4 className="text-base font-onest font-semibold text-[#2c254c]">
                          {category.name}
                        </h4>
                      </div>
                      {category.description && (
                        <p className="text-sm text-[#6b7280] font-onest mt-1">
                          {category.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startEdit(category)}
                        className="p-2 text-[#2563eb] hover:bg-[#e0e7ff] rounded-lg transition-colors"
                        title="Edit"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(category.id, category.name)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
