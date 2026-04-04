import { Card, CardContent } from "@/components/ui/card";
import {
  TrajectoryChart,
  type ChartGoalMarker,
} from "@/components/shared/TrajectoryChart/TrajectoryChart";
import { ActionRoadmap } from "@/components/roadmap/ActionRoadmap";

interface PlanDashboardProps {
  goals?: ChartGoalMarker[];
}

export function PlanDashboard({ goals = [] }: PlanDashboardProps) {
  return (
    <Card className="col-span-12 bg-transparent shadow-none border-none ring-0 p-0 outline-none">
      <CardContent className="p-0 grid grid-cols-1 lg:grid-cols-3 gap-6 border-none outline-none">
        <div className="lg:col-span-2 bg-surface-container-low rounded-lg p-6 min-h-[400px] flex flex-col border-none ring-0 outline-none">
          <div className="flex-1">
            <TrajectoryChart goals={goals} />
          </div>
        </div>
        <div className="flex flex-col gap-6 border-none ring-0 outline-none">
          <ActionRoadmap />
        </div>
      </CardContent>
    </Card>
  );
}
