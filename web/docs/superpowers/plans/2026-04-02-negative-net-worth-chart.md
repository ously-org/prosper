# Negative Net Worth Area Chart Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the "Net Worth" mode of the Trajectory Chart to show positive equity and negative untied debt as separate stacked areas.

**Architecture:** Modify the mock data generator to categorize liabilities into tied (mortgage) and untied (loans/credit). Use Recharts' native support for stacking positive and negative values from the zero line by assigning them the same `stackId`.

**Tech Stack:** React, Recharts, Tailwind CSS.

---

### Task 1: Data Model & Configuration Update

**Files:**
- Modify: `src/components/home/trajectory-chart.tsx`

- [ ] **Step 1: Update `generateMockData` to include `equity` and `untiedDebt`**

Modify the loop in `generateMockData` to calculate these new fields:
```typescript
    const totalAssets = cash + stock + property + crypto;
    const tiedLiabilities = mortgage; // Mortgage is tied to property
    const untiedLiabilities = loan + credit;
    
    const equity = totalAssets - tiedLiabilities;
    const untiedDebt = -untiedLiabilities; // Negative for chart stacking
    const netWorth = totalAssets - (tiedLiabilities + untiedLiabilities);

    data.push({
      date: date.toISOString().split('T')[0],
      // Assets
      cash: Math.floor(cash),
      stock: Math.floor(stock),
      property: Math.floor(property),
      crypto: Math.floor(crypto),
      totalAssets: Math.floor(totalAssets),
      // Liabilities
      mortgage: Math.floor(mortgage),
      loan: Math.floor(loan),
      credit: Math.floor(credit),
      totalLiabilities: Math.floor(tiedLiabilities + untiedLiabilities),
      // New fields for Net Worth breakdown
      equity: Math.floor(equity),
      untiedDebt: Math.floor(untiedDebt),
      // Summary
      netWorth: Math.floor(netWorth),
    });
```

- [ ] **Step 2: Update `chartConfig` to include `equity` and `untiedDebt` definitions**

```typescript
const chartConfig = {
  netWorth: { label: "Net Worth", color: "var(--chart-1)" },
  equity: { label: "Equity", color: "var(--chart-1)" },
  untiedDebt: { label: "Untied Debt", color: "var(--destructive)" },
  // ... existing config
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/home/trajectory-chart.tsx
git commit -m "feat: update data model for negative net worth chart"
```

---

### Task 2: Chart Rendering & Tooltip Update

**Files:**
- Modify: `src/components/home/trajectory-chart.tsx`

- [ ] **Step 1: Update `AreaChart` to render `equity` and `untiedDebt` in `networth` mode**

Replace the single `netWorth` Area with two stacked areas:
```tsx
            {viewMode === "networth" && (
              <>
                <Area
                  dataKey="equity"
                  type="natural"
                  fill="url(#fillequity)"
                  stroke="var(--color-equity)"
                  stackId="networth"
                />
                <Area
                  dataKey="untiedDebt"
                  type="natural"
                  fill="url(#filluntiedDebt)"
                  stroke="var(--color-untiedDebt)"
                  stackId="networth"
                />
              </>
            )}
```

- [ ] **Step 2: Update Tooltip Formatter to handle `equity` and `untiedDebt`**

Adjust the custom formatter to clarify these fields:
```tsx
                  formatter={(value, name, item) => {
                    const totalKey = viewMode === "assets" ? "totalAssets" : viewMode === "liabilities" ? "totalLiabilities" : "netWorth";
                    const totalValue = item.payload[totalKey];
                    
                    // Show absolute value for untiedDebt in tooltip for readability but keep negative sign if preferred
                    const displayValue = name === "untiedDebt" ? `-$${Math.abs(value as number).toLocaleString()}` : `$${(value as number).toLocaleString()}`;

                    return (
                      <div className="flex flex-1 justify-between items-center gap-4">
                        <div className="flex items-center gap-1.5">
                          <div 
                            className="h-1.5 w-1.5 shrink-0 rounded-[2px]" 
                            style={{ backgroundColor: item.color }} 
                          />
                          <span className="text-muted-foreground whitespace-nowrap">
                            {chartConfig[name as keyof typeof chartConfig]?.label || name}
                          </span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="font-mono font-medium text-foreground tabular-nums">
                            {displayValue}
                          </span>
                          {/* ... rest of total logic */}
                        </div>
                      </div>
                    )
                  }}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/home/trajectory-chart.tsx
git commit -m "feat: implement negative area stacking for net worth chart"
```

---

### Task 3: Verification & Cleanup

- [ ] **Step 1: Manual Verification**
- Run the app and navigate to Home.
- Switch to "Net Worth" mode.
- Verify that there is a positive area (Equity) and a negative area (Untied Debt).
- Hover over the chart and verify tooltip values.

- [ ] **Step 2: Final Commit**

```bash
git commit --allow-empty -m "chore: verify negative net worth chart implementation"
```
