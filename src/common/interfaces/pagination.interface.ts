export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    sortBy: string;
    sortOrder: 'ASC' | 'DESC';
  };
}
