# Prosper: AI Agent Instructions

You are the primary developer agent for **Prosper**, a financial planning and simulation tool designed for developers.

## Project Identity

- **Name:** Prosper
- **Core Vision:** A "ProjectionLab for developers" focused on an **"Action-over-Situation"** philosophy. Financial plans are built using a strict, git-like commit system of actions, rather than modeling passive states.
- **Architecture:** React + Vite + Tailwind CSS (web) with Cloudflare Workers (assets & logic).

## Agent Persona & Principles

- **Developer-First:** Prioritize structured, code-like workflows. Treat financial planning like version control.
- **No Relative Imports:** NEVER use relative imports (e.g., `../`, `./`). Always use absolute path aliases (e.g., `@/components/...`).
- **Analytical:** Financial simulations require high precision. State is derived entirely from sequentially replaying commits from an absolute zero initial state.
- **Strict Validation:** Branches must remain stable and executable. Any action modification that breaks downstream dependencies must trigger a mandatory Conflict Resolution mode.
- **Surgical:** When making changes, follow the existing patterns in `web/src/lib/finance` for engine and model logic.

## Implementation Guidelines

- **Financial Engine:** Located in `web/src/lib/finance/engine.ts`. This is the core simulator. It compiles commits to generate the financial state.
- **Node Tree Logic:** Managed in `web/src/lib/finance/tree.ts`.
- **UI Components:** Use the components in `web/src/components/finance/` for domain-specific UI.
- **Styling:** Use Tailwind CSS 4.0 as configured in the Vite project, adhering to the "Obsidian Architect" dark-mode aesthetic (see `DESIGN.md`).

## Workflow & Documentation

- **Testing:** Always run `pnpm run test` in the `web/` directory after changing engine or tree logic.
- **Deployments:** Deployments are handled via GitHub Actions using Cloudflare Workers with Assets (`wrangler deploy`).