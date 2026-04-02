import { ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MetricData {
  label: string;
  value: number;
  change: number;
  pulse: string;
  borderColor: string;
}

const MOCK_METRICS: MetricData[] = [
  {
    label: "Total Net Worth",
    value: 1482903.42,
    change: 4.2,
    pulse: "30D Pulse",
    borderColor: "border-primary",
  },
  {
    label: "Total Assets",
    value: 1682903.42,
    change: 3.8,
    pulse: "30D Pulse",
    borderColor: "border-chart-2",
  },
  {
    label: "Total Liabilities",
    value: 200000.00,
    change: -1.5,
    pulse: "30D Pulse",
    borderColor: "border-destructive",
  },
];

export function MetricCards() {
  return (
    <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {MOCK_METRICS.map((metric) => {
        const isPositive = metric.change > 0;
        const isLiability = metric.label.toLowerCase().includes("liabilities");
        // For liabilities, a negative change is "good" (green)
        const isGoodChange = isLiability ? !isPositive : isPositive;

        return (
          <Card 
            key={metric.label} 
            className={`bg-surface-container flex flex-col justify-between border-l-[3px] ${metric.borderColor} shadow-none ring-0 p-6`}
          >
            <CardContent className="p-0">
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest block mb-1">
                {metric.label}
              </span>
              <h3 className="text-3xl font-mono font-bold tracking-tighter text-foreground">
                ${metric.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`${isGoodChange ? "text-chart-2" : "text-destructive"} text-xs font-mono font-medium flex items-center`}
                >
                  {isPositive ? (
                    <ArrowUp className="w-3.5 h-3.5 mr-0.5" />
                  ) : (
                    <ArrowDown className="w-3.5 h-3.5 mr-0.5" />
                  )}
                  {isPositive ? "+" : ""}
                  {metric.change}%
                </span>
                <span className="text-muted-foreground text-[11px] font-medium tracking-wide">
                  ({metric.pulse})
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
