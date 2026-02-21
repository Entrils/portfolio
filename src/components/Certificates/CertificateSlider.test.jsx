import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { CertificateSlider } from "./CertificateSlider";

const certificatesMock = [
  {
    title: "Сертификат 1",
    imageSrc: "certificates/JS1.png",
    description: "Описание 1",
  },
  {
    title: "Сертификат 2",
    imageSrc: "certificates/JS2.gif",
    description: "Описание 2",
  },
  {
    title: "Сертификат 3",
    imageSrc: "certificates/JS3.gif",
    description: "Описание 3",
  },
];

describe("CertificateSlider", () => {
  it("switches slides by arrows", async () => {
    render(<CertificateSlider data={certificatesMock} />);

    expect(screen.getByText("Слайд 1 из 3")).toBeInTheDocument();
    expect(screen.getByText("Описание 1")).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole("button", { name: "Следующий сертификат" })
    );

    expect(screen.getByText("Слайд 2 из 3")).toBeInTheDocument();
    expect(screen.getByText("Описание 2")).toBeInTheDocument();
  });

  it("switches slides by keyboard when carousel is focused", () => {
    render(<CertificateSlider data={certificatesMock} />);
    const carousel = screen.getByRole("region", {
      name: "Слайдер сертификатов",
    });

    carousel.focus();
    fireEvent.keyDown(carousel, { key: "ArrowRight" });

    expect(screen.getByText("Слайд 2 из 3")).toBeInTheDocument();
    expect(screen.getByText("Описание 2")).toBeInTheDocument();
  });
});
