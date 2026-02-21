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
          return React.createElement(tag, { ...rest, ref }, props.children);
        }),
    }
  );

  return { motion };
});

import { Projects } from "./Projects";

describe("Projects", () => {
  it("renders projects list from data", () => {
    render(<Projects />);

    expect(
      screen.getByRole("heading", { name: "Избранные проекты" })
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "Код на GitHub" })
    ).toHaveLength(projects.length);
    expect(screen.getByText(projects[0].title)).toBeInTheDocument();
  });
});
