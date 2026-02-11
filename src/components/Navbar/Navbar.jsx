import { useState, useEffect, useRef } from "react";
import styles from "./Navbar.module.css";
import { getImageUrl } from "../../utils.js";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const targetProgress = useRef(0);
  const animationFrame = useRef(null);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const animateProgress = () => {
      setScrollProgress((prev) => {
        const diff = targetProgress.current - prev;
        const newValue = prev + diff * 0.1;
        if (Math.abs(diff) > 0.1) {
          animationFrame.current = requestAnimationFrame(animateProgress);
        }
        return newValue;
      });
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);

      if (window.innerWidth <= 1200) {
        setShowNavbar(currentScrollY <= lastScrollY);
      } else {
        setShowNavbar(true);
      }

      lastScrollY = currentScrollY;

      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      targetProgress.current = (window.scrollY / totalHeight) * 100;

      cancelAnimationFrame(animationFrame.current);
      animationFrame.current = requestAnimationFrame(animateProgress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  return (
    <>
      <nav
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ""} ${
          showNavbar ? styles.show : styles.hide
        }`}
      >
        <a className={styles.title} href="/">
          Андрей Савельев
        </a>

        <div className={styles.menu}>
          <img
            className={styles.menuBtn}
            src={
              menuOpen
                ? getImageUrl("navbar/closeIcon.png")
                : getImageUrl("navbar/menuIcon.png")
            }
            alt="Кнопка меню"
            onClick={() => setMenuOpen(!menuOpen)}
          />

          <ul
            className={`${styles.menuItems} ${
              menuOpen ? styles.menuOpen : ""
            }`}
            onClick={() => setMenuOpen(false)}
          >
            <li>
              <a
                href="#about"
                className={activeSection === "about" ? styles.active : ""}
              >
                Обо мне
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className={activeSection === "skills" ? styles.active : ""}
              >
                Навыки
              </a>
            </li>
            <li>
              <a
                href="#certificates"
                className={
                  activeSection === "certificates" ? styles.active : ""
                }
              >
                Сертификаты
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className={activeSection === "projects" ? styles.active : ""}
              >
                Проекты
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={activeSection === "contact" ? styles.active : ""}
              >
                Контакты
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div
        className={`${styles.progressBar} ${styles.gradient}`}
        style={{ width: `${scrollProgress}%` }}
      ></div>
    </>
  );
};
