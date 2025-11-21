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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-onest font-bold text-[#2c254c]">
                Inquiry Form Submissions
              </h1>
              <p className="text-sm text-[#4f4865] font-onest mt-1">
                {submissions.length} total submissions
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <ExportButton submissions={filteredSubmissions} type="inquiry" />
              <a
                href="/admin/dashboard"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-onest font-semibold text-[#1450d1] hover:text-[#3e5ab7] border border-[#dbeafe] rounded-lg hover:bg-[#f2f7ff] transition-all"
              >
                Back to Dashboard
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-[#dbeafe] shadow-sm p-1">
            <StatusTabs onStatusChange={setStatusFilter} counts={counts} />
          </div>

          {filteredSubmissions.length === 0 ? (
            <div className="bg-white rounded-xl border border-[#dbeafe] shadow-sm p-12 text-center">
              <svg
                className="mx-auto h-12 w-12 text-[#dbeafe]"
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
              <h3 className="mt-4 text-lg font-bold text-[#2c254c] font-onest">
                No {statusFilter !== 'all' ? statusFilter : ''} submissions
              </h3>
              <p className="mt-2 text-sm text-[#4f4865] font-onest">
                {statusFilter === 'all' 
                  ? 'Inquiry form submissions will appear here once visitors start submitting the form.'
                  : `No ${statusFilter} submissions at the moment.`
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  onClick={() => setSelectedSubmission(submission)}
                  className="bg-white rounded-xl border border-[#dbeafe] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col group"
                >
                  <div className="p-6 flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-onest font-medium text-[#6b7280]">
                          {new Date(submission.submitted_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                        <span className="text-xs font-onest text-[#9ca3af]">
                          {new Date(submission.submitted_at).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <div onClick={(e) => e.stopPropagation()}>
                        <StatusDropdown
                          submissionId={submission.id}
                          currentStatus={submission.status}
                          type="inquiry"
                        />
                      </div>
                    </div>

                    <h3 className="text-lg font-onest font-bold text-[#2c254c] mb-1 group-hover:text-[#1450d1] transition-colors">
                      {submission.full_name}
                    </h3>
                    
                    {submission.care_for && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 mb-4">
                        Care for: {submission.care_for}
                      </span>
                    )}

                    <div className="space-y-2 mt-2">
                      <div className="flex items-center gap-2 text-sm text-[#4f4865] font-onest">
                        <svg className="w-4 h-4 text-[#9ca3af]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="truncate">{submission.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#4f4865] font-onest">
                        <svg className="w-4 h-4 text-[#9ca3af]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>{submission.phone}</span>
                      </div>
                      {submission.service_option && (
                        <div className="flex items-center gap-2 text-sm text-[#4f4865] font-onest">
                          <svg className="w-4 h-4 text-[#9ca3af]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          <span className="truncate">{submission.service_option}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="px-6 py-4 bg-[#f8fafc] border-t border-[#dbeafe] flex items-center justify-between rounded-b-xl">
                    <span className="text-xs font-onest font-medium text-[#1450d1] group-hover:underline">
                      View Details
                    </span>
                    <svg className="w-4 h-4 text-[#1450d1] transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
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
