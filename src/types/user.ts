export interface User {
  id: string;
  username: string;
  phone: string;
  avatar?: string;
  name?: string;
  role: 'user' | 'worker' | 'admin';
  type?: string;
}

export interface Worker extends User {
  areas: string[];
  services: string[];
  experience: number;
  description?: string;
  idCardVerified: boolean;
  rating?: number;
  serviceCount?: number;
}

export interface DashboardStats {
  totalUsers: number;
  totalWorkers: number;
  totalOrders: number;
  pendingVerifications: number;
}

export interface LoginResponse {
  token: string;
  user: User | Worker;
}

export interface RegisterData {
  username: string;
  phone: string;
  code: string;
  role: 'user' | 'worker';
  type?: string;
  areas?: string[];
  services?: string[];
  experience?: number;
  description?: string;
}