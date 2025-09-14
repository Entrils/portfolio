/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react'
import styles from './Certificates.module.css'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { getImageUrl } from '../../utils';

export const CertificateSlider = ({ data }) => {
  const [slide, setSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = () => {
    setSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setSlide((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  // Автоплей с паузой при наведении
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused, slide]);

  // 📱 Swipe-логика
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;

    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <div
      className={styles.carousel}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <FaChevronLeft className={styles.LeftArrow} onClick={prevSlide} />

      {data.map((item, index) => (
        <img
          src={getImageUrl(item.imageSrc)}
          alt={item.title}
          key={index}
          loading="lazy"
          className={slide === index ? styles.slide : styles.slideHdn}
        />
      ))}

      <FaChevronRight className={styles.RightArrow} onClick={nextSlide} />

      <span className={styles.indicators}>
        {data.map((_, index) => (
          <button
            key={index}
            onClick={() => setSlide(index)}
            className={slide === index ? styles.indicatorBtn : styles.indicatorBtnInactive}
          ></button>
        ))}
      </span>
    </div>
  );
};