import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import projects from "../../data/projects.json";
import { ProjectCard } from "./ProjectCard";
import styles from "./Projects.module.css";

const TRANSITION_DURATION = 0.78;
const AUTOPLAY_DELAY_MS = 9000;

const loopIndex = (index, total) => (index + total) % total;

const getRelativeOffset = (index, activeIndex, total) => {
  let diff = index - activeIndex;
  const half = total / 2;

  if (diff > half) {
    diff -= total;
  }

  if (diff < -half) {
    diff += total;
  }

  return diff;
};

const getCardState = (offset, sideOffset, farOffset) => {
  if (offset === 0) {
    return {
      name: "center",
      x: 0,
      scale: 1,
      opacity: 1,
      rotateY: 0,
      zIndex: 4,
      filter: "saturate(1) brightness(1)",
      pointerEvents: "auto",
    };
  }

  if (offset === -1) {
    return {
      name: "prev",
      x: -sideOffset,
      scale: 0.83,
      opacity: 0.58,
      rotateY: 26,
      zIndex: 3,
      filter: "saturate(0.72) brightness(0.82)",
      pointerEvents: "auto",
    };
  }

  if (offset === 1) {
    return {
      name: "next",
      x: sideOffset,
      scale: 0.83,
      opacity: 0.58,
      rotateY: -26,
      zIndex: 3,
      filter: "saturate(0.72) brightness(0.82)",
      pointerEvents: "auto",
    };
  }

  return {
    name: "far",
    x: offset < 0 ? -farOffset : farOffset,
    scale: 0.62,
    opacity: 0,
    rotateY: offset < 0 ? 36 : -36,
    zIndex: 1,
    filter: "saturate(0.55) brightness(0.62)",
    pointerEvents: "none",
  };
};

export const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedProjectIndexes, setLoadedProjectIndexes] = useState(() => {
    const indexes = new Set([0]);

    if (projects.length > 1) {
      indexes.add(1);
      indexes.add(projects.length - 1);
    }

    return indexes;
  });
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const cardsRef = useRef([]);
  const isAnimatingRef = useRef(false);
  const activeIndexRef = useRef(0);
  const directionRef = useRef(1);
  const isInViewRef = useRef(false);
  const isTabVisibleRef = useRef(true);
  const total = projects.length;

  const positionCards = useCallback(
    (targetIndex, animate) => {
      const carouselNode = carouselRef.current;
      if (!carouselNode) {
        return;
      }

      const sideOffset = Math.min(360, carouselNode.offsetWidth * 0.32);
      const farOffset = Math.min(760, carouselNode.offsetWidth * 0.68);
      const timeline = gsap.timeline({
        defaults: {
          duration: animate ? TRANSITION_DURATION : 0,
          ease: animate ? "power4.inOut" : "none",
          overwrite: "auto",
        },
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });

      cardsRef.current.forEach((cardNode, cardIndex) => {
        if (!cardNode) {
          return;
        }

        const offset = getRelativeOffset(cardIndex, targetIndex, total);
        const state = getCardState(offset, sideOffset, farOffset);

        cardNode.dataset.state = state.name;

        timeline.to(
          cardNode,
          {
            xPercent: -50,
            x: state.x,
            scale: state.scale,
            opacity: state.opacity,
            rotateY: state.rotateY,
            zIndex: state.zIndex,
            filter: state.filter,
            pointerEvents: state.pointerEvents,
          },
          0
        );
      });
    },
    [total]
  );

  const shiftCarousel = useCallback(
    (direction) => {
      if (isAnimatingRef.current) {
        return;
      }

      isAnimatingRef.current = true;
      directionRef.current = direction;
      setActiveIndex((prev) => loopIndex(prev + direction, total));
    },
    [total]
  );

  const handleCardClick = (index) => {
    const offset = getRelativeOffset(index, activeIndex, total);

    if (offset === 1) {
      shiftCarousel(1);
    } else if (offset === -1) {
      shiftCarousel(-1);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      shiftCarousel(1);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      shiftCarousel(-1);
    }
  };

  useLayoutEffect(() => {
    gsap.registerPlugin(Observer);
    positionCards(activeIndexRef.current, false);
    const cardNodes = cardsRef.current;

    const resizeHandler = () => {
      positionCards(activeIndexRef.current, false);
    };

    window.addEventListener("resize", resizeHandler);

    const observer = Observer.create({
      target: carouselRef.current,
      type: "wheel,touch,pointer",
      tolerance: 16,
      preventDefault: true,
      wheelSpeed: 1,
      lockAxis: true,
      onDown: () => shiftCarousel(1),
      onLeft: () => shiftCarousel(1),
      onUp: () => shiftCarousel(-1),
      onRight: () => shiftCarousel(-1),
      allowClicks: true,
    });

    return () => {
      observer.kill();
      window.removeEventListener("resize", resizeHandler);
      gsap.killTweensOf(cardNodes);
    };
  }, [positionCards, shiftCarousel]);

  useLayoutEffect(() => {
    activeIndexRef.current = activeIndex;
    positionCards(activeIndex, true);
  }, [activeIndex, positionCards]);

  useEffect(() => {
    setLoadedProjectIndexes((prev) => {
      const next = new Set(prev);
      const prevIndex = loopIndex(activeIndex - 1, total);
      const nextIndex = loopIndex(activeIndex + 1, total);

      next.add(activeIndex);
      next.add(prevIndex);
      next.add(nextIndex);

      return next;
    });
  }, [activeIndex, total]);

  useEffect(() => {
    const sectionNode = sectionRef.current;
    if (!sectionNode) {
      return undefined;
    }

    isTabVisibleRef.current =
      typeof document !== "undefined" ? !document.hidden : true;

    let observer = null;

    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        ([entry]) => {
          isInViewRef.current = entry.isIntersecting && entry.intersectionRatio >= 0.45;
        },
        { threshold: [0.45, 0.75] }
      );
      observer.observe(sectionNode);
    } else {
      isInViewRef.current = true;
    }

    const handleVisibilityChange = () => {
      isTabVisibleRef.current = !document.hidden;
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    const autoplayId = window.setInterval(() => {
      if (!isInViewRef.current || !isTabVisibleRef.current) {
        return;
      }

      shiftCarousel(1);
    }, AUTOPLAY_DELAY_MS);

    return () => {
      window.clearInterval(autoplayId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer?.disconnect();
    };
  }, [shiftCarousel]);

  return (
    <section className={styles.container} id="projects" ref={sectionRef}>
      <motion.h2
        className={styles.title}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Избранные проекты
        <motion.span
          className={styles.underline}
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
          viewport={{ once: true }}
        />
      </motion.h2>

      <div className={styles.carouselShell}>
        <div
          ref={carouselRef}
          className={styles.carousel}
          role="region"
          aria-label="Карусель проектов"
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          {projects.map((project, index) => (
            <article
              key={project.source}
              ref={(node) => {
                cardsRef.current[index] = node;
              }}
              className={styles.slide}
              data-state="far"
              onClick={() => handleCardClick(index)}
            >
              <div className={styles.slideInner}>
                <ProjectCard
                  project={project}
                  shouldLoadImage={loadedProjectIndexes.has(index)}
                />
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.navButton}
          onClick={() => shiftCarousel(-1)}
          aria-label="Предыдущий проект"
        >
          ←
        </button>
        <p className={styles.counter}>
          {activeIndex + 1} / {total}
        </p>
        <button
          type="button"
          className={styles.navButton}
          onClick={() => shiftCarousel(1)}
          aria-label="Следующий проект"
        >
          →
        </button>
      </div>
    </section>
  );
};
