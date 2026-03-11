/* eslint-disable react/prop-types */
import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./Certificates.module.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getImageUrl } from "../../utils";

export const CertificateSlider = ({ data }) => {
  const [slide, setSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loadedSlides, setLoadedSlides] = useState(() => new Set([0]));
  const intervalRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const markSlideAsLoaded = useCallback((index) => {
    setLoadedSlides((prev) => {
      if (prev.has(index)) {
        return prev;
      }

      const next = new Set(prev);
      next.add(index);
      return next;
    });
  }, []);

  const goToSlide = useCallback(
    (index) => {
      markSlideAsLoaded(index);
      setSlide(index);
    },
    [markSlideAsLoaded]
  );

  const nextSlide = useCallback(() => {
    setSlide((prev) => {
      const nextIndex = prev === data.length - 1 ? 0 : prev + 1;
      markSlideAsLoaded(nextIndex);
      return nextIndex;
    });
  }, [data.length, markSlideAsLoaded]);

  const prevSlide = useCallback(() => {
    setSlide((prev) => {
      const prevIndex = prev === 0 ? data.length - 1 : prev - 1;
      markSlideAsLoaded(prevIndex);
      return prevIndex;
    });
  }, [data.length, markSlideAsLoaded]);

  useEffect(() => {
    if (data.length < 2) {
      return;
    }

    const nextIndex = slide === data.length - 1 ? 0 : slide + 1;

    markSlideAsLoaded(nextIndex);
  }, [data.length, markSlideAsLoaded, slide]);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused, slide, nextSlide]);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      prevSlide();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      nextSlide();
    }
  };

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    touchEndX.current = event.touches[0].clientX;
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

  const activeCertificate = data[slide];

  return (
    <div className={styles.carouselWrapper}>
      <div
        className={styles.carousel}
        role="region"
        aria-roledescription="carousel"
        tabIndex={0}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
        aria-label="Слайдер сертификатов"
      >
        <button
          type="button"
          className={styles.LeftArrow}
          onClick={prevSlide}
          aria-label="Предыдущий сертификат"
        >
          <FaChevronLeft />
        </button>

        {data.map((item, index) =>
          loadedSlides.has(index) ? (
            <img
              src={getImageUrl(item.imageSrc)}
              alt={item.title}
              key={item.imageSrc}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              className={slide === index ? styles.slide : styles.slideHdn}
            />
          ) : null
        )}

        <button
          type="button"
          className={styles.RightArrow}
          onClick={nextSlide}
          aria-label="Следующий сертификат"
        >
          <FaChevronRight />
        </button>

        <span className={styles.indicators}>
          {data.map((item, index) => (
            <button
              key={`dot-${item.imageSrc}`}
              onClick={() => goToSlide(index)}
              className={
                slide === index ? styles.indicatorBtn : styles.indicatorBtnInactive
              }
              aria-label={`Перейти к сертификату ${index + 1}`}
            ></button>
          ))}
        </span>
      </div>

      <p className={styles.slideDescription} aria-live="polite">
        {activeCertificate?.description}
      </p>
      <p className={styles.slideStatus} aria-live="polite">
        Слайд {slide + 1} из {data.length}
      </p>
    </div>
  );
};
