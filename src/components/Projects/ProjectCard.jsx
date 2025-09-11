/* eslint-disable react/prop-types */
import { getImageUrl } from "../../utils";
import styles from "./ProjectCard.module.css";

export const ProjectCard = ({ project: { title, imageSrc, description, skills, demo, source } }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img 
          src={getImageUrl(imageSrc)} 
          alt={`Preview of ${title}`} 
          className={styles.image}
        />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>

      <ul className={styles.skills}>
        {skills.map((skill, id) => (
          <li key={id} className={styles.skillChip}>
            {skill}
          </li>
        ))}
      </ul>

      <div className={styles.links}>
        <a href={demo} className={`${styles.link} ${styles.demo}`} target="_blank" rel="noopener noreferrer">🚀 Демо</a>
        <a href={source} className={`${styles.link} ${styles.github}`} target="_blank" rel="noopener noreferrer">💻 GitHub</a>
      </div>
    </div>
  );
};