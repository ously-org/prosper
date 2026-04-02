# Design Spec: Home Page Dashboard & Plan Summary Migration

**Date:** 2026-04-01
**Topic:** Home Page Dashboard, Plan Summary, and Branch Selection UI

## 1. Overview
This task involves migrating the high-level financial overview components (`NetWorthPulse`, `AssetAllocation`) from the "Current Finance" page to the Home page. Additionally, we will introduce a "Plan Summary" dashboard on the Home page that allows users to select a financial plan (branch) and visualize its trajectory via a goal summary line chart and an "Upcoming Commit" detail card.

## 2. Goals
- **Surface High-Level Context:** Move the core "Situation" overview to the Home page for immediate visibility.
- **Enable Plan Exploration:** Provide a UI to switch between different financial branches (plans) and see their long-term impact.
- **Reinforce Action-over-Situation:** Highlight the next specific "Upcoming Commit" required to stay on track with the selected plan.

## 3. Architecture & Components

### 3.1 Home Route (`web/src/routes/index.tsx`)
- **Layout:** 12-column grid structure using `FinancePageLayout`.
- **Top Row:**
  - `NetWorthPulse` (col-span-12 lg:col-span-8)
  - `AssetAllocation` (col-span-12 lg:col-span-4)
- **Bottom Section:**
  - `PlanDashboard` (col-span-12)

### 3.2 PlanDashboard Component (`web/src/components/home/plan-dashboard.tsx`)
A new component responsible for plan selection and visualization.
- **Header:**
  - Title: "Plan Architecture"
  - Branch Selector: A `DropdownMenu` or `Select` component populated from the user's available branches.
- **Main Content:**
  - **Left (Trajectory Chart):** A `recharts` `LineChart` showing the projected net worth or goal completion % over time for the selected branch.
  - **Right (Upcoming Action):** An `UpcomingCommitCard` component.

### 3.3 UpcomingCommitCard Component
- Displays the details of the first un-executed commit in the selected branch.
- Includes: Commit message, timestamp, and a summary list of actions (e.g., "Add Asset: Rental Property").
- Action: "Execute Commit" button (visual only for now or integrated with the engine if supported).

## 4. Data Flow
1. **Branch Selection:** The `PlanDashboard` maintains a `selectedBranchId` in local state.
2. **Simulation:** The component uses the `engine.ts` (specifically `simulate(branch, initialState)`) to calculate the state trajectory for the selected branch.
3. **Visualization:** The resulting series of `FinancialState` snapshots are mapped to data points for the `LineChart`.
4. **Commit Detail:** The `Commit` at the current "cursor" of the simulation is identified and passed to the `UpcomingCommitCard`.

## 5. UI/UX (Aesthetics)
- Follow the "Obsidian Architect" theme (dark mode, primary #6366f1, chart-2 #22c55e).
- Use `Card` components from `@/components/ui/card`.
- Maintain the "node-pulse" visual style with 1px/2px borders and monospaced font for values.

## 6. Testing Strategy
- **Visual Regression:** Verify the layout on mobile and desktop viewports.
- **Logic Validation:** Ensure the `LineChart` correctly reflects the changes when switching branches.
- **Unit Tests:** Verify the commit selection logic (identifying the next un-executed commit).

## 7. Future Considerations
- Integration with the real-time simulation engine to allow "what-if" scenarios directly from the Home page.
- Persisting the selected home branch in the user's settings.
