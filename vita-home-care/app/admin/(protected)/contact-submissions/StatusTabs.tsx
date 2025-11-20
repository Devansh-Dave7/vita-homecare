'use client';

import { useState } from 'react';

type StatusTabsProps = {
  onStatusChange: (status: 'all' | 'new' | 'contacted' | 'closed') => void;
  counts: {
    all: number;
    new: number;
    contacted: number;
    closed: number;
  };
};

export default function StatusTabs({ onStatusChange, counts }: StatusTabsProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'new' | 'contacted' | 'closed'>('all');

  const tabs = [
    { key: 'all' as const, label: 'All', count: counts.all },
    { key: 'new' as const, label: 'New', count: counts.new },
    { key: 'contacted' as const, label: 'Contacted', count: counts.contacted },
    { key: 'closed' as const, label: 'Closed', count: counts.closed },
  ];

  const handleTabClick = (key: 'all' | 'new' | 'contacted' | 'closed') => {
    setActiveTab(key);
    onStatusChange(key);
  };

  return (
    <div className="border-b border-gray-200 mb-6">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTabClick(tab.key)}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-onest font-medium text-sm transition-colors
              ${
                activeTab === tab.key
                  ? 'border-[#2563eb] text-[#2563eb]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            {tab.label}
            <span
              className={`ml-2 py-0.5 px-2.5 rounded-full text-xs font-onest font-semibold
                ${
                  activeTab === tab.key
                    ? 'bg-[#dbeafe] text-[#2563eb]'
                    : 'bg-gray-100 text-gray-600'
                }
              `}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}
