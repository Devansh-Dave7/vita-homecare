'use client';

import { useState, useTransition } from 'react';
import { SpecialtiesHeader, updateSpecialtiesHeader } from '@/lib/data/specialtiesHeader';

export default function HeaderSettingsCard({ initial }: { initial: SpecialtiesHeader }) {
  const [title, setTitle] = useState(initial.title);
  const [description, setDescription] = useState(initial.description);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function onSave(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const fd = new FormData();
      fd.set('title', title);
      fd.set('description', description);
      const res = await updateSpecialtiesHeader(fd);
      if (res.success) {
        setSuccess('Header updated');
        setTimeout(() => setSuccess(null), 2500);
      } else {
        setError(res.error || 'Failed to update');
      }
    });
  }

  return (
    <div className="bg-white border border-[#dbeafe] rounded-2xl p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-onest font-bold text-[#1f2937]">Specialties Section Header</h3>
          <p className="text-sm text-[#6b7280] mt-1 font-onest">Controls the heading and description shown above the specialties on the Services page.</p>
        </div>
        {success && <span className="text-xs font-semibold text-green-600">{success}</span>}
        {error && <span className="text-xs font-semibold text-red-600">{error}</span>}
      </div>

      <form onSubmit={onSave} className="mt-4 grid gap-4">
        <div>
          <label className="block text-sm font-onest font-semibold text-[#2c254c] mb-1">Heading *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent font-onest"
            placeholder="What we specialise in"
          />
        </div>
        <div>
          <label className="block text-sm font-onest font-semibold text-[#2c254c] mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent font-onest resize-y"
            placeholder="A short paragraph shown under the heading"
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isPending || !title.trim()}
            className="inline-flex items-center gap-2 bg-linear-to-r from-[#1450d1] to-[#2563eb] text-white font-onest font-bold py-2.5 px-5 rounded-lg hover:shadow-lg transition-all disabled:opacity-60"
          >
            {isPending ? 'Saving…' : 'Save Header'}
          </button>
        </div>
      </form>
    </div>
  );
}
