# Prosper Frontend & Engine: Agent Instructions

This document provides specific instructions for agents working within the `web/` directory of Prosper.

## The Mental Model: Financial Version Control

The core of Prosper's frontend is representing the **"Action-over-Situation"** paradigm visually and logically.

1.  **State is Derived:** There is no persistent "State" beyond the initial empty state (all zeros). All financial states at any given age are computed on the fly by reducing the array of **Commits** (actions).
2.  **The Onboarding `Init`:** The user's first interaction is pushing their "Initial Commit" to establish their baseline.
3.  **Conflict Mode UI:** If a user edits an upstream commit, the UI must intercept the resulting state. If dependencies are broken (e.g., quitting a job that no longer exists because the upstream commit was altered), the UI enters **Conflict Mode**. The user must resolve these conflicts visually (like resolving a git merge conflict) before the branch update is accepted and saved.

## Architectural Boundaries

-   **`/src/lib/finance/engine.ts`:** Must be pure and deterministic. It takes an initial state and an array of commits, returning the resulting timeline and any dependency errors (Build Failures).
-   **`/src/lib/finance/model/`:** Defines the strict interfaces for Commits, Branches, and the Financial State.
-   **`/src/components/`:** Must visually represent the "Git" metaphor. Commits should look like a history log. Conflicts should look like code merge conflicts requiring resolution.

## Styling & UX

-   Follow the **"Obsidian Architect"** design system defined in `/DESIGN.md`.
-   Use high-contrast typography: `JetBrains Mono` for data, numbers, and headings; `Inter` for UI body text.
-   Represent errors and conflicts clearly, blocking branch saves until the user resolves all dependency issues.