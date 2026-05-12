# Shankar Binjawadgi | Product Explorer

A premium personal portfolio website for Shankar Binjawadgi, positioned around MBA projects, Nextleap-style product explorations, AI, consumer behavior, GTM strategy, health and fitness tech, writing, and product leadership identity.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- React components
- lucide-react icons
- Google fonts via `next/font`

## Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

To verify a production build:

```bash
npm run build
```

## GitHub Push Instructions

```bash
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin <repo-url>
git push -u origin main
```

## Vercel Deployment

1. Create or import a project in Vercel.
2. Connect the GitHub repository.
3. Vercel should automatically detect the Next.js framework preset.
4. Deploy.
5. Future pushes to `main` redeploy automatically.

## Deployment Channels

The app keeps GitHub Pages behavior behind an environment flag so other hosts can use a normal Next.js build.

- Standard Next.js build: `npm run build`
- GitHub Pages static export: `npm run build:github-pages`
- Live GitHub Pages workflow: `.github/workflows/deploy-pages.yml`
- Dev branch validation workflow: `.github/workflows/dev-preview.yml`

`next.config.ts` only enables `output: "export"`, `basePath`, and `assetPrefix` when `GITHUB_PAGES=true`. This keeps the code deployable to GitHub Pages, Vercel, or another Next-compatible host without rewriting application code.

### Branch Deployment Behavior

- Pushes to `main` automatically deploy the live GitHub Pages site at `https://smb1947.github.io/portfolio/`.
- Pushes to `dev` automatically run production and GitHub Pages export builds in the `github-pages-dev` environment, then upload the static export as an Actions artifact named `portfolio-dev-static-export`.
- GitHub Pages does not provide a separate public preview URL per branch through the official Pages deploy workflow. Deploying `dev` with `actions/deploy-pages` would update the same live Pages site, so the `dev` workflow intentionally validates and packages the branch without overwriting production.

## Updating Content

Most site content lives in `src/lib/data.ts`, including navigation, projects, principles, timeline items, writing placeholders, and contact links.

Update placeholder contact links in `contactLinks` when real profiles are ready:

- Email
- LinkedIn
- GitHub
- Medium

## Adding a New Exploration

1. Add a new object to the `explorations` array in `src/lib/data.ts`.
2. Choose a unique `slug`.
3. Add title, subtitle, tags, metadata, and section copy.
4. Reuse an existing `visual` type or add a new visual treatment in `src/components/ProjectVisual.tsx`.
5. The index and detail page will update automatically.
