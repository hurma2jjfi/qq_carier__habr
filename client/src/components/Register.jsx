import React, { useState } from 'react';
import { InputMask } from '@react-input/mask';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

function Register() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    phone: false,
    password: false,
    passwordConfirm: false,
    agree: false,
  });

  const evaluatePasswordStrength = (pass) => {
    if (!pass) return { label: '', color: '', score: 0 };

    let score = 0;
    if (pass.length >= 6) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1) return { label: 'Очень слабый', color: 'red', score };
    if (score === 2) return { label: 'Слабый', color: 'orange', score };
    if (score === 3) return { label: 'Средний', color: 'goldenrod', score };
    if (score === 4) return { label: 'Сильный', color: 'green', score };

    return { label: '', color: '', score: 0 };
  };

  const passwordStrength = evaluatePasswordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setErrors({ phone: false, password: false, passwordConfirm: false, agree: false });

    const digitsOnly = phone.replace(/[^\d+]/g, '');
    const phoneRegex = /^\+7\d{10}$/;

    let hasError = false;
    const newErrors = {};

    if (!phoneRegex.test(digitsOnly)) {
      newErrors.phone = true;
      toast.error('Номер телефона должен быть в формате +7XXXXXXXXXX и содержать только цифры');
      hasError = true;
    }

    if (password.length < 6) {
      newErrors.password = true;
      toast.error('Пароль должен содержать минимум 6 символов');
      hasError = true;
    }

    if (password !== passwordConfirm) {
      newErrors.passwordConfirm = true;
      toast.error('Пароли не совпадают');
      hasError = true;
    }

    if (!agree) {
      newErrors.agree = true;
      toast.error('Вы должны согласиться с условиями');
      hasError = true;
    }

    if (hasError) {
      setErrors(prev => ({ ...prev, ...newErrors }));
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/auth/register', { phone: digitsOnly, password });
      toast.success(res.data.message || 'Регистрация прошла успешно!');
      setPhone('');
      setPassword('');
      setPasswordConfirm('');
      setAgree(false);
      setErrors({ phone: false, password: false, passwordConfirm: false, agree: false });

      setLoading(false);
      navigate('/login');
    } catch (error) {
      setLoading(false);
      if (error.response) {
        toast.error(error.response.data.message || 'Ошибка при регистрации');
      } else {
        toast.error('Ошибка при регистрации');
      }
    }
  };

  const inputStyle = (error) => ({
    border: error ? '2px solid red' : '1px solid #ccc',
    borderRadius: 4,
    padding: '8px',
    width: '100%',
    boxSizing: 'border-box',
    outline: 'none',
  });

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h1>Регистрация</h1>
      <form onSubmit={handleSubmit} noValidate>

        <div style={{ marginBottom: 16 }}>
          <label>Номер телефона:</label><br />
          <InputMask
            mask="+7 (___) ___-__-__"
            replacement={{ _: /\d/ }}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 (___) ___-__-__"
            required
            style={inputStyle(errors.phone)}
          />
        </div>

        <div style={{ marginBottom: 4 }}>
          <label>Пароль:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            placeholder="Минимум 6 символов"
            style={inputStyle(errors.password)}
          />
          {password && (
            <div style={{ marginTop: 6 }}>
              <small style={{ marginBottom: 4, display: 'block', fontWeight: '600', color: passwordStrength.color }}>
                {passwordStrength.label}
              </small>
              <div
                style={{
                  height: 6,
                  width: '100%',
                  backgroundColor: '#e0e0e0',
                  borderRadius: 3,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${(passwordStrength.score / 4) * 100}%`,
                    backgroundColor: passwordStrength.color,
                    borderRadius: 3,
                    transition: 'width 0.5s ease-in-out',
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div style={{ marginBottom: 16 }}>
          <label>Повторите пароль:</label><br />
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
            minLength={6}
            style={inputStyle(errors.passwordConfirm)}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label>
            <input
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
              style={{ marginRight: 8 }}
            />
            Я согласен с <Link to="/terms" target="_blank" rel="noopener noreferrer">условиями использования</Link>
          </label>
          {errors.agree && <div style={{ color: 'red', fontSize: 12 }}>Вы должны согласиться с условиями</div>}
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
          {loading ? <ClipLoader color="#fff" size={20} /> : 'Зарегистрироваться'}
        </button>

        <div style={{ marginTop: 12, textAlign: 'center' }}>
          <Link to="/login">Уже есть аккаунт? Войти</Link>
        </div>
      </form>

      <Toaster position="bottom-right" />
    </div>
  );
}

export default Register;
