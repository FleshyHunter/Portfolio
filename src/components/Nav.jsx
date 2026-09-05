import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NAV_LINKS = [
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-zinc-800"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between h-14 px-6">
        <Link
          to="/"
          className="text-sm font-semibold tracking-tight text-white"
        >
          Aaron Lim
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to="/"
              state={{ scrollTo: link.id }}
              className="hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium bg-white text-black rounded-full px-4 py-1.5 hover:bg-zinc-200 transition-colors"
        >
          Resume
        </a>
      </div>
    </nav>
  );
}
