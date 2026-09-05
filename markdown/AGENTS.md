# Agent guide — Aaron's portfolio

Read this before editing anything. It exists so you don't have to
rediscover conventions by trial and error, and so you don't "helpfully"
undo a decision that was already made deliberately.

## What this is

React + Vite + Tailwind + React Router. A dark, restrained "Apple-style"
personal portfolio: a homepage with a hero, a featured project spotlight,
a secondary project list, and per-project detail pages at `/work/:slug`.

## Repository map

| Path | What it is |
|---|---|
| `src/data/projects.js` | **Single source of truth for all project content.** Homepage cards and detail pages both read from this array. |
| `src/pages/Home.jsx` | Homepage: hero, "what I do," featured project, secondary project list, experience timeline, contact. |
| `src/pages/ProjectDetail.jsx` | Renders one project from `projects.js` by `slug`. Has a graceful not-found state — don't let it crash on a bad slug. |
| `src/pages/NotFound.jsx` | Catch-all 404 route. |
| `src/components/Nav.jsx` | Shared nav, manages its own scroll state. Anchor links (`/#work` etc.) only resolve on the homepage. |
| `src/components/Footer.jsx` | Shared footer. |
| `src/components/NeuralGraphic.jsx` | Decorative hero SVG. Purely cosmetic, safe to ignore unless asked to change the hero visual. |
| `src/App.jsx` | Routes, plus `ScrollToHash` — makes `#about`/`#work`/etc. anchor links scroll correctly on route change. Don't remove this casually; it's not dead code even though it looks like it does nothing. |
| `vercel.json` | SPA rewrite rule for Vercel. Required — without it, refreshing on `/work/some-project` 404s. |
| `public/404.html` + the inline script in `index.html` | The equivalent fix for GitHub Pages, which has no rewrite config of its own. Only relevant if deploying there. |
| `vite.config.js` | Vite + Vitest config in one file. `base` is `"/"` — only change this if deploying to GitHub Pages as a project site (see comment in the file). |
| `src/pages/__tests__/` | Vitest + Testing Library tests. Run before you consider any change finished. |
| `.github/workflows/ci.yml` | Runs tests + build on every push/PR. Does **not** block Vercel from deploying a broken push to `main` — that's enforced by discipline (or branch protection), not by this file. |

## The file you'll touch most

Adding, editing, or removing a project should touch **only**
`src/data/projects.js`. Each entry:

```js
{
  slug: "kebab-case-unique-id",   // becomes the URL: /work/kebab-case-unique-id
  title: "...",
  tag: "Machine Learning",        // short category label
  summary: "...",                 // one sentence, shown on cards
  role: "...", stack: "...", impact: "...", timeline: "...", // spec-sheet fields
  featured: true,                 // exactly one project should be true — it gets the dark spotlight section
  body: ["paragraph one", "paragraph two", ...], // full case-study text
  links: { repo: "#", demo: "#" }, // omit a key if there's nothing to link
}
```

If a task is "add a project" or "update project X," you should not need to
touch `Home.jsx` or `ProjectDetail.jsx` at all. If you find yourself
editing those for a content change, stop — the content should live in the
data file instead.

## Design system — match this, don't reinvent it

The whole site runs on one rule: **restraint**. One accent color, hairline
dividers instead of card shadows, no decorative gradients outside the
hero. If you add a new section, match these, don't introduce a new pattern:

| Token | Value | Used for |
|---|---|---|
| Background | `bg-black` | Base page |
| Elevated surface | `bg-zinc-950` / `bg-zinc-900` | Alternating sections, cards |
| Border | `border-zinc-800` / `border-zinc-900` | Hairline dividers, card outlines |
| Primary text | `text-white` | Headings |
| Secondary text | `text-zinc-400` / `text-zinc-500` | Body copy, meta |
| Accent | `text-blue-500` | Links, eyebrow labels — the *only* color used for emphasis |
| Primary button | `bg-white text-black` | CTAs |
| Type | System font stack (see `index.css`) | Everything — one family, weight does the hierarchy work |

Specific patterns already established, follow them for new content:
- Project lists use hairline dividers (`divide-y divide-zinc-900`), not a
  grid of identical shadowed cards.
- Project detail pages use a 4-column "spec sheet" grid (Role / Stack /
  Impact / Timeline) with a `border-t border-b`, not prose paragraphs for
  metadata.
- Motion is minimal: one hero entrance animation on load, hover-state
  transitions on interactive elements. No scroll-triggered fade-ins on
  every section — that was a deliberate choice, not an oversight.

Note: unlike a Claude.ai canvas/artifact preview, **this is a real Vite +
PostCSS + Tailwind build** — arbitrary-value classes like `bg-[#1a1a1a]`
work fine here if you ever need one. You're not restricted to core
utilities in this repo.

## Before you consider a task done

1. `npm run test` — all tests must pass, not just "probably still work."
2. `npm run build` — must succeed with no errors.
3. If you touched content: check `src/data/projects.js` still has exactly
   one `featured: true` entry, and that every `slug` is unique.
4. If you added a new component or page, add a test for it in
   `src/pages/__tests__/` following the existing pattern — this project's
   owner expects code changes to come with tests, not as an afterthought.

## Decisions already made — don't relitigate these without a real reason

- **`react-router-dom` is pinned to `^7.18.3`, not v6.** The v6 line (and
  earlier v7 releases) had two open CVEs (open redirect, constructor
  injection) with no patch backported to v6. If a tutorial or your
  training data suggests "downgrade to v6 for simplicity," don't —
  security fix, not a preference.
- **Vercel is the primary host.** Auto-deploys on every push to `main` via
  `vercel.json`. GitHub Pages works too but is manual (`npm run deploy`) —
  don't assume pushing to GitHub alone publishes anything there.
- **`vite.config.js` `base` stays `"/"` unless explicitly deploying to
  GitHub Pages as a project site** (`username.github.io/repo-name`, not a
  root site). Changing it unnecessarily breaks the Vercel deployment's
  asset paths.
- **Content lives in one file (`projects.js`) on purpose** — it's what
  keeps the homepage and detail pages in sync automatically. Don't
  duplicate project data into component files "for convenience."
- **The dark palette is the deliberate direction**, chosen over a lighter
  or more colorful alternative after comparing several options. Don't
  swap it out for a different theme without being explicitly asked.

## Commands

```
npm install       # first time only
npm run dev       # local dev server
npm run test      # Vitest — run before finishing any task
npm run build     # production build — must pass before shipping
npm run preview   # serve the production build locally
npm run deploy    # GitHub Pages only — builds and pushes dist/ to gh-pages branch
```
