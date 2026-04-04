import * as React from "react";
import { ChartTooltipContent as BaseChartTooltipContent } from "@/components/ui/chart";
import { chartConfig } from "@/components/shared/TrajectoryChart/chart-constants";

interface CustomTooltipProps extends React.ComponentProps<
  typeof BaseChartTooltipContent
> {
  viewMode: string;
}

export const TrajectoryTooltipContent = ({
  viewMode,
  active,
  payload,
  label,
  ...props
}: CustomTooltipProps) => {
  return (
    <BaseChartTooltipContent
      active={active}
      payload={payload}
      label={label}
      {...props}
      labelFormatter={(value) => {
        return new Date(value).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        });
      }}
      indicator="dot"
      formatter={(value, name, item) => {
        // Custom formatter to show total when hovering breakdown
        const totalKey =
          viewMode === "networth"
            ? "netWorth"
            : viewMode === "assets"
              ? "totalAssets"
              : "totalLiabilities";
        const totalValue = item.payload[totalKey];

        const isLastItem =
          viewMode === "assets"
            ? name === "crypto"
            : viewMode === "liabilities"
              ? name === "credit"
              : viewMode === "networth"
                ? name === "untiedDebt"
                : true;

        const displayValue =
          name === "untiedDebt"
            ? `-$${Math.abs(value as number).toLocaleString()}`
            : `$${(value as number).toLocaleString()}`;

        return (
          <div className="flex flex-1 justify-between items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div
                className="h-1.5 w-1.5 shrink-0 rounded-[2px]"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-muted-foreground whitespace-nowrap">
                {chartConfig[name as keyof typeof chartConfig]?.label || name}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-mono font-medium text-foreground tabular-nums">
                {displayValue}
              </span>
              {isLastItem && (
                <span className="text-[11px] font-mono font-bold text-primary mt-2 border-t border-primary/20 pt-2">
                  TOTAL: ${totalValue.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        );
      }}
    />
  );
};
