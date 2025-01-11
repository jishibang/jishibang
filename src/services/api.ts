import axios, { AxiosInstance } from 'axios';
import type { User, Worker, LoginResponse, RegisterData, DashboardStats } from '../types/user';

const instance: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  // 认证相关
  login: async (phone: string, code: string): Promise<LoginResponse> => {
    const { data } = await instance.post('/auth/login', { phone, code });
    return data;
  },

  register: async (registerData: RegisterData): Promise<LoginResponse> => {
    const { data } = await instance.post('/auth/register', registerData);
    return data;
  },

  getCurrentUser: async () => {
    return instance.get<{ data: User | Worker }>('/user/current');
  },

  // 验证码相关
  sendVerificationCode: async (phone: string) => {
    return instance.post('/auth/send-code', { phone });
  },

  // 用户相关
  updateUser: async (userData: Partial<User>) => {
    return instance.put<{ data: User }>('/user/profile', userData);
  },

  // 工作者相关
  updateWorker: async (workerData: Partial<Worker>) => {
    return instance.put<{ data: Worker }>('/worker/profile', workerData);
  },

  getWorkerProfile: async (workerId: string) => {
    return instance.get<{ data: Worker }>(`/worker/${workerId}`);
  },

  getWorkerList: async (params: {
    area?: string;
    service?: string;
    type?: string;
    page?: number;
    limit?: number;
  }) => {
    return instance.get<{ data: Worker[]; total: number }>('/workers', { params });
  },

  // 身份验证相关
  verifyIdCard: async (data: {
    idCardFront: File;
    idCardBack: File;
  }) => {
    const formData = new FormData();
    formData.append('idCardFront', data.idCardFront);
    formData.append('idCardBack', data.idCardBack);
    return instance.post('/worker/verify-id-card', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // 管理员相关
  getDashboardStats: async () => {
    return instance.get<{ data: DashboardStats }>('/admin/dashboard/stats');
  },

  getPendingVerifications: async () => {
    return instance.get<{ data: Worker[] }>('/admin/verifications/pending');
  },

  approveVerification: async (workerId: string) => {
    return instance.post(`/admin/verifications/${workerId}/approve`);
  },

  rejectVerification: async (workerId: string, reason: string) => {
    return instance.post(`/admin/verifications/${workerId}/reject`, { reason });
  },
};

export default apiService;