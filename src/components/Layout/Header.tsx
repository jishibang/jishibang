import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../contexts/LangContext';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { t } = useLang();
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="bg-white shadow">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-900">
                {t('app.name')}
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {user?.role === 'worker' && (
                  <Link
                    to="/worker/orders"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    工单管理
                  </Link>
                )}
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                    <span>{user?.username}</span>
                  </button>
                  <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {t('header.profile')}
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {t('header.logout')}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-gray-900"
                >
                  {t('header.login')}
                </Link>
                <Link
                  to="/register-choice"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  {t('header.register')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;