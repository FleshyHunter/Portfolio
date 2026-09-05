import React from "react";
import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 py-8 px-6 bg-black">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <p className="text-xs text-zinc-600">
          © 2026 Aaron Lim. Built with React &amp; Tailwind.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-zinc-600 hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="text-zinc-600 hover:text-white transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
