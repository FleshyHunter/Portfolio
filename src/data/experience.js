export const experiences = [
  {
    slug: "idemia-public-security",
    title: "Software Developer Intern (QA Engineer), IDEMIA Public Security",
    tag: "Internship",
    summary:
      "Identified a QA bottleneck causing multi-day, after-hours work and independently built an AI tool to fix it — cutting the workflow to under 30 minutes in controlled testing.",
    role: "Software Developer Intern (QA)",
    stack: "Ollama (Qwen3.5), all-MiniLM-L6-v2, Dify, PostgreSQL/pgvector, Prisma, React/TypeScript",
    impact: "Multi-hour workflow → under 30 min",
    timeline: "May 2026 – Present",
    body: [
      "My role is QA Engineer, but I noticed a repetitive QA bottleneck that was causing multi-day updates and after-hours work — so instead of just living with it, I proposed and built my own fix, independently initiating two internal AI automation projects.",
      "The first was a two-stage LLM proof of concept: routing to cut costs, parallel execution to lower latency, and schema validation across 70+ tests. It proved the approach worked before a workflow mismatch halted development.",
      "The second, which I'm still building, is a self-hosted LLM tool that decomposes tickets into reusable source-of-truth components. In controlled testing it's cut a multi-hour manual workflow down to under 30 minutes.",
      "I'm now extending it with semantic matching — embedding atomic components without chunking to automate linking — to cut cost and latency further versus a straight LLM comparison, ahead of integrating it into the live workflow.",
    ],
  },
];

export function getExperienceBySlug(slug) {
  return experiences.find((e) => e.slug === slug);
}
