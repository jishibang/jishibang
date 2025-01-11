import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../contexts/LangContext';

const Footer = () => {
  const { t } = useLang();
  
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold">{t('app.name')}</h3>
            <p className="mt-4 text-gray-300">
              {t('footer.description')}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t('footer.links')}</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">
                  {t('footer.aboutUs')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">
                  {t('footer.contactUs')}
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-300 hover:text-white">
                  {t('footer.help')}
                </Link>
              </li>
              <li>
                <Link to="/join" className="text-gray-300 hover:text-white">
                  {t('footer.join')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t('footer.contact')}</h3>
            <ul className="mt-4 space-y-2 text-gray-300">
              <li>{t('footer.phone')}: 400-123-4567</li>
              <li>{t('footer.email')}: support@example.com</li>
              <li>{t('footer.address')}: 北京市朝阳区xxx街xxx号</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} {t('app.name')}. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;