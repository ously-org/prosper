import { Terminal } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { type Activity } from "@/lib/model/Activity";
import { useActivities } from "@/hooks/use-finance";


export function ActivityLog() {
  const { data: activities = [] } = useActivities();

  return (
    <Card className="bg-surface-container-high p-5 flex-1 border border-border/20 shadow-sm">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5" /> RECENT_ACTIVITY_LOG
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 space-y-4">
        {activities.map((item: Activity, idx: number) => (
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
        <Button
          variant="outline"
          className="w-full mt-6 py-2 border border-border/30 text-[10px] font-bold text-muted-foreground uppercase tracking-widest hover:bg-surface-container-highest transition-colors cursor-pointer rounded-sm h-auto"
        >
          View Audit Trail
        </Button>
      </CardContent>
    </Card>
  );
}
