import { useFinancialState } from "@/hooks/use-finance";
import { calculateNetWorth } from "@/lib/model/FinancialState";
import { MOCK_NET_WORTH_PULSE } from "@/lib/model/mock"; // Keep sparkline for now

// Import base component and sub-components
import { SummaryMetric } from "../SummaryMetric";
import { SummaryMetricHeader } from "../SummaryMetric/SummaryMetricHeader";
import { SummaryMetricValue } from "../SummaryMetric/SummaryMetricValue";
import { SummaryMetricVisual } from "../SummaryMetric/SummaryMetricVisual";

export function NetWorthPulse() {
  const { data: state, isLoading } = useFinancialState();

  if (isLoading || !state) {
    return (
      <SummaryMetric className="lg:col-span-8 animate-pulse bg-surface-container/50 min-h-[140px]" />
    );
  }

  const netWorth = calculateNetWorth(state);
  const data = {
    total: netWorth,
    change30D: MOCK_NET_WORTH_PULSE.change30D,
    sparkline: MOCK_NET_WORTH_PULSE.sparkline,
  };

  return (
    <SummaryMetric className="lg:col-span-8">
      <div className="flex justify-between items-start">
        <div>
          <SummaryMetricHeader title="Total Net Worth" />
          <SummaryMetricValue value={data.total} change={data.change30D} />
        </div>
        <SummaryMetricVisual type="sparkline" sparkline={data.sparkline} />
      </div>
    </SummaryMetric>
  );
}
