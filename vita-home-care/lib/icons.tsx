import React from 'react';

export type IconName =
  | 'clock'
  | 'user'
  | 'heart'
  | 'star'
  | 'shield'
  | 'home'
  | 'check'
  | 'phone'
  | 'calendar'
  | 'support';

interface IconProps { className?: string }

const iconComponents: Record<IconName, React.FC<IconProps>> = {
  clock: ({ className = 'h-6 w-6' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 11H7v-2h4V6h2v7z" />
    </svg>
  ),
  user: ({ className = 'h-6 w-6' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 12a4 4 0 100-8 4 4 0 000 8zm6 8H6v-1a5 5 0 015-5h2a5 5 0 015 5v1z" />
    </svg>
  ),
  heart: ({ className = 'h-6 w-6' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 21s-6.7-4.6-9.3-7.2C1 12.3 1 9.5 2.7 7.8c1.7-1.7 4.5-1.7 6.2 0L12 10.8l3.1-3c1.7-1.7 4.5-1.7 6.2 0 1.7 1.7 1.7 4.5 0 6.2C18.7 16.4 12 21 12 21z" />
    </svg>
  ),
  star: ({ className = 'h-6 w-6' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 17.3l-6.2 3.3 1.2-6.9L1.8 9.8l7-1 3.2-6.5 3.2 6.5 7 1-5.1 4.9 1.2 6.9z" />
    </svg>
  ),
  shield: ({ className = 'h-6 w-6' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2l7 4v6c0 5-3.8 9.3-7 10-3.2-.7-7-5-7-10V6l7-4z" />
    </svg>
  ),
  home: ({ className = 'h-6 w-6' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 3l9 8-1.5 1.7L18 11.4V20H6v-8.6l-1.5 1.3L3 11l9-8z" />
    </svg>
  ),
  check: ({ className = 'h-6 w-6' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M9 16.2l-3.5-3.5L4 14.2l5 5 12-12-1.5-1.5z" />
    </svg>
  ),
  phone: ({ className = 'h-6 w-6' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M6.6 10.8c1.2 2.3 3.3 4.3 5.6 5.6l2-2c.3-.3.8-.4 1.2-.3 1 .3 2 .5 3 .5.7 0 1.2.6 1.2 1.3v3.2c0 .7-.6 1.2-1.2 1.2C11.3 20.3 3.7 12.7 3.7 3.7c0-.7.6-1.2 1.2-1.2H8c.7 0 1.2.6 1.2 1.2 0 1 .2 2 .5 3 .1.4 0 .9-.3 1.2l-1.8 1.7z" />
    </svg>
  ),
  calendar: ({ className = 'h-6 w-6' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M7 2h2v3h6V2h2v3h3v15H4V5h3V2zm13 7H4v9h16V9z" />
    </svg>
  ),
  support: ({ className = 'h-6 w-6' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 17h-2v-2h2v2zm2.1-7.8l-.9.9c-.8.8-1.2 1.4-1.2 2.9h-2v-.5c0-1.1.5-2.1 1.2-2.8l1.2-1.3c.4-.4.6-.9.6-1.4 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.2 1.8-4 4-4s4 1.8 4 4c0 .9-.4 1.7-.9 2.3z" />
    </svg>
  ),
};

export function getIconByName(name: IconName, className?: string): React.ReactNode {
  const Icon = iconComponents[name] || iconComponents.clock;
  return <Icon className={className} />;
}

export const availableIcons: { value: IconName; label: string; description: string }[] = [
  { value: 'clock', label: 'Clock', description: '24/7 Support, Time' },
  { value: 'user', label: 'User', description: 'Personal Care, People' },
  { value: 'heart', label: 'Heart', description: 'Care, Compassion' },
  { value: 'star', label: 'Star', description: 'Quality, Excellence' },
  { value: 'shield', label: 'Shield', description: 'Protection, Safety' },
  { value: 'home', label: 'Home', description: 'Home Environment' },
  { value: 'check', label: 'Check', description: 'Verified, Approved' },
  { value: 'phone', label: 'Phone', description: 'Contact, Support' },
  { value: 'calendar', label: 'Calendar', description: 'Schedule, Availability' },
  { value: 'support', label: 'Support', description: 'Help, Assistance' },
];
