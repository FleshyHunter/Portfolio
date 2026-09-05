import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../Home.jsx";

function renderHome() {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
}

describe("Home", () => {
  it("renders the hero heading", () => {
    renderHome();
    expect(
      screen.getByText(/Engineering intelligence/i)
    ).toBeInTheDocument();
  });

  it("links the featured project to a real /work/:slug route", () => {
    renderHome();
    const link = screen.getByRole("link", { name: /view project/i });
    expect(link.getAttribute("href")).toMatch(/^\/work\/.+/);
  });

  it("renders every secondary project as a link, not a dead anchor", () => {
    renderHome();
    const moreProjectsHeading = screen.getByText("Relevant projects");
    const section = moreProjectsHeading.closest("section");
    const links = section.querySelectorAll("a");
    expect(links.length).toBeGreaterThan(0);
    links.forEach((link) => {
      expect(link.getAttribute("href")).toMatch(/^\/work\/.+/);
    });
  });
});
