import { useLayoutEffect, useMemo, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./About.module.css";
import { getImageUrl } from "../../utils";
import profile from "../../data/profile.json";

export const About = () => {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const photoRef = useRef(null);
  const meshRef = useRef(null);
  const beamRef = useRef(null);
  const scanRef = useRef(null);
  const codePanelRef = useRef(null);
  const titleWords = useMemo(
    () => ["Андрей,", "frontend", "разработчик"],
    []
  );

  useLayoutEffect(() => {
    if (!sectionRef.current) {
      return undefined;
    }

    gsap.registerPlugin(ScrollTrigger);

    const sectionNode = sectionRef.current;
    const allowPointerParallax =
      !prefersReducedMotion &&
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        const intro = gsap.timeline({
          defaults: {
            duration: 0.75,
            ease: "power3.out",
          },
        });

        intro
          .from(".js-about-word", {
            yPercent: 120,
            opacity: 0,
            stagger: 0.08,
          })
          .from(
            ".js-about-description",
            {
              y: 26,
              opacity: 0,
            },
            "-=0.42"
          )
          .from(
            ".js-about-buttons",
            {
              y: 22,
              opacity: 0,
            },
            "-=0.48"
          )
          .from(
            [photoRef.current, codePanelRef.current],
            {
              x: 70,
              opacity: 0,
              duration: 0.95,
              stagger: 0.12,
            },
            "-=0.55"
          );

        gsap.to(photoRef.current, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(meshRef.current, {
          yPercent: -20,
          xPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(beamRef.current, {
          yPercent: 18,
          xPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    if (!allowPointerParallax) {
      return () => ctx.revert();
    }

    const meshX = gsap.quickTo(meshRef.current, "x", {
      duration: 0.7,
      ease: "power3.out",
    });
    const meshY = gsap.quickTo(meshRef.current, "y", {
      duration: 0.7,
      ease: "power3.out",
    });
    const beamX = gsap.quickTo(beamRef.current, "x", {
      duration: 0.8,
      ease: "power3.out",
    });
    const beamY = gsap.quickTo(beamRef.current, "y", {
      duration: 0.8,
      ease: "power3.out",
    });
    const scanX = gsap.quickTo(scanRef.current, "x", {
      duration: 0.9,
      ease: "power3.out",
    });
    const scanY = gsap.quickTo(scanRef.current, "y", {
      duration: 0.9,
      ease: "power3.out",
    });
    const photoX = gsap.quickTo(photoRef.current, "x", {
      duration: 0.65,
      ease: "power3.out",
    });
    const photoY = gsap.quickTo(photoRef.current, "y", {
      duration: 0.65,
      ease: "power3.out",
    });

    const handlePointerMove = (event) => {
      const rect = sectionNode.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

      meshX(x * 22);
      meshY(y * 14);
      beamX(x * -18);
      beamY(y * -12);
      scanX(x * 10);
      scanY(y * 8);
      photoX(x * 8);
      photoY(y * 6);
    };

    const handlePointerLeave = () => {
      meshX(0);
      meshY(0);
      beamX(0);
      beamY(0);
      scanX(0);
      scanY(0);
      photoX(0);
      photoY(0);
    };

    const magneticButtons = sectionNode.querySelectorAll(".js-magnetic");
    const magneticCleanup = [];

    magneticButtons.forEach((button) => {
      const btnX = gsap.quickTo(button, "x", {
        duration: 0.28,
        ease: "power3.out",
      });
      const btnY = gsap.quickTo(button, "y", {
        duration: 0.28,
        ease: "power3.out",
      });
      const btnRotate = gsap.quickTo(button, "rotation", {
        duration: 0.34,
        ease: "power3.out",
      });

      const onButtonMove = (event) => {
        const rect = button.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (event.clientY - rect.top - rect.height / 2) / rect.height;
        btnX(x * 18);
        btnY(y * 14);
        btnRotate(x * 3);
      };

      const onButtonLeave = () => {
        btnX(0);
        btnY(0);
        btnRotate(0);
      };

      button.addEventListener("pointermove", onButtonMove);
      button.addEventListener("pointerleave", onButtonLeave);

      magneticCleanup.push(() => {
        button.removeEventListener("pointermove", onButtonMove);
        button.removeEventListener("pointerleave", onButtonLeave);
      });
    });

    sectionNode.addEventListener("pointermove", handlePointerMove);
    sectionNode.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      sectionNode.removeEventListener("pointermove", handlePointerMove);
      sectionNode.removeEventListener("pointerleave", handlePointerLeave);
      magneticCleanup.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <section className={styles.container} id="about" ref={sectionRef}>
      <div className={styles.backdrop} aria-hidden="true">
        <div ref={meshRef} className={styles.circuitMesh}></div>
        <div ref={beamRef} className={styles.dataBeam}></div>
        <div ref={scanRef} className={styles.scanLayer}></div>
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>
          {titleWords.map((word) => (
            <span key={word} className={`${styles.titleWord} js-about-word`}>
              {word}
            </span>
          ))}
        </h1>

        <p className={`${styles.description} js-about-description`}>
          Пишу интерфейсы, которые не только выглядят аккуратно, но и
          выдерживают реальную нагрузку: состояние, формы, API, ошибки, адаптив.
          Основной стек:
          <span className={styles.descriptionHighlited}> React</span>,
          <span className={styles.descriptionHighlited}> TypeScript</span> и
          <span className={styles.descriptionHighlited}> JavaScript</span>. Ниже
          собрал проекты, где это можно проверить вживую.
        </p>

        <div className={`${styles.buttonsRow} js-about-buttons`}>
          <a
            href={profile.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.contactBtn} js-magnetic`}
          >
            Написать в Telegram
          </a>

          <a
            href={profile.resumeUrl}
            download={profile.resumeDownloadName}
            className={`${styles.contactBtn} ${styles.cvBtn} js-magnetic`}
          >
            Скачать резюме
          </a>
        </div>
      </div>

      <div className={styles.photoWrap}>
        <img
          ref={photoRef}
          src={getImageUrl("about/aboutPhoto.webp")}
          alt="Фото Андрея"
          className={styles.aboutPhoto}
        />
        <aside ref={codePanelRef} className={styles.codePanel} aria-hidden="true">
          <p className={styles.codeHeader}>frontend.profile.ts</p>
          <pre className={styles.codeBlock}>
{`export const engineer = {
  role: "Frontend Developer",
  stack: ["React", "JavaScript", "TypeScript"],
};`}
          </pre>
        </aside>
      </div>
    </section>
  );
};
