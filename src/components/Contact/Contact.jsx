import React from 'react'
import { getImageUrl } from '../../utils';
import styles from './Contact.module.css';

export const Contact = () => {
  return (
    <footer id='contact' className={styles.container}>
        <div className={styles.text}>
            <h2>Контакты</h2>
            <p>Свяжитесь со мной!</p>
        </div>
        <ul className={styles.links}>
            <li className={styles.link}>
                <img src={getImageUrl("contact/emailIcon.png")} alt="Email Icon" className={styles.icons}/>
                <a href="mailto:needway@list.ru">needway@list.ru</a>
            </li>

            <li className={styles.link}>
                <img src={getImageUrl("contact/telegrammIcon.png")} alt="Telegramm Icon" className={styles.icons}/>
                <a href="https://t.me/entrils">@Entrils</a>
            </li>

            <li className={styles.link}>
                <img src={getImageUrl("contact/githubIcon.png")} alt="Github Icon" className={styles.icons}/>
                <a href="https://github.com/Entrils">github.com/Entrils</a>
            </li>
        </ul>
    </footer>
  );
}
