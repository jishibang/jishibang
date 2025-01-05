import React, { useState, useEffect } from "react";
import { useLang } from "../../contexts/LangContext";
import { apiService } from "../../services/api";
import { handleApiError } from "../../utils/errorHandler";
interface DashboardStats {
  totalWorkers: number;
  verifiedWorkers: number;
  pendingVerifications: number;
  totalOrders: number;
  activeOrders: number;
  totalUsers: number;
}
const Dashboard: React.FC = () => {
  const { t } = useLang();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    fetchDashboardStats();
  }, []);
  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await apiService.getDashboardStats();
      setStats(response.data);
    } catch (err) {
      handleApiError(err, t, setError);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1677ff] mx-auto"></div>
        <p className="mt-2 text-gray-600">{t("common.loading")}</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }
  if (!stats) return null;
  const cards = [
    {
      title: t("admin.totalWorkers"),
      value: stats.totalWorkers,
      icon: "👥",
      color: "bg-blue-500",
    },
    {
      title: t("admin.verifiedWorkers"),
      value: stats.verifiedWorkers,
      icon: "✅",
      color: "bg-green-500",
    },
    {
      title: t("admin.pendingVerifications"),
      value: stats.pendingVerifications,
      icon: "⏳",
      color: "bg-yellow-500",
    },
    {
      title: t("admin.totalOrders"),
      value: stats.totalOrders,
      icon: "📝",
      color: "bg-purple-500",
    },
    {
      title: t("admin.activeOrders"),
      value: stats.activeOrders,
      icon: "🔄",
      color: "bg-indigo-500",
    },
    {
      title: t("admin.totalUsers"),
      value: stats.totalUsers,
      icon: "👤",
      color: "bg-pink-500",
    },
  ];
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        {t("admin.dashboardTitle")}
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md p-3 ${card.color}`}>
                  <span className="text-2xl">{card.icon}</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {card.title}
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">
                      {card.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Dashboard;
