import { useState, useCallback } from 'react';

const BOOKS_PER_PAGE = 12;

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);

  const searchBooks = useCallback(async (filters, page = 1) => {
    const { title, author, subject, year } = filters;
    
    
    if (!title.trim() && !author.trim() && !subject.trim() && !year.trim()) {
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const params = new URLSearchParams();
      
      
      if (title.trim()) {
        params.append('title', title.trim());
      }
      if (author.trim()) {
        params.append('author', author.trim());
      }
      if (subject.trim()) {
        params.append('subject', subject.trim());
      }
      if (year.trim()) {
        params.append('first_publish_year', year.trim());
      }
      
      params.append('limit', BOOKS_PER_PAGE.toString());
      params.append('offset', ((page - 1) * BOOKS_PER_PAGE).toString());
      params.append('fields', 'key,title,author_name,first_publish_year,isbn,cover_i,subject,publisher,publish_date,number_of_pages_median,language,ratings_average,ratings_count,want_to_read_count');

      const response = await fetch(`https://openlibrary.org/search.json?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      setBooks(data.docs || []);
      setTotalResults(data.numFound || data.num_found || 0);
      setCurrentPage(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while searching');
      setBooks([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  }, []);

  const resetSearch = useCallback(() => {
    setBooks([]);
    setTotalResults(0);
    setCurrentPage(1);
    setError(null);
    setHasSearched(false);
  }, []);

  return {
    books,
    loading,
    error,
    totalResults,
    currentPage,
    hasSearched,
    searchBooks,
    resetSearch,
    totalPages: Math.ceil(totalResults / BOOKS_PER_PAGE),
  };
};