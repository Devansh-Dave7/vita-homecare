'use client';

import type { ContactSubmission } from '@/lib/data/submissions';
import { updateContactSubmissionStatus } from '@/lib/data/submissions';
import { useState } from 'react';
import DeleteButton from './DeleteButton';

type ContactModalProps = {
  submission: ContactSubmission;
  onClose: () => void;
};

export default function ContactModal({ submission, onClose }: ContactModalProps) {
  const [status, setStatus] = useState(submission.status);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      const result = await updateContactSubmissionStatus(submission.id, newStatus);
      if (result.success) {
        setStatus(newStatus);
      } else {
        alert('Failed to update status: ' + result.error);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'closed':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          aria-hidden="true"
          onClick={onClose}
        ></div>

        {/* Centering trick */}
        <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>

        {/* Modal panel */}
        <div className="relative inline-block transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl align-middle w-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#e6f0ff] to-[#f2f7ff] px-4 sm:px-6 py-4 border-b border-[#dbeafe]">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-onest font-bold text-[#2c254c]" id="modal-title">
                  Contact Submission Details
                </h3>
                <p className="mt-1 text-xs sm:text-sm font-onest text-[#4f4865]">
                  {new Date(submission.submitted_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 transition-colors p-1"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white px-4 sm:px-6 py-5">
            <div className="space-y-6">
              {/* Status */}
              <div>
                <label className="block text-xs font-onest font-semibold text-gray-500 uppercase mb-2">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  disabled={isUpdating}
                  className={`px-4 py-2 text-sm font-onest font-semibold rounded-lg border transition-colors ${getStatusColor(status)} ${
                    isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-80'
                  }`}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-onest font-semibold text-gray-500 uppercase mb-1">
                    Name
                  </label>
                  <p className="text-sm font-onest text-gray-900">{submission.name}</p>
                </div>

                <div>
                  <label className="block text-xs font-onest font-semibold text-gray-500 uppercase mb-1">
                    Email
                  </label>
                  <a 
                    href={`mailto:${submission.email}`}
                    className="text-sm font-onest text-[#2563eb] hover:underline"
                  >
                    {submission.email}
                  </a>
                </div>

                <div>
                  <label className="block text-xs font-onest font-semibold text-gray-500 uppercase mb-1">
                    Phone
                  </label>
                  <a 
                    href={`tel:${submission.phone}`}
                    className="text-sm font-onest text-[#2563eb] hover:underline"
                  >
                    {submission.phone}
                  </a>
                </div>

                {submission.preferred_time && (
                  <div>
                    <label className="block text-xs font-onest font-semibold text-gray-500 uppercase mb-1">
                      Preferred Time
                    </label>
                    <p className="text-sm font-onest text-gray-900">{submission.preferred_time}</p>
                  </div>
                )}
              </div>

              {/* Service Type */}
              {submission.service_type && (
                <div>
                  <label className="block text-xs font-onest font-semibold text-gray-500 uppercase mb-1">
                    Service Type
                  </label>
                  <p className="text-sm font-onest text-gray-900 capitalize">
                    {submission.service_type.replace(/-/g, ' ')}
                  </p>
                </div>
              )}

              {/* Message */}
              {submission.message && (
                <div>
                  <label className="block text-xs font-onest font-semibold text-gray-500 uppercase mb-2">
                    Message
                  </label>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-sm font-onest text-gray-900 whitespace-pre-wrap">
                      {submission.message}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <DeleteButton
              submissionId={submission.id}
              submissionName={submission.name}
              onDeleted={onClose}
            />
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 text-sm font-onest font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <a
                href={`mailto:${submission.email}`}
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-4 py-2 text-sm font-onest font-semibold text-white bg-[#2563eb] rounded-lg hover:bg-[#1d4ed8] transition-colors"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
