import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

export const SearchForm = ({ onSearch, onReset, loading }) => {
  const [filters, setFilters] = useState({
    title: '',
    author: '',
    subject: '',
    year: '',
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleInputChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleReset = () => {
    setFilters({ title: '', author: '', subject: '', year: '' });
    setShowAdvanced(false);
    onReset();
  };

  const hasFilters = Object.values(filters).some(value => value.trim() !== '');

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for books by title..."
            value={filters.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 shadow-sm"
          />
        </div>

        {/* Advanced Filters Toggle */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
          >
            <Filter className="h-4 w-4" />
            <span>Advanced Filters</span>
          </button>

          {hasFilters && (
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="h-4 w-4" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-gray-50 rounded-xl animate-slide-up">
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                Author
              </label>
              <input
                id="author"
                type="text"
                placeholder="e.g. J.K. Rowling"
                value={filters.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                placeholder="e.g. Science Fiction"
                value={filters.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                Publication Year
              </label>
              <input
                id="year"
                type="number"
                placeholder="e.g. 2020"
                value={filters.year}
                onChange={(e) => handleInputChange('year', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                min="1000"
                max={new Date().getFullYear()}
              />
            </div>
          </div>
        )}

        {/* Search Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading || !hasFilters}
            className="px-8 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Searching...</span>
              </div>
            ) : (
              'Search Books'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};