import skills from "../../data/skills.json";
import styles from "./Skills.module.css";
import { getImageUrl } from '../../utils';

export const Skills = () => {
  return (
  <section id="skills" className={styles.container}>
    <h2 className={styles.title}>Навыки</h2>
    <div className={styles.content}>
      <div className={styles.skills}>
      {
        skills.map((skill,id) => {
          return <div key={id} className={styles.skill}>
              <div className={styles.skillImageContainer}>
                <img src={getImageUrl(skill.imageSrc)} alt={skill.title} />
              </div>
              <p>{skill.title}</p>
            </div>
        })
      }
      </div>
    </div>
  </section>
  );
}
