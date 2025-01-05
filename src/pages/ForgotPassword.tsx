import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/common/Toast";
interface ToastState {
  show: boolean;
  message: string;
  type: "success" | "error" | "info";
}
const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    phone: "",
    code: "",
    newPassword: "",
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
  const handleVerifyCode = async () => {
    if (!formData.code.match(/^\d{6}$/)) {
      showToast("请输入6位数字验证码", "error");
      return;
    }
    try {
      setLoading(true);
      // TODO: 验证验证码
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep(2);
    } catch (error) {
      showToast("验证码错误，请重试", "error");
    } finally {
      setLoading(false);
    }
  };
  const handleResetPassword = async () => {
    if (formData.newPassword.length < 6) {
      showToast("密码至少需要6个字符", "error");
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      showToast("两次输入的密码不一致", "error");
      return;
    }
    try {
      setLoading(true);
      // TODO: 调用重置密码 API
      await new Promise(resolve => setTimeout(resolve, 1500));
      showToast("密码重置成功！", "success");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      showToast("密码重置失败，请重试", "error");
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
            找回密码
          </h2>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-200 -translate-y-1/2">
            <div 
              className="h-full bg-blue-500 transition-all duration-500"
              style={{ width: `${(step - 1) * 100}%` }}
            />
          </div>
          <div className="relative flex justify-between">
            <div className={`flex flex-col items-center ${step >= 1 ? 'text-blue-500' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}>
                1
              </div>
              <span className="mt-2 text-sm">验证手机</span>
            </div>
            <div className={`flex flex-col items-center ${step >= 2 ? 'text-blue-500' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}>
                2
              </div>
              <span className="mt-2 text-sm">重置密码</span>
            </div>
          </div>
        </div>
        <div className="mt-8 space-y-6 animate-slide-up">
          {step === 1 ? (
            <div className="space-y-4">
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
              <button
                onClick={handleVerifyCode}
                disabled={loading}
                className={`w-full btn ${
                  loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                } text-white transition-colors duration-300`}
              >
                下一步
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  新密码
                </label>
                <input
                  type="password"
                  value={formData.newPassword}
                  onChange={(e) => handleChange("newPassword", e.target.value)}
                  className="input w-full"
                  placeholder="请设置新密码"
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
                  placeholder="请再次输入新密码"
                  required
                  minLength={6}
                  disabled={loading}
                />
              </div>
              <button
                onClick={handleResetPassword}
                disabled={loading}
                className={`w-full btn ${
                  loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                } text-white transition-colors duration-300`}
              >
                重置密码
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
