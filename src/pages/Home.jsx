import React from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  ArrowUpRight,
  ChevronRight,
  Brain,
  Terminal,
  LineChart,
  Code2,
  GraduationCap,
  Briefcase,
  Trophy,
} from "lucide-react";
import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";
import NeuralGraphic from "../components/NeuralGraphic.jsx";
import { featuredProject, sideProjects } from "../data/projects.js";

const TIMELINE = [
  {
    date: "2024 — 2028",
    icon: <GraduationCap className="w-4 h-4 text-zinc-500" />,
    title: "B.Comp (Business Artificial Intelligence Systems), NUS",
    desc: "Specialising in Artificial Intelligence. Coursework in AI, ML, Full-Stack Development and Systems Architecture.",
  },
  {
    date: "Summer 2026",
    icon: <Briefcase className="w-4 h-4 text-zinc-500" />,
    title: "QA Engineering Intern — [IDEMIA Public Security]",
    desc: "Built and evaluated model pipelines used in a production recommendation system.",
  },
  
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 antialiased">
      <style>{`
        @keyframes floatOrb {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .orb-float { animation: floatOrb 7s ease-in-out infinite; }
        .hero-in { animation: fadeInUp 0.9s cubic-bezier(0.16,1,0.3,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .orb-float, .hero-in { animation: none !important; }
        }
      `}</style>

      <Nav />

      {/* HERO */}
      <section className="relative pt-40 md:pt-48 pb-24 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="hero-in text-sm font-medium text-blue-500 mb-5"
            style={{ animationDelay: "0.05s" }}
          >
            NUS Business Artificial Intelligence Systems · Class of 2028
          </p>
          <h1
            className="hero-in text-5xl md:text-7xl font-semibold tracking-tight leading-tight text-white"
            style={{ animationDelay: "0.15s" }}
          >
            Engineering intelligence,
            <br />
            not just software.
          </h1>
          <p
            className="hero-in mt-6 text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
            style={{ animationDelay: "0.3s" }}
          >
            I build machine learning systems that ship — from research
            prototypes to production APIs. Currently exploring how models
            reason, not just predict.
          </p>
          <div
            className="hero-in mt-9 flex items-center justify-center gap-6"
            style={{ animationDelay: "0.45s" }}
          >
            <a
              href="#work"
              className="bg-white text-black text-sm font-medium rounded-full px-6 py-2.5 hover:bg-zinc-200 transition-colors"
            >
              View my work
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-blue-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
            >
              Get in touch <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div
          className="hero-in relative mt-20 max-w-3xl mx-auto"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="relative h-72 md:h-96 rounded-3xl bg-zinc-950 border border-zinc-800 overflow-hidden flex items-center justify-center">
            <div className="orb-float absolute w-72 h-72 rounded-full bg-blue-900 blur-3xl opacity-30" />
            <div
              className="orb-float absolute w-40 h-40 rounded-full bg-blue-800 blur-2xl opacity-20 right-16 top-10"
              style={{ animationDelay: "2s" }}
            />
            <NeuralGraphic />
          </div>
        </div>
      </section>

      {/* WHAT I DO */}
      <section id="about" className="bg-zinc-950 py-24 md:py-28 px-6 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto space-y-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center mb-6">
                <Brain className="w-5 h-5 text-black" />
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 text-white">
                Machine learning, from research to production.
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                Two years deep in applied ML — computer vision, NLP, and
                increasingly, how large models reason under constraints. I
                care about models that hold up outside the notebook.
              </p>
              <div className="flex flex-wrap gap-2">
                {["PyTorch", "TensorFlow", "scikit-learn", "CUDA"].map((t) => (
                  <span
                    key={t}
                    className="text-xs font-medium text-zinc-300 border border-zinc-700 rounded-full px-3 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="h-64 rounded-3xl bg-black border border-zinc-800 flex items-center justify-center">
              <LineChart className="w-16 h-16 text-zinc-700" strokeWidth={1} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="h-64 rounded-3xl bg-black border border-zinc-800 flex items-center justify-center order-2 md:order-1">
              <Code2 className="w-16 h-16 text-zinc-700" strokeWidth={1} />
            </div>
            <div className="order-1 md:order-2">
              <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center mb-6">
                <Terminal className="w-5 h-5 text-black" />
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 text-white">
                Software engineering that carries the weight.
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                A model is only as useful as the system around it. I write
                the APIs, pipelines, and infra that let a model actually
                reach a user.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Python", "TypeScript", "Docker", "AWS"].map((t) => (
                  <span
                    key={t}
                    className="text-xs font-medium text-zinc-300 border border-zinc-700 rounded-full px-3 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECT — dark spotlight, real link */}
      {featuredProject && (
        <section id="work" className="bg-black py-24 md:py-28 px-6 border-t border-zinc-900">
          <div className="max-w-5xl mx-auto">
            <p className="text-sm font-medium text-blue-500 mb-4">
              Featured project
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight max-w-2xl mb-6 text-white">
              {featuredProject.title}
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed mb-12">
              {featuredProject.summary}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-zinc-800 pt-8">
              <div>
                <p className="text-xs text-zinc-500 mb-1">Role</p>
                <p className="text-sm font-medium text-white">
                  {featuredProject.role}
                </p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-1">Stack</p>
                <p className="text-sm font-medium text-white">
                  {featuredProject.stack}
                </p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-1">Impact</p>
                <p className="text-sm font-medium text-white">
                  {featuredProject.impact}
                </p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-1">Timeline</p>
                <p className="text-sm font-medium text-white">
                  {featuredProject.timeline}
                </p>
              </div>
            </div>

            <Link
              to={`/work/${featuredProject.slug}`}
              className="mt-10 inline-flex items-center gap-1 text-sm font-medium text-white hover:text-zinc-400 transition-colors"
            >
              View project <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* SECONDARY PROJECTS — real links */}
      <section className="py-20 md:py-24 px-6 bg-black">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold tracking-tight mb-8 text-white">
            More projects
          </h2>
          <div className="divide-y divide-zinc-900 border-t border-b border-zinc-900">
            {sideProjects.map((p) => (
              <Link
                key={p.slug}
                to={`/work/${p.slug}`}
                className="group flex items-center justify-between gap-6 py-6 px-2 -mx-2 rounded-lg hover:bg-zinc-950 transition-colors"
              >
                <div>
                  <h3 className="text-lg font-medium text-white">{p.title}</h3>
                  <p className="text-zinc-500 text-sm mt-1">{p.summary}</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-zinc-700 group-hover:text-white transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE / EDUCATION */}
      <section id="experience" className="bg-zinc-950 py-20 md:py-24 px-6 border-t border-zinc-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold tracking-tight mb-10 text-white">
            Experience &amp; education
          </h2>
          <div className="space-y-8">
            {TIMELINE.map((item) => (
              <div key={item.title} className="flex gap-6">
                <div className="w-28 flex-shrink-0 text-sm text-zinc-500 pt-0.5">
                  {item.date}
                </div>
                <div className="flex-1 border-l border-zinc-800 pl-6 pb-2">
                  <div className="flex items-center gap-2 mb-1">
                    {item.icon}
                    <h3 className="font-medium text-white">{item.title}</h3>
                  </div>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 md:py-28 px-6 text-center bg-black border-t border-zinc-900">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-white">
          Let's build something.
        </h2>
        <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-10">
          Open to internships, research collaborations, and interesting
          problems. I usually reply within a day.
        </p>
        <a
          href="mailto:aaronlyd03@gmail.com"
          className="inline-flex items-center gap-2 bg-white text-black text-sm font-medium rounded-full px-7 py-3 hover:bg-zinc-200 transition-colors"
        >
          <Mail className="w-4 h-4" /> aaronlyd03@gmail.com
        </a>
      </section>

      <Footer />
    </div>
  );
}
