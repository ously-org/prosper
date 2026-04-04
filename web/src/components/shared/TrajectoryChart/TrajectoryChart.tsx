"use client";

import { chartData, type ChartGoalMarker } from "@/components/shared/TrajectoryChart/chart-constants";
import { FullTrajectoryChart } from "@/components/shared/TrajectoryChart/FullTrajectoryChart";
import { SplitTrajectoryChart } from "@/components/shared/TrajectoryChart/SplitTrajectoryChart";

export { chartData, type ChartGoalMarker };

interface TrajectoryChartProps {
  data?: any[];
  goals?: ChartGoalMarker[];
  isMini?: boolean;
  syncId?: string;
  layout?: "full" | "split";
}

export function TrajectoryChart({
  layout = "full",
  ...props
}: TrajectoryChartProps) {
  if (layout === "split") {
    return <SplitTrajectoryChart {...props} />;
  }

  return <FullTrajectoryChart {...props} />;
}
