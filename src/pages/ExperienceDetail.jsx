import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";
import { getExperienceBySlug } from "../data/experience.js";

export default function ExperienceDetail() {
  const { slug } = useParams();
  const experience = getExperienceBySlug(slug);

  if (!experience) {
    return (
      <div className="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-zinc-100 flex flex-col">
        <Nav />
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <p className="text-gray-500 dark:text-zinc-500 mb-4">
            We couldn't find that experience — it may have moved or the link
            is wrong.
          </p>
          <Link
            to="/"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400 inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-zinc-100 antialiased">
      <Nav />

      <article className="pt-40 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:text-zinc-500 dark:hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>

          <p className="text-sm font-medium text-blue-600 dark:text-blue-500 mb-4">
            {experience.tag}
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6">
            {experience.title}
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 text-lg leading-relaxed mb-12">
            {experience.summary}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-b border-gray-200 dark:border-zinc-800 py-8 mb-12">
            <div>
              <p className="text-xs text-gray-500 dark:text-zinc-500 mb-1">Role</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {experience.role}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-zinc-500 mb-1">Stack</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {experience.stack}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-zinc-500 mb-1">Impact</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {experience.impact}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-zinc-500 mb-1">Timeline</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {experience.timeline}
              </p>
            </div>
          </div>

          <div className="space-y-6 mb-12">
            {experience.body.map((paragraph, i) => (
              <p key={i} className="text-gray-700 dark:text-zinc-300 text-base leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
