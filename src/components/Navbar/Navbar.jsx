import {useState} from "react";
import styles from "./Navbar.module.css"
import { getImageUrl } from "../../utils.js"

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return(
         <nav className={styles.navbar}>
        <a className={styles.title} href="/">
            Портфолио
            </a>
            <div className={styles.menu}>
                <img className={styles.menuBtn} 
                src={menuOpen 
                ? getImageUrl("navbar/closeIcon.png") 
                : getImageUrl("navbar/menuIcon.png")} 
                alt="menu-button"
                onClick={() => setMenuOpen(!menuOpen)}
                />
            <ul className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}
            onClick={() => setMenuOpen(false)}
            >
             <li>
             <a href="#about">Обо мне</a>
             </li>
             <li>
             <a href="#skills">Навыки</a>
             </li>
             <li>
             <a href="#certificates">Сертификаты</a>
             </li>
             <li>
             <a href="#projects">Проекты</a>
             </li>
             <li>
             <a href="#contact">Контакты</a>
             </li>
            </ul>
        </div>
    </nav>
    );
};