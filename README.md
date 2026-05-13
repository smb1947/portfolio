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
5. Future pushes to `main` can redeploy automatically once production is connected in Vercel.

## Deployment Channels

The app keeps GitHub Pages behavior behind an environment flag so other hosts can use a normal Next.js build.

- Standard Next.js build: `npm run build`
- GitHub Pages static export: `npm run build:github-pages`
- Cloudflare Pages static export: `npm run build:cloudflare`
- GitHub Pages dev workflow: `.github/workflows/deploy-pages.yml`

`next.config.ts` always enables `output: "export"` so the build emits the static `out/` directory required by Cloudflare's Wrangler upload flow. GitHub Pages also gets `basePath` and `assetPrefix`; Cloudflare Pages exports at the domain root. This keeps the code deployable to GitHub Pages, Cloudflare Pages, Vercel, or another static-capable host without rewriting application code.

### Cloudflare Pages

Use these Cloudflare Pages settings:

- Build command: `npm run build`
- Build output directory: `out`
- Root directory: repository root
- Deploy command: `npx wrangler versions upload`

`wrangler.jsonc` points Wrangler at `./out`, so Cloudflare's deploy command can upload the exported static assets without a Worker entry point.

Cloudflare Web Analytics can be enabled either in the Cloudflare dashboard through automatic injection, or by setting `NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN` in Cloudflare Pages and redeploying. Do not use both methods at the same time, or the beacon can be loaded twice. The app uses path-based section routes like `/about` and `/experience`, so Cloudflare's SPA tracking can count section navigation as page views.

### Branch Deployment Behavior

- Pushes to `dev` automatically deploy the GitHub Pages site at `https://smb1947.github.io/portfolio/` through the `github-pages-dev` environment.
- The `github-pages-dev` environment is restricted to the `dev` branch.
- Pushes to `main` do not deploy GitHub Pages. Use `main` for production once Vercel is connected.

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
