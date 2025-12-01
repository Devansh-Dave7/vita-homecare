'use client';

import { useState } from 'react';
import { 
  ServiceSpecialty, 
  createServiceSpecialty, 
  updateServiceSpecialty, 
  deleteServiceSpecialty,
  toggleServiceSpecialtyActive 
} from '@/lib/data/serviceSpecialties';

interface SpecialtyManagerProps {
  initialSpecialties: ServiceSpecialty[];
}

export default function SpecialtyManager({ initialSpecialties }: SpecialtyManagerProps) {
  const [specialties, setSpecialties] = useState<ServiceSpecialty[]>(initialSpecialties);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form states
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newIsActive, setNewIsActive] = useState(true);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editIsActive, setEditIsActive] = useState(true);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.set('name', newName);
    formData.set('description', newDescription);
    formData.set('is_active', newIsActive.toString());

    const result = await createServiceSpecialty(formData);

    if (result.success && result.specialty) {
      setSpecialties([...specialties, result.specialty]);
      setNewName('');
      setNewDescription('');
      setNewIsActive(true);
      setIsAdding(false);
      setSuccess('Specialty created successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } else {
      setError(result.error || 'Failed to create specialty');
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
    formData.set('is_active', editIsActive.toString());

    const result = await updateServiceSpecialty(id, formData);

    if (result.success) {
      setSpecialties(specialties.map(spec => 
        spec.id === id 
          ? { 
              ...spec, 
              name: editName, 
              slug: editName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''), 
              description: editDescription || null,
              is_active: editIsActive
            }
          : spec
      ));
      setEditingId(null);
      setSuccess('Specialty updated successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } else {
      setError(result.error || 'Failed to update specialty');
    }

    setLoading(false);
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      return;
    }

    setLoading(true);
    setError(null);

    const result = await deleteServiceSpecialty(id);

    if (result.success) {
      setSpecialties(specialties.filter(spec => spec.id !== id));
      setSuccess('Specialty deleted successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } else {
      setError(result.error || 'Failed to delete specialty');
    }

    setLoading(false);
  }

  async function handleToggleActive(id: string, currentStatus: boolean) {
    setLoading(true);
    setError(null);

    const result = await toggleServiceSpecialtyActive(id, !currentStatus);

    if (result.success) {
      setSpecialties(specialties.map(spec => 
        spec.id === id ? { ...spec, is_active: !currentStatus } : spec
      ));
      setSuccess(`Specialty ${!currentStatus ? 'activated' : 'deactivated'} successfully!`);
      setTimeout(() => setSuccess(null), 3000);
    } else {
      setError(result.error || 'Failed to toggle specialty status');
    }

    setLoading(false);
  }

  function startEdit(specialty: ServiceSpecialty) {
    setEditingId(specialty.id);
    setEditName(specialty.name);
    setEditDescription(specialty.description || '');
    setEditIsActive(specialty.is_active);
    setIsAdding(false);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditName('');
    setEditDescription('');
    setEditIsActive(true);
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
          className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-linear-to-r from-[#1450d1] to-[#2563eb] text-white font-onest font-bold py-3 px-5 rounded-lg hover:shadow-lg transition-all duration-300"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Specialty
        </button>
      )}

      {/* Add Form */}
      {isAdding && (
        <div className="bg-white rounded-xl border border-[#dbeafe] shadow-sm p-5 sm:p-6">
          <h3 className="text-lg font-onest font-bold text-[#2c254c] mb-4">Add New Specialty</h3>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label htmlFor="new-name" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
                Specialty Name *
              </label>
              <input
                type="text"
                id="new-name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-4 py-2 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent font-onest"
                placeholder="e.g., Post-surgery recovery support"
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="new-description" className="block text-sm font-onest font-semibold text-[#2c254c] mb-2">
                Description *
              </label>
              <textarea
                id="new-description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full px-4 py-2 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent font-onest resize-none"
                placeholder="Describe what this specialty covers and how you help clients..."
                rows={3}
                disabled={loading}
              />
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="new-is-active"
                checked={newIsActive}
                onChange={(e) => setNewIsActive(e.target.checked)}
                className="h-4 w-4 text-[#2563eb] border-[#dbeafe] rounded focus:ring-[#2563eb]"
                disabled={loading}
              />
              <label htmlFor="new-is-active" className="text-sm font-onest text-[#4f4865]">
                Active (visible on website)
              </label>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={loading || !newName.trim()}
                className="w-full sm:w-auto px-4 py-2.5 text-sm sm:text-base bg-[#2563eb] text-white font-onest font-semibold rounded-lg hover:bg-[#1d4ed8] transition-colors disabled:opacity-50"
              >
                {loading ? 'Adding...' : 'Add Specialty'}
              </button>
              <button
                type="button"
                onClick={() => { setIsAdding(false); setNewName(''); setNewDescription(''); setNewIsActive(true); }}
                className="w-full sm:w-auto px-4 py-2.5 text-sm sm:text-base border border-[#dbeafe] text-[#4f4865] font-onest font-semibold rounded-lg hover:bg-[#f8fafc] transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Specialties Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h3 className="text-lg font-onest font-bold text-[#2c254c]">Specialties ({specialties.length})</h3>
          <div className="flex gap-3 sm:gap-4 text-sm font-onest">
            <span className="text-green-600">{specialties.filter(s => s.is_active).length} Active</span>
            <span className="text-gray-400">{specialties.filter(s => !s.is_active).length} Inactive</span>
          </div>
        </div>

        {specialties.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#dbeafe] shadow-sm p-8 text-center">
            <svg className="h-12 w-12 text-[#dbeafe] mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <p className="text-[#4f4865] font-onest">No specialties yet. Add one to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {specialties.map((specialty) => (
              <div
                key={specialty.id}
                className={`rounded-2xl border ${specialty.is_active ? 'border-[#dbeafe] bg-white' : 'border-gray-200 bg-gray-50'} shadow-sm p-4 sm:p-5 flex flex-col gap-3`}
              >
                {editingId === specialty.id ? (
                  <>
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-onest font-semibold text-[#2c254c]">Edit Specialty</h4>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">{specialty.slug}</span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-onest font-semibold text-[#2c254c] mb-1">Name *</label>
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full px-4 py-2 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent font-onest"
                          disabled={loading}
                        />
                        {editName && (
                          <p className="text-xs text-[#6b7280] mt-1 font-onest">
                            Slug: {editName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-onest font-semibold text-[#2c254c] mb-1">Description</label>
                        <textarea
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          className="w-full px-4 py-2 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent font-onest resize-none"
                          rows={3}
                          disabled={loading}
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id={`edit-is-active-${specialty.id}`}
                          checked={editIsActive}
                          onChange={(e) => setEditIsActive(e.target.checked)}
                          className="h-4 w-4 text-[#2563eb] border-[#dbeafe] rounded focus:ring-[#2563eb]"
                          disabled={loading}
                        />
                        <label htmlFor={`edit-is-active-${specialty.id}`} className="text-sm font-onest text-[#4f4865]">Active (visible on website)</label>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 pt-1">
                        <button
                          onClick={() => handleUpdate(specialty.id)}
                          disabled={loading || !editName.trim()}
                          className="w-full sm:w-auto px-4 py-2.5 text-sm sm:text-base bg-[#2563eb] text-white font-onest font-semibold rounded-lg hover:bg-[#1d4ed8] transition-colors disabled:opacity-50"
                        >
                          {loading ? 'Saving...' : 'Save'}
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="w-full sm:w-auto px-4 py-2.5 text-sm sm:text-base border border-[#dbeafe] text-[#4f4865] font-onest font-semibold rounded-lg hover:bg-[#f8fafc] transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-base sm:text-[17px] font-onest font-semibold text-[#1f2937] truncate">{specialty.name}</h4>
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#eef2ff] text-[#374151]">{specialty.slug}</span>
                          {specialty.is_active ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-onest font-medium bg-green-100 text-green-800">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-onest font-medium bg-gray-100 text-gray-600">
                              <span className="h-1.5 w-1.5 rounded-full bg-gray-400" /> Inactive
                            </span>
                          )}
                        </div>
                        {specialty.description && (
                          <p className="text-sm text-[#4b5563] font-onest mt-2 line-clamp-5 sm:line-clamp-4">{specialty.description}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleToggleActive(specialty.id, specialty.is_active)}
                          className={`p-2 rounded-lg transition-colors ${specialty.is_active ? 'text-green-600 hover:bg-green-50' : 'text-gray-500 hover:bg-gray-100'}`}
                          title={specialty.is_active ? 'Deactivate' : 'Activate'}
                          disabled={loading}
                        >
                          {specialty.is_active ? (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          ) : (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                          )}
                        </button>
                        <button
                          onClick={() => startEdit(specialty)}
                          className="p-2 text-[#2563eb] hover:bg-[#e0e7ff] rounded-lg transition-colors"
                          title="Edit"
                          disabled={loading}
                        >
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </button>
                        <button
                          onClick={() => handleDelete(specialty.id, specialty.name)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                          disabled={loading}
                        >
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
