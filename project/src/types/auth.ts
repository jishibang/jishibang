import { User, Worker } from "./user";
export interface LoginResponse {
  token: string;
  user: User;
}
export interface RegisterUserData {
  phone: string;
  code: string;
  password: string;
  name: string;
}
export interface RegisterWorkerData extends RegisterUserData {
  services: string[];
  description: string;
}
export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
