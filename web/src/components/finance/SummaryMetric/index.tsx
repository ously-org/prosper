import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useFinancialState } from "@/hooks/use-assets";
import { calculateTotalAssets, calculateLiquidAssets } from "@/lib/model/Asset";
import { calculateTotalLiabilities } from "@/lib/model/Liability";
import { calculateNetWorth } from "@/lib/model/FinancialState";
import { MOCK_NET_WORTH_PULSE } from "@/lib/model/mock"; // Keep sparkline for now

// Import standalone components
import { SummaryMetricHeader } from "./SummaryMetricHeader";
import { SummaryMetricValue } from "./SummaryMetricValue";
import { SummaryMetricVisual } from "./SummaryMetricVisual";
import { SummaryMetricNote } from "./SummaryMetricNote";

interface SummaryMetricProps {
  children?: React.ReactNode;
  className?: string;
  borderColor?: string;
}

// --- Main Component ---

export function SummaryMetric({ children, className, borderColor }: SummaryMetricProps) {
  return (
    <Card 
      className={cn(
        "bg-surface-container flex flex-col justify-between border-l-[3px] shadow-sm p-6",
        borderColor || "border-primary",
        className
      )}
    >
      <CardContent className="p-0 flex flex-col gap-4">
        {children}
      </CardContent>
    </Card>
  );
}

// --- Specialized Presets ---

export function NetWorthPulse() {
  const { data: state, isLoading } = useFinancialState();

  if (isLoading || !state) {
    return <SummaryMetric className="lg:col-span-8 animate-pulse bg-surface-container/50 min-h-[140px]" />;
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

export function MetricCards() {
  const { data: state, isLoading } = useFinancialState();

  if (isLoading || !state) {
    return (
      <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <SummaryMetric key={i} className="animate-pulse bg-surface-container/50 min-h-[120px]" />
        ))}
      </div>
    );
  }

  const totalAssets = calculateTotalAssets(state.assets);
  const totalLiabilities = calculateTotalLiabilities(state.liabilities);
  const netWorth = totalAssets - totalLiabilities;

  const metrics = [
    { label: "Total Net Worth", value: netWorth, change: 4.2, borderColor: "border-primary" },
    { label: "Total Assets", value: totalAssets, change: 3.8, borderColor: "border-chart-2" },
    { label: "Total Liabilities", value: totalLiabilities, change: -1.5, borderColor: "border-destructive" },
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

export function LiquidCashRatio() {
  const { data: state, isLoading } = useFinancialState();

  if (isLoading || !state) {
    return <SummaryMetric className="animate-pulse bg-surface-container/50 min-h-[120px]" />;
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
        rightElement={<span className="font-mono text-xs text-primary">{currentRatio}%</span>}
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
