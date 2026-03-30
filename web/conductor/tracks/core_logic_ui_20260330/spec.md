# Specification: core_logic_ui_20260330

## 1. Goal
Implement the core financial planning engine and the interactive, branching node tree UI that forms the foundation of the Prosper experience.

## 2. Core Components

### 2.1 Financial Projection Engine
- **Data Models:** Define structures for assets (stocks, cash, real estate), expenses (fixed, variable), and growth rates (inflation, ROI).
- **Projection Logic:** Implement a multi-year simulation engine that calculates future net worth based on compound growth and recurring events.
- **Scenario Support:** The engine must be able to calculate outcomes independently for different branches in the node tree.

### 2.2 Node Tree & Branching UI (The "Git of Finance")
- **Tree Visualization:** A graphical interface representing the user's financial life as a branching tree of nodes.
- **Root Node:** Represents the user's present financial state.
- **Action Nodes:** Significant financial events or choices (e.g., "Change Career," "Buy Home") that can be added to any branch.
- **Branching:** Allow users to fork any existing branch to create a new scenario, testing different future paths side-by-side.
- **UI Interaction:** Modern, dark-themed, and interactive using `shadcn/ui` components.

### 2.3 Integrated Goal Tracking
- **Fixed Date Goals:** (e.g., Retirement at age 65) Tracking progress across all branches.
- **Action-Based Goals:** Goals tied to specific nodes (e.g., "Pay off Mortgage").
- **Measured Goals:** Automatically triggered based on financial milestones (e.g., "$1M Net Worth").

### 2.4 Outcome Summaries
- **Summary Table:** A detailed, real-time table displayed below the tree that summarizes the financial outcome of the currently selected branch.

## 3. Technical Constraints
- **Framework:** React v19 with TypeScript.
- **Styling:** Tailwind CSS v4.
- **Backend:** Cloudflare Workers and Supabase.
- **Architecture:** Node-based data structure optimized for branching and recursive projection.
