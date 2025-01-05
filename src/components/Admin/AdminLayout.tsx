import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useLang } from "../../contexts/LangContext";
const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useLang();
  const location = useLocation();
  const menuItems = [
    {
      path: "/admin/dashboard",
      icon: "📊",
      label: t("admin.dashboard"),
    },
    {
      path: "/admin/verifications",
      icon: "✅",
      label: t("admin.verifications"),
    },
    {
      path: "/admin/workers",
      icon: "👥",
      label: t("admin.workers"),
    },
    {
      path: "/admin/reports",
      icon: "📝",
      label: t("admin.reports"),
    },
  ];
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* 侧边栏 */}
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-4">
            <h1 className="text-xl font-bold text-gray-900">
              {t("admin.title")}
            </h1>
          </div>
          <nav className="mt-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm font-medium ${
                  location.pathname === item.path
                    ? "text-[#1677ff] bg-blue-50"
                    : "text-gray-600 hover:text-[#1677ff] hover:bg-gray-50"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        {/* 主内容区 */}
        <div className="flex-1">
          <div className="py-6 px-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminLayout;
