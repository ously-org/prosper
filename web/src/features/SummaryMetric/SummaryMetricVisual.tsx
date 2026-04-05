import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface SummaryMetricVisualProps {
  type?: "progress" | "sparkline";
  value?: number;
  sparkline?: number[];
}

export function SummaryMetricVisual({
  type = "progress",
  value,
  sparkline = [],
}: SummaryMetricVisualProps) {
  if (type === "sparkline") {
    return (
      <div className="w-48 h-12 flex items-end gap-[3px] px-2 self-start mt-2">
        {sparkline.map((val, idx) => (
          <div
            key={idx}
            className={cn(
              "flex-1 rounded-t-[1px]",
              val >= 80
                ? "bg-primary"
                : val >= 60
                  ? "bg-primary/40"
                  : val >= 40
                    ? "bg-primary/30"
                    : "bg-primary/20",
            )}
            style={{ height: `${val}%` }}
          />
        ))}
      </div>
    );
  }

  return <Progress value={value} className="h-1 bg-surface-container-high mt-2" />;
}
