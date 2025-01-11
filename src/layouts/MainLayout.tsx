import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';  // 添加 useLocation
import { Icon } from '@iconify/react';

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();  // 添加这行

  const navItems = [
    { title: '首页', icon: 'ri:home-line', path: '/' },
    { title: '附近', icon: 'ri:map-pin-line', path: '/nearby' },
    { title: '订单', icon: 'ri:file-list-line', path: '/orders' },
    { title: '我的', icon: 'ri:user-line', path: '/profile' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 text-gray-500"
          >
            <Icon icon="ri:arrow-left-s-line" className="text-2xl" />
          </button>
          <h1 className="flex-1 text-center font-medium">急事帮</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="pt-14 pb-16">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-around">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center ${
                location.pathname === item.path ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              <Icon icon={item.icon} className="text-xl" />
              <span className="text-xs mt-1">{item.title}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default MainLayout;