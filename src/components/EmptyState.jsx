import React from 'react';
import { BookOpen, Search } from 'lucide-react';

export const EmptyState = ({ hasSearched }) => {
  if (!hasSearched) {
    return (
      <div className="text-center py-16 animate-fade-in">
        <div className="mx-auto w-24 h-24 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mb-6">
          <BookOpen className="w-12 h-12 text-primary-600" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          Discover Your Next Great Read
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Search through millions of books by title, author, subject, or publication year.
          Find detailed information including ratings, subjects, and publication details.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-16 animate-fade-in">
      <div className="mx-auto w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
        <Search className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-4">
        No Books Found
      </h3>
      <p className="text-gray-600 max-w-md mx-auto">
        We couldn't find any books matching your search criteria.
        Try adjusting your filters or searching for different terms.
      </p>
    </div>
  );
};