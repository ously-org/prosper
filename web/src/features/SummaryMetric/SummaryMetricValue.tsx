import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryMetricValueProps {
  value: string | number;
  prefix?: string;
  suffix?: string;
  change?: number;
  pulseLabel?: string;
}

export function SummaryMetricValue({
  value,
  prefix = "$",
  suffix = "",
  change,
  pulseLabel = "(30D Pulse)",
}: SummaryMetricValueProps) {
  const isPositive = change !== undefined ? change > 0 : true;

  return (
    <div>
      <h3 className="text-3xl font-mono font-bold tracking-tighter text-foreground">
        {prefix}
        {typeof value === "number" ? value.toLocaleString() : value}
        {suffix}
      </h3>
      {change !== undefined && (
        <div className="flex items-center gap-2 mt-1">
          <span
            className={cn(
              "text-xs font-mono font-medium flex items-center",
              isPositive ? "text-chart-2" : "text-destructive",
            )}
          >
            {isPositive ? (
              <ArrowUp className="w-3.5 h-3.5 mr-0.5" />
            ) : (
              <ArrowDown className="w-3.5 h-3.5 mr-0.5" />
            )}
            {isPositive ? "+" : ""}
            {change}%
          </span>
          <span className="text-muted-foreground text-[11px] font-medium tracking-wide">
            {pulseLabel}
          </span>
        </div>
      )}
    </div>
  );
}
