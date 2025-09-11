import { useEffect, useRef, useState } from "react";
import { getImageUrl } from "../../utils";
import styles from "./Contact.module.css";

export const Contact = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // анимация только один раз
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className={`${styles.container} ${isVisible ? styles.visible : ""}`}
    >
      <div className={styles.inner}>
        <div className={`${styles.text} ${isVisible ? styles.fadeIn1 : ""}`}>
          <h2>Контакты</h2>
          <p>Свяжитесь со мной любым удобным способом!</p>
        </div>

        <ul className={styles.links}>
          <li
            className={`${styles.linkCard} ${isVisible ? styles.fadeIn2 : ""}`}
          >
            <div className={styles.iconWrapper}>
              <img
                src={getImageUrl("contact/emailIcon.png")}
                alt="Email Icon"
                className={styles.icon}
              />
            </div>
            <a href="mailto:needway@list.ru">needway@list.ru</a>
          </li>

          <li
            className={`${styles.linkCard} ${isVisible ? styles.fadeIn3 : ""}`}
          >
            <div className={styles.iconWrapper}>
              <img
                src={getImageUrl("contact/telegrammIcon.png")}
                alt="Telegram Icon"
                className={styles.icon}
              />
            </div>
            <a href="https://t.me/entrils" target="_blank" rel="noreferrer">
              @Entrils
            </a>
          </li>

          <li
            className={`${styles.linkCard} ${isVisible ? styles.fadeIn4 : ""}`}
          >
            <div className={styles.iconWrapper}>
              <img
                src={getImageUrl("contact/githubIcon.png")}
                alt="Github Icon"
                className={styles.icon}
              />
            </div>
            <a href="https://github.com/Entrils" target="_blank" rel="noreferrer">
              github.com/Entrils
            </a>
          </li>
        </ul>
      </div>

      <div
        className={`${styles.footerNote} ${isVisible ? styles.fadeIn5 : ""}`}
      >
        <p>© {new Date().getFullYear()} Entrils | Все права защищены</p>
      </div>
    </footer>
  );
};