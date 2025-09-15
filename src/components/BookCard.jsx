import React from 'react';
import { Book } from 'lucide-react';

export const BookCard = ({ book, onClick }) => {
  const getCoverUrl = (coverId, size = 'M') => {
    return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
  };

  const formatAuthors = (authors) => {
    if (!authors || authors.length === 0) return 'Unknown Author';
    if (authors.length === 1) return authors[0];
    if (authors.length === 2) return `${authors[0]} and ${authors[1]}`;
    return `${authors[0]} and ${authors.length - 1} others`;
  };

  const getSubjects = (subjects) => {
    if (!subjects || subjects.length === 0) return [];
    return subjects.slice(0, 3); 
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 p-6 animate-fade-in"
    >
      <div className="flex flex-col h-full">
        
        <div className="flex justify-center mb-4">
          <div className="w-32 h-48 bg-gray-100 rounded-lg overflow-hidden shadow-md">
            {book.cover_i ? (
              <img
                src={getCoverUrl(book.cover_i)}
                alt={`Cover of ${book.title}`}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDEyOCAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTkyIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik02NCA4MEw3MiA5Nkg1NkwzMiA5NlYxMTJIMjRWODBINjRaTTY0IDgwSDEwNFYxMTJIOTZWOTZMNzIgOTZMNjQgODBaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo=';
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
                <Book className="w-12 h-12 text-primary-400" />
              </div>
            )}
          </div>
        </div>

        
        <div className="flex-1 space-y-3">
          <h3 className="font-bold text-lg text-gray-900 line-clamp-2 leading-tight">
            {book.title}
          </h3>

          <p className="text-secondary-600 font-medium">
            {formatAuthors(book.author_name || [])}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{book.first_publish_year || 'Unknown Year'}</span>
            {book.ratings_average && (
              <div className="flex items-center space-x-1">
                <span className="text-amber-400">★</span>
                <span>{book.ratings_average.toFixed(1)}</span>
              </div>
            )}
          </div>

          
          {book.subject && book.subject.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {getSubjects(book.subject).map((subject, index) => (
                <span
                  key={index}
                  className="inline-block px-2 py-1 text-xs bg-accent-100 text-accent-800 rounded-full"
                >
                  {subject}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};