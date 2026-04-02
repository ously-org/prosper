import { createFileRoute } from "@tanstack/react-router";
import { FinancePageLayout } from "@/components/page-layout/page-layout";
import { useBranches, useUser, useGoals, useFinancialState } from "@/hooks/use-assets";
import { TrajectoryChart, type ChartGoalMarker } from "@/components/home/trajectory-chart";
import { deriveBranchMetrics } from "@/lib/finance/summary";
import { type User } from "@/lib/model/User";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GoalType } from "@/lib/enum";
import { type TimeFixedGoal } from "@/lib/model/Goal.TimeFixed";
import { type MeasurableGoal } from "@/lib/model/Goal.Measurable";
import { CheckCircle2, XCircle, Clock, Target, Flag } from "lucide-react";
import { useMemo } from "react";

export const Route = createFileRoute("/branches/$name")({
  component: PlanSummary,
});

function PlanSummary() {
  const { name } = Route.useParams();
  const { data: branches, isLoading: branchesLoading } = useBranches();
  const { data: userData, isLoading: userLoading } = useUser();
  const { data: goals, isLoading: goalsLoading } = useGoals();
  const { data: financialState, isLoading: stateLoading } = useFinancialState();

  const branch = branches?.find(b => b.name === name);
  const isLoading = branchesLoading || userLoading || goalsLoading || stateLoading;

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
      } else if (g.name.toLowerCase().includes("retirement") && userData.birthDate) {
        year = new Date(userData.birthDate).getFullYear() + 65;
      }
      const snapshot = metrics.snapshots.find((s) => s.year === year) || metrics.snapshots[metrics.snapshots.length - 1];
      return {
        date: `${snapshot.year}-01-01`,
        netWorth: snapshot.netWorth,
        label: g.name,
        isAchieved: metrics.achievedGoalIds.includes(g.id),
      };
    });
  }, [metrics, userData]);

  if (isLoading) return <div className="p-8 text-center animate-pulse">Loading branch details...</div>;
  if (!branch || !metrics) return <div className="p-8 text-center">Branch not found.</div>;

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD", maximumFractionDigits: 0
  });

  return (
    <FinancePageLayout
      title={`Branch: ${branch.name}`}
      description="Detailed simulation results and goal analysis for this scenario."
    >
      <div className="space-y-8 pb-12">
        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-surface-container border-none shadow-none p-6 border-l-[3px] border-primary">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-1">Retirement Net Worth</span>
            <h2 className="text-3xl font-mono font-bold">{currencyFormatter.format(metrics.retirementNetWorth)}</h2>
          </Card>
          <Card className="bg-surface-container border-none shadow-none p-6 border-l-[3px] border-chart-2">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-1">Terminal Net Worth</span>
            <h2 className="text-3xl font-mono font-bold">{currencyFormatter.format(metrics.terminalNetWorth)}</h2>
          </Card>
          <Card className="bg-surface-container border-none shadow-none p-6 border-l-[3px] border-destructive">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-1">Cashflow Status</span>
            <div className="flex items-center gap-2">
              <h2 className={`text-3xl font-mono font-bold ${metrics.isCashflowHealthy ? "text-chart-2" : "text-destructive"}`}>
                {metrics.isCashflowHealthy ? "HEALTHY" : "ALERT"}
              </h2>
            </div>
          </Card>
        </div>

        {/* Main Chart */}
        <Card className="bg-surface-container-low border-none shadow-none p-6">
          <CardHeader className="p-0 mb-6">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Projection Architecture</CardTitle>
          </CardHeader>
          <div className="h-[400px]">
            <TrajectoryChart 
              data={metrics.snapshots.map(s => ({
                date: `${s.year}-01-01`,
                netWorth: s.netWorth,
                equity: s.netWorth,
                untiedDebt: 0,
              }))} 
              goals={chartGoals}
            />
          </div>
        </Card>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-surface-container border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-wider">Goal Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {metrics.goals.map((goal) => {
                const isAchieved = metrics.achievedGoalIds.includes(goal.id);
                return (
                  <div key={goal.id} className="flex items-start gap-4 p-4 rounded-lg bg-surface-container-high/50 border border-border/5">
                    {isAchieved ? (
                      <CheckCircle2 className="w-6 h-6 text-chart-2 shrink-0 mt-1" />
                    ) : (
                      <XCircle className="w-6 h-6 text-destructive shrink-0 mt-1" />
                    )}
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold font-mono uppercase text-sm">{goal.name}</h4>
                        <Badge variant="outline" className="text-[9px] font-mono uppercase px-1.5 py-0">
                          {goal.type.replace("_", " ")}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{goal.description}</p>
                      
                      {/* Detailed info based on type */}
                      <div className="pt-2 flex flex-wrap gap-4">
                        {goal.type === GoalType.TimeFixed && (
                          <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground">
                            <Clock className="w-3.5 h-3.5" />
                            TARGET: {(goal as TimeFixedGoal).targetDate.getFullYear()}
                          </div>
                        )}
                        {goal.type === GoalType.Measurable && (
                          <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground">
                            <Target className="w-3.5 h-3.5" />
                            TARGET: {currencyFormatter.format((goal as MeasurableGoal).targetValue)}
                          </div>
                        )}
                        {goal.type === GoalType.Commitment && (
                          <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground">
                            <Flag className="w-3.5 h-3.5" />
                            STATUS: {goal.isCompleted ? "COMMITTED" : "PENDING"}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="bg-surface-container border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-wider">Branch Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-xs text-muted-foreground font-mono">
                  This branch contains {branch.commits.length} commits and {branch.goalChanges.length} goal modifications from the base plan.
                </p>
                {branch.goalChanges.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Active Overrides</h5>
                    <div className="space-y-2">
                      {branch.goalChanges.map((change, idx) => (
                        <div key={idx} className="p-2 rounded bg-surface-container-low border border-border/5 text-[11px] font-mono">
                          <span className="text-primary">MODIFIED:</span> {change.nameTo || metrics.goals.find(g => g.id === change.id)?.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </FinancePageLayout>
  );
}
