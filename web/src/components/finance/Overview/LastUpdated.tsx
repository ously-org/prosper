import { useActivities } from "@/hooks/use-finance";
import { format } from "date-fns";

export function LastUpdated() {
  const { data: activities = [], isLoading } = useActivities();
  
  // Sort activities by date to find the latest
  const latestActivity = activities.length > 0 
    ? [...activities].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
    : undefined;

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
