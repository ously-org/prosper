import { createFileRoute } from "@tanstack/react-router";
import { usePageHeader } from "@/hooks/use-page-header";
import { LastUpdated } from "@/components/finance/Overview/LastUpdated";
import { FinancialGoalToggle } from "@/components/finance/FinancialGoalToggle";
import { ActivityLog } from "@/components/finance/ActivityLog";
import { LiquidCashRatio } from "@/components/finance/LiquidCashRatio/index";
import { CurrentFinanceOverview } from "@/components/finance/Overview";
import { DashboardGrid } from "@/components/shared/layout/DashboardGrid";
import { DashboardGridMain } from "@/components/shared/layout/DashboardGridMain";
import { DashboardGridSidebar } from "@/components/shared/layout/DashboardGridSidebar";
import { DashboardSection } from "@/components/shared/layout/DashboardSection";

export const Route = createFileRoute("/current")({
  component: CurrentFinance,
});

function CurrentFinance() {
  usePageHeader({
    title: "Current Finance",
    description: "Real-time capital overview & allocation architecture.",
    headerChildren: <LastUpdated />,
  });

  return (
    <>
      <DashboardSection>
        <CurrentFinanceOverview />
      </DashboardSection>

      <DashboardGrid className="items-stretch">
        <DashboardGridMain className="relative min-h-0">
          <FinancialGoalToggle />
        </DashboardGridMain>
        <DashboardGridSidebar className="h-full">
          <LiquidCashRatio />
          <ActivityLog />
        </DashboardGridSidebar>
      </DashboardGrid>
    </>
  );
}
