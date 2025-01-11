export interface SearchParams {
  keyword?: string;
  area?: string;
  service?: string;
  page?: number;
  limit?: number;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}