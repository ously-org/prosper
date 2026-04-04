import { useState } from "react";
import { AssetBreakdownTable } from "@/components/finance/FinancialTable";
import { GoalTable } from "@/components/finance/GoalTable";
import { OuslyTabCard } from "@/components/shared/OuslyTabCard";

type Mode = "financial" | "goals";

export function FinancialGoalToggle() {
  const [mode, setMode] = useState<Mode>("financial");

  const tabs = [
    { value: "financial", label: "Financial" },
    { value: "goals", label: "Goals" },
  ];

  return (
    <OuslyTabCard
      tabs={tabs}
      activeTab={mode}
      onTabChange={(v) => setMode(v as Mode)}
      className="shadow-sm border border-border/20"
    >
      {mode === "financial" ? <AssetBreakdownTable /> : <GoalTable />}
    </OuslyTabCard>
  );
}
