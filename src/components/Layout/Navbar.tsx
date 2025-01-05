import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useLang } from "../../contexts/LangContext";
import LanguageSwitch from "../common/LanguageSwitch";
const Navbar: React.FC = () => {
  const { t } = useLang();
  const { user, logout } = useAuth();
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="急事帮" className="h-8" />
          </Link>
          <div className="flex items-center space-x-4">
            <LanguageSwitch />
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">
                  {t("common.welcome")}, {user.username}
                </span>
                <button
                  onClick={logout}
                  className="text-gray-600 hover:text-gray-900"
                >
                  {t("common.logout")}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900"
                >
                  {t("common.login")}
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  {t("common.register")}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
