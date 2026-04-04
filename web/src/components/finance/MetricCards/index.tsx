import { useFinancialState } from "@/hooks/use-finance";
import { calculateTotalAssets } from "@/lib/model/Asset";
import { calculateTotalLiabilities } from "@/lib/model/Liability";

// Import centralized card components
import { MetricCard, MetricCardValue } from "@/components/shared/OuslyMetricCard";

export function MetricCards() {
  const { data: state, isLoading } = useFinancialState();

  if (isLoading || !state) {
    return (
      <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <MetricCard
            key={i}
            title="Loading..."
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
      accent: "primary" as const,
    },
    {
      label: "Total Assets",
      value: totalAssets,
      change: 3.8,
      accent: "chart-2" as const,
    },
    {
      label: "Total Liabilities",
      value: totalLiabilities,
      change: -1.5,
      accent: "destructive" as const,
    },
  ];

  return (
    <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {metrics.map((metric) => (
        <MetricCard 
          key={metric.label} 
          title={metric.label} 
          accent={metric.accent}
        >
          <MetricCardValue value={metric.value} change={metric.change} />
        </MetricCard>
      ))}
    </div>
  );
}
