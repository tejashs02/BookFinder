import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="text-center py-16 animate-fade-in">
      <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
        <AlertCircle className="w-12 h-12 text-red-600" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-4">
        Something went wrong
      </h3>
      <p className="text-gray-600 max-w-md mx-auto mb-6">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </button>
      )}
    </div>
  );
};