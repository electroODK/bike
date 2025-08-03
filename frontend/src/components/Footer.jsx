// src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Footer.module.css';

import facebookIconUrl from '../assets/images/facebook.svg';
import instagramIconUrl from '../assets/images/Instagram.svg';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerTop}>
                    <div className={styles.linkColumn}>
                        <h4>Аренда велосипедов</h4>

                        <Link to="/rentals/aluminum">Алюминий</Link>
                        <Link to="/rentals/carbon">Карбон</Link>
                        <Link to="/rentals/mountain-city">Горные/городские</Link>
                        <Link to="/rentals/teen-economy">Подрозковые эконом</Link>
                    </div>
                    <div className={styles.linkGroup}>
             
                        <div className={styles.linkColumn}><Link to="/rules">Правила</Link></div>
                        <div className={styles.linkColumn}><Link to="/reviews">Отзывы</Link></div>
                        <div className={styles.linkColumn}><Link to="/contacts">Контакты</Link></div>
                        <div className={styles.linkColumn}><Link to="/feedback">Обратная связь</Link></div>
                    </div>
                </div>
                <div className={styles.footerBottom}>
                    <div className={styles.copyrightSection}>
                        <span>© BikePark, 2021</span>
                    
                        <Link to="/privacy-policy">Политика конфиденциальности</Link>
                    </div>
                    <div className={styles.socialIcons}>
                       <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <img src={facebookIconUrl} alt="Facebook" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <img src={instagramIconUrl} alt="Instagram" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;