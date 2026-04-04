# Prosper: Financial Version Control

## Core Vision
Prosper is a financial simulation and planning tool built specifically for developers. It rejects the traditional "passive forecasting" model (e.g., "I will have $1M by age 40") in favor of an **"Action-over-Situation"** philosophy. 

In Prosper, you do not model static situations; you model **Actions**. You treat your life plan like a codebase. You make "commits" representing specific actions (e.g., "Commit to finding a $100k job at age 25", "Commit to quitting job at age 50"). The engine compiles these sequential actions to generate your financial future.

## Core Metaphors & Primitives

### 1. The Initial State & The `Init` Commit
The system begins at absolute zero (no assets, no income, no liabilities). The user's onboarding journey requires them to create their **Initial Commit**—establishing their current real-world baseline before they can begin branching into the future.

### 2. Commits (Actions)
A commit is a discrete financial action or decision. 
*   **Good:** "Buy a house for $500k with 20% down."
*   **Bad:** "Have a house worth $500k."

### 3. Branches (Alternate Timelines)
Users can explore different life paths by creating Branches. 
*   **MVP Scope:** Branching creates an exact copy of all commits from the parent branch, establishing an independent new timeline to experiment with.
*   **Post-MVP:** Merging branches (e.g., merging a "Side Hustle" branch back into the "Main" timeline).

### 4. Strict Validation & Conflict Resolution
Because financial state is derived purely from actions, actions have strict dependencies. You cannot commit to "Quit Job" if a previous commit didn't establish that job.
*   **Strict Stability:** A branch must always remain in a stable, executable state. 
*   **Conflict Mode:** If a user edits a past commit (e.g., deleting a job acquisition) that breaks downstream commits, the system enters **Conflict Mode**. The UI blocks the user from finalizing the update until they resolve the broken dependencies (e.g., by deleting or modifying the orphaned "Quit Job" commit).