import {
  TrajectoryChart,
  type ChartGoalMarker,
} from "@/components/shared/TrajectoryChart/TrajectoryChart";
import { ActionRoadmap } from "@/components/roadmap/ActionRoadmap";
import { OuslyChartCard } from "@/components/shared/OuslyChartCard";

interface PlanDashboardProps {
  goals?: ChartGoalMarker[];
}

export function PlanDashboard({ goals = [] }: PlanDashboardProps) {
  return (
    <div className="col-span-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <OuslyChartCard
        title="Projection Architecture"
        description="Main Branch simulation results"
        className="lg:col-span-2 bg-surface-container-low"
      >
        <TrajectoryChart goals={goals} />
      </OuslyChartCard>
      <div className="flex flex-col gap-6">
        <ActionRoadmap />
      </div>
    </div>
  );
}
