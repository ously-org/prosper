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
