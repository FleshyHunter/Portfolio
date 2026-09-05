import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";
import { getProjectBySlug } from "../data/projects.js";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-zinc-100 flex flex-col">
        <Nav />
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <p className="text-zinc-500 mb-4">
            We couldn't find that project — it may have moved or the link is
            wrong.
          </p>
          <Link
            to="/"
            className="text-sm font-medium text-blue-500 hover:text-blue-400 inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100 antialiased">
      <Nav />

      <article className="pt-40 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>

          <p className="text-sm font-medium text-blue-500 mb-4">
            {project.tag}
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
            {project.title}
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed mb-12">
            {project.summary}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-b border-zinc-800 py-8 mb-12">
            <div>
              <p className="text-xs text-zinc-500 mb-1">Role</p>
              <p className="text-sm font-medium text-white">{project.role}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 mb-1">Stack</p>
              <p className="text-sm font-medium text-white">{project.stack}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 mb-1">Impact</p>
              <p className="text-sm font-medium text-white">{project.impact}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 mb-1">Timeline</p>
              <p className="text-sm font-medium text-white">
                {project.timeline}
              </p>
            </div>
          </div>

          <div className="space-y-6 mb-12">
            {project.body.map((paragraph, i) => (
              <p key={i} className="text-zinc-300 text-base leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {(project.links?.repo || project.links?.demo) && (
            <div className="flex items-center gap-6 border-t border-zinc-900 pt-8">
              {project.links?.repo && (
                <a
                  href={project.links.repo}
                  className="text-sm font-medium text-white hover:text-zinc-400 transition-colors inline-flex items-center gap-1"
                >
                  View repository <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
              {project.links?.demo && (
                <a
                  href={project.links.demo}
                  className="text-sm font-medium text-white hover:text-zinc-400 transition-colors inline-flex items-center gap-1"
                >
                  Live demo <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>
          )}
        </div>
      </article>

      <Footer />
    </div>
  );
}
