import { Worker } from "./user";
export interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
}
export interface WorkersResponse {
  workers: Worker[];
  total: number;
}
export interface SearchParams {
  experience?: string;
  rating?: string;
  verified?: string;
  service?: string;
  area?: string;
}
