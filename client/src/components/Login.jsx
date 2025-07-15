import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../components/context/AuthContext';
import ClipLoader from 'react-spinners/ClipLoader';
import '../styles/Login.css';

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    phone: false,
    password: false,
  });

  const inputStyle = (error) => ({
    border: error ? '2px solid red' : '1px solid #ccc',
    borderRadius: 4,
    padding: '8px',
    width: '100%',
    boxSizing: 'border-box',
    outline: 'none',
  });

  // Функция задержки для промиса
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({ phone: false, password: false });

    const digitsOnly = phone.replace(/[^\d+]/g, '');
    const phoneRegex = /^\+7\d{10}$/;

    let hasError = false;
    const newErrors = {};

    if (!phoneRegex.test(digitsOnly)) {
      newErrors.phone = true;
      toast.error('Неверный формат номера телефона. Используйте +7XXXXXXXXXX');
      hasError = true;
    }

    if (!password) {
      newErrors.password = true;
      toast.error('Введите пароль');
      hasError = true;
    }

    if (hasError) {
      setErrors(prev => ({ ...prev, ...newErrors }));
      setLoading(false);
      return;
    }

    try {
      // Параллельно выполняем запрос и задержку минимум 2 секунды
      const [res] = await Promise.all([
        axios.post('http://localhost:5000/auth/login', { phone: digitsOnly, password }),
        delay(1000)
      ]);

      login(res.data.token);
      toast.success('Вход выполнен успешно!');
      navigate('/');
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || 'Ошибка при входе');
      } else {
        toast.error('Ошибка при входе');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h1>Вход</h1>
      
      <form onSubmit={handleSubmit} noValidate>

        <div style={{ marginBottom: 16 }}>
          <label>Номер телефона:</label><br />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7XXXXXXXXXX"
            required
            style={inputStyle(errors.phone)}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label>Пароль:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle(errors.password)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#000',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: loading ? 'not-allowed' : 'pointer',
            width: '100%',
            fontSize: 16,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {loading ? <ClipLoader color="#fff" size={20} /> : 'Войти'}
        </button>

        <div style={{ marginTop: 12, textAlign: 'center' }}>
          <Link to="/register">Нету аккаунта? Зарегистрируйтесь</Link>
        </div>
      </form>

      <Toaster position="bottom-right" />
    </div>
  );
}

export default Login;
