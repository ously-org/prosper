import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TRAJECTORY_VIEW_MODES, TRAJECTORY_TIME_RANGES } from "@/lib/const";

import { TrajectorySelect } from "@/components/Select";

interface ChartHeaderProps {
  viewMode: string;
  setViewMode: (val: string) => void;
  timeRange: string;
  setTimeRange: (val: string) => void;
}

export const ChartHeader = ({
  viewMode,
  setViewMode,
  timeRange,
  setTimeRange,
}: ChartHeaderProps) => {
  const currentViewModeLabel =
    TRAJECTORY_VIEW_MODES.find((m) => m.value === viewMode)?.label || viewMode;

  return (
    <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row p-0 mb-4 border-none outline-none">
      <div className="grid flex-1 gap-1">
        <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          Projection Architecture (Main Branch)
        </CardTitle>
        <CardDescription className="text-[10px] font-mono capitalize">
          Trajectory simulation for {currentViewModeLabel}
        </CardDescription>
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <TrajectorySelect
          value={viewMode}
          onValueChange={setViewMode}
          items={TRAJECTORY_VIEW_MODES}
          placeholder="Net Worth"
          ariaLabel="Select view mode"
          className="w-[140px]"
        />

        <TrajectorySelect
          value={timeRange}
          onValueChange={setTimeRange}
          items={TRAJECTORY_TIME_RANGES}
          ariaLabel="Select timeframe"
          className="w-[160px]"
        />
      </div>
    </CardHeader>
  );
};
