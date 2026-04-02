# Design Spec: Negative Net Worth Area Chart

Update the "Net Worth" mode of the Projection Architecture chart on the Home page to show positive equity and negative untied debt as separate stacked areas.

## 1. Problem Statement
The current Net Worth chart shows a single positive area. For users with debt not tied to equity (e.g., credit cards, personal loans), it's more intuitive to see this "untied debt" as a negative area below the zero line, while assets and tied debt (e.g., property minus mortgage) are shown as positive "equity" above the line.

## 2. Proposed Changes

### 2.1. Data Transformation (`src/components/home/trajectory-chart.tsx`)
- Modify `generateMockData` to categorize liabilities into "tied" (mortgage) and "untied" (personal loan, credit card).
- Calculate new fields for each data point:
    - `equity`: `totalAssets` - `tiedLiabilities` (always positive or zero).
    - `untiedDebt`: -`untiedLiabilities` (negative value).
    - `netWorth`: `equity` + `untiedDebt` (the existing net worth calculation).

### 2.2. Chart Configuration
- Add `equity` and `untiedDebt` to `chartConfig`:
    - `equity`: Label "Equity", Color `var(--chart-1)`.
    - `untiedDebt`: Label "Untied Debt", Color `var(--destructive)`.

### 2.3. Component Rendering
- In `TrajectoryChart`, when `viewMode === "networth"`:
    - Replace the single `netWorth` Area with:
        - `<Area dataKey="equity" stackId="networth" ... />` (positive area).
        - `<Area dataKey="untiedDebt" stackId="networth" ... />` (negative area).
    - Recharts automatically handles negative values in stacked areas by plotting them below the x-axis.

### 2.4. Tooltip & Formatting
- Update the custom `ChartTooltip` formatter:
    - Ensure negative values for `untiedDebt` are displayed as positive strings with a "Debt" label or clearly marked negative (e.g., `-$10,000`).
    - Keep the "TOTAL" line as the calculated `netWorth`.

## 3. Success Criteria
- The "Net Worth" view mode clearly shows a positive area for equity and a negative area for untied debt.
- The x-axis remains at the zero line, or the chart adjusts its domain to include negative values.
- Tooltips correctly reflect the breakdown and the final Net Worth.

## 4. Testing Plan
- Verify that the chart renders correctly when untied debt exists.
- Verify that the "Assets" and "Liabilities" view modes are unaffected.
- Check that the total Net Worth line (if added) or tooltip total matches the sum of equity and untied debt.
