'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { SpecialtiesHeader, updateSpecialtiesHeader } from '@/lib/data/specialtiesHeader';

export default function HeaderSettingsModal({ initial }: { initial: SpecialtiesHeader }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(initial.title);
  const [description, setDescription] = useState(initial.description);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (!open) {
      // Reset messages when closing
      setError(null);
      setSuccess(null);
      setTitle(initial.title);
      setDescription(initial.description);
    }
  }, [open, initial.title, initial.description]);

  function onSave(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const fd = new FormData();
      fd.set('title', title);
      fd.set('description', description);
      const res = await updateSpecialtiesHeader(fd);
      if (res.success) {
        setSuccess('Saved');
        // Close after a small delay
        setTimeout(() => {
          setOpen(false);
          setSuccess(null);
        }, 500);
      } else {
        setError(res.error || 'Failed to save');
      }
    });
  }

  return (
    <div className="bg-white border border-[#dbeafe] rounded-2xl p-4 sm:p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h3 className="text-base sm:text-lg font-onest font-bold text-[#1f2937]">Specialties Section Header</h3>
          <p className="text-sm text-[#6b7280] mt-1 font-onest">This controls the heading and description above specialties on the Services page.</p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-linear-to-r from-[#1450d1] to-[#2563eb] text-white font-onest font-bold py-2.5 px-4 rounded-lg hover:shadow-lg transition-all"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
          Edit Header
        </button>
      </div>

      {/* Preview */}
      <div className="mt-4 rounded-xl border border-[#e5e7eb] bg-[#fafafa] p-4">
        <p className="text-[13px] uppercase tracking-widest font-onest text-[#6b7280]">Preview</p>
        <h4 className="mt-2 text-lg sm:text-xl font-bold text-[#181322] font-onest">{title}</h4>
        <p className="mt-1 text-[14px] sm:text-[15px] text-[#4a435d] font-onest">{description}</p>
      </div>

      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div ref={dialogRef} className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-[#e5e7eb] mx-auto">
              <div className="px-5 sm:px-6 py-3 sm:py-4 border-b border-[#e5e7eb] flex items-center justify-between">
                <h4 className="text-lg font-onest font-bold text-[#1f2937]">Edit Header</h4>
                <button onClick={() => setOpen(false)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg" aria-label="Close">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
              <form onSubmit={onSave} className="px-5 sm:px-6 py-4 space-y-4">
                {error && <div className="text-sm text-red-600">{error}</div>}
                {success && <div className="text-sm text-green-600">{success}</div>}
                <div>
                  <label className="block text-sm font-onest font-semibold text-[#2c254c] mb-1">Heading *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent font-onest"
                    placeholder="What we specialise in"
                  />
                </div>
                <div>
                  <label className="block text-sm font-onest font-semibold text-[#2c254c] mb-1">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2.5 border border-[#dbeafe] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent font-onest resize-y"
                    placeholder="A short paragraph shown under the heading"
                  />
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="w-full sm:w-auto px-4 py-2.5 border border-[#e5e7eb] rounded-lg text-[#374151] font-onest font-semibold hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPending || !title.trim()}
                    className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-linear-to-r from-[#1450d1] to-[#2563eb] text-white font-onest font-bold py-2.5 px-4 rounded-lg hover:shadow-lg transition-all disabled:opacity-60"
                  >
                    {isPending ? 'Saving…' : 'Save Header'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
