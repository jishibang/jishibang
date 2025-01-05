interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
}
class ApiError extends Error {
  code: number;
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
    this.name = "ApiError";
  }
}
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("auth_token");
  const headers = new Headers(options.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  if (options.body && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });
  const data: ApiResponse<T> = await response.json();
  if (!response.ok) {
    // 处理特定错误码
    switch (data.code) {
      case 401:
        localStorage.removeItem("auth_token");
        window.location.href = "/login";
        break;
      case 403:
        window.location.href = "/403";
        break;
      case 404:
        window.location.href = "/404";
        break;
    }
    throw new ApiError(data.message, data.code);
  }
  return data.data;
}
export const api = {
  get: <T>(endpoint: string, options: Omit<RequestInit, "body"> = {}) =>
    request<T>(endpoint, { ...options, method: "GET" }),
  post: <T>(endpoint: string, data?: any, options: Omit<RequestInit, "body"> = {}) =>
    request<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    }),
  put: <T>(endpoint: string, data?: any, options: Omit<RequestInit, "body"> = {}) =>
    request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    }),
  delete: <T>(endpoint: string, options: Omit<RequestInit, "body"> = {}) =>
    request<T>(endpoint, { ...options, method: "DELETE" }),
  upload: <T>(endpoint: string, file: File, options: Omit<RequestInit, "body"> = {}) => {
    const formData = new FormData();
    formData.append("file", file);
    return request<T>(endpoint, {
      ...options,
      method: "POST",
      body: formData,
    });
  },
};
export { ApiError };
