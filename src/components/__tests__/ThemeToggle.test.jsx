import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "../../context/ThemeContext.jsx";
import Nav from "../Nav.jsx";

function renderNav() {
  return render(
    <ThemeProvider>
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    </ThemeProvider>
  );
}

function getToggle() {
  return screen.getByRole("button", { name: /switch to (dark|light) theme/i });
}

describe("theme toggle", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  afterEach(() => {
    cleanup();
    window.localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("switches the dark class on <html> when clicked", () => {
    renderNav();
    const wasDark = document.documentElement.classList.contains("dark");

    fireEvent.click(getToggle());
    expect(document.documentElement.classList.contains("dark")).toBe(!wasDark);

    fireEvent.click(getToggle());
    expect(document.documentElement.classList.contains("dark")).toBe(wasDark);
  });

  it("persists an explicit choice to localStorage and reapplies it on a fresh mount", () => {
    renderNav();
    fireEvent.click(getToggle());
    const chosenIsDark = document.documentElement.classList.contains("dark");
    expect(window.localStorage.getItem("theme")).toBe(
      chosenIsDark ? "dark" : "light"
    );

    // Simulate a reload: unmount, reset the DOM class the same way a fresh
    // page load would start (no class yet), and mount again. ThemeProvider
    // reads localStorage on init, so the stored choice — not the system
    // default — should win.
    cleanup();
    document.documentElement.classList.remove("dark");

    renderNav();
    expect(document.documentElement.classList.contains("dark")).toBe(
      chosenIsDark
    );
  });
});
