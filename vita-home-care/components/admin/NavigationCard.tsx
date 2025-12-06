import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

interface NavigationCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  gradient?: string;
}

export default function NavigationCard({ 
  title, 
  description, 
  href, 
  icon: Icon,
  gradient = 'from-blue-500 to-indigo-600'
}: NavigationCardProps) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl bg-white border-2 border-gray-100 p-6 hover:border-transparent hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Gradient border effect on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`} />
      <div className="absolute inset-[2px] bg-white rounded-[14px] -z-10" />
      
      {/* Icon */}
      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${gradient} mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="h-6 w-6 text-white" strokeWidth={2.5} />
      </div>
      
      {/* Content */}
      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
        {title}
      </h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {description}
      </p>
      
      {/* Arrow indicator */}
      <div className="flex items-center text-sm font-semibold text-blue-600 group-hover:text-indigo-600 transition-colors">
        <span>Manage</span>
        <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
      </div>
    </Link>
  );
}