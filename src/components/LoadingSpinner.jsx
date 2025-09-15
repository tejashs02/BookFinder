import React from 'react';

export const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        <div className="w-8 h-8 border-4 border-secondary-200 border-t-secondary-600 rounded-full animate-spin absolute top-2 left-2"></div>
      </div>
      <p className="mt-4 text-gray-600 font-medium">Searching for books...</p>
    </div>
  );
};