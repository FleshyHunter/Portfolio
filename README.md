# Marcus Lim — Portfolio

React + Vite + Tailwind + React Router. Dark "Apple-style" homepage with a
featured project spotlight and per-project detail pages at `/work/:slug`.

## Local development

```
npm install
npm run dev
```

## Before you make it yours

- Swap the name, bio, email, and social links in `src/components/Nav.jsx`,
  `src/components/Footer.jsx`, and `src/pages/Home.jsx`.
- Replace the content in `src/data/projects.js` — this is the single source
  of truth for both the homepage project cards and each detail page. Add a
  new project by adding a new object to that array; nothing else needs to
  change.

## Testing

```
npm run test
```

Covers: the hero renders, every project card links to a real route (not a
dead `#`), a known project slug renders its title and spec sheet, and an
unknown slug shows a not-found message instead of crashing. The
`.github/workflows/ci.yml` workflow runs this plus a full build on every
push and PR.

## Deploying

### Vercel (recommended — zero config)
Push this repo to GitHub, import it at vercel.com, done. `vercel.json`
already has the rewrite rule so refreshing on `/work/some-project` won't
404.

### GitHub Pages
1. If this is a **project site** (`username.github.io/repo-name`, not a
   user/org root site), open `vite.config.js` and set:
   ```js
   base: "/repo-name/",
   ```
   Skip this if you're deploying to a user/org root site.
2. `npm run deploy` — this builds and pushes `dist/` to a `gh-pages` branch
   via the `gh-pages` package. Enable Pages on that branch in repo settings.
3. `public/404.html` + the inline script in `index.html` handle the
   redirect-on-refresh problem GitHub Pages has with client-side routing
   (Pages has no server-side routing, so a direct hit on `/work/foo` 404s
   without this). Vercel doesn't need this — `vercel.json` handles it there
   instead.
