# Domain Component Architecture

All components in this directory MUST follow the **Standalone Domain Component** pattern and be organized into **Domain Families**.

## Core Mandates

1. **Declarative Routes & Layouts:** 
   - Files in `web/src/routes/` and `web/src/layout/` must NOT contain standard HTML tags (`div`, `section`, `h1`, `p`, etc.) or Tailwind layout classes directly.
   - Use layout-specific components from `@/components/shared/layout/` for structure.

2. **Domain Family Organization:**
   - Components must be grouped by domain (Finance, Roadmap, Auth) rather than UI type (Cards, Tables).
   - Each family folder should have a clear purpose and shared data context.

3. **Standalone Component Pattern:**
   - A main component (e.g., `AuthForm`) should handle logic, state, and hooks.
   - Subcomponents (e.g., `AuthFormField`) must be defined as standalone components in their own files or as separate exports within the same family folder, focusing solely on rendering props. 
   - DO NOT use static properties (e.g., `AuthForm.Field`) for subcomponents.

4. **Internal Layout Encapsulation:**
   - Only domain components are permitted to use standard HTML tags for internal styling.
   - These tags must be abstracted away from the public API.

## Directory Structure

- `shared/layout/`: The "Skeleton" (`DashboardGrid`, `DashboardGridMain`, `DashboardGridSidebar`, `DashboardSection`, `DashboardContent`).
- `finance/`: The "Current Health" (`FinancialTable`, `SummaryMetric`, `ActivityLog`, `Overview`).
- `roadmap/`: The "Future Strategy" (`ActionRoadmap`, `PlanDashboard`, `BranchCard`).
- `auth/`: The "Identity Gatekeeper" (`AuthForm`, `AuthFormField`, `Onboarding`).

## Refactoring Progress (April 2026)

- [x] **Layout Families:** `DashboardGrid`, `DashboardSection` moved to `shared/layout`.
- [x] **Finance Family:** 
  - `MetricCards` (Refactored to use centralized `MetricCard`).
  - `LiquidCashRatio` (Refactored to use centralized `MetricCard`).
  - `FinancialTable` (Refactored Asset/Liability tables).
  - `ActivityLog` (Refactored to use `OuslyListCard`) & `Overview` (Refactored to use `OuslyChartCard`) migrated.
- [x] **Roadmap Family:** `PlanDashboard` (Refactored to use `OuslyChartCard`), `ActionRoadmap` (Refactored to use `OuslyListCard`), and `BranchCard` (Refactored to use `OuslyCard`) migrated.
- [x] **Auth Family:** `AuthForm` structure established (Login/Register moved).

## Refactoring Checklist

- [x] Does this route contain raw `div` or `section` tags?
- [x] Is this component a monolith?
- [x] Are subcomponents managing their own data?
- [x] Is the component in the correct Domain Family?
