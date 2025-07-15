import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';


// Функция подсчёта размера кэша в localStorage (в КБ)
function getCacheSize() {
  let total = 0;
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      let value = localStorage.getItem(key);
      total += key.length + (value ? value.length : 0);
    }
  }
  return (total / 1024).toFixed(2);
}

// Простой CSS-спиннер
const Spinner = () => (
  <div style={{
    border: '2px solid #f3f3f3',
    borderTop: '2px solid #333',
    borderRadius: '50%',
    width: 14,
    height: 14,
    animation: 'spin 1s linear infinite',
  }} />
);

// Добавим keyframes для анимации спина
const spinnerStyle = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

// Вставляем стили в head
if (typeof document !== 'undefined' && !document.getElementById('spinner-style')) {
  const style = document.createElement('style');
  style.id = 'spinner-style';
  style.type = 'text/css';
  style.appendChild(document.createTextNode(spinnerStyle));
  document.head.appendChild(style);
}

const ClearCache = () => {
  const [cacheSize, setCacheSize] = useState('0');
  const [isClearing, setIsClearing] = useState(false);

  useEffect(() => {
    setCacheSize(getCacheSize());
  }, []);

  const clearCache = () => {
    if (parseFloat(cacheSize) === 0) {
      toast.error('Кэш уже пуст')
      return;
    }

    setIsClearing(true);

    setTimeout(() => {
      localStorage.clear();
      setCacheSize('0');
      setIsClearing(false);
      toast.success('Кэш очищен');
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #eee' }}>
      <button
        onClick={clearCache}
        disabled={parseFloat(cacheSize) === 0 || isClearing}
        style={{
          background: 'none',
          border: 'none',
          color: parseFloat(cacheSize) === 0 || isClearing ? '#999' : '#000',
          cursor: parseFloat(cacheSize) === 0 || isClearing ? 'default' : 'pointer',
          fontSize: 10,
          padding: 0,
          textDecoration: parseFloat(cacheSize) === 0 || isClearing ? 'none' : 'underline',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          whiteSpace: 'nowrap', // Запрещаем перенос текста
        }}
      >
        {isClearing && <Spinner />}
        Очистить кэш
      </button>
      <span style={{ fontSize: 10, color: '#666', whiteSpace: 'nowrap' }}>{cacheSize} KB занято</span>
      <Toaster position="bottom-right" />
    </div>

    

  );
};

export default ClearCache;
