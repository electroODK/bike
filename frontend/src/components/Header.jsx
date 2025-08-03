// src/components/Header.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import styles from './Header.module.css';
import Login from './Login';
import Register from './Register';

import { useAuth } from './AuthContext.jsx';

import logoImage from '../assets/images/Group 150.png';
import profileImage from '../assets/images/Group 268.png';
import notFoundImage from '../assets/images/full.png';

dayjs.extend(utc);
dayjs.extend(timezone);

const timezones = [
    { name: 'Dubai', zone: 'Asia/Dubai' },
    { name: 'Moscow', zone: 'Europe/Moscow' },
    { name: 'London', zone: 'Europe/London' },
    { name: 'New York', zone: 'America/New_York' },
    { name: 'Tokyo', zone: 'Asia/Tokyo' },
];

const languages = [
    { code: 'RU', name: 'Русский' },
    { code: 'EN', name: 'English' }
];

const BurgerIcon = ({ isOpen, ...props }) => {
    return (
        <button className={styles.mobileBurger} {...props}>
            {isOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 12h18M3 6h18M3 18h18" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            )}
        </button>
    );
};

const Header = () => {
    // [ШАГ 2] Получаем состояние и функции из нашего AuthContext
    const { isLoggedIn, login, logout } = useAuth();

    // Локальные состояния, которые нужны только этому компоненту, остаются здесь
    const [currentTime, setCurrentTime] = useState('');
    const [selectedTimezone, setSelectedTimezone] = useState(timezones[0]);
    const [isAvatarDropdownOpen, setAvatarDropdownOpen] = useState(false);
    const [isTimeDropdownOpen, setTimeDropdownOpen] = useState(false);
    const [isLangDropdownOpen, setLangDropdownOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState(languages[0]);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    // [ШАГ 3] Локальное состояние isLoggedIn УДАЛЕНО. Оно теперь глобальное.

    const avatarRef = useRef(null);
    const timeRef = useRef(null);
    const langRef = useRef(null);
    const headerWrapperRef = useRef(null);

    // [ШАГ 4] Упрощаем обработчики. Теперь они вызывают функции из контекста.
    const handleLoginSuccess = (userData) => {
        console.log('Пользователь успешно вошел, данные получены:', userData);
        login(userData.token); // Вызываем login из контекста
        setIsLoginOpen(false);
    };

    const handleLogout = () => {
        logout(); // Вызываем logout из контекста
        setAvatarDropdownOpen(false);
        closeAllMenus();
    };

    const handleRegisterSuccess = () => {
        console.log('Регистрация прошла успешно! Теперь пользователь может войти.');
        setIsRegisterOpen(false);
        setIsLoginOpen(true);
    };

    // Все useEffect, не связанные с авторизацией, остаются без изменений
    useEffect(() => {
        const update = () => setCurrentTime(dayjs().tz(selectedTimezone.zone).format('h:mm A'));
        update();
        const timerId = setInterval(update, 1000);
        return () => clearInterval(timerId);
    }, [selectedTimezone]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (avatarRef.current && !avatarRef.current.contains(event.target)) setAvatarDropdownOpen(false);
            if (timeRef.current && !timeRef.current.contains(event.target)) setTimeDropdownOpen(false);
            if (langRef.current && !langRef.current.contains(event.target)) setLangDropdownOpen(false);
            if (isMobileMenuOpen && headerWrapperRef.current && !headerWrapperRef.current.contains(event.target)) {
                 setMobileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMobileMenuOpen]);

    useEffect(() => {
        const isAnyModalOpen = isLoginOpen || isRegisterOpen;
        const isAnyMenuOpen = isMobileMenuOpen;
        document.body.style.overflow = isAnyModalOpen || isAnyMenuOpen ? 'hidden' : 'auto';
        return () => { document.body.style.overflow = 'auto'; };
    }, [isLoginOpen, isRegisterOpen, isMobileMenuOpen]);

    const closeAllMenus = () => {
        setMobileMenuOpen(false);
    };

    return (
        <>
            <div className={`${styles.headerWrapper} ${isMobileMenuOpen ? styles.isMenuOpen : ''}`} ref={headerWrapperRef}>
                <header className={styles.mainHeader}>
                    <nav className={styles.navbar}>
                        <div className={styles.navLeft}>
                             <Link to="/" className={styles.logo}><img src={logoImage} alt="BikePark Logo" /></Link>
                             <div className={styles.navLinks}>
                                 <Link to="/about" className={styles.hideOnTablet}>О нас</Link>
                                 <Link to="/rentals" className={styles.mainLink}>Аренда</Link>
                                 <Link to="/delivery" className={styles.mainLink}>Доставка</Link>
                                 <Link to="/places" className={styles.hideOnTablet}>Где кататься</Link>
                                 <Link to="/contacts" className={styles.hideOnTablet}>Контакты</Link>
                             </div>
                        </div>
                        <div className={styles.navRight}>
                             <a href="tel:+971525634064" className={styles.phoneNumber}>+971 52 563 4064</a>
                             <div className={styles.profileContainer} ref={avatarRef}>
                                 <button onClick={() => setAvatarDropdownOpen(!isAvatarDropdownOpen)} className={styles.profileIcon}>
                                     <img src={isAvatarDropdownOpen ? notFoundImage : profileImage} alt="Profile Icon" />
                                 </button>
                                 
                                 {isAvatarDropdownOpen && (
                                     <div className={styles.avatarDropdown}>
                                        <Link to="/profile">Личный кабинет</Link>
                                        
                                        {isLoggedIn ? (
                                             <button onClick={handleLogout}>Выйти</button>
                                         ) : (
                                             <button onClick={() => { setIsLoginOpen(true); setAvatarDropdownOpen(false); }}>Войти</button>
                                         )}
                                     </div>
                                 )}
                             </div>
                             <div className={styles.timeContainer} ref={timeRef}>
                                <div onClick={() => setTimeDropdownOpen(!isTimeDropdownOpen)} className={styles.timeDisplay}><span className={styles.currentTime}>{currentTime}</span><span className={styles.currentCity}>Time in {selectedTimezone.name}</span></div>
                                {isTimeDropdownOpen && (<div className={styles.dropdownMenu}>{timezones.map(tz => (<button key={tz.zone} onClick={() => { setSelectedTimezone(tz); setTimeDropdownOpen(false); }}>{tz.name}</button>))}</div>)}
                             </div>
                             <div className={styles.langSwitcher} ref={langRef} onClick={() => setLangDropdownOpen(!isLangDropdownOpen)}>
                                <span>{selectedLang.code} ▼</span>
                                {isLangDropdownOpen && (<div className={styles.dropdownMenu}>{languages.map(lang => (<button key={lang.code} onClick={() => { setSelectedLang(lang); setLangDropdownOpen(false); }}>{lang.name}</button>))}</div>)}
                             </div>
                             <BurgerIcon isOpen={isMobileMenuOpen} onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} />
                        </div>
                    </nav>
                </header>
                <div className={styles.tabletDropdownMenu}>
                    <div className={styles.dropdownMenuContent}>
                        <div className={styles.dropdownLinks}>
                            <Link to="/rentals" onClick={closeAllMenus}>Аренда</Link>
                            <Link to="/delivery" onClick={closeAllMenus}>Доставка</Link>
                            <Link to="/about" onClick={closeAllMenus}>О нас</Link>
                            <Link to="/places" onClick={closeAllMenus}>Где кататься</Link>
                            <Link to="/contacts" onClick={closeAllMenus}>Контакты</Link>
                        </div>
                        <div className={styles.langSwitcherTablet}>
                            {languages.map((lang, index) => (
                                <React.Fragment key={lang.code}>
                                    <button className={selectedLang.code === lang.code ? styles.langActiveTablet : ''} onClick={() => setSelectedLang(lang)}>{lang.name}</button>
                                    {index < languages.length - 1 && <span>/</span>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && <div className={styles.backdrop} onClick={closeAllMenus}></div>}
            
            <div className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.mobileMenuOverlayOpen : ''}`} onClick={closeAllMenus}>
                <div className={styles.mobileMenuContent} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.mobileMenuHeader}>
                        <Link to="/" className={styles.logo}><img src={logoImage} alt="BikePark Logo" /></Link>
                        <BurgerIcon isOpen={true} onClick={closeAllMenus} />
                    </div>
                    <div className={styles.mobileMenuLinks}>
                        <Link to="/about" onClick={closeAllMenus}>О нас</Link>
                        <Link to="/rentals" onClick={closeAllMenus}>Аренда</Link>
                        <Link to="/delivery" onClick={closeAllMenus}>Доставка</Link>
                        <Link to="/places" onClick={closeAllMenus}>Где кататься</Link>
                        <Link to="/contacts" onClick={closeAllMenus}>Контакты</Link>
                    </div>
                    <div className={styles.mobileMenuFooter}>
                        {isLoggedIn ? (
                           <>
                                <Link to="/profile" className={styles.mobileCabinetLink} onClick={closeAllMenus}>Личный кабинет</Link>
                                <button className={styles.mobileLogoutButton} onClick={handleLogout}>Выйти</button>
                            </>
                        ) : (
                           <>
                                <Link to="#" className={styles.mobileCabinetLink} onClick={() => {setIsLoginOpen(true); closeAllMenus();}}>Личный кабинет</Link>
                                <button className={styles.mobileLoginButton} onClick={() => {setIsLoginOpen(true); closeAllMenus();}}>Войти</button>
                           </>
                        )}
                        <div className={styles.langSwitcherMobile}>
                            {languages.map((lang, index) => (
                                <React.Fragment key={lang.code}>
                                    <button className={selectedLang.code === lang.code ? styles.langActive : ''} onClick={() => setSelectedLang(lang)}>{lang.code}</button>
                                    {index < languages.length - 1 && <span>/</span>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            <Login 
                isOpen={isLoginOpen} 
                onClose={() => setIsLoginOpen(false)} 
                onSwitchToRegister={() => { setIsLoginOpen(false); setIsRegisterOpen(true); }}
                onLoginSuccess={handleLoginSuccess}
            />
            <Register 
                isOpen={isRegisterOpen} 
                onClose={() => setIsRegisterOpen(false)} 
                onSwitchToLogin={() => { setIsRegisterOpen(false); setIsLoginOpen(true); }}
                onRegisterSuccess={handleRegisterSuccess}
            />
        </>
    );
};

export default Header;