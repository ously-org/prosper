import { useActivities } from "@/hooks/use-finance";
import { getLatestActivity } from "@/lib/model/Activity";
import { format } from "date-fns";

export function LastUpdated() {
  const { data: activities = [], isLoading } = useActivities();
  const latestActivity = getLatestActivity(activities);

  if (isLoading) {
    return (
      <div className="text-right animate-pulse">
        <div className="h-2 w-16 bg-muted mb-1 ml-auto" />
        <div className="h-3 w-24 bg-muted ml-auto" />
      </div>
    );
  }

  const lastUpdatedStr = latestActivity
    ? format(new Date(latestActivity.date), "yyyy-MM-dd HH:mm:ss 'UTC'")
    : "No Activity";

  return (
    <div className="text-right">
      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
        Last Updated
      </p>
      <p className="font-mono text-xs text-foreground">{lastUpdatedStr}</p>
    </div>
  );
}
