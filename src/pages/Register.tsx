import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useLang } from '../contexts/LangContext';
import { apiService } from '../services/api';
import type { RegisterData } from '../types/user';

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useLang();
  const type = searchParams.get('type') || 'user';

  const [formData, setFormData] = useState<RegisterData>({
    username: '',
    phone: '',
    code: '',
    role: type as 'user' | 'worker',
    type: '',
    areas: [],
    services: [],
    experience: 0,
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(c => c - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const areas = e.target.value.split(',').map(area => area.trim());
    setFormData(prev => ({
      ...prev,
      areas
    }));
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const services = e.target.value.split(',').map(service => service.trim());
    setFormData(prev => ({
      ...prev,
      services
    }));
  };

  const handleSendCode = async () => {
    if (!formData.phone || formData.phone.length !== 11) {
      alert('请输入正确的手机号');
      return;
    }

    try {
      setLoading(true);
      await apiService.sendVerificationCode(formData.phone);
      setCountdown(60);
    } catch (error) {
      alert('发送验证码失败');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { token, user } = await apiService.register(formData);
      localStorage.setItem('token', token);
      navigate('/');
    } catch (error) {
      alert('注册失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {type === 'user' ? '用户注册' : '服务者注册'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                用户名
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                手机号
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                验证码
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  id="code"
                  name="code"
                  type="text"
                  required
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.code}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white 
                    ${countdown > 0 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  onClick={handleSendCode}
                  disabled={countdown > 0 || loading}
                >
                  {countdown > 0 ? `${countdown}s` : '发送验证码'}
                </button>
              </div>
            </div>

            {type === 'worker' && (
              <>
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                    服务类型
                  </label>
                  <div className="mt-1">
                    <select
                      id="type"
                      name="type"
                      required
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={formData.type}
                      onChange={handleChange}
                    >
                      <option value="">请选择</option>
                      <option value="家政">家政</option>
                      <option value="维修">维修</option>
                      <option value="搬家">搬家</option>
                      <option value="其他">其他</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="areas" className="block text-sm font-medium text-gray-700">
                    服务区域（多个用逗号分隔）
                  </label>
                  <div className="mt-1">
                    <input
                      id="areas"
                      name="areas"
                      type="text"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="例如：朝阳区,海淀区"
                      value={formData.areas.join(',')}
                      onChange={handleAreaChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="services" className="block text-sm font-medium text-gray-700">
                    服务项目（多个用逗号分隔）
                  </label>
                  <div className="mt-1">
                    <input
                      id="services"
                      name="services"
                      type="text"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="例如：保洁,做饭"
                      value={formData.services.join(',')}
                      onChange={handleServiceChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                    工作年限
                  </label>
                  <div className="mt-1">
                    <input
                      id="experience"
                      name="experience"
                      type="number"
                      required
                      min="0"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={formData.experience}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    个人简介
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={loading}
              >
                {loading ? '注册中...' : '注册'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  已有账号？
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/login"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                立即登录
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;