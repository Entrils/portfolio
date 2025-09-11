import { motion } from "framer-motion";
import styles from "./Certificates.module.css";
import { certificates } from '../../data/certificates.json';
import { CertificateSlider } from './CertificateSlider';

export const Certificates = () => {
  return (
    <motion.section
      className={styles.container}
      id='certificates'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className={styles.title}>Сертификаты</h2>
      <motion.div
        className={styles.certificates}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <CertificateSlider data={certificates}/>
      </motion.div>
    </motion.section>
  );
}