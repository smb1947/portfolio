# AGENTS.md

Guidance for future Codex work on this portfolio.

## Collaboration Guidelines

- Do not blindly accept the user's suggestions. Think critically about why a suggestion works, why it might not work, and whether it fits the portfolio. Share that judgment briefly before implementing, unless the user explicitly asks for immediate execution.

## Design Direction

- Prioritize clarity, accessibility, responsive polish, strong contrast, semantic HTML, and keyboard-friendly navigation.
- Preserve the warm ivory, deep navy, teal, and muted coral palette unless the user requests a redesign.
- The site should feel thoughtful, polished, personal, and product-oriented.
- Avoid generic developer portfolio, terminal, cyberpunk, or overly startup-template styling.
- Use subtle CSS transitions and respect `prefers-reduced-motion`.
- Do not add heavy animation libraries unless requested.

## Technical Rules

- Keep code modular, readable, and aligned with existing component patterns.
- Git workflow: stay on the currently checked-out branch unless the user explicitly requests a branch change or asks to create a new pull request. Follow the new-PR workflow below when that request is made.
- Use Tailwind utilities, but keep class usage understandable.
- Do not add external services, a CMS, analytics, or paid dependencies unless requested.
- Prefer existing components and data patterns over introducing new abstractions.
- Keep copy and layout changes scoped to the user's request.

## Workflow

- Continue working on the currently checked-out branch unless the user explicitly asks to switch branches.
- When the user explicitly asks to "create a new PR," first check whether an open PR already exists for the same work and base. If not, fetch the latest remote state, create and switch to a fresh feature branch from the latest `origin/main` before making the requested changes, and verify that `origin/main` is an ancestor of the new branch. Keep all related work on that branch, commit and push it, and open the pull request to `main`. Do not switch away from the new branch until the pull request is opened or the user directs otherwise.
- Commit and push completed changes to the remote every time unless the user explicitly says not to.
- Do not create separate feature branches for normal development work; use them only for the PR packaging step or when the user explicitly asks for one.
- Run `npm run build` only when necessary for the change, especially for code, dependency, configuration, or user-visible site changes.
- Do not run browser visual checks or open the site in a browser unless the user explicitly asks for browser verification.
- Report changed files and verification results clearly.
