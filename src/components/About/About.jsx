import styles from "./About.module.css";
import { getImageUrl } from "../../utils";

export const About = () => {
  return (
    <section className={styles.container} id="about">
      <div className={styles.content}>
        <h1 className={styles.title}>Привет, я Андрей</h1>
        <p className={styles.description}>
          Я <span className={styles.descriptionHighlited}>front-end</span> разработчик. 
          Использую <span className={styles.descriptionHighlited}>React</span>, 
          <span className={styles.descriptionHighlited}> TypeScript</span> и 
          <span className={styles.descriptionHighlited}> JavaScript</span>. 
          Ниже вы найдёте больше информации обо мне!
        </p>
        <a 
          href="https://t.me/entrils" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.contactBtn}
        >
          🚀 Связаться со мной
        </a>
      </div>
      <img
        src={getImageUrl("about/aboutPhoto.png")}
        alt="Моё фото"
        className={styles.aboutPhoto}
      />
    </section>
  );
};