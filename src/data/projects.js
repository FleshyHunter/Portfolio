export const projects = [
  {
    slug: "odin-tutorbot",
    title: "Odin TutorBot — a AI tutoring platform with a real harness",
    tag: "AI Engineering",
    summary:
      "A self-hosted tutoring platform with a Rust/Axum backend, multi-source RAG, and an agentic loop that knows when to reach for a tool.",
    role: "AI Engineering",
    stack: "Rust/Axum, React/TypeScript, Ollama, ChromaDB, Dify, Tailscale",
    impact: "Mastery-adaptive syllabus + exercises",
    timeline: "Jul 2026 – Present",
    featured: true,
    body: [
      "Odin TutorBot is a tutoring platform I'm building end-to-end: a Rust/Axum backend, a React/TypeScript frontend, and a Mac client that talks to a self-hosted GPU node over Tailscale VPN. It ingests lecture material through OCR and voice transcription, and tracks a syllabus as a dependency graph across live exercises.",
      "The interesting engineering is underneath the surface. Retrieval is a multi-source RAG system — a global knowledge base plus per-user context — using sentence-transformer embeddings for trust-weighted, multi-factor ranking, with an over-fetch-then-rerank step and tiered context compression so the model isn't drowning in raw text. Prompt contracts across four production LLM workflows in Dify enforce persona constraints and strict single-input/single-output JSON.",
      "I try to keep correctness and narration separate: code decides whether an answer is right, the model only explains it. On top of that, the model can call out to real tools — web search, Wolfram Alpha, arXiv — mid-generation, deciding for itself when retrieval is actually needed, with fail-soft handling if a tool times out.",
    ],
    links: {},
  },
  {
    slug: "nucleus",
    title: "Nucleus — an agent pipeline that checks its own claims",
    tag: "AI Engineering",
    summary:
      "A two-agent pipeline that finds content gaps with TF-IDF retrieval and fixes them with LLM-generated edits — verified against spec before anything ships.",
    role: "AI Engineering",
    stack: "Python, FastAPI, Pydantic, OpenAI API, TF-IDF",
    impact: "82 tests, 18 gaps surfaced",
    timeline: "Aug 2026",
    featured: false,
    body: [
      "Nucleus started as a way to close a very specific gap: storefronts with missing or thin content, and no efficient way to find and fix them at scale.",
      "I built a two-agent pipeline — one agent applies TF-IDF retrieval to surface content gaps, the other uses the OpenAI API to generate replacement content via batch edits. It surfaced 18 classified gaps across 8 personas in testing.",
      "The part I'm proudest of is a code check that verifies LLM claims against the actual specs before they ship — it caught a fabricated claim live, exactly the failure mode it was built to catch. The pipeline's JSON data contracts are validated end-to-end through 82 tests plus live OpenAI checks.",
    ],
    links: {},
  },
  {
    slug: "cinevillage",
    title: "CineVillage — a cinema platform that doesn't double-book",
    tag: "Full-Stack",
    summary:
      "A full-stack cinema booking platform with a role-based admin console and a customer SPA, built to stay correct under concurrent checkout.",
    role: "Full-Stack Development",
    stack: "Node.js, Express, MongoDB, React, Vite, EJS",
    impact: "Race-condition-safe checkout",
    timeline: "Feb 2026 – Apr 2026",
    featured: false,
    body: [
      "CineVillage is a full-stack cinema booking platform — a role-based admin console (EJS) for managing showtimes and a React/Vite booking SPA for customers, both backed by a shared MongoDB model synced against the OMDb API for movie data.",
      "The hardest part wasn't the UI — it was making checkout safe under concurrency. I prevented race-condition double-booking using a MongoDB partial unique index plus transactional writes, and verified it held up under concurrent-request testing rather than just trusting it in theory.",
      "Checkout is end-to-end from there: mocked payment validation, booking finalization, and automated QR-code e-ticket delivery.",
    ],
    links: {},
  },
];

export const featuredProject = projects.find((p) => p.featured);
export const sideProjects = projects.filter((p) => !p.featured);

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}
