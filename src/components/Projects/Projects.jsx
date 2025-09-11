import projects from '../../data/projects.json';
import { ProjectCard } from './ProjectCard';
import styles from "./Projects.module.css";
import { motion } from "framer-motion";

export const Projects = () => {
  return (
    <section className={styles.container} id="projects">
      <h2 className={styles.title}>Проекты</h2>
      <div className={styles.projects}>
        {
          projects.map((project, id) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: id * 0.2 }}
              viewport={{ once: true }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))
        }
      </div>
    </section>
  );
};