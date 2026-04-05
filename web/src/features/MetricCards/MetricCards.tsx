import { useFinancialState } from "@/hooks/use-finance";
import { calculateTotalAssets } from "@/lib/model/Asset";
import { calculateTotalLiabilities } from "@/lib/model/Liability";

// Import base component and sub-components
import { SummaryMetric } from "../SummaryMetric/SummaryMetric";
import { SummaryMetricHeader } from "../SummaryMetric/SummaryMetricHeader";
import { SummaryMetricValue } from "../SummaryMetric/SummaryMetricValue";

export function MetricCards() {
  const { data: state, isLoading } = useFinancialState();

  if (isLoading || !state) {
    return (
      <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <SummaryMetric
            key={i}
            className="animate-pulse bg-surface-container/50 min-h-[120px]"
          />
        ))}
      </div>
    );
  }

  const totalAssets = calculateTotalAssets(state.assets);
  const totalLiabilities = calculateTotalLiabilities(state.liabilities);
  const netWorth = totalAssets - totalLiabilities;

  const metrics = [
    {
      label: "Total Net Worth",
      value: netWorth,
      change: 4.2,
      borderColor: "border-primary",
    },
    {
      label: "Total Assets",
      value: totalAssets,
      change: 3.8,
      borderColor: "border-chart-2",
    },
    {
      label: "Total Liabilities",
      value: totalLiabilities,
      change: -1.5,
      borderColor: "border-destructive",
    },
  ];

  return (
    <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {metrics.map((metric) => (
        <SummaryMetric key={metric.label} borderColor={metric.borderColor}>
          <SummaryMetricHeader title={metric.label} />
          <SummaryMetricValue value={metric.value} change={metric.change} />
        </SummaryMetric>
      ))}
    </div>
  );
}
