import skills from "../../data/skills.json";
import styles from "./Skills.module.css";
import { getImageUrl } from "../../utils";
import { motion } from "framer-motion";

export const Skills = () => {
  return (
    <section id="skills" className={styles.container}>
      <motion.h2
        className={styles.title}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Навыки
      <motion.span
        className={styles.underline}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      />
      </motion.h2>

      <div className={styles.skillsGrid}>
        {skills.map((skill, id) => (
          <motion.div
            key={id}
            className={styles.skillCard}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: id * 0.05 }}
          >
            <div className={styles.skillImageContainer}>
              <img src={getImageUrl(skill.imageSrc)} alt={skill.title} />
            </div>
            <p className={styles.skillName}>{skill.title}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
