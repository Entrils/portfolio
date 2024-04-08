import styles from'./App.module.css';
import { Navbar } from './components/Navbar/Navbar';
import { About } from './components/About/About';
import { Skills } from './components/Skills/Skills';
import {Certificates} from './components/Certificates/Certificates';
import {Projects} from './components/Projects/Projects';
import {Contact} from './components/Contact/Contact';

function App() {


  return (
    <div className={styles.App}>
     <Navbar />
     <About />
     <Skills />
     <Certificates />
     <Projects/>
     <Contact />
    </div>
  );
}

export default App
