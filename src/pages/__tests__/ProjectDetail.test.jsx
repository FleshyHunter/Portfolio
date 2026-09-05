import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProjectDetail from "../ProjectDetail.jsx";
import { projects } from "../../data/projects.js";

function renderAtSlug(slug) {
  return render(
    <MemoryRouter initialEntries={[`/work/${slug}`]}>
      <Routes>
        <Route path="/work/:slug" element={<ProjectDetail />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("ProjectDetail", () => {
  it("renders the matching project's title and spec sheet for a known slug", () => {
    const project = projects[0];
    renderAtSlug(project.slug);

    expect(
      screen.getByRole("heading", { name: project.title })
    ).toBeInTheDocument();
    expect(screen.getByText(project.stack)).toBeInTheDocument();
    expect(screen.getByText(project.impact)).toBeInTheDocument();
  });

  it("shows a not-found message instead of crashing on an unknown slug", () => {
    renderAtSlug("this-project-does-not-exist");
    expect(
      screen.getByText(/couldn't find that project/i)
    ).toBeInTheDocument();
  });

  it("every project in the data file resolves to a page with a heading", () => {
    projects.forEach((project) => {
      const { unmount } = renderAtSlug(project.slug);
      expect(
        screen.getByRole("heading", { name: project.title })
      ).toBeInTheDocument();
      unmount();
    });
  });
});
