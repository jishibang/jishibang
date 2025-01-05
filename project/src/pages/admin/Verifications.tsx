import React, { useState, useEffect } from "react";
import { useLang } from "../../contexts/LangContext";
import { apiService } from "../../services/api";
import { Worker } from "../../types/user";
import { handleApiError } from "../../utils/errorHandler";
const AdminVerifications: React.FC = () => {
  const { t } = useLang();
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    fetchVerifications();
  }, []);
  const fetchVerifications = async () => {
    try {
      setLoading(true);
      const response = await apiService.getWorkerVerifications();
      setWorkers(response.data);
    } catch (err) {
      handleApiError(err, t, setError);
    } finally {
      setLoading(false);
    }
  };
  const handleVerify = async (workerId: string) => {
    try {
      await apiService.verifyWorker(workerId);
      // 重新获取列表
      fetchVerifications();
    } catch (err) {
      handleApiError(err, t, setError);
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1677ff] mx-auto"></div>
            <p className="mt-2 text-gray-600">{t("common.loading")}</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {t("admin.verifications")}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            {t("admin.verificationsDesc")}
          </p>
        </div>
        {error && (
          <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {workers.map((worker) => (
              <li key={worker.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={worker.avatar || "/logo.png"}
                        alt=""
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {worker.username}
                        </div>
                        <div className="text-sm text-gray-500">
                          {worker.phone}
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => handleVerify(worker.id)}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1677ff] hover:bg-[#4096ff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1677ff]"
                      >
                        {t("admin.verify")}
                      </button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {worker.services.map((service) => (
                        <span
                          key={service}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {t(`serviceTypes.${service}`)}
                        </span>
                      ))}
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      {worker.description}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default AdminVerifications;
