import { useState } from 'react';
import { useLang } from '../contexts/LangContext';

export const useErrorHandler = () => {
  const [error, setError] = useState<string | null>(null);
  const { t } = useLang();

  const handleError = (err: any) => {
    console.error('Error:', err);
    const message = err.message || t('common.error');
    setError(message);
    // 可以添加 toast 提示
    setTimeout(() => setError(null), 3000);
  };

  return { error, setError, handleError };
};