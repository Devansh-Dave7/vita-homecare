'use client';

import { useState, useMemo } from 'react';
import type { InquirySubmission } from '@/lib/data/submissions';
import ExportButton from '../contact-submissions/ExportButton';
import StatusDropdown from '../contact-submissions/StatusDropdown';
import StatusTabs from '../contact-submissions/StatusTabs';
import InquiryModal from './InquiryModal';

type InquirySubmissionsClientProps = {
  submissions: InquirySubmission[];
};

export default function InquirySubmissionsClient({ submissions }: InquirySubmissionsClientProps) {
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'contacted' | 'closed'>('all');
  const [selectedSubmission, setSelectedSubmission] = useState<InquirySubmission | null>(null);

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
                Inquiry Form Submissions
              </h1>
              <p className="text-sm text-[#4f4865] font-onest mt-1">
                {submissions.length} total submissions
              </p>
            </div>
            <div className="flex gap-3">
              <ExportButton submissions={filteredSubmissions} type="inquiry" />
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 font-onest">
                No {statusFilter !== 'all' ? statusFilter : ''} submissions
              </h3>
              <p className="mt-2 text-sm text-gray-500 font-onest">
                {statusFilter === 'all' 
                  ? 'Inquiry form submissions will appear here once visitors start submitting the form.'
                  : `No ${statusFilter} submissions at the moment.`
                }
              </p>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {filteredSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  onClick={() => setSelectedSubmission(submission)}
                  className="bg-white rounded-xl border-2 border-[#dbeafe] shadow-sm p-6 hover:border-[#2563eb] hover:bg-blue-50 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-onest font-bold text-[#2c254c]">
                        {submission.full_name}
                      </h3>
                      <p className="text-sm text-gray-500 font-onest mt-1">
                        {new Date(submission.submitted_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                      <div className="flex flex-wrap gap-3 mt-3 text-sm font-onest">
                        <span className="text-gray-600">{submission.email}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-600">{submission.phone}</span>
                        {submission.care_for && (
                          <>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-600">Care for: {submission.care_for}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div onClick={(e) => e.stopPropagation()}>
                      <StatusDropdown
                        submissionId={submission.id}
                        currentStatus={submission.status}
                        type="inquiry"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      {selectedSubmission && (
        <InquiryModal
          submission={selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
        />
      )}
    </div>
  );
}
