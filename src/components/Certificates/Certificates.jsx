import React from 'react'
import styles from "./Certificates.module.css";
import {certificates} from '../../data/certificates.json'

import { CertificateSlider } from './CertificateSlider';

export const Certificates = () => {
  
  return (
    
    <section className={styles.container} id='certificates'>
      <h2 className={styles.title}>Сертификаты</h2>
      <div className={styles.certificates}>
        <CertificateSlider data={certificates}/>
        </div>
    </section>
  );
}
