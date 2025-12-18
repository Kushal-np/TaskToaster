import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  color?: 'gray' | 'green' | 'yellow' | 'blue' | 'red';
  className?: string;
}

const Badge = ({ children, color = 'gray', className = '' }: BadgeProps) => {
  const colorClasses = {
    gray: 'bg-gray-100 text-gray-800',
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    blue: 'bg-blue-100 text-blue-800',
    red: 'bg-red-100 text-red-800',
  };

  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClasses[color]} ${className}`}>{children}</span>;
};

export default Badge;