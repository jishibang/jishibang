import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Upload from "../components/common/Upload";
import Toast from "../components/common/Toast";

interface ToastState {
  show: boolean;
  message: string;
  type: "success" | "error" | "info";
}

const RegisterWorker: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    code: "",
    password: "",
    confirmPassword: "",
    idCard: "",
    idCardPhotos: [] as string[],
    qualificationPhotos: [] as string[],
    skills: [] as string[],
    description: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: "",
    type: "info",
  });

  const skillOptions = [
    "水电维修",
    "管道疏通",
    "电器维修",
    "空调维修",
    "木工",
    "油漆",
    "防水",
    "其他",
  ];

  // 所有处理函数
  const showToast = (message: string, type: "success" | "error" | "info" = "info") => {
    setToast({ show: true, message, type });
  };

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "请输入姓名";
    }
    if (!formData.phone.match(/^1[3-9]\d{9}$/)) {
      newErrors.phone = "请输入正确的手机号码";
    }
    if (!formData.code.match(/^\d{6}$/)) {
      newErrors.code = "请输入6位数字验证码";
    }
    if (formData.password.length < 6) {
      newErrors.password = "密码至少需要6个字符";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "两次输入的密码不一致";
    }
    if (!formData.idCard.match(/^\d{17}[\dXx]$/)) {
      newErrors.idCard = "请输入正确的身份证号码";
    }
    if (formData.idCardPhotos.length < 2) {
      newErrors.idCardPhotos = "请上传身份证正反面照片";
    }
    if (formData.skills.length === 0) {
      newErrors.skills = "请至少选择一项技能";
    }
    if (formData.qualificationPhotos.length === 0) {
      newErrors.qualificationPhotos = "请至少上传一张资质证书";
    }
    if (formData.description.trim().length < 50) {
      newErrors.description = "工作经验描述至少需要50个字符";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

    if (!validateForm()) {
      showToast("请检查表单填写是否正确", "error");
      return;
    }

    try {
      setLoading(true);
      // TODO: 调用注册 API
      await new Promise(resolve => setTimeout(resolve, 1500));

      showToast("注册成功！请等待审核", "success");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      showToast("注册失败，请重试", "error");
    } finally {
      setLoading(false);
    }
  };

  // 渲染部分
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(prev => ({ ...prev, show: false }))}
        />
      )}

      <div className="max-w-2xl w-full space-y-8 bg-white p-8 rounded-lg shadow-sm">
        <div>
          <img src="/logo.png" alt="急事帮" className="mx-auto h-16" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            师傅注册
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* 表单字段部分 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 基本信息 */}
            <Input
              label="姓名"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="请输入真实姓名"
              required
              error={errors.name}
              disabled={loading}
            />

            <div className="space-y-1">
              <div className="flex gap-4">
                <Input
                  label="手机号码"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="请输入手机号码"
                  required
                  pattern="^1[3-9]\d{9}$"
                  disabled={loading}
                  error={errors.phone}
                  className="flex-grow"
                />
                <Button
                  type="button"
                  variant={countdown > 0 ? "secondary" : "primary"}
                  onClick={handleSendCode}
                  disabled={loading || countdown > 0 || !formData.phone.match(/^1[3-9]\d{9}$/)}
                  className="self-end h-[42px] min-w-[120px]"
                >
                  {countdown > 0 ? `${countdown}秒后重试` : '获取验证码'}
                </Button>
              </div>
            </div>

            <Input
              label="验证码"
              type="text"
              value={formData.code}
              onChange={(e) => handleChange("code", e.target.value)}
              placeholder="请输入验证码"
              required
              pattern="^\d{6}$"
              disabled={loading}
              error={errors.code}
            />

            <Input
              label="身份证号"
              type="text"
              value={formData.idCard}
              onChange={(e) => handleChange("idCard", e.target.value)}
              placeholder="请输入身份证号码"
              required
              disabled={loading}
              error={errors.idCard}
            />

            <Input
              label="设置密码"
              type="password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              placeholder="请设置登录密码"
              required
              minLength={6}
              disabled={loading}
              error={errors.password}
            />

            <Input
              label="确认密码"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              placeholder="请再次输入密码"
              required
              minLength={6}
              disabled={loading}
              error={errors.confirmPassword}
            />

            {/* 证件上传 */}
            <div className="md:col-span-2">
              <Upload
                label="身份证照片"
                maxCount={2}
                maxSize={5}
                value={formData.idCardPhotos}
                onChange={(files) => handleChange("idCardPhotos", files)}
                error={errors.idCardPhotos}
                disabled={loading}
                tip="请上传身份证正反面照片，每张不超过5MB"
              />
            </div>

            <div className="md:col-span-2">
              <Upload
                label="资质证书"
                maxCount={5}
                maxSize={5}
                value={formData.qualificationPhotos}
                onChange={(files) => handleChange("qualificationPhotos", files)}
                error={errors.qualificationPhotos}
                disabled={loading}
                tip="最多上传5张，每张不超过5MB"
              />
            </div>

            {/* 技能选择 */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                技能类型
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {skillOptions.map(skill => (
                  <label
                    key={skill}
                    className={`
                      flex items-center p-2 rounded-lg cursor-pointer border
                      ${formData.skills.includes(skill)
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'border-gray-300 hover:border-blue-500'
                      }
                    `}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={formData.skills.includes(skill)}
                      onChange={(e) => {
                        const newSkills = e.target.checked
                          ? [...formData.skills, skill]
                          : formData.skills.filter(s => s !== skill);
                        handleChange("skills", newSkills);
                      }}
                      disabled={loading}
                    />
                    <span className="text-sm">{skill}</span>
                  </label>
                ))}
              </div>
              {errors.skills && (
                <p className="text-sm text-red-600 mt-1">{errors.skills}</p>
              )}
            </div>

            {/* 工作经验描述 */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                工作经验描述
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className={`
                  w-full px-3 py-2 border rounded-lg shadow-sm min-h-[100px]
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  ${errors.description ? 'border-red-500' : 'border-gray-300'}
                `}
                placeholder="请详细描述您的工作经验、专业技能等..."
                required
                disabled={loading}
              />
              {errors.description && (
                <p className="text-sm text-red-600 mt-1">{errors.description}</p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            loading={loading}
            className="w-full"
          >
            提交注册
          </Button>

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

export default RegisterWorker;