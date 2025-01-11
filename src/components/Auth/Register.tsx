import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "../contexts/LangContext";

const Register: React.FC = () => {
  const { t } = useLang();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    type: "user" as "user" | "worker",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.phone || !formData.name) {
      setError("请填写完整信息");
      return;
    }

    if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
      setError("请输入正确的手机号");
      return;
    }

    try {
      // 模拟注册 API 调用
      const password = formData.phone.slice(-4);
      localStorage.setItem('tempUser', JSON.stringify({
        ...formData,
        password,
        createdAt: new Date().toISOString()
      }));
      alert(`注册成功！您的登录密码为手机号后4位：${password}`);
      navigate("/login");
    } catch (err) {
      setError("注册失败，请重试");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          {formData.type === "user" ? "用户注册" : "师傅注册"}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* 注册类型选择 */}
            <div>
              <div className="flex justify-center space-x-4">
                <button
                  type="button"
                  className={`px-4 py-2 rounded-md ${
                    formData.type === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setFormData({ ...formData, type: "user" })}
                >
                  我是用户
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-md ${
                    formData.type === "worker"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setFormData({ ...formData, type: "worker" })}
                >
                  我是师傅
                </button>
              </div>
            </div>

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

            {/* 姓名输入 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                姓名
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
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
              注册
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;