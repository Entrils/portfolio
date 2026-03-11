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
  const menuRef = useRef(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const sectionOrder = ["about", "skills", "certificates", "projects", "contact"];

    const getCurrentSection = () => {
      const sections = sectionOrder
        .map((id) => document.getElementById(id))
        .filter(Boolean);

      if (!sections.length) {
        return "";
      }

      const triggerLine = Math.max(120, Math.min(window.innerHeight * 0.34, 280));
      let currentSection = sections[0].id;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= triggerLine) {
          currentSection = section.id;
        }
      });

      const isBottomReached =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;

      if (isBottomReached) {
        currentSection = sections[sections.length - 1].id;
      }

      return currentSection;
    };

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

    const updateScrollProgress = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) {
        targetProgress.current = 0;
      } else {
        const rawProgress = (window.scrollY / totalHeight) * 100;
        targetProgress.current = Math.min(100, Math.max(0, rawProgress));
      }

      cancelAnimationFrame(animationFrame.current);
      animationFrame.current = requestAnimationFrame(animateProgress);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      setActiveSection(getCurrentSection());

      if (window.innerWidth <= 1200) {
        setShowNavbar(currentScrollY <= lastScrollY);
      } else {
        setShowNavbar(true);
      }

      lastScrollY = currentScrollY;
      updateScrollProgress();
    };

    const handleResize = () => {
      setScrolled(window.scrollY > 50);
      setActiveSection(getCurrentSection());
      if (window.innerWidth > 1200) {
        setShowNavbar(true);
      }
      lastScrollY = window.scrollY;
      updateScrollProgress();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handleOutsidePointer = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsidePointer);
    document.addEventListener("touchstart", handleOutsidePointer);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsidePointer);
      document.removeEventListener("touchstart", handleOutsidePointer);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ""} ${
          showNavbar ? styles.show : styles.hide
        }`}
      >
        <a className={styles.title} href="#about">
          Андрей Савельев
        </a>

        <div className={styles.menu} ref={menuRef}>
          <button
            type="button"
            className={styles.menuBtn}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <img
              src={
                menuOpen
                  ? getImageUrl("navbar/closeIcon.png")
                  : getImageUrl("navbar/menuIcon.png")
              }
              alt=""
              aria-hidden="true"
              className={styles.menuBtnIcon}
            />
          </button>

          <ul
            id="main-navigation"
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
