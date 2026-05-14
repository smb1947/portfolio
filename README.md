# Shankar Binjawadgi Portfolio

Personal portfolio for Shankar Binjawadgi. The site presents my AI-first technical product management positioning, selected project work, work experience, education, and contact links.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- lucide-react icons
- Google fonts through `next/font`

## Content

Most portfolio content lives in `src/lib/content.json`.

Supporting profile/navigation data and content helpers live in `src/lib/data.ts`.

Static assets live in `public/`, including logos and the hero headshot.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

To check a production build:

```bash
npm run build
```

## Deployment

- Production/homepage: `https://portfolio-ebon-three-n7rtoljc0n.vercel.app`
- GitHub Pages dev deployment: `https://smb1947.github.io/portfolio/`
- Repository: `https://github.com/smb1947/portfolio`

The app is statically exported through `next.config.ts`.

Deployment commands:

- Standard static build: `npm run build`
- GitHub Pages build: `npm run build:github-pages`
- Cloudflare-compatible build: `npm run build:cloudflare`

## Workflow

- Work happens on `dev`.
- Pull requests are opened from `dev` to `main`.
- The GitHub Pages workflow deploys from `dev`.
- Keep content centralized and avoid scattering portfolio copy across components.

## What To Update

When refreshing the site, the usual files are:

- `src/lib/content.json` for experience, education, projects, links, and contact content.
- `src/lib/data.ts` for profile framing, capabilities, navigation, and helper mappings.
- `public/` for images and logos.
