import { createFileRoute } from "@tanstack/react-router";
import { usePageHeader } from "@/hooks/use-page-header";
import { useBranches, useGoals } from "@/hooks/use-roadmap";
import { useUser } from "@/hooks/use-user";
import { useFinancialState } from "@/hooks/use-finance";
import {
  TrajectoryChart,
  type ChartGoalMarker,
} from "@/components/shared/TrajectoryChart/TrajectoryChart";
import { deriveBranchMetrics } from "@/lib/finance/summary";
import { type User } from "@/lib/model/User";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { GoalType } from "@/lib/enum";
import { type TimeFixedGoal } from "@/lib/model/Goal.TimeFixed";
import { Target, GitCommit, GitBranch } from "lucide-react";
import { useMemo } from "react";
import { DashboardContent } from "@/components/shared/layout/DashboardContent";
import { DashboardGrid } from "@/components/shared/layout/DashboardGrid";
import { DashboardGridMain } from "@/components/shared/layout/DashboardGridMain";
import { DashboardGridSidebar } from "@/components/shared/layout/DashboardGridSidebar";
import { DashboardSection } from "@/components/shared/layout/DashboardSection";

export const Route = createFileRoute("/branches/$name")({
  component: PlanSummary,
});

function PlanSummary() {
  const { name } = Route.useParams();
  const { data: branches, isLoading: branchesLoading } = useBranches();
  const { data: userData, isLoading: userLoading } = useUser();
  const { data: goals, isLoading: goalsLoading } = useGoals();
  const { data: financialState, isLoading: stateLoading } = useFinancialState();

  const branch = branches?.find((b) => b.name === name);

  usePageHeader({
    title: branch ? `Branch: ${branch.name}` : "Branch Details",
    description: "Detailed simulation results and goal analysis for this scenario.",
  });
  const isLoading =
    branchesLoading || userLoading || goalsLoading || stateLoading;

  const metrics = useMemo(() => {
    if (!branch || !userData || !financialState) return null;
    const user: User = {
      ...userData,
      initialFinancialState: financialState,
      initialGoals: goals || [],
      pastBranch: branch,
    } as User;
    return deriveBranchMetrics(branch, user, goals || []);
  }, [branch, userData, financialState, goals]);

  const chartGoals: ChartGoalMarker[] = useMemo(() => {
    if (!metrics || !userData) return [];
    return metrics.goals.map((g) => {
      let year = 2030;
      if (g.type === GoalType.TimeFixed) {
        year = (g as TimeFixedGoal).targetDate.getFullYear();
      } else if (
        g.name.toLowerCase().includes("retirement") &&
        userData.birthDate
      ) {
        year = new Date(userData.birthDate).getFullYear() + 65;
      }
      const snapshot =
        metrics.snapshots.find((s) => s.year === year) ||
        metrics.snapshots[metrics.snapshots.length - 1];
      return {
        date: `${snapshot.year}-01-01`,
        netWorth: snapshot.netWorth,
        label: g.name,
        isAchieved: metrics.achievedGoalIds.includes(g.id),
      };
    });
  }, [metrics, userData]);

  if (isLoading)
    return (
      <DashboardContent className="text-center animate-pulse py-12">
        <p className="text-muted-foreground font-mono uppercase tracking-widest text-xs">
          Loading branch details...
        </p>
      </DashboardContent>
    );
  if (!branch || !metrics)
    return (
      <DashboardContent className="text-center py-12">
        <p className="text-muted-foreground font-mono uppercase tracking-widest text-xs">
          Branch not found.
        </p>
      </DashboardContent>
    );

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  return (
    <DashboardContent className="pb-12">
      {/* Top Section: Chart */}
      <DashboardSection>
        <div className="h-[450px]">
          <TrajectoryChart
            layout="split"
            data={metrics.snapshots.map((s) => ({
              date: `${s.year}-01-01`,
              netWorth: s.netWorth,
              equity: s.netWorth,
              untiedDebt: 0,
              cash: s.netWorth * 0.1,
              stock: s.netWorth * 0.6,
              property: s.netWorth * 0.3,
              crypto: 0,
              totalAssets: s.netWorth,
              totalLiabilities: 0,
            }))}
            goals={chartGoals}
          />
        </div>
      </DashboardSection>

      {/* Bottom Section: Branch History & Modifications */}
      <DashboardGrid>
        {/* Left Side: Commits Log */}
        <DashboardGridMain className="xl:col-span-6 gap-6">
          <div className="flex items-center justify-between border-b border-border/10 pb-2">
            <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
              <GitCommit className="w-4 h-4 text-primary" /> Branch Commits
            </h3>
          </div>

          <div className="space-y-4">
            {branch.commits.length === 0 ? (
              <div className="text-center p-8 bg-surface-container/30 border border-dashed border-border/20 rounded-lg text-muted-foreground text-xs font-mono uppercase">
                No commits yet.
              </div>
            ) : (
              branch.commits.map((commit, idx) => (
                <Card
                  key={commit.id}
                  className="bg-surface-container border-none shadow-none relative overflow-hidden"
                >
                  {idx !== branch.commits.length - 1 && (
                    <div className="absolute left-[39px] top-12 bottom-[-16px] w-[2px] bg-border/20 z-0" />
                  )}
                  <CardContent className="p-4 flex gap-4 relative z-10 w-full">
                    <div className="w-12 shrink-0 flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-surface-container-highest border border-border/20 flex items-center justify-center p-0.5 overflow-hidden ring-2 ring-background">
                        {commit.author?.avatar ? (
                          <img
                            src={commit.author.avatar}
                            alt="Avatar"
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <GitCommit className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <h4 className="font-bold font-mono text-sm leading-tight truncate">
                          {commit.message}
                        </h4>
                        <span className="text-[10px] font-mono text-muted-foreground shrink-0 tabular-nums">
                          {new Date(commit.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge
                          variant="outline"
                          className="text-[9px] font-mono uppercase bg-surface-container-high border-border/10"
                        >
                          {commit.actions.length} action(s)
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="text-[9px] font-mono bg-surface-container-low text-muted-foreground font-normal border-border/0"
                        >
                          {commit.id.substring(0, 7)}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </DashboardGridMain>

        {/* Right Side: Goal Modifications */}
        <DashboardGridSidebar className="xl:col-span-6 gap-6">
          <div className="flex items-center justify-between border-b border-border/10 pb-2">
            <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-chart-2" /> Goal
              Modifications
            </h3>
          </div>

          <div className="space-y-4">
            {branch.goalChanges.length === 0 ? (
              <div className="text-center p-8 bg-surface-container/30 border border-dashed border-border/20 rounded-lg text-muted-foreground text-xs font-mono uppercase">
                No goal modifications.
              </div>
            ) : (
              branch.goalChanges.map((change, idx) => {
                const originalGoal = goals?.find((g) => g.id === change.id);
                const isAchieved = metrics.achievedGoalIds.includes(
                  change.id,
                );

                return (
                  <Card
                    key={idx}
                    className="bg-surface-container border-none shadow-none"
                  >
                    <CardContent className="p-4 flex gap-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${isAchieved ? "bg-chart-2/20 text-chart-2" : "bg-surface-container-highest text-muted-foreground"}`}
                      >
                        <Target className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-0.5">
                              Overrides:
                            </span>
                            <h4 className="font-bold font-mono text-xs">
                              {originalGoal?.name || change.id}
                            </h4>
                          </div>
                          {isAchieved && (
                            <Badge
                              variant="outline"
                              className="text-[9px] font-mono text-chart-2 border-chart-2/30 bg-chart-2/5"
                            >
                              Achieved
                            </Badge>
                          )}
                        </div>

                        <div className="space-y-2">
                          {change.nameTo !== undefined && (
                            <div className="flex items-center text-[10px] font-mono text-muted-foreground">
                              <span className="w-16">Name:</span>
                              <span className="line-through opacity-50 mr-2">
                                {originalGoal?.name}
                              </span>
                              <span className="text-primary">
                                {change.nameTo}
                              </span>
                            </div>
                          )}
                          {(change as any).targetDateTo !== undefined && (
                            <div className="flex items-center text-[10px] font-mono text-muted-foreground">
                              <span className="w-16">Target:</span>
                              <span className="text-primary">
                                {new Date(
                                  (change as any).targetDateTo,
                                ).getFullYear()}
                              </span>
                            </div>
                          )}
                          {(change as any).targetValueBy !== undefined && (
                            <div className="flex items-center text-[10px] font-mono text-muted-foreground">
                              <span className="w-16">Amount:</span>
                              <span className="text-chart-2">
                                +
                                {currencyFormatter.format(
                                  (change as any).targetValueBy,
                                )}
                              </span>
                            </div>
                          )}
                          {change.isCompletedTo !== undefined && (
                            <div className="flex items-center text-[10px] font-mono text-muted-foreground">
                              <span className="w-16">Status:</span>
                              <span className="text-chart-2">
                                {change.isCompletedTo
                                  ? "Completed"
                                  : "Pending"}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </DashboardGridSidebar>
      </DashboardGrid>
    </DashboardContent>
  );
}
