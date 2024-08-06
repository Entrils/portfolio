import styles from "./About.module.css";
import { getImageUrl } from '../../utils';

export const About = () => {
  return (
    <section className={styles.container} id='about'>
    <div className={styles.content}>
        <h1 className={styles.title}>Привет, я Андрей</h1>
        <p className={styles.description}> Я <span className={styles.descriptionHighlited}> front-end </span>разработчик, использую 
        <span className={styles.descriptionHighlited}> React </span> 
        ,<span className={styles.descriptionHighlited}> TypeScript </span>и  <span className={styles.descriptionHighlited}> JavaScript </span>,
            ниже есть вся информация обо мне!</p>
        <a href='https://t.me/entrils' className={styles.contactBtn}>Связаться со мной</a>
    </div>
    <img src={getImageUrl("about/aboutPhoto.png")}
    alt='Моё фото' className={styles.aboutPhoto}/>

  </section>
  );
}
