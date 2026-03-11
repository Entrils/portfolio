import { useCallback, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import skills from "../../data/skills.json";
import { getImageUrl } from "../../utils";
import styles from "./Skills.module.css";

const MAIN_SKILLS = new Set(["React", "JavaScript", "TypeScript"]);
const MID_SKILLS = new Set(["Node", "Redux", "Tailwind", "Jest", "Cypress", "Next.js"]);

const BUBBLE_LAYOUT = {
  React: { x: 38, y: 43 },
  JavaScript: { x: 49, y: 25 },
  TypeScript: { x: 60, y: 42 },
  "Next.js": { x: 49, y: 59 },
  HTML: { x: 24, y: 25 },
  CSS: { x: 20, y: 46 },
  Tailwind: { x: 26, y: 64 },
  Redux: { x: 35, y: 73 },
  Node: { x: 72, y: 46 },
  PostgreSQL: { x: 78, y: 63 },
  Jest: { x: 66, y: 24 },
  Cypress: { x: 74, y: 78 },
  Storybook: { x: 84, y: 34 },
  Figma: { x: 61, y: 74 },
  Linux: { x: 49, y: 80 },
  Git: { x: 41, y: 15 },
  RTL: { x: 56, y: 15 },
};

const BUBBLE_PIXELS = {
  xlarge: 248,
  large: 170,
  medium: 132,
  small: 106,
};

const DESKTOP_QUERY = "(min-width: 901px)";
const ATTRACTION = 0.0017;
const FRICTION = 0.93;
const COLLISION_PADDING = 2;
const BOUNCE = 0.35;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const getBubbleSize = (title) => {
  if (title === "React") {
    return "xlarge";
  }

  if (MAIN_SKILLS.has(title)) {
    return "large";
  }

  if (MID_SKILLS.has(title)) {
    return "medium";
  }

  return "small";
};

export const Skills = () => {
  const boardRef = useRef(null);
  const bubbleRefs = useRef([]);
  const physicsRef = useRef([]);
  const frameRef = useRef(0);
  const boardSizeRef = useRef({ width: 0, height: 0 });
  const isDesktopRef = useRef(false);
  const dragRef = useRef({
    active: false,
    pointerId: null,
    index: -1,
    offsetX: 0,
    offsetY: 0,
  });

  const bubbleModels = useMemo(
    () =>
      skills.map((skill, index) => {
        const size = getBubbleSize(skill.title);
        const radius = BUBBLE_PIXELS[size] / 2;
        const layout = BUBBLE_LAYOUT[skill.title] ?? {
          x: 30 + ((index * 13) % 45),
          y: 24 + ((index * 11) % 56),
        };

        return {
          ...skill,
          size,
          radius,
          layout,
        };
      }),
    []
  );

  const syncBubblePosition = useCallback((index, node) => {
    const bubbleNode = bubbleRefs.current[index];
    if (!bubbleNode) {
      return;
    }

    bubbleNode.style.transform = `translate3d(${node.x - node.radius}px, ${node.y - node.radius}px, 0)`;
  }, []);

  const setDraggingState = useCallback((index, dragging) => {
    const bubbleNode = bubbleRefs.current[index];
    if (!bubbleNode) {
      return;
    }

    if (dragging) {
      bubbleNode.dataset.dragging = "true";
    } else {
      delete bubbleNode.dataset.dragging;
    }
  }, []);

  const initializeSimulation = useCallback(() => {
    const boardNode = boardRef.current;
    if (!boardNode) {
      return;
    }

    const mediaQuery = window.matchMedia(DESKTOP_QUERY);
    isDesktopRef.current = mediaQuery.matches;

    if (!mediaQuery.matches) {
      physicsRef.current = [];
      bubbleRefs.current.forEach((bubbleNode) => {
        if (!bubbleNode) {
          return;
        }

        bubbleNode.style.transform = "";
        delete bubbleNode.dataset.dragging;
      });
      return;
    }

    const width = boardNode.clientWidth;
    const height = boardNode.clientHeight;
    boardSizeRef.current = { width, height };

    const nodes = bubbleModels.map((bubble) => {
      const x = clamp((bubble.layout.x / 100) * width, bubble.radius, width - bubble.radius);
      const y = clamp((bubble.layout.y / 100) * height, bubble.radius, height - bubble.radius);

      return {
        x,
        y,
        vx: 0,
        vy: 0,
        radius: bubble.radius,
        dragging: false,
      };
    });

    physicsRef.current = nodes;
    nodes.forEach((node, index) => syncBubblePosition(index, node));
  }, [bubbleModels, syncBubblePosition]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const applyBoundaries = (node) => {
      const { width, height } = boardSizeRef.current;

      if (node.x < node.radius) {
        node.x = node.radius;
        node.vx *= -BOUNCE;
      } else if (node.x > width - node.radius) {
        node.x = width - node.radius;
        node.vx *= -BOUNCE;
      }

      if (node.y < node.radius) {
        node.y = node.radius;
        node.vy *= -BOUNCE;
      } else if (node.y > height - node.radius) {
        node.y = height - node.radius;
        node.vy *= -BOUNCE;
      }
    };

    const resolveCollisions = (nodes) => {
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const first = nodes[i];
          const second = nodes[j];
          const dx = second.x - first.x;
          const dy = second.y - first.y;
          const distance = Math.hypot(dx, dy) || 0.0001;
          const minDistance = first.radius + second.radius + COLLISION_PADDING;

          if (distance >= minDistance) {
            continue;
          }

          const overlap = minDistance - distance;
          const nx = dx / distance;
          const ny = dy / distance;

          if (!first.dragging) {
            first.x -= nx * overlap * 0.5;
            first.y -= ny * overlap * 0.5;
            first.vx -= nx * 0.09;
            first.vy -= ny * 0.09;
          }

          if (!second.dragging) {
            second.x += nx * overlap * 0.5;
            second.y += ny * overlap * 0.5;
            second.vx += nx * 0.09;
            second.vy += ny * 0.09;
          }
        }
      }
    };

    const step = () => {
      if (!isDesktopRef.current) {
        frameRef.current = 0;
        return;
      }

      const nodes = physicsRef.current;
      const { width, height } = boardSizeRef.current;
      const centerX = width / 2;
      const centerY = height / 2;

      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        if (node.dragging) {
          continue;
        }

        const dx = centerX - node.x;
        const dy = centerY - node.y;
        node.vx += dx * ATTRACTION;
        node.vy += dy * ATTRACTION;
        node.vx *= FRICTION;
        node.vy *= FRICTION;
        node.x += node.vx;
        node.y += node.vy;
      }

      resolveCollisions(nodes);

      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        applyBoundaries(node);
        syncBubblePosition(i, node);
      }

      frameRef.current = window.requestAnimationFrame(step);
    };

    const handleResize = () => {
      initializeSimulation();
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
      frameRef.current = window.requestAnimationFrame(step);
    };

    const mediaQuery = window.matchMedia(DESKTOP_QUERY);
    const handleMediaChange = () => handleResize();

    initializeSimulation();
    frameRef.current = window.requestAnimationFrame(step);

    window.addEventListener("resize", handleResize);
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }

      window.removeEventListener("resize", handleResize);
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, [initializeSimulation, syncBubblePosition]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const handlePointerMove = (event) => {
      const dragState = dragRef.current;
      if (!dragState.active || dragState.pointerId !== event.pointerId || !isDesktopRef.current) {
        return;
      }

      const boardNode = boardRef.current;
      const draggedNode = physicsRef.current[dragState.index];
      if (!boardNode || !draggedNode) {
        return;
      }

      const rect = boardNode.getBoundingClientRect();
      const pointerX = event.clientX - rect.left;
      const pointerY = event.clientY - rect.top;
      const { width, height } = boardSizeRef.current;

      draggedNode.x = clamp(
        pointerX + dragState.offsetX,
        draggedNode.radius,
        width - draggedNode.radius
      );
      draggedNode.y = clamp(
        pointerY + dragState.offsetY,
        draggedNode.radius,
        height - draggedNode.radius
      );
      draggedNode.vx = 0;
      draggedNode.vy = 0;
      syncBubblePosition(dragState.index, draggedNode);
    };

    const stopDragging = (pointerId) => {
      const dragState = dragRef.current;
      if (!dragState.active || dragState.pointerId !== pointerId) {
        return;
      }

      const draggedNode = physicsRef.current[dragState.index];
      if (draggedNode) {
        draggedNode.dragging = false;
      }

      setDraggingState(dragState.index, false);

      dragRef.current = {
        active: false,
        pointerId: null,
        index: -1,
        offsetX: 0,
        offsetY: 0,
      };
    };

    const handlePointerUp = (event) => {
      stopDragging(event.pointerId);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [setDraggingState, syncBubblePosition]);

  const handleBubblePointerDown = useCallback(
    (index, event) => {
      if (!isDesktopRef.current) {
        return;
      }

      const boardNode = boardRef.current;
      const draggedNode = physicsRef.current[index];
      if (!boardNode || !draggedNode) {
        return;
      }

      event.preventDefault();

      const rect = boardNode.getBoundingClientRect();
      const pointerX = event.clientX - rect.left;
      const pointerY = event.clientY - rect.top;

      draggedNode.dragging = true;
      draggedNode.vx = 0;
      draggedNode.vy = 0;
      setDraggingState(index, true);

      dragRef.current = {
        active: true,
        pointerId: event.pointerId,
        index,
        offsetX: draggedNode.x - pointerX,
        offsetY: draggedNode.y - pointerY,
      };

      if (event.currentTarget.setPointerCapture) {
        event.currentTarget.setPointerCapture(event.pointerId);
      }
    },
    [setDraggingState]
  );

  return (
    <section id="skills" className={styles.container}>
      <motion.h2
        className={styles.title}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Стек и инструменты
        <motion.span
          className={styles.underline}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />
      </motion.h2>

      <div ref={boardRef} className={styles.bubbleBoard} role="list" aria-label="Навыки">
        {bubbleModels.map((skill, index) => (
          <article
            role="listitem"
            key={skill.title}
            ref={(node) => {
              bubbleRefs.current[index] = node;
            }}
            className={`${styles.bubble} ${styles[skill.size]} ${
              MAIN_SKILLS.has(skill.title) ? styles.mainBubble : ""
            }`}
            onPointerDown={(event) => handleBubblePointerDown(index, event)}
          >
            <div className={styles.skillImageContainer}>
              <img src={getImageUrl(skill.imageSrc)} alt={skill.title} loading="lazy" />
            </div>
            <p className={styles.skillName}>{skill.title}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
