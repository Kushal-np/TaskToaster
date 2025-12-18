import React from 'react';

const FilterBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border">
      {children}
    </div>
  );
};

export default FilterBar;