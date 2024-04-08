import React from 'react'
import styles from "./About.module.css";
import { getImageUrl } from '../../utils';

export const About = () => {
  return (
    <section className={styles.container} id='about'>
    <div className={styles.content}>
        <h1 className={styles.title}>Привет, я Андрей</h1>
        <p className={styles.description}> Я front-end разработчик, использую React и NodeJS, 
            ниже есть вся информация обо мне!</p>
        <a href='mailto:needway@list.ru' className={styles.contactBtn}>Связаться со мной</a>
    </div>
    <img src={getImageUrl("about/aboutPhoto.png")}
    alt='Моё фото' className={styles.aboutPhoto}/>
    <div className={styles.topBlur} />
    <div className={styles.bottomBlur} />
  </section>
  );
}
