import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "../contexts/LangContext";
const RegisterChoice: React.FC = () => {
  const { t } = useLang();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {t("register.chooseType")}
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-4">
            <Link
              to="/register/worker"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1677ff] hover:bg-[#4096ff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1677ff]"
            >
              {t("register.asWorker")}
            </Link>
            <Link
              to="/register/user"
              className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1677ff]"
            >
              {t("register.asUser")}
            </Link>
          </div>
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">{t("auth.hasAccount")}</span>
            <Link to="/login" className="text-[#1677ff] hover:text-[#4096ff] ml-1">
              {t("common.login")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterChoice;
