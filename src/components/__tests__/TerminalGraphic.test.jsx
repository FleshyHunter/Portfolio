import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../context/ThemeContext.jsx";
import TerminalGraphic from "../TerminalGraphic.jsx";

function renderGraphic() {
  return render(
    <ThemeProvider>
      <TerminalGraphic />
    </ThemeProvider>
  );
}

describe("TerminalGraphic", () => {
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("renders an accessible Docker deployment animation", () => {
    renderGraphic();

    expect(
      screen.getByRole("img", { name: /successful Docker deployment/i })
    ).toBeInTheDocument();
    expect(screen.getByText("docker-compose up --build -d")).toBeInTheDocument();
  });

  it("reveals deployment output after the command finishes typing", () => {
    vi.useFakeTimers();
    const { container } = renderGraphic();

    expect(container).not.toHaveTextContent("Building 4.1s");

    act(() => {
      vi.advanceTimersByTime(1100);
    });

    expect(container).toHaveTextContent("Building 4.1s");
  });
});
