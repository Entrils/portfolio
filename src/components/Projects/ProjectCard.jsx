/* eslint-disable react/prop-types */
import { getImageUrl } from "../../utils";
import styles from "./ProjectCard.module.css";

export const ProjectCard = ({
  project: { title, imageSrc, description, skills, demo, source }
}) => {
  const hasDemo = Boolean(demo);

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={getImageUrl(imageSrc)}
          alt={`Скриншот проекта ${title}`}
          loading="lazy"
          decoding="async"
          className={styles.image}
        />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>

      <ul className={styles.skills}>
        {skills.map((skill) => (
          <li key={skill} className={styles.skillChip}>
            {skill}
          </li>
        ))}
      </ul>

      <div className={styles.links}>
        {hasDemo ? (
          <a
            href={demo}
            className={`${styles.link} ${styles.demo}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Смотреть демо
          </a>
        ) : (
          <span className={`${styles.link} ${styles.demo}`} aria-disabled="true">
            Демо скоро
          </span>
        )}
        <a
          href={source}
          className={`${styles.link} ${styles.github}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Код на GitHub
        </a>
      </div>
    </div>
  );
};
