import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./About.module.css";
import { getImageUrl } from "../../utils";

export const About = () => {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 800], [0, 50]);

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
          Андрей, frontend-разработчик
        </motion.h1>

        <motion.p
          className={styles.description}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        >
          Пишу интерфейсы, которые не только выглядят аккуратно, но и
          выдерживают реальную нагрузку: состояние, формы, API, ошибки,
          адаптив. Основной стек: <span className={styles.descriptionHighlited}>React</span>,
          <span className={styles.descriptionHighlited}> TypeScript</span> и
          <span className={styles.descriptionHighlited}> JavaScript</span>. Ниже
          собрал проекты, где это можно проверить вживую.
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
            Написать в Telegram
          </motion.a>

          <motion.a
            href="/Andrew-CV.pdf"
            download="Andrey-CV.pdf"
            className={`${styles.contactBtn} ${styles.cvBtn}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 1 }}
          >
            Скачать резюме
          </motion.a>
        </div>
      </div>

      <motion.img
        src={getImageUrl("about/aboutPhoto.png")}
        alt="Фото Андрея"
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
