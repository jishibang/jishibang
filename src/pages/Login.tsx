import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../components/common/Toast";
interface ToastState {
  show: boolean;
  message: string;
  type: "success" | "error" | "info";
}
const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState<"password" | "code">("password");
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    code: "",
  });
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: "",
    type: "info",
  });
  const showToast = (message: string, type: "success" | "error" | "info" = "info") => {
    setToast({ show: true, message, type });
  };
  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleSendCode = async () => {
    if (!formData.phone.match(/^1[3-9]\d{9}$/) || countdown > 0) return;
    try {
      setLoading(true);
      // TODO: 调用发送验证码 API
      await new Promise(resolve => setTimeout(resolve, 1000));
      showToast("验证码已发送", "success");
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      showToast("发送验证码失败，请重试", "error");
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    // 表单验证
    if (!formData.phone.match(/^1[3-9]\d{9}$/)) {
      showToast("请输入正确的手机号码", "error");
      return;
    }
    if (loginType === "password" && !formData.password) {
      showToast("请输入密码", "error");
      return;
    }
    if (loginType === "code" && !formData.code.match(/^\d{6}$/)) {
      showToast("请输入6位数字验证码", "error");
      return;
    }
    try {
      setLoading(true);
      // TODO: 调用登录 API
      await new Promise(resolve => setTimeout(resolve, 1500));
      showToast("登录成功！", "success");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      showToast("登录失败，请检查账号密码", "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(prev => ({ ...prev, show: false }))}
        />
      )}
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        <div>
          <img src="/logo.png" alt="急事帮" className="mx-auto h-16" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            登录账号
          </h2>
        </div>
        <div className="flex justify-center space-x-4 border-b">
          <button
            className={`pb-2 px-4 ${
              loginType === "password"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            } transition-colors duration-300`}
            onClick={() => setLoginType("password")}
          >
            密码登录
          </button>
          <button
            className={`pb-2 px-4 ${
              loginType === "code"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            } transition-colors duration-300`}
            onClick={() => setLoginType("code")}
          >
            验证码登录
          </button>
        </div>
        <form className="mt-8 space-y-6 animate-slide-up" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                手机号码
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="input w-full"
                placeholder="请输入手机号码"
                required
                pattern="^1[3-9]\d{9}$"
                disabled={loading}
              />
            </div>
            {loginType === "password" ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  密码
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className="input w-full"
                  placeholder="请输入密码"
                  required
                  disabled={loading}
                />
                <div className="mt-1 text-right">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    忘记密码？
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  验证码
                </label>
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => handleChange("code", e.target.value)}
                    className="input flex-grow"
                    placeholder="请输入验证码"
                    required
                    pattern="^\d{6}$"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={handleSendCode}
                    disabled={loading || countdown > 0 || !formData.phone.match(/^1[3-9]\d{9}$/)}
                    className={`btn ${
                      countdown > 0 ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                    } text-white transition-colors duration-300 min-w-[120px]`}
                  >
                    {countdown > 0 ? `${countdown}秒后重试` : '获取验证码'}
                  </button>
                </div>
              </div>
            )}
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full btn ${
                loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
              } text-white transition-colors duration-300 relative`}
            >
              {loading ? (
                <>
                  <span className="opacity-0">登录</span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </>
              ) : (
                '登录'
              )}
            </button>
          </div>
          <div className="flex justify-between items-center">
            <Link
              to="/register"
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              注册用户账号
            </Link>
            <Link
              to="/register/worker"
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              注册成为师傅
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
