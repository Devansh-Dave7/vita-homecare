'use client';

import type { InquirySubmission } from '@/lib/data/submissions';
import DeleteButton from './DeleteButton';
import StatusDropdown from '../contact-submissions/StatusDropdown';

type InquiryModalProps = {
  submission: InquirySubmission;
  onClose: () => void;
};

export default function InquiryModal({ submission, onClose }: InquiryModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 sm:p-8 border-b border-[#dbeafe] flex justify-between items-start sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-2xl font-onest font-bold text-[#2c254c]">
              Inquiry Details
            </h2>
            <p className="text-sm text-[#4f4865] mt-1 font-onest">
              Submitted on {new Date(submission.submitted_at).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Personal Information */}
          <section>
            <h3 className="text-lg font-onest font-bold text-[#1450d1] mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#f8fafc] p-6 rounded-xl border border-[#dbeafe]">
              <div>
                <label className="text-xs font-bold text-[#6b7280] uppercase tracking-wider font-onest">Full Name</label>
                <p className="mt-1 text-[#2c254c] font-medium font-onest text-lg">{submission.full_name}</p>
              </div>
              <div>
                <label className="text-xs font-bold text-[#6b7280] uppercase tracking-wider font-onest">Email Address</label>
                <a href={`mailto:${submission.email}`} className="mt-1 text-[#1450d1] hover:underline font-medium font-onest block text-lg break-all">
                  {submission.email}
                </a>
              </div>
              <div>
                <label className="text-xs font-bold text-[#6b7280] uppercase tracking-wider font-onest">Phone Number</label>
                <a href={`tel:${submission.phone}`} className="mt-1 text-[#1450d1] hover:underline font-medium font-onest block text-lg">
                  {submission.phone}
                </a>
              </div>
              <div>
                <label className="text-xs font-bold text-[#6b7280] uppercase tracking-wider font-onest">Address</label>
                <p className="mt-1 text-[#2c254c] font-medium font-onest text-lg">{submission.address || 'Not provided'}</p>
              </div>
            </div>
          </section>

          {/* Care Details */}
          <section>
            <h3 className="text-lg font-onest font-bold text-[#1450d1] mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Care Details
            </h3>
            <div className="bg-[#f8fafc] p-6 rounded-xl border border-[#dbeafe] space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {submission.care_for && (
                  <div>
                    <label className="text-xs font-bold text-[#6b7280] uppercase tracking-wider font-onest">Care For</label>
                    <p className="mt-1 text-[#2c254c] font-medium font-onest text-lg">{submission.care_for}</p>
                  </div>
                )}
                <div>
                  <label className="text-xs font-bold text-[#6b7280] uppercase tracking-wider font-onest">Start Date Needed</label>
                  <p className="mt-1 text-[#2c254c] font-medium font-onest text-lg">{submission.start_date}</p>
                </div>
                {submission.hours_per_week && (
                  <div>
                    <label className="text-xs font-bold text-[#6b7280] uppercase tracking-wider font-onest">Hours Per Week</label>
                    <p className="mt-1 text-[#2c254c] font-medium font-onest text-lg">{submission.hours_per_week}</p>
                  </div>
                )}
                {submission.referrer && (
                  <div>
                    <label className="text-xs font-bold text-[#6b7280] uppercase tracking-wider font-onest">Referred By</label>
                    <p className="mt-1 text-[#2c254c] font-medium font-onest text-lg">{submission.referrer}</p>
                  </div>
                )}
              </div>
              
              {submission.reason && (
                <div>
                  <label className="text-xs font-bold text-[#6b7280] uppercase tracking-wider font-onest">Reason for Care</label>
                  <div className="mt-2 p-4 bg-white rounded-lg border border-[#dbeafe] text-[#4f4865] font-onest leading-relaxed whitespace-pre-wrap">
                    {submission.reason}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Budget & Service Preferences */}
          <section>
            <h3 className="text-lg font-onest font-bold text-[#1450d1] mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Budget & Service Preferences
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#f8fafc] p-6 rounded-xl border border-[#dbeafe]">
              <div>
                <label className="text-xs font-bold text-[#6b7280] uppercase tracking-wider font-onest">Budget Affordability</label>
                <p className="mt-1 text-[#2c254c] font-medium font-onest text-lg">{submission.can_afford}</p>
              </div>
              {submission.service_option && (
                <div>
                  <label className="text-xs font-bold text-[#6b7280] uppercase tracking-wider font-onest">Preferred Service Option</label>
                  <p className="mt-1 text-[#2c254c] font-medium font-onest text-lg">{submission.service_option}</p>
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="p-6 sm:p-8 border-t border-[#dbeafe] bg-gray-50 rounded-b-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-sm font-medium text-[#4f4865] font-onest">Status:</span>
            <StatusDropdown
              submissionId={submission.id}
              currentStatus={submission.status}
              type="inquiry"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <DeleteButton 
              submissionId={submission.id} 
              submissionName={submission.full_name}
              onDeleted={() => {
                onClose();
              }}
            />
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-white border border-[#dbeafe] text-[#4f4865] font-onest font-semibold rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto"
            >
              Close
            </button>
            <a
              href={`mailto:${submission.email}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-onest font-semibold text-white bg-[#1450d1] rounded-lg hover:bg-[#1d4ed8] transition-colors w-full sm:w-auto"
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
  );
}