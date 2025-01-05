import { AxiosError } from "axios";
export const getErrorMessage = (error: any, t: (key: string) => string): string => {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    switch (status) {
      case 401:
        return t("error.unauthorized");
      case 403:
        return t("error.forbidden");
      case 404:
        return t("error.notFound");
      case 422:
        return t("error.validation");
      case 500:
        return t("error.server");
      default:
        return error.response?.data?.message || t("error.network");
    }
  }
  return t("error.unknown");
};
export const handleApiError = (error: any, t: (key: string) => string, setError: (message: string) => void) => {
  const message = getErrorMessage(error, t);
  setError(message);
  console.error("API Error:", error);
};
