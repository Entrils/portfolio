import skills from "../../data/skills.json";
import styles from "./Skills.module.css";
import { getImageUrl } from "../../utils";

export const Skills = () => {
  return (
    <section id="skills" className={styles.container}>
      <h2 className={styles.title}>Навыки</h2>
      <div className={styles.skillsGrid}>
        {skills.map((skill, id) => (
          <div key={id} className={styles.skillCard}>
            <div className={styles.skillImageContainer}>
              <img src={getImageUrl(skill.imageSrc)} alt={skill.title} />
            </div>
            <p className={styles.skillName}>{skill.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};