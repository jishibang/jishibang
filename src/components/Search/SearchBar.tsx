import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../../contexts/LangContext';

const SearchBar: React.FC = () => {
  const { t } = useLang();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    service: '',
    area: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    navigate(`/workers?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto">
      <input
        type="text"
        placeholder={t('search.servicePlaceholder')}
        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={searchParams.service}
        onChange={(e) => setSearchParams(prev => ({ ...prev, service: e.target.value }))}
      />
      <input
        type="text"
        placeholder={t('search.areaPlaceholder')}
        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={searchParams.area}
        onChange={(e) => setSearchParams(prev => ({ ...prev, area: e.target.value }))}
      />
      <button
        type="submit"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {t('search.button')}
      </button>
    </form>
  );
};

export default SearchBar;