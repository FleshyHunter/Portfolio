import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";

const NAV_LINKS = [
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200 dark:border-zinc-800"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between h-14 px-6">
        <Link
          to="/"
          className="text-sm font-semibold tracking-tight text-gray-900 dark:text-white"
        >
          Aaron Lim
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-500 dark:text-zinc-400">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to="/"
              state={{ scrollTo: link.id }}
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
            }
            className="p-2 rounded-full text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium bg-gray-900 text-white dark:bg-white dark:text-black rounded-full px-4 py-1.5 hover:bg-gray-700 dark:hover:bg-zinc-200 transition-colors"
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
}
