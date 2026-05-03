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
