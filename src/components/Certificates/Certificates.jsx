import { motion } from "framer-motion";
import styles from "./Certificates.module.css";
import { certificates } from "../../data/certificates.json";
import { CertificateSlider } from "./CertificateSlider";

export const Certificates = () => {
  return (
    <motion.section
      className={styles.container}
      id="certificates"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.h2
        className={styles.title}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Сертификаты
        <motion.span
          className={styles.underline}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />
      </motion.h2>

      <motion.div
        className={styles.certificates}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <CertificateSlider data={certificates} />
      </motion.div>
    </motion.section>
  );
};
