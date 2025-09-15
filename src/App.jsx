import React, { useState } from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';
import { SearchForm } from './components/SearchForm';
import { BookCard } from './components/BookCard';
import { BookModal } from './components/BookModal';
import { LoadingSpinner } from './components/LoadingSpinner';
import { EmptyState } from './components/EmptyState';
import { ErrorMessage } from './components/ErrorMessage';
import { Pagination } from './components/Pagination';
import { useBooks } from './hooks/useBooks';

function App() {
  const {
    books,
    loading,
    error,
    totalResults,
    currentPage,
    totalPages,
    hasSearched,
    searchBooks,
    resetSearch,
  } = useBooks();

  const [selectedBook, setSelectedBook] = useState(null);
  const [currentFilters, setCurrentFilters] = useState({
    title: '',
    author: '',
    subject: '',
    year: '',
  });

  const handleSearch = (filters) => {
    setCurrentFilters(filters);
    searchBooks(filters, 1);
  };

  const handlePageChange = (page) => {
    searchBooks(currentFilters, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetry = () => {
    searchBooks(currentFilters, currentPage);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">BookFinder</h1>
                <p className="text-sm text-gray-600">Discover your next great read</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <a
                href="https://openlibrary.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm">Powered by Open Library</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Section */}
        <div className="mb-12">
          <SearchForm
            onSearch={handleSearch}
            onReset={resetSearch}
            loading={loading}
          />
        </div>

        {/* Results Section */}
        <div className="space-y-8">
          {/* Results Header */}
          {hasSearched && !loading && !error && (
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Search Results
                </h2>
                <p className="text-gray-600 mt-1">
                  Found {totalResults.toLocaleString()} books
                </p>
              </div>
              {totalPages > 1 && (
                <div className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </div>
              )}
            </div>
          )}

          {/* Loading State */}
          {loading && <LoadingSpinner />}

          {/* Error State */}
          {error && !loading && (
            <ErrorMessage message={error} onRetry={handleRetry} />
          )}

          {/* Empty State */}
          {!loading && !error && books.length === 0 && (
            <EmptyState hasSearched={hasSearched} />
          )}

          {/* Books Grid */}
          {!loading && !error && books.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {books.map((book) => (
                  <BookCard
                    key={book.key}
                    book={book}
                    onClick={() => setSelectedBook(book)}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">Built with React and Tailwind CSS</p>
            <p className="text-sm">
              Data provided by{' '}
              <a
                href="https://openlibrary.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Open Library API
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Book Modal */}
      <BookModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    </div>
  );
}

export default App;