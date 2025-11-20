'use client';

import { updateContactSubmissionStatus, updateInquirySubmissionStatus } from '@/lib/data/submissions';
import { useState } from 'react';

type StatusDropdownProps = {
  submissionId: string;
  currentStatus: string;
  type: 'contact' | 'inquiry';
};

export default function StatusDropdown({ submissionId, currentStatus, type }: StatusDropdownProps) {
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      const updateFn = type === 'contact' 
        ? updateContactSubmissionStatus 
        : updateInquirySubmissionStatus;
      
      const result = await updateFn(submissionId, newStatus);
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
    <select
      value={status}
      onChange={(e) => handleStatusChange(e.target.value)}
      disabled={isUpdating}
      className={`px-3 py-1.5 text-sm font-onest font-semibold rounded-lg border transition-colors ${getStatusColor(status)} ${
        isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-80'
      }`}
    >
      <option value="new">New</option>
      <option value="contacted">Contacted</option>
      <option value="closed">Closed</option>
    </select>
  );
}
