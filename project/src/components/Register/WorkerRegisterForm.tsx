import React, { useState, useRef } from "react";
const WorkerRegisterForm: React.FC = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <form className="space-y-4">
      {/* 头像上传 */}
      <div>
        <label className="block text-sm font-medium text-gray-700">头像照片</label>
        <div className="mt-1 flex items-center space-x-4">
          <div className="relative">
            {avatar ? (
              <img
                src={avatar}
                alt="Avatar preview"
                className="w-24 h-24 rounded-lg object-cover"
              />
            ) : (
              <img
                src="/logo.png"
                alt="Default avatar"
                className="w-24 h-24 rounded-lg object-cover"
              />
            )}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm border border-gray-200 hover:bg-gray-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            accept="image/*"
            className="hidden"
          />
          <div className="text-sm text-gray-500">
            <p>请上传清晰的本人照片</p>
            <p>便于用户确认身份</p>
          </div>
        </div>
      </div>
      {/* 其他表单字段 */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          手机号码
        </label>
        <input
          type="tel"
          id="phone"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1677ff] focus:ring-[#1677ff]"
          required
        />
      </div>
      <div>
        <label htmlFor="services" className="block text-sm font-medium text-gray-700">
          服务类型
        </label>
        <select
          id="services"
          multiple
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1677ff] focus:ring-[#1677ff]"
          required
        >
          <option value="waterproof">防水补漏</option>
          <option value="plumbing">管道疏通</option>
          <option value="lock">开锁换锁</option>
          <option value="electric">水电维修</option>
          <option value="ac">空调维修</option>
          <option value="appliance">家电维修</option>
        </select>
      </div>
      <div>
        <label htmlFor="areas" className="block text-sm font-medium text-gray-700">
          服务区域
        </label>
        <input
          type="text"
          id="areas"
          placeholder="例如：海淀区、朝阳区"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1677ff] focus:ring-[#1677ff]"
          required
        />
      </div>
      <div>
        <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
          从业年限
        </label>
        <input
          type="number"
          id="experience"
          min="0"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1677ff] focus:ring-[#1677ff]"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          个人简介
        </label>
        <textarea
          id="description"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1677ff] focus:ring-[#1677ff]"
          placeholder="请简单介绍您的工作经验和专长..."
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1677ff] hover:bg-[#4096ff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1677ff]"
      >
        提交注册
      </button>
    </form>
  );
};
export default WorkerRegisterForm;
