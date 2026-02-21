import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Navbar } from "./Navbar";

describe("Navbar", () => {
  it("opens menu and closes by Escape", async () => {
    render(<Navbar />);
    const menuButton = screen.getByLabelText("Открыть меню", {
      selector: "button",
    });

    await userEvent.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "true");

    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() =>
      expect(menuButton).toHaveAttribute("aria-expanded", "false")
    );
  });

  it("closes menu by click outside", async () => {
    render(<Navbar />);
    const menuButton = screen.getByLabelText("Открыть меню", {
      selector: "button",
    });

    await userEvent.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "true");

    fireEvent.mouseDown(document.body);
    await waitFor(() =>
      expect(menuButton).toHaveAttribute("aria-expanded", "false")
    );
  });
});
