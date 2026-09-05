export const projects = [
  {
    slug: "recommender-system",
    title: "A recommender system that explains itself",
    tag: "Machine Learning",
    summary:
      "An interpretable recommendation engine that surfaces not just what to show a user, but why.",
    role: "Solo builder",
    stack: "PyTorch, FastAPI",
    impact: "+18% CTR in test",
    timeline: "Jan – Apr 2026",
    featured: true,
    body: [
      "Most recommender systems are black boxes — they rank items well but can't say why. I wanted to build one that could.",
      "I fine-tuned a transformer on interaction data, then layered attention-weight visualization on top so each recommendation ships with a short, human-readable reason.",
      "Evaluated against a baseline collaborative-filtering model in an A/B test, it lifted click-through rate by 18% — likely because the visible reasoning built user trust in the results.",
    ],
    links: { repo: "#", demo: "#" },
  },
  {
    slug: "nus-qa-bot",
    title: "Study buddy — NUS module Q&A bot",
    tag: "NLP",
    summary:
      "RAG pipeline over past-year papers and lecture notes, built for CS2109S.",
    role: "Solo builder",
    stack: "LangChain, OpenAI embeddings, Pinecone",
    impact: "Used by 40+ classmates",
    timeline: "Oct 2025",
    featured: false,
    body: [
      "Built during exam season out of self-interest: I wanted a way to ask questions against my own module materials instead of scrolling through slides.",
      "Chunked and embedded lecture notes and past-year papers, retrieved relevant context per question, and passed it to an LLM with a strict 'only answer from context' prompt to reduce hallucination.",
    ],
    links: { repo: "#", demo: "#" },
  },
  {
    slug: "sentiment-classifier",
    title: "Fine-tuned sentiment classifier",
    tag: "Machine Learning",
    summary:
      "DistilBERT fine-tune on Reddit finance threads, deployed as a FastAPI service.",
    role: "Solo builder",
    stack: "PyTorch, DistilBERT, FastAPI, Docker",
    impact: "89% held-out accuracy",
    timeline: "Aug 2025",
    featured: false,
    body: [
      "A smaller, focused project to get comfortable with the full fine-tuning-to-deployment loop, end to end.",
      "Fine-tuned DistilBERT on labeled Reddit finance-subreddit comments, then wrapped it in a small FastAPI service with Docker for a reproducible deployment.",
    ],
    links: { repo: "#", demo: "#" },
  },
  {
    slug: "shuttle-eta-predictor",
    title: "Campus shuttle ETA predictor",
    tag: "Full-stack",
    summary:
      "Small time-series model plus a scrappy React dashboard, built over a weekend.",
    role: "Solo builder",
    stack: "Python, scikit-learn, React",
    impact: "Weekend project",
    timeline: "2025",
    featured: false,
    body: [
      "NUS's shuttle app never seemed to match reality, so I scraped historical arrival data and trained a small time-series model to predict actual ETAs.",
      "Paired it with a lightweight React dashboard so I could sanity-check predictions against real-time bus positions.",
    ],
    links: { repo: "#", demo: "#" },
  },
];

export const featuredProject = projects.find((p) => p.featured);
export const sideProjects = projects.filter((p) => !p.featured);

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}
