import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/current-finance/header";
import { NetWorthPulse } from "@/components/current-finance/net-worth-pulse";
import { AssetAllocation } from "@/components/current-finance/asset-allocation";
import { AssetBreakdownTable } from "@/components/current-finance/asset-breakdown-table";
import { RecentActivityLog } from "@/components/current-finance/recent-activity-log";
import { LiquidCashRatio } from "@/components/current-finance/liquid-cash-ratio";
import { SystemAlertsFooter } from "@/components/current-finance/system-alerts-footer";

export const Route = createFileRoute("/current")({
  component: CurrentFinance,
});

function CurrentFinance() {
  return (
    <div className="flex-1">
      <Header />

      <section className="grid grid-cols-12 gap-6 mb-8">
        <NetWorthPulse />
        <AssetAllocation />
      </section>

      <div className="grid grid-cols-12 gap-6">
        <AssetBreakdownTable />
        <div className="col-span-12 xl:col-span-4 flex flex-col gap-6">
          <RecentActivityLog />
          <LiquidCashRatio />
        </div>
      </div>

      <SystemAlertsFooter />
    </div>
  );
}
