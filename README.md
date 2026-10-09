# Shankar Binjawadgi Portfolio

My personal portfolio website: [smb007.me](https://smb007.me)

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- lucide-react

## Deployment Channels

- Vercel
- Cloudflare

Cloudflare serves [smb007.xyz](https://smb007.xyz) from the `portfolio` Worker.
Workers Builds watches `main`, runs `npm run build`, and deploys the static
`out` directory with `npx wrangler deploy`. Other branches use
`npx wrangler versions upload` to create previews without changing production.

After a merge, check that **Workers Builds: portfolio** completes on the new
`main` commit. A successful preview check on the PR does not confirm a production
deployment. If no production build appears, check the GitHub repository connection
in Cloudflare's build settings before retrying the build.
