import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../components/common/Toast";
interface ToastState {
  show: boolean;
  message: string;
  type: "success" | "error" | "info";
}
const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: "",
    code: "",
    password: "",
    confirmPassword: "",
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
    if (!formData.code.match(/^\d{6}$/)) {
      showToast("请输入6位数字验证码", "error");
      return;
    }
    if (formData.password.length < 6) {
      showToast("密码至少需要6个字符", "error");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      showToast("两次输入的密码不一致", "error");
      return;
    }
    try {
      setLoading(true);
      // TODO: 调用注册 API
      await new Promise(resolve => setTimeout(resolve, 1500));
      showToast("注册成功！", "success");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      showToast("注册失败，请重试", "error");
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
            用户注册
          </h2>
        </div>
        <form className="mt-8 space-y-6 animate-slide-up" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                手机号码
              </label>
              <div className="flex gap-4">
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="input flex-grow"
                  placeholder="请输入手机号码"
                  required
                  pattern="^1[3-9]\d{9}$"
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                验证码
              </label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => handleChange("code", e.target.value)}
                className="input w-full"
                placeholder="请输入验证码"
                required
                pattern="^\d{6}$"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                设置密码
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className="input w-full"
                placeholder="请设置登录密码"
                required
                minLength={6}
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                确认密码
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                className="input w-full"
                placeholder="请再次输入密码"
                required
                minLength={6}
                disabled={loading}
              />
            </div>
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
                  <span className="opacity-0">注册</span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </>
              ) : (
                '注册'
              )}
            </button>
          </div>
          <div className="flex justify-center">
            <Link
              to="/login"
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              已有账号？立即登录
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;
