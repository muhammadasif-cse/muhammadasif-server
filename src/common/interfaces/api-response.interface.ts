export interface APIResponse<T> {
  status: number;
  message: string;
  data?: T[] | T;
  meta?: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    sortBy: string;
    sortOrder: 'ASC' | 'DESC';
  };
}
