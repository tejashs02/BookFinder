// Book type definitions as JSDoc comments for better IDE support

/**
 * @typedef {Object} Book
 * @property {string} key - Unique identifier for the book
 * @property {string} title - Book title
 * @property {string[]} [author_name] - Array of author names
 * @property {number} [first_publish_year] - First publication year
 * @property {string[]} [isbn] - Array of ISBN numbers
 * @property {number} [cover_i] - Cover image ID
 * @property {string[]} [subject] - Array of subjects/genres
 * @property {string[]} [publisher] - Array of publishers
 * @property {string[]} [publish_date] - Array of publish dates
 * @property {number} [number_of_pages_median] - Median number of pages
 * @property {string[]} [language] - Array of language codes
 * @property {number} [ratings_average] - Average rating
 * @property {number} [ratings_count] - Number of ratings
 * @property {number} [want_to_read_count] - Number of people who want to read
 */

/**
 * @typedef {Object} SearchResponse
 * @property {Book[]} docs - Array of books
 * @property {number} num_found - Number of results found
 * @property {number} start - Starting index
 * @property {number} numFound - Total number found (alternative field)
 */

/**
 * @typedef {Object} SearchFilters
 * @property {string} title - Title search term
 * @property {string} author - Author search term
 * @property {string} subject - Subject search term
 * @property {string} year - Publication year
 */

export {};