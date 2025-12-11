export interface ApiSuccessResponse<T> {
  success: true;
  message: string | null;
  data: T;
  error: null;
  validationErrors: null;
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}

export interface ApiErrorResponse {
  success: false;
  message: string | string[];
  data: null;
  error: string;
  validationErrors: Record<string, string> | null;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
