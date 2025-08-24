// src/pages/About/About.jsx

import React, { useState, useRef, useEffect } from 'react';
import styles from './About.module.css';

import bikeImage from '../../assets/images/bike.png';
import palkaIcon from '../../assets/images/Palka.svg';

const reviewsData = [
  {
    id: 1,
    text: 'Безусловно, семантический разбор внешних противодействий способствует повышению качества вывода текущих активов.',
    author: 'АЛЕКСАНДР Н',
  },
  ...Array.from({ length: 8 }, (_, index) => ({
    id: index + 2,
    text: 'Безусловно, семантический разбор внешних противодействий способствует повышению качества позиций, занимаемых участниками.',
    author: 'АЛЕКСАНДР Н',
  })),
];

// --- ИЗМЕНЕНИЯ ЗДЕСЬ: Логика слайдера становится адаптивной ---

const About = () => {
  const [activePage, setActivePage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const carouselRef = useRef(null);

  // Этот хук будет следить за размером окна и обновлять количество точек
  useEffect(() => {
    const calculatePages = () => {
      if (!carouselRef.current || !carouselRef.current.firstChild) return;

      const containerWidth = carouselRef.current.offsetWidth;
      const cardWidth = carouselRef.current.firstChild.offsetWidth;
      const gap = 24; // Это значение из нашего CSS

      // Вычисляем, сколько карточек помещается на экране
      const itemsPerPage = Math.round(containerWidth / (cardWidth + gap));
      
      const total = Math.ceil(reviewsData.length / (itemsPerPage > 0 ? itemsPerPage : 1));
      setTotalPages(total);
    };

    calculatePages(); // Вызываем сразу
    window.addEventListener('resize', calculatePages); // И при каждом изменении размера окна

    // Очищаем слушатель, когда компонент исчезает
    return () => window.removeEventListener('resize', calculatePages);
  }, []); // Пустой массив означает, что этот эффект запустится один раз при монтировании

  
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const handleMouseDown = (e) => {
    if (!carouselRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeftStart.current = carouselRef.current.scrollLeft;
    carouselRef.current.classList.add(styles.activeDrag);
  };

  const handleMouseLeaveOrUp = () => {
    isDragging.current = false;
    if (carouselRef.current) {
      carouselRef.current.classList.remove(styles.activeDrag);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    carouselRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, firstChild, offsetWidth } = carouselRef.current;
      if (!firstChild) return;

      const cardWidth = firstChild.offsetWidth;
      const gap = 24;

      // Более точный расчет текущей страницы для мобильных
      const currentPage = Math.round(scrollLeft / (cardWidth + gap));
      setActivePage(currentPage);
    }
  };

  return (
    <div className={styles.aboutPageContainer}>
      <div className={styles.sectionWrapper}>
        <section className={styles.aboutSection}>
          <div className={styles.aboutTextContent}>
            <h1 className={styles.title}>О нас</h1>
            <p className={styles.paragraph}>
              Товарищи! постоянный количественный рост и сфера нашей активности
              позволяет выполнять важные задания по разработке направлений
              прогрессивного развития. Идейные соображения высшего порядка, а
              также постоянное количественное рост и сфера нашей активности
              играет важную роль в формировании позиций, занимаемых участниками
              в отношении поставленных задач.
            </p>
            <p className={styles.paragraph}>
              Таким образом дальнейшее развитие различных форм деятельности
              способствует подготовке и реализации позиций, занимаемых
              участниками в отношении.
            </p>
          </div>
          <div className={styles.aboutImageContainer}>
            <img src={bikeImage} alt="Группа велосипедистов на дороге" className={styles.aboutImage} />
          </div>
        </section>
      </div>

      <div className={styles.sectionWrapper}>
        <section className={styles.reviewsSection}>
          <h2 className={styles.title}>Отзывы</h2>
          
          <div 
            className={styles.reviewsCarousel}
            ref={carouselRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeaveOrUp}
            onMouseUp={handleMouseLeaveOrUp}
            onMouseMove={handleMouseMove}
          >
            {reviewsData.map((review) => (
              <div key={review.id} className={styles.reviewCard}>
                <p className={styles.reviewText}>{review.text}</p>
                <div className={styles.reviewFooter}>
                  <img src={palkaIcon} alt="Декоративная кавычка" className={styles.palkaIcon} />
                  <p className={styles.reviewAuthor}>{review.author}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.paginationDots}>
            {Array.from({ length: totalPages }).map((_, index) => (
              <div 
                key={index} 
                className={`${styles.dot} ${index === activePage ? styles.dotActive : ''}`} 
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;