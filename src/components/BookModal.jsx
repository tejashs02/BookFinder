import React from 'react';
import { X, Book, Calendar, User, Globe, Star, Heart, Tag } from 'lucide-react';

export const BookModal = ({ book, onClose }) => {
  if (!book) return null;

  const getCoverUrl = (coverId, size = 'L') => {
    return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
  };

  const formatAuthors = (authors) => {
    if (!authors || authors.length === 0) return 'Unknown Author';
    return authors.join(', ');
  };

  const formatPublishers = (publishers) => {
    if (!publishers || publishers.length === 0) return 'Unknown Publisher';
    return publishers.slice(0, 3).join(', ');
  };

  const formatLanguages = (languages) => {
    if (!languages || languages.length === 0) return [];
    return languages.slice(0, 5);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Book Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           
            <div className="md:col-span-1">
              <div className="w-full max-w-xs mx-auto">
                <div className="aspect-[2/3] bg-gray-100 rounded-xl overflow-hidden shadow-lg">
                  {book.cover_i ? (
                    <img
                      src={getCoverUrl(book.cover_i)}
                      alt={`Cover of ${book.title}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjM4NCIgdmlld0JveD0iMCAwIDI1NiAzODQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMzg0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMjggMTYwTDE0NCAxOTJIMTEyTDY0IDE5MlYyMjRINDhWMTYwSDEyOFpNMTI4IDE2MEgyMDhWMjI0SDE5MlYxOTJMMTQ0IDE5MkwxMjggMTYwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
                      <Book className="w-24 h-24 text-primary-400" />
                    </div>
                  )}
                </div>
              </div>
            </div>

           
            <div className="md:col-span-2 space-y-6">
              
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
                <div className="flex flex-wrap gap-4 text-gray-600">
                  {book.author_name && (
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{formatAuthors(book.author_name)}</span>
                    </div>
                  )}
                  {book.first_publish_year && (
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{book.first_publish_year}</span>
                    </div>
                  )}
                </div>
              </div>

             
              {(book.ratings_average || book.want_to_read_count) && (
                <div className="flex flex-wrap gap-6">
                  {book.ratings_average && (
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-amber-400 fill-current" />
                      <span className="font-semibold">{book.ratings_average.toFixed(1)}</span>
                      {book.ratings_count && (
                        <span className="text-gray-500">({book.ratings_count.toLocaleString()} ratings)</span>
                      )}
                    </div>
                  )}
                  {book.want_to_read_count && (
                    <div className="flex items-center space-x-2">
                      <Heart className="w-5 h-5 text-red-400" />
                      <span>{book.want_to_read_count.toLocaleString()} want to read</span>
                    </div>
                  )}
                </div>
              )}

              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {book.publisher && book.publisher.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Publisher</h4>
                    <p className="text-gray-700">{formatPublishers(book.publisher)}</p>
                  </div>
                )}
                {book.number_of_pages_median && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Pages</h4>
                    <p className="text-gray-700">{book.number_of_pages_median}</p>
                  </div>
                )}
                {book.isbn && book.isbn.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">ISBN</h4>
                    <p className="text-gray-700 font-mono text-sm">{book.isbn[0]}</p>
                  </div>
                )}
                {book.language && book.language.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Languages</h4>
                    <div className="flex flex-wrap gap-1">
                      {formatLanguages(book.language).map((lang, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                        >
                          <Globe className="w-3 h-3 mr-1" />
                          {lang.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              
              {book.subject && book.subject.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Tag className="w-4 h-4 mr-2" />
                    Subjects
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {book.subject.slice(0, 10).map((subject, index) => (
                      <span
                        key={index}
                        className="inline-block px-3 py-1 text-sm bg-accent-100 text-accent-800 rounded-full"
                      >
                        {subject}
                      </span>
                    ))}
                    {book.subject.length > 10 && (
                      <span className="inline-block px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full">
                        +{book.subject.length - 10} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              
              <div className="pt-4 border-t">
                <a
                  href={`https://openlibrary.org${book.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  View on Open Library
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};