import { useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./App.module.css";
import { Navbar } from "./components/Navbar/Navbar";
import { About } from "./components/About/About";
import { Skills } from "./components/Skills/Skills";
import { Certificates } from "./components/Certificates/Certificates";
import { Projects } from "./components/Projects/Projects";
import { Contact } from "./components/Contact/Contact";

function App() {
  const prefersReducedMotion = useReducedMotion();
  const appRef = useRef(null);
  const layerOneRef = useRef(null);
  const layerTwoRef = useRef(null);
  const layerThreeRef = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion || !appRef.current) {
      return undefined;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(layerOneRef.current, {
        yPercent: -18,
        xPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: appRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      gsap.to(layerTwoRef.current, {
        yPercent: 22,
        xPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: appRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      gsap.to(layerThreeRef.current, {
        yPercent: -10,
        xPercent: 4,
        ease: "none",
        scrollTrigger: {
          trigger: appRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }, appRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div className={styles.App} ref={appRef}>
      <div className={styles.ambient} aria-hidden="true">
        <div
          ref={layerOneRef}
          className={`${styles.ambientLayer} ${styles.layerOne}`}
        ></div>
        <div
          ref={layerTwoRef}
          className={`${styles.ambientLayer} ${styles.layerTwo}`}
        ></div>
        <div
          ref={layerThreeRef}
          className={`${styles.ambientLayer} ${styles.layerThree}`}
        ></div>
      </div>

      <Navbar />
      <About />
      <Skills />
      <Certificates />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
