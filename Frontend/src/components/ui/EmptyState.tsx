import React from 'react';

interface EmptyStateProps {
  title: string;
  message: string;
  children?: React.ReactNode;
}

const EmptyState = ({ title, message, children }: EmptyStateProps) => {
  return (
    <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{message}</p>
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
};

export default EmptyState;