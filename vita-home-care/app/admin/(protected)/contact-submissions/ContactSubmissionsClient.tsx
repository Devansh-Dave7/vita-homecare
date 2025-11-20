'use client';

import { useState, useMemo } from 'react';
import type { ContactSubmission } from '@/lib/data/submissions';
import ExportButton from './ExportButton';
import StatusDropdown from './StatusDropdown';
import StatusTabs from './StatusTabs';
import ContactModal from './ContactModal';

type ContactSubmissionsClientProps = {
  submissions: ContactSubmission[];
};

export default function ContactSubmissionsClient({ submissions }: ContactSubmissionsClientProps) {
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'contacted' | 'closed'>('all');
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);

  // Filter submissions based on selected tab
  const filteredSubmissions = useMemo(() => {
    if (statusFilter === 'all') return submissions;
    return submissions.filter((sub) => sub.status === statusFilter);
  }, [submissions, statusFilter]);

  // Calculate counts for tabs
  const counts = useMemo(() => ({
    all: submissions.length,
    new: submissions.filter((s) => s.status === 'new').length,
    contacted: submissions.filter((s) => s.status === 'contacted').length,
    closed: submissions.filter((s) => s.status === 'closed').length,
  }), [submissions]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6f0ff] via-white to-[#f2f7ff]">
      {/* Header */}
      <header className="bg-white border-b border-[#dbeafe] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-onest font-bold text-[#2c254c]">
                Contact Form Submissions
              </h1>
              <p className="text-sm text-[#4f4865] font-onest mt-1">
                {submissions.length} total submissions
              </p>
            </div>
            <div className="flex gap-3">
              <ExportButton submissions={filteredSubmissions} type="contact" />
              <a
                href="/admin/dashboard"
                className="px-4 py-2 text-sm font-onest font-semibold text-[#1450d1] hover:text-[#3e5ab7] border border-[#dbeafe] rounded-lg hover:bg-[#f2f7ff] transition-all"
              >
                Back to Dashboard
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl border border-[#dbeafe] shadow-sm overflow-hidden">
          <div className="p-6">
            <StatusTabs onStatusChange={setStatusFilter} counts={counts} />
          </div>

          {filteredSubmissions.length === 0 ? (
            <div className="p-12 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 font-onest">
                No {statusFilter !== 'all' ? statusFilter : ''} submissions
              </h3>
              <p className="mt-2 text-sm text-gray-500 font-onest">
                {statusFilter === 'all' 
                  ? 'Contact form submissions will appear here once visitors start submitting the form.'
                  : `No ${statusFilter} submissions at the moment.`
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-onest font-semibold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-onest font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-onest font-semibold text-gray-600 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-onest font-semibold text-gray-600 uppercase tracking-wider">
                      Service Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-onest font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSubmissions.map((submission) => (
                    <tr
                      key={submission.id}
                      onClick={() => setSelectedSubmission(submission)}
                      className="hover:bg-blue-50 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-onest text-gray-900">
                        {new Date(submission.submitted_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-onest font-medium text-gray-900">
                          {submission.name}
                        </div>
                        {submission.preferred_time && (
                          <div className="text-xs font-onest text-gray-500">
                            Prefers: {submission.preferred_time}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-onest text-gray-900">{submission.email}</div>
                        <div className="text-sm font-onest text-gray-500">{submission.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-onest text-gray-900">
                        {submission.service_type || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <StatusDropdown
                          submissionId={submission.id}
                          currentStatus={submission.status}
                          type="contact"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      {selectedSubmission && (
        <ContactModal
          submission={selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
        />
      )}
    </div>
  );
}
