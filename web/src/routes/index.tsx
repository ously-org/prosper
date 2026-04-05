import { createFileRoute } from "@tanstack/react-router";
import { usePageHeader } from "@/hooks/use-page-header";
import { MetricCards } from "@/features/MetricCards/MetricCards";
import { PlanDashboard } from "@/features/PlanDashboard/PlanDashboard";
import { useGoals } from "@/hooks/use-roadmap";
import { useUser } from "@/hooks/use-user";
import { GoalType } from "@/lib/enum";
import { type TimeFixedGoal } from "@/lib/model/Goal.TimeFixed";
import {
  chartData,
  type ChartGoalMarker,
} from "@/components/TrajectoryChart/TrajectoryChart";
import { DashboardSection } from "@/components/layout/DashboardSection";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data: goals = [] } = useGoals();
  const { data: user } = useUser();

  usePageHeader({
    title: "Architecture Center",
    description: "Holistic financial trajectory and strategic plan summary.",
  });

  const chartGoals: ChartGoalMarker[] = goals.map((g) => {
    let year = 2030; // Default fallback

    if (g.type === GoalType.TimeFixed) {
      year = (g as TimeFixedGoal).targetDate.getFullYear();
    } else if (g.name === "Early Retirement" && user?.birthDate) {
      // Logic for Early Retirement: birth year + 45
      year = new Date(user.birthDate).getFullYear() + 45;
    } else if (g.name === "Buy Vacation Home") {
      year = 2032;
    }

    // Find the net worth at that year in chartData
    const dataPoint =
      chartData.find((d) => d.date.startsWith(year.toString())) ||
      chartData[chartData.length - 1];

    return {
      date: `${year}-01-01`,
      netWorth: dataPoint.netWorth,
      label: g.name,
      isAchieved: g.isCompleted,
    };
  });

  return (
    <>
      <DashboardSection>
        <MetricCards />
      </DashboardSection>
      <DashboardSection>
        <PlanDashboard goals={chartGoals} />
      </DashboardSection>
    </>
  );
}
