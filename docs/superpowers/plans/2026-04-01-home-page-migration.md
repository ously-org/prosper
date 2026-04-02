# Home Dashboard & Plan Summary Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate top-level metrics to the Home page and introduce a Plan Dashboard for branch selection, trajectory visualization, and upcoming action details.

**Architecture:** We will create a new set of components in `web/src/components/home` to handle the plan-specific dashboard logic. We'll reuse existing `NetWorthPulse` and `AssetAllocation` components on the Home page and remove them from the Current Finance page.

**Tech Stack:** React, TanStack Router, Tailwind CSS, Recharts, Zustand.

---

### Task 1: Setup Home Page Layout

**Files:**
- Modify: `web/src/routes/index.tsx`
- Create: `web/src/components/home/plan-dashboard.tsx` (Skeleton)

- [ ] **Step 1: Update Home Route**
Replace the placeholder content in `web/src/routes/index.tsx` with a proper grid layout using `FinancePageLayout`.

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { FinancePageLayout } from "@/components/page-layout/page-layout";
import { NetWorthPulse } from "@/components/current-finance/net-worth-pulse";
import { AssetAllocation } from "@/components/current-finance/asset-allocation";
import { PlanDashboard } from "@/components/home/plan-dashboard";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <FinancePageLayout
      title="Architecture Center"
      description="Holistic financial trajectory and strategic plan summary."
    >
      <section className="grid grid-cols-12 gap-6 mb-8">
        <NetWorthPulse />
        <AssetAllocation />
      </section>

      <section className="grid grid-cols-12 gap-6 pb-8">
        <PlanDashboard />
      </section>
    </FinancePageLayout>
  );
}
```

- [ ] **Step 2: Create PlanDashboard Skeleton**
Create the initial component file.

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function PlanDashboard() {
  return (
    <Card className="col-span-12 bg-surface-container shadow-sm p-6">
      <CardHeader className="p-0 mb-6 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
          Plan Summary Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface-container-low rounded-lg p-4 min-h-[300px]">
          {/* Trajectory Chart Placeholder */}
          <div className="flex items-center justify-center h-full text-xs font-mono text-muted-foreground">
            PROJECTING GOAL TRAJECTORY...
          </div>
        </div>
        <div className="bg-surface-container-low rounded-lg p-4">
          {/* Upcoming Commit Placeholder */}
          <div className="flex items-center justify-center h-full text-xs font-mono text-muted-foreground uppercase">
            UPCOMING STRATEGY ACTION
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```

---

### Task 2: Migrate Metric Components from Current Finance

**Files:**
- Modify: `web/src/routes/current.tsx`

- [ ] **Step 1: Remove Metrics from Current Finance**
Remove `NetWorthPulse` and `AssetAllocation` from `CurrentFinance` as they are now on the Home page.

```tsx
// web/src/routes/current.tsx
function CurrentFinance() {
  return (
    <FinancePageLayout
      title="Current Finance"
      description="Real-time capital overview & allocation architecture."
      headerChildren={<LastUpdated />}
    >
      {/* Metrics removed from here */}
      <div className="grid grid-cols-12 gap-6 pb-8">
        <AssetBreakdownTable />
        <div className="col-span-12 xl:col-span-4 flex flex-col gap-6">
          <RecentActivityLog />
          <LiquidCashRatio />
        </div>
      </div>
    </FinancePageLayout>
  );
}
```

---

### Task 3: Implement Branch Selection Logic

**Files:**
- Modify: `web/src/components/home/plan-dashboard.tsx`
- Modify: `web/src/store/use-user-store.ts` (if needed for all branches)

- [ ] **Step 1: Add Branch State & Selection UI**
Implement a dropdown to select from the user's available branches.

```tsx
import { useState } from "react";
import { useUserStore } from "@/store/use-user-store";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export function PlanDashboard() {
  const { user } = useUserStore();
  // Assume mock branches for now as per DESIGN.md: "main", "fire-path"
  const branches = user?.pastBranch ? [user.pastBranch, { id: "fire-path", name: "fire-path", commits: [], goalChanges: [] }] : [];
  const [selectedBranchId, setSelectedBranchId] = useState("main");

  return (
    <Card className="col-span-12 bg-surface-container shadow-sm p-6">
      <CardHeader className="p-0 mb-6 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
          Plan Summary Dashboard
        </CardTitle>
        <Select value={selectedBranchId} onValueChange={setSelectedBranchId}>
          <SelectTrigger className="w-[180px] h-8 text-xs font-mono uppercase bg-surface-container-low">
            <SelectValue placeholder="Select Plan" />
          </SelectTrigger>
          <SelectContent className="bg-surface-container">
            {branches.map(b => (
              <SelectItem key={b.id} value={b.id} className="text-xs font-mono uppercase">
                {b.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      {/* ... rest of content */}
    </Card>
  );
}
```

---

### Task 4: Trajectory Chart Implementation

**Files:**
- Create: `web/src/components/home/trajectory-chart.tsx`
- Modify: `web/src/components/home/plan-dashboard.tsx`

- [ ] **Step 1: Create Trajectory Chart Component**
Use `recharts` to render the line chart summarizing goals (represented as a projected net worth or progress line).

```tsx
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface TrajectoryPoint {
  date: string;
  value: number;
}

const MOCK_DATA: TrajectoryPoint[] = [
  { date: "2026", value: 1482903 },
  { date: "2030", value: 1800000 },
  { date: "2035", value: 2400000 },
  { date: "2040", value: 3500000 },
  { date: "2050", value: 5200000 },
];

export function TrajectoryChart() {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={MOCK_DATA}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis 
            dataKey="date" 
            stroke="#888" 
            fontSize={10} 
            tickFormatter={(val) => val} 
          />
          <YAxis 
            stroke="#888" 
            fontSize={10} 
            tickFormatter={(val) => `$${(val / 1000000).toFixed(1)}M`} 
          />
          <Tooltip 
            contentStyle={{ backgroundColor: "#1e1e2e", border: "1px solid #333" }}
            labelStyle={{ color: "#a6adbb", fontSize: "10px", textTransform: "uppercase" }}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#6366f1" 
            strokeWidth={2} 
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
```

---

### Task 5: Upcoming Commit Card Implementation

**Files:**
- Create: `web/src/components/home/upcoming-commit-card.tsx`
- Modify: `web/src/components/home/plan-dashboard.tsx`

- [ ] **Step 1: Create Upcoming Commit Detail Card**
Displays the details of the next action.

```tsx
import { Button } from "@/components/ui/button";

export function UpcomingCommitCard() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <h4 className="text-xs font-mono font-bold text-primary uppercase mb-1">Upcoming Commit</h4>
        <div className="text-lg font-bold tracking-tight mb-2">"Execute Rental Buy"</div>
        <p className="text-xs text-muted-foreground mb-4 font-mono">
          Strategic action deployment scheduled for OCT 2026.
        </p>
        <ul className="text-[11px] font-mono text-muted-foreground space-y-2 mb-6">
          <li>- Withdraw $200,000 Cash</li>
          <li>- Deploy Asset Node: Property A</li>
          <li>- Attach Liability Node: Mortgage A</li>
        </ul>
      </div>
      <Button className="w-full text-xs font-mono uppercase h-9 rounded-sm" size="sm">
        Review Deployment
      </Button>
    </div>
  );
}
```

---

### Task 6: Final Integration

**Files:**
- Modify: `web/src/components/home/plan-dashboard.tsx`

- [ ] **Step 1: Integrate Components**
Replace placeholders with real components.

```tsx
import { TrajectoryChart } from "./trajectory-chart";
import { UpcomingCommitCard } from "./upcoming-commit-card";

// Inside PlanDashboard's CardContent:
<div className="lg:col-span-2 bg-surface-container-low rounded-lg p-4 min-h-[300px]">
  <TrajectoryChart />
</div>
<div className="bg-surface-container-low rounded-lg p-4">
  <UpcomingCommitCard />
</div>
```

---

### Task 7: Validation

- [ ] **Step 1: Run Development Server**
Run: `pnpm dev`
- [ ] **Step 2: Verify Layout**
Open `http://localhost:5173/` and verify the new Home page layout.
- [ ] **Step 3: Verify Current Finance**
Open `http://localhost:5173/current` and verify metrics are gone but table remains.
