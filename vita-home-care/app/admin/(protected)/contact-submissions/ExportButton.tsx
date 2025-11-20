'use client';

import type { ContactSubmission, InquirySubmission } from '@/lib/data/submissions';

type ExportButtonProps = {
  submissions: ContactSubmission[] | InquirySubmission[];
  type: 'contact' | 'inquiry';
};

export default function ExportButton({ submissions, type }: ExportButtonProps) {
  const exportToCSV = () => {
    if (submissions.length === 0) {
      alert('No data to export');
      return;
    }

    let csvContent = '';
    
    if (type === 'contact') {
      const contactSubmissions = submissions as ContactSubmission[];
      csvContent = 'Date,Name,Email,Phone,Preferred Time,Service Type,Message,Status\n';
      
      contactSubmissions.forEach((sub) => {
        const row = [
          new Date(sub.submitted_at).toLocaleString(),
          sub.name,
          sub.email,
          sub.phone,
          sub.preferred_time || '',
          sub.service_type || '',
          `"${(sub.message || '').replace(/"/g, '""')}"`,
          sub.status,
        ].join(',');
        csvContent += row + '\n';
      });
    } else {
      const inquirySubmissions = submissions as InquirySubmission[];
      csvContent = 'Date,Full Name,Email,Phone,Address,Care For,Start Date,Reason,Hours Per Week,Referrer,Can Afford,Service Option,Status\n';
      
      inquirySubmissions.forEach((sub) => {
        const row = [
          new Date(sub.submitted_at).toLocaleString(),
          sub.full_name,
          sub.email,
          sub.phone,
          `"${sub.address.replace(/"/g, '""')}"`,
          sub.care_for || '',
          sub.start_date,
          sub.reason || '',
          sub.hours_per_week || '',
          sub.referrer || '',
          sub.can_afford,
          sub.service_option || '',
          sub.status,
        ].join(',');
        csvContent += row + '\n';
      });
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `${type}-submissions-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={exportToCSV}
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-onest font-semibold text-white bg-[#2563eb] hover:bg-[#1d4ed8] rounded-lg transition-all shadow-sm hover:shadow-md"
    >
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      Export to CSV
    </button>
  );
}
