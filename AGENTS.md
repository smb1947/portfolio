# AGENTS.md

Guidance for future Codex work on this portfolio.

## Design Direction

- Prioritize clarity, accessibility, responsive polish, strong contrast, semantic HTML, and keyboard-friendly navigation.
- Preserve the warm ivory, deep navy, teal, and muted coral palette unless the user requests a redesign.
- The site should feel thoughtful, polished, personal, and product-oriented.
- Avoid generic developer portfolio, terminal, cyberpunk, or overly startup-template styling.
- Use subtle CSS transitions and respect `prefers-reduced-motion`.
- Do not add heavy animation libraries unless requested.

## Technical Rules

- Keep code modular, readable, and aligned with existing component patterns.
- Use Tailwind utilities, but keep class usage understandable.
- Do not add external services, a CMS, analytics, or paid dependencies unless requested.
- Prefer existing components and data patterns over introducing new abstractions.
- Keep copy and layout changes scoped to the user's request.

## Workflow

- Work directly on the `dev` branch unless the user explicitly asks for another branch.
- Create pull requests from `dev` to `main` when asked to publish or open a PR.
- Commit and push completed changes to the remote every time unless the user explicitly says not to.
- Do not create separate feature branches unless the user explicitly asks for one.
- Run `npm run build` only when necessary for the change, especially for code, dependency, configuration, or user-visible site changes.
- Report changed files and verification results clearly.
