import { useFinancialState } from "@/hooks/use-finance";
import { calculateLiquidAssets } from "@/lib/model/Asset";
import { calculateNetWorth } from "@/lib/model/FinancialState";

// Import base component and sub-components
import { SummaryMetric } from "../SummaryMetric/SummaryMetric";
import { SummaryMetricHeader } from "../SummaryMetric/SummaryMetricHeader";
import { SummaryMetricVisual } from "../SummaryMetric/SummaryMetricVisual";
import { SummaryMetricNote } from "../SummaryMetric/SummaryMetricNote";

export function LiquidCashRatio() {
  const { data: state, isLoading } = useFinancialState();

  if (isLoading || !state) {
    return (
      <SummaryMetric className="animate-pulse bg-surface-container/50 min-h-[120px]" />
    );
  }

  const liquidAssets = calculateLiquidAssets(state.assets);
  const netWorth = calculateNetWorth(state);
  const currentRatio = Number(((liquidAssets / netWorth) * 100).toFixed(1));
  const targetRatio = 10;

  const isBelowTarget = currentRatio < targetRatio;

  return (
    <SummaryMetric borderColor="border-primary/10">
      <SummaryMetricHeader
        title="Liquid Cash Ratio"
        rightElement={
          <span className="font-mono text-xs text-primary">
            {currentRatio}%
          </span>
        }
      />
      <SummaryMetricVisual value={currentRatio * 10} />
      <SummaryMetricNote>
        Architecture note: Current liquidity is{" "}
        <span className={isBelowTarget ? "text-destructive" : "text-chart-2"}>
          {isBelowTarget ? "below" : "above"}
        </span>{" "}
        target threshold of {targetRatio}%.{" "}
        {isBelowTarget
          ? "Consider rebalancing from Equities."
          : "Liquidity buffer is sufficient."}
      </SummaryMetricNote>
    </SummaryMetric>
  );
}
