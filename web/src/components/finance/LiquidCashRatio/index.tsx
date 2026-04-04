import { useFinancialState } from "@/hooks/use-finance";
import { calculateLiquidAssets } from "@/lib/model/Asset";
import { calculateNetWorth } from "@/lib/model/FinancialState";

// Import centralized card components
import { MetricCard, MetricCardProgress, MetricCardNote } from "@/components/shared/OuslyMetricCard";

export function LiquidCashRatio() {
  const { data: state, isLoading } = useFinancialState();

  if (isLoading || !state) {
    return (
      <MetricCard 
        title="Loading..." 
        className="animate-pulse bg-surface-container/50 min-h-[120px]" 
      />
    );
  }

  const liquidAssets = calculateLiquidAssets(state.assets);
  const netWorth = calculateNetWorth(state);
  const currentRatio = Number(((liquidAssets / netWorth) * 100).toFixed(1));
  const targetRatio = 0;

  const isBelowTarget = currentRatio < targetRatio;

  return (
    <MetricCard
      title="Liquid Cash Ratio"
      accent="primary"
      rightElement={
        <span className="font-mono text-xs text-primary">
          {currentRatio}%
        </span>
      }
    >
      <MetricCardProgress value={currentRatio * 10} />
      <MetricCardNote>
        Architecture note: Current liquidity is{" "}
        <span className={isBelowTarget ? "text-destructive" : "text-chart-2"}>
          {isBelowTarget ? "below" : "above"}
        </span>{" "}
        target threshold of {targetRatio}%.{" "}
        {isBelowTarget
          ? "Consider rebalancing from Equities."
          : "Liquidity buffer is sufficient."}
      </MetricCardNote>
    </MetricCard>
  );
}
