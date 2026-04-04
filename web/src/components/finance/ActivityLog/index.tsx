import { Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useActivities } from "@/hooks/use-finance";
import { OuslyListCard } from "@/components/shared/OuslyListCard";

export function ActivityLog() {
  const { data: activities = [] } = useActivities();

  return (
    <OuslyListCard
      title="RECENT_ACTIVITY_LOG"
      icon={<Terminal className="w-3.5 h-3.5" />}
      footer={
        <Button
          variant="outline"
          className="w-full mt-6 py-2 border border-border/30 text-[10px] font-bold text-muted-foreground uppercase tracking-widest hover:bg-surface-container-highest transition-colors cursor-pointer rounded-sm h-auto"
        >
          View Audit Trail
        </Button>
      }
    >
      {activities.map((item: any, idx: number) => (
        <div
          key={idx}
          className="grid grid-cols-[100px_1fr_auto] items-start gap-3 group"
        >
          <Badge
            variant="outline"
            className={`font-mono text-[11px] justify-center w-full ${
              item.variant === "chart-2"
                ? "text-chart-2 border-chart-2/20 bg-chart-2/5"
                : item.variant === "destructive"
                  ? "text-destructive border-destructive/20 bg-destructive/5"
                  : "text-primary border-primary/20 bg-primary/5"
            }`}
          >
            {item.category}
          </Badge>
          <div className="flex flex-col">
            <p className="text-xs font-medium text-foreground truncate">
              {item.title}
            </p>
            <p className="font-mono text-[10px] text-muted-foreground">
              {item.date}
            </p>
          </div>
          <div
            className={`font-mono text-xs text-right ${item.amount.startsWith("+") ? "text-chart-2" : "text-foreground"}`}
          >
            {item.amount}
          </div>
        </div>
      ))}
    </OuslyListCard>
  );
}
