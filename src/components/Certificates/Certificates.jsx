import React from 'react'
import styles from "./Certificates.module.css";
import { getImageUrl } from '../../utils';
import certificates from "../../data/certificates.json";

export const Certificates = () => {
  return (
    <section className={styles.container} id='certificates'>
      <h2 className={styles.title}>Сертификаты</h2>
      <div className={styles.content}>
      <div className={styles.certificates}>
      {
        certificates.map((certificate,id) => {
          return <div key={id} className={styles.certificate}>
              <div className={styles.certificateImageContainer}>
                <img src={getImageUrl(certificate.imageSrc)} alt={certificate.title} />
              </div>
              <p>{certificate.title}</p>
            </div>
        })
      }
      </div>
      </div>
    </section>
  );
}
