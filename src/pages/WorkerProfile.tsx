import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLang } from '../contexts/LangContext';
import type { Worker } from '../types/user';

const WorkerProfile = () => {
  const { user, updateProfile } = useAuth();
  const { t } = useLang();
  const worker = user as Worker;
  
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    username: worker?.username || '',
    name: worker?.name || '',
    phone: worker?.phone || '',
    type: worker?.type || '',
    areas: worker?.areas?.join(',') || '',
    services: worker?.services?.join(',') || '',
    experience: worker?.experience || 0,
    description: worker?.description || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const formDataToSend = new FormData();
      
      // 处理基本字段
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'areas' || key === 'services') {
          formDataToSend.append(key, JSON.stringify(value.split(',')));
        } else {
          formDataToSend.append(key, value);
        }
      });
      
      // 处理头像
      if (avatar) {
        formDataToSend.append('avatar', avatar);
      }
      
      await updateProfile(formDataToSend);
      alert('更新成功');
    } catch (error) {
      alert('更新失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          服务者资料
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              头像
            </label>
            <div className="mt-2 flex items-center space-x-4">
              <img
                src={worker?.avatar || '/default-avatar.png'}
                alt="Avatar"
                className="h-12 w-12 rounded-full"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              用户名
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              姓名
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              手机号
            </label>
            <div className="mt-1">
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              服务类型
            </label>
            <div className="mt-1">
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
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
                type="text"
                name="areas"
                id="areas"
                value={formData.areas}
                onChange={handleChange}
                placeholder="例如：朝阳区,海淀区"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div>
            <label htmlFor="services" className="block text-sm font-medium text-gray-700">
              服务项目（多个用逗号分隔）
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="services"
                id="services"
                value={formData.services}
                onChange={handleChange}
                placeholder="例如：保洁,做饭"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
              工作年限
            </label>
            <div className="mt-1">
              <input
                type="number"
                name="experience"
                id="experience"
                min="0"
                value={formData.experience}
                onChange={handleChange}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              个人简介
            </label>
            <div className="mt-1">
              <textarea
                name="description"
                id="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {loading ? '保存中...' : '保存'}
              </button>
            </div>
          </div>
        </form>

        {!worker?.idCardVerified && (
          <div className="mt-8 p-4 bg-yellow-50 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  身份认证提醒
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    您还未完成身份认证，请尽快完成认证以提供服务。
                  </p>
                </div>
                <div className="mt-4">
                  <div className="-mx-2 -my-1.5 flex">
                    <button
                      type="button"
                      className="bg-yellow-50 px-2 py-1.5 rounded-md text-sm font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-50 focus:ring-yellow-600"
                    >
                      去认证
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerProfile;