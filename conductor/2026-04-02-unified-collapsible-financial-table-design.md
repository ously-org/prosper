# Design Spec: Unified Collapsible Financial Table

## Objective
Replace the static `AssetBreakdownTable` with a modular, collapsible, and switchable component that handles **Assets, Liabilities, Income, and Expenses**.

## Implementation
- Create normalized adapters.
- Use shadcn/ui Tabs for category switching.
- Make categories collapsible.