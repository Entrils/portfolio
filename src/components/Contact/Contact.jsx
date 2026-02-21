import { useEffect, useRef, useState } from "react";
import { getImageUrl } from "../../utils";
import styles from "./Contact.module.css";
import profile from "../../data/profile.json";

export const Contact = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const targetNode = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (targetNode) observer.observe(targetNode);

    return () => {
      if (targetNode) observer.unobserve(targetNode);
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
          <p>Открыт к работе и новым проектам. Выберите удобный способ связи.</p>
        </div>

        <ul className={styles.links}>
          <li className={`${styles.linkCard} ${isVisible ? styles.fadeIn2 : ""}`}>
            <div className={styles.iconWrapper}>
              <img
                src={getImageUrl("contact/emailIcon.png")}
                alt="Иконка email"
                className={styles.icon}
              />
            </div>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </li>

          <li className={`${styles.linkCard} ${isVisible ? styles.fadeIn3 : ""}`}>
            <div className={styles.iconWrapper}>
              <img
                src={getImageUrl("contact/telegrammIcon.png")}
                alt="Иконка Telegram"
                className={styles.icon}
              />
            </div>
            <a href={profile.telegramUrl} target="_blank" rel="noreferrer">
              {profile.telegramLabel}
            </a>
          </li>

          <li className={`${styles.linkCard} ${isVisible ? styles.fadeIn4 : ""}`}>
            <div className={styles.iconWrapper}>
              <img
                src={getImageUrl("contact/githubIcon.png")}
                alt="Иконка GitHub"
                className={styles.icon}
              />
            </div>
            <a href={profile.githubUrl} target="_blank" rel="noreferrer">
              {profile.githubLabel}
            </a>
          </li>
        </ul>
      </div>

      <div className={`${styles.footerNote} ${isVisible ? styles.fadeIn5 : ""}`}>
        <p>© {new Date().getFullYear()} Андрей Савельев</p>
      </div>
    </footer>
  );
};
