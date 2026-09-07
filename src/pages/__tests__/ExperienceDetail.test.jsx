import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "../../context/ThemeContext.jsx";
import ExperienceDetail from "../ExperienceDetail.jsx";
import { experiences } from "../../data/experience.js";

function renderAtSlug(slug) {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={[`/experience/${slug}`]}>
        <Routes>
          <Route path="/experience/:slug" element={<ExperienceDetail />} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  );
}

describe("ExperienceDetail", () => {
  it("renders the matching experience's title and spec sheet for a known slug", () => {
    const experience = experiences[0];
    renderAtSlug(experience.slug);

    expect(
      screen.getByRole("heading", { name: experience.title })
    ).toBeInTheDocument();
    expect(screen.getByText(experience.stack)).toBeInTheDocument();
    expect(screen.getByText(experience.impact)).toBeInTheDocument();
  });

  it("shows a not-found message instead of crashing on an unknown slug", () => {
    renderAtSlug("this-experience-does-not-exist");
    expect(
      screen.getByText(/couldn't find that experience/i)
    ).toBeInTheDocument();
  });
});
