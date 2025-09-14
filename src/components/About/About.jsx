import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Typed from "typed.js";
import styles from "./About.module.css";
import { getImageUrl } from "../../utils";

export const About = () => {
  const typedRef = useRef(null);

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 800], [0, 50]);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ["Привет, я Андрей!"],
      typeSpeed: 70,
      startDelay: 300,
      loop: false,
      showCursor: true,
      cursorChar: "|",
      onComplete: (self) => {
        const cursor = self.cursor;
        if (cursor) {
          cursor.style.display = "none";
        }
      }
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <section className={styles.container} id="about">
      <div className={styles.content}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span ref={typedRef}></span>
        </motion.h1>

        <motion.p
          className={styles.description}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        >
          Я <span className={styles.descriptionHighlited}>front-end</span> разработчик. 
          Использую <span className={styles.descriptionHighlited}>React</span>, 
          <span className={styles.descriptionHighlited}> TypeScript</span> и 
          <span className={styles.descriptionHighlited}> JavaScript</span>. 
          Ниже вы найдёте больше информации обо мне!
        </motion.p>

        <div className={styles.buttonsRow}>
          <motion.a 
            href="https://t.me/entrils" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.contactBtn}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
          >
            🚀 Связаться со мной
          </motion.a>

          <motion.a 
            href="/CV.pdf"
            download="Andrey-CV.pdf"
            className={`${styles.contactBtn} ${styles.cvBtn}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 1 }}
          >
            📄 Скачать CV
          </motion.a>
        </div>
      </div>

      <motion.img
        src={getImageUrl("about/aboutPhoto.png")}
        alt="Моё фото"
        className={styles.aboutPhoto}
        style={{ y: yParallax }}
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
      />
    </section>
  );
};
