import { createFileRoute } from "@tanstack/react-router";
import { FinancePageLayout } from "@/components/page-layout/page-layout";
import { LastUpdated } from "@/components/current-finance/last-updated";
import { AssetBreakdownTable } from "@/components/current-finance/asset-breakdown-table";
import { RecentActivityLog } from "@/components/current-finance/recent-activity-log";
import { LiquidCashRatio } from "@/components/current-finance/liquid-cash-ratio";
import { CurrentFinanceOverview } from "@/components/current-finance/current-finance-overview";

export const Route = createFileRoute("/current")({
  component: CurrentFinance,
});

function CurrentFinance() {
  return (
    <FinancePageLayout
      title="Current Finance"
      description="Real-time capital overview & allocation architecture."
      headerChildren={<LastUpdated />}
    >
      <section className="mb-8">
        <CurrentFinanceOverview />
      </section>

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
