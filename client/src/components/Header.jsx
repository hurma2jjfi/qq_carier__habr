import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Header.css';
import Logo from '../images/logo.svg';
import Map from '../images/map.svg';
import CityModal from '../components/ui/CityModal';
import ProfileIcon from '../images/profile.svg';
import { AuthContext } from '../components/context/AuthContext';
import ClearCache from '../components/ClearCache';


function Header() {
  const [isCityModalOpen, setCityModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userPhone, setUserPhone] = useState('');
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // Закрываем меню при клике вне его
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  // Запрос данных пользователя при авторизации
  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await axios.get('http://localhost:5000/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data && res.data.phone) {
          setUserPhone(res.data.phone);
        }
      } catch (error) {
        console.error('Ошибка при получении профиля пользователя', error);
        // При ошибке можно, например, разлогинить пользователя
        // logout();
      }
    }

    if (isAuthenticated) {
      fetchUserProfile();
    } else {
      setUserPhone('');
    }
  }, [isAuthenticated, logout]);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo"><Link to="/"><img src={Logo} alt="Логотип" /></Link></div>
      <nav className="navigation">
        <ul className='links'>
          <li><Link to="/">Личный кабинет</Link></li>
          <li><Link to="/">Профессии</Link></li>
          <li><Link to="/">Обучение</Link></li>
          <li className='weighter'><Link to="/">Подтверждение навыков</Link></li>
          <li><Link to="/">Журнал</Link></li>
        </ul>
      </nav>

      <div className="wrap__btns">
        <div className="wrap__flex" onClick={() => setCityModalOpen(true)} style={{ cursor: 'pointer' }}>
          <div className="icon-map">
            <img src={Map} alt="Иконка карты" />
          </div>
          <li>Москва</li>
        </div>

        {isAuthenticated ? (
          <div className="profile-wrapper" style={{ position: 'relative' }}>
            <img
              src={ProfileIcon}
              alt="Профиль"
              style={{ cursor: 'pointer', width: 32, height: 32 }}
              onClick={() => setMenuOpen(prev => !prev)}
            />

            {menuOpen && (
              <div
                ref={menuRef}
                className="profile-menu"
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  backgroundColor: 'white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  borderRadius: 6,
                  width: 220,
                  zIndex: 1000,
                  padding: '12px 16px',
                }}
              >
                <div style={{ marginBottom: 12, fontWeight: 'bold', fontSize: 14, color: '#333',   padding: '8px 0 8px 16px', }}>
                  {userPhone || 'Телефон не указан'}
                </div>
                <div style={{ height: 1, backgroundColor: '#ddd', marginBottom: 12 }} />

                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'block',
                    padding: '8px 0 8px 16px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: 14,
                    borderBottom: '1px solid #eee',
                  }}
                >
                  Профиль
                </Link>
                
                {/* Компонент для очистки кэша */}
                <ClearCache />                

                <button
                  onClick={handleLogout}
                  className='logout'
                >
                  Выйти
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/register"><button className='register'>Регистрация</button></Link>
        )}
      </div>

      <CityModal open={isCityModalOpen} onClose={() => setCityModalOpen(false)} />
    </header>
  );
}

export default Header;
