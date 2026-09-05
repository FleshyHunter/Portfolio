export const projects = [
  {
    slug: "odin-tutorbot",
    title: "Odin TutorBot — an AI tutoring platform with a real harness",
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
      "A group project helping companies fix weak product descriptions — a two-agent pipeline that finds content gaps with TF-IDF retrieval and rewrites them with LLM-generated copy, verified against spec before anything ships.",
    role: "AI Engineering",
    stack: "Python, FastAPI, Pydantic, OpenAI API, TF-IDF",
    impact: "82 tests, 18 gaps surfaced",
    timeline: "Aug 2026",
    featured: false,
    body: [
      "Nucleus is a group project built to solve a concrete problem for companies: weak or missing product descriptions that keep good products from reaching the customers actually searching for them.",
      "My focus was the AI engineering: a two-agent pipeline where one agent applies TF-IDF retrieval to surface content gaps, and the other uses the OpenAI API to generate replacement descriptions via batch edits. It surfaced 18 classified gaps across 8 personas in testing.",
      "The part I'm proudest of is a code check that verifies LLM claims against the actual product specs before they ship — it caught a fabricated claim live, exactly the failure mode it was built to catch. The pipeline's JSON data contracts are validated end-to-end through 82 tests plus live OpenAI checks.",
    ],
    links: {},
  },
  {
    slug: "cinevillage",
    title: "CineVillage — a cinema platform that doesn't double-book",
    tag: "Full-Stack",
    summary:
      "A fully simulated cinema chain, modeled on players like Shaw Theatres — an EJS admin console plus a React customer app, with real-time movie data and a complete Stripe checkout flow.",
    role: "Full-Stack Development",
    stack: "Node.js, Express, MongoDB, React, Vite, EJS, Stripe",
    impact: "Race-condition-safe checkout",
    timeline: "Feb 2026 – Apr 2026",
    featured: false,
    body: [
      "CineVillage simulates a fully operational cinema chain, modeled on real players like Shaw Theatres — split into a role-based EJS admin console for managing showtimes and content, and a fully separate React customer-facing app for browsing and booking. Both pull real-time movie data and trailers from the OMDb API.",
      "The booking flow runs start to finish: seat selection, booking, promo codes, food and drinks add-ons, and checkout through Stripe. A confirmed booking sends a QR-code e-ticket to the customer's email via SMTP.",
      "The hardest part wasn't the UI — it was making checkout safe under concurrency. I prevented race-condition double-booking using a MongoDB partial unique index plus transactional writes, and verified it held up under concurrent-request testing rather than just trusting it in theory.",
    ],
    links: {},
  },
];

export const featuredProject = projects.find((p) => p.featured);
export const sideProjects = projects.filter((p) => !p.featured);

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}
