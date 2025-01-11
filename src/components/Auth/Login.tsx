import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "../contexts/LangContext";

const Login: React.FC = () => {
  const { t } = useLang();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.phone || !formData.password) {
      setError("请填写完整信息");
      return;
    }

    try {
      // 从 localStorage 获取用户信息（临时使用，实际应该调用 API）
      const tempUser = localStorage.getItem('tempUser');
      if (tempUser) {
        const user = JSON.parse(tempUser);
        if (user.phone === formData.phone && user.phone.slice(-4) === formData.password) {
          // 登录成功
          localStorage.setItem('currentUser', JSON.stringify(user));
          navigate("/");
          return;
        }
      }
      setError("手机号或密码错误");
    } catch (err) {
      setError("登录失败，请重试");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          登录
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* 手机号输入 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                手机号
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* 密码输入 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                密码（手机号后4位）
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              登录
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                还没有账号？立即注册
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;