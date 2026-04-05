import { useState } from "react";
import { AssetBreakdownTable } from "@/features/FinancialTable/FinancialTable";
import { GoalTable } from "@/features/GoalTable/GoalTable";
import { Card } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type Mode = "financial" | "goals";

export function FinancialGoalToggle() {
  const [mode, setMode] = useState<Mode>("financial");

  return (
    <Card className="h-full bg-surface-container overflow-hidden flex flex-col shadow-sm border border-border/20">
      {/* Top-level segmented control */}
      <ToggleGroup
        type="single"
        value={mode}
        onValueChange={(v) => v && setMode(v as Mode)}
        variant="line"
        size="sm"
        className="mb-4 shrink-0 justify-start px-2 border-b border-border/10"
      >
        <ToggleGroupItem value="financial" className="px-4">
          Financial
        </ToggleGroupItem>
        <ToggleGroupItem value="goals" className="px-4">
          Goals
        </ToggleGroupItem>
      </ToggleGroup>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {mode === "financial" ? <AssetBreakdownTable /> : <GoalTable />}
      </div>
    </Card>
  );
}
