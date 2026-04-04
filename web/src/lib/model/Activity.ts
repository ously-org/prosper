export interface Activity {
  category: string;
  title: string;
  date: string;
  amount: string;
  variant:
    | "chart-2"
    | "destructive"
    | "primary"
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}
export function getLatestActivity(
  activities: Activity[],
): Activity | undefined {
  if (activities.length === 0) return undefined;
  return [...activities].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )[0];
}
