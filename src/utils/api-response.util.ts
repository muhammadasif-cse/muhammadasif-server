import { ApiResponse } from '../interfaces/api-response.interface';

export function createResponse<T>(
  statusCode: number,
  message: string,
  data?: T,
  error?: string,
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  },
): ApiResponse<T> {
  return {
    statusCode,
    message,
    data,
    error,
    meta,
  };
}
