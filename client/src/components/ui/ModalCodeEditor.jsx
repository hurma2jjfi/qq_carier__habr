// src/components/ui/ModalCodeEditor.jsx
import React, { useState, useEffect } from 'react';
import '../../styles/ModalCodeEditor.css'; // Убедитесь, что путь правильный

const ModalCodeEditor = ({ isOpen, onClose, onLanguageSelect }) => {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Эффект для загрузки языков при открытии модального окна
  useEffect(() => {
    if (!isOpen) {
      // Если модалка закрыта, сбрасываем состояние
      setLanguages([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    // Запрос к вашему Express.js бэкенду
    fetch('http://localhost:5000/api/languages')
      .then(response => {
        if (!response.ok) {
          // Если ответ не ОК (например, 404, 500), выбрасываем ошибку
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          setLanguages(data.languages);
        } else {
          // Если сервер ответил успешно, но `success` false
          setError(data.message || 'Ошибка сервера: не удалось получить языки');
        }
      })
      .catch(err => {
        // Ошибка сети или другая ошибка fetch
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [isOpen]); // Зависимость от isOpen означает, что запрос будет отправлен при каждом открытии

  // Если модальное окно закрыто, ничего не рендерим
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-content">
        <button 
          className="modal-close-button" 
          onClick={onClose} 
          aria-label="Закрыть модальное окно"
        >
          &times;
        </button>
        <h2 id="modal-title">Выберите язык программирования:</h2>

        {loading && <p>Загрузка языков...</p>}
        {error && <p style={{color: 'red'}}>Ошибка: {error}</p>}

        {!loading && !error && (
          <ul>
            {languages.length === 0 && <li>Языки не найдены. Проверьте сервер.</li>}
            {languages.map(lang => (
              <li key={lang.id}>
                <button 
                  onClick={() => { 
                    // Передаем весь объект языка (id и name)
                    onLanguageSelect({ id: lang.id, name: lang.name }); 
                    onClose(); // Закрываем модальное окно после выбора
                  }}
                >
                  {lang.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ModalCodeEditor;

