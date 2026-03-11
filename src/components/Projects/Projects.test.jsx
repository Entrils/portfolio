/* eslint-disable react/prop-types */
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import projects from "../../data/projects.json";

vi.mock("framer-motion", () => {
  const motion = new Proxy(
    {},
    {
      get: (_, tag) =>
        React.forwardRef(function MockMotion(props, ref) {
          const rest = { ...props };
          delete rest.initial;
          delete rest.whileInView;
          delete rest.transition;
          delete rest.viewport;
          delete rest.animate;
          delete rest.exit;
          delete rest.variants;
          delete rest.custom;
          delete rest.drag;
          delete rest.dragConstraints;
          delete rest.dragElastic;
          delete rest.dragSnapToOrigin;
          delete rest.whileDrag;
          delete rest.onDragEnd;
          return React.createElement(tag, { ...rest, ref }, props.children);
        }),
    }
  );

  return {
    motion,
    AnimatePresence: ({ children }) => <>{children}</>,
  };
});

import { Projects } from "./Projects";

describe("Projects", () => {
  it("renders carousel with project content", () => {
    render(<Projects />);

    expect(
      screen.getByRole("heading", { name: /избранные проекты/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /карусель проектов/i })).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: /код на github/i }).length
    ).toBeGreaterThan(0);
    expect(screen.getByText(projects[0].title)).toBeInTheDocument();
  });
});
