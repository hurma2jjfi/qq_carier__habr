import React, { useState, useEffect } from 'react';
import '../../styles/CityModal.css';

const cities = [
  "Москва",
  "Санкт-Петербург",
  "Новосибирск",
  "Екатеринбург",
  "Казань",
  "Нижний Новгород",
  "Челябинск",
  "Самара",
  "Омск",
  "Ростов-на-Дону",
  "Уфа",
  "Красноярск",
  "Воронеж",
  "Пермь",
  "Волгоград",
];

function CityModal({ open, onClose, onConfirm, initialCity }) {
  const [search, setSearch] = useState('');
  const [filteredCities, setFilteredCities] = useState(cities);
  const [selectedCity, setSelectedCity] = useState(initialCity || '');

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredCities(cities);
    } else {
      const lowerSearch = search.toLowerCase();
      setFilteredCities(
        cities.filter(city => city.toLowerCase().includes(lowerSearch))
      );
    }
  }, [search]);

  useEffect(() => {
    // Сброс состояния при закрытии модалки
    if (!open) {
      setSearch('');
      setFilteredCities(cities);
      setSelectedCity(initialCity || '');
    }
  }, [open, initialCity]);

  const handleConfirm = () => {
    if (selectedCity) {
      onConfirm(selectedCity);
      onClose();
    } else {
      alert('Пожалуйста, выберите город');
    }
  };

  return (
    <div className={`city-modal ${open ? 'open' : ''}`}>
      <div className="city-modal__overlay" onClick={onClose}></div>
      <div className="city-modal__content" role="dialog" aria-modal="true" aria-labelledby="city-modal-title">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h2 id="city-modal-title">Выберите город</h2>
          <button
            className="city-modal__close"
            onClick={onClose}
            aria-label="Закрыть модальное окно"
          >
            &times;
          </button>
        </div>
        <p className="city-modal__desc">От выбора зависит, какие зарплаты и аналитику покажем</p>
        <input
          className="city-modal__search"
          placeholder="Поиск"
          value={search}
          onChange={e => setSearch(e.target.value)}
          autoFocus
          aria-label="Поиск города"
        />
        <ul className="city-modal__list" role="listbox" aria-activedescendant={selectedCity ? `city-${selectedCity}` : undefined}>
          {filteredCities.length > 0 ? (
            filteredCities.map(city => (
              <li
                key={city}
                id={`city-${city}`}
                className={`city-modal__item ${selectedCity === city ? 'selected' : ''}`}
                onClick={() => setSelectedCity(city)}
                role="option"
                aria-selected={selectedCity === city}
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedCity(city);
                  }
                }}
              >
                {city}
              </li>
            ))
          ) : (
            <li className="city-modal__no-results">Города не найдены</li>
          )}
        </ul>
        <button
          className="city-modal__confirm"
          onClick={handleConfirm}
          disabled={!selectedCity}
          aria-disabled={!selectedCity}
        >
          Подтвердить
        </button>
      </div>
    </div>
  );
}

export default CityModal;
