/**
 * Common types used across the application
 */

/**
 * Pagination request params
 */
export interface Pagination {
  page: number;
  pageSize: number;
}

/**
 * Search and filter criteria
 */
export interface SearchFilter {
  query?: string;
  location?: string;
  stage?: string;
  sort?: 'asc' | 'desc';
}