import React, { useState } from 'react';
import styles from '../components/Auth.module.css';
import OpenEye from '../assets/images/openeye.png';
import CloseEye from '../assets/images/closeeye.png';
import { register } from '../api/api.js'; // теперь из общего api.js

const Register = ({ isOpen, onClose, onSwitchToLogin, onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone_number: '', // ⚡ имя поля как в бэке
    email: '',
    password: '',
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!agreeTerms) {
      setError('Необходимо согласие на обработку персональных данных');
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await register(formData);

      // ⚡ предполагаем, что бэк вернет { access_token, refresh_token, user }
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);

      // сообщаем родителю/контексту
      if (onRegisterSuccess) onRegisterSuccess(data.user);

      onClose(); // закрыть модалку
    } catch (err) {
      // если бэк вернет error.response.data.message
      setError(err.response?.data?.message || 'Ошибка регистрации');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className={styles.closeButton}>×</button>

        <div className={styles.tabs}>
          <button onClick={onSwitchToLogin} className={styles.tab}>Вход</button>
          <button className={`${styles.tab} ${styles.activeTab}`}>Регистрация</button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Имя*</label>
            <input
              type="text"
              name="name"
              placeholder="Введите имя"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Номер телефона*</label>
            <input
              type="tel"
              name="phone_number" // ⚡ как в бэке
              placeholder="Введите номер телефона"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>E-mail*</label>
            <input
              type="email"
              name="email"
              placeholder="Введите E-mail"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Пароль*</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Введите пароль"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.eyeButton}
              >
                <img
                  src={showPassword ? OpenEye : CloseEye}
                  alt="Toggle password visibility"
                />
              </button>
            </div>
          </div>

          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              id="agree"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            <label htmlFor="agree">Согласие на обработку персональных данных</label>
          </div>

          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

          <button type="submit" className={styles.submitButton} disabled={isLoading}>
            {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>

          <p className={styles.switchForm}>
            Уже авторизованы?{' '}
            <button type="button" onClick={onSwitchToLogin}>Войти</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
