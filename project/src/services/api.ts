import { User, Worker } from "../types/user";
import { RegisterUserData, RegisterWorkerData } from "../types/auth";
export const apiService = {
  async getWorkers(): Promise<Worker[]> {
    const response = await fetch("/api/workers");
    return response.json();
  },
  async getWorkerById(id: string): Promise<Worker> {
    const response = await fetch(`/api/workers/${id}`);
    return response.json();
  },
  async getWorkerDetail(id: string): Promise<Worker> {
    const response = await fetch(`/api/workers/${id}/detail`);
    return response.json();
  },
  async searchWorkers(params: Record<string, string>): Promise<Worker[]> {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`/api/workers/search?${queryString}`);
    return response.json();
  },
  async getDashboardStats(): Promise<any> {
    const response = await fetch("/api/admin/dashboard/stats");
    return response.json();
  },
  async getWorkerVerifications(): Promise<Worker[]> {
    const response = await fetch("/api/admin/verifications");
    return response.json();
  },
  async submitVerification(data: FormData): Promise<void> {
    await fetch("/api/workers/verify", {
      method: "POST",
      body: data,
    });
  },
  async register(data: RegisterUserData): Promise<User> {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  async registerWorker(data: RegisterWorkerData): Promise<Worker> {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else if (value !== undefined) {
        formData.append(key, String(value));
      }
    });
    const response = await fetch("/api/register/worker", {
      method: "POST",
      body: formData,
    });
    return response.json();
  },
  async verifyWorker(workerId: string): Promise<Worker> {
    const response = await fetch(`/api/admin/workers/${workerId}/verify`, {
      method: "POST",
    });
    return response.json();
  },
};
