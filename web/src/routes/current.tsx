import { createFileRoute } from "@tanstack/react-router";
import { usePageHeader } from "@/hooks/use-page-header";
import { LastUpdated } from "@/features/Overview/LastUpdated";
import { FinancialGoalToggle } from "@/features/FinancialGoalToggle/FinancialGoalToggle";
import { ActivityLog } from "@/features/ActivityLog/ActivityLog";
import { CurrentFinanceOverview } from "@/features/Overview/Overview";
import { DashboardGrid } from "@/components/layout/DashboardGrid";
import { DashboardGridMain } from "@/components/layout/DashboardGridMain";
import { DashboardGridSidebar } from "@/components/layout/DashboardGridSidebar";
import { DashboardSection } from "@/components/layout/DashboardSection";

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
          <ActivityLog />
        </DashboardGridSidebar>
      </DashboardGrid>
    </>
  );
}
