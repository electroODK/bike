// src/components/Login.jsx

import React, { useState } from 'react';
import styles from '../components/Auth.module.css';
import OpenEye from '../assets/images/openeye.png'; // Проверь путь к картинкам!
import CloseEye from '../assets/images/closeeye.png'; // Проверь путь к картинкам!
import { login } from '../api/auth'; 

const Login = ({ isOpen, onClose, onSwitchToRegister, onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const userData = await login(email, password);
            onLoginSuccess(userData);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className={styles.closeButton}>×</button>
                <div className={styles.tabs}>
                    <button className={`${styles.tab} ${styles.activeTab}`}>Вход</button>
                    <button onClick={onSwitchToRegister} className={styles.tab}>Регистрация</button>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>E-mail*</label>
                        <input 
                            type="email" 
                            // [ИСПРАВЛЕНО] Убраны подсказки для теста из placeholder.
                            placeholder="Введите E-mail" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Пароль*</label>
                        <div className={styles.passwordWrapper}>
                            <input 
                                type={showPassword ? "text" : "password"} 
                                // [ИСПРАВЛЕНО] Убраны подсказки для теста из placeholder.
                                placeholder="Введите пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className={styles.eyeButton}>
                                <img src={showPassword ? OpenEye : CloseEye} alt="Toggle password visibility" />
                            </button>
                        </div>
                    </div>
                    {error && <p style={{color: 'red', textAlign: 'center'}}>{error}</p>}
                    <button type="submit" className={styles.submitButton} disabled={isLoading}>
                        {isLoading ? 'Входим...' : 'Войти'}
                    </button>
                    <p className={styles.switchForm}>
                        Нет аккаунта?
                        <button type="button" onClick={onSwitchToRegister}>Зарегистрироваться</button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;