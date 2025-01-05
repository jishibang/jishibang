import { useCallback } from "react";
import { ApiError } from "../utils/api";
import { useNavigate } from "react-router-dom";
export function useErrorHandler() {
  const navigate = useNavigate();
  const handleError = useCallback((error: unknown) => {
    if (error instanceof ApiError) {
      switch (error.code) {
        case 401:
          // 未登录或 token 失效
          localStorage.removeItem("auth_token");
          navigate("/login", { state: { from: location.pathname } });
          break;
        case 403:
          // 无权限
          navigate("/403");
          break;
        case 404:
          // 资源不存在
          navigate("/404");
          break;
        case 429:
          // 请求过于频繁
          return "请求过于频繁，请稍后再试";
        default:
          // 其他 API 错误
          return error.message || "操作失败，请重试";
      }
    } else if (error instanceof Error) {
      // 非 API 错误
      console.error("Application Error:", error);
      return "系统错误，请稍后再试";
    } else {
      // 未知错误
      console.error("Unknown Error:", error);
      return "未知错误，请重试";
    }
  }, [navigate]);
  return { handleError };
}
