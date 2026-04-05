import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  TrajectoryChart,
  type ChartGoalMarker,
} from "@/components/TrajectoryChart/TrajectoryChart";
import { deriveBranchMetrics } from "@/lib/finance/summary";
import type { Branch } from "@/lib/model/Branch";
import type { User } from "@/lib/model/User";
import type { Goal } from "@/lib/model/Goal.Base";
import { GoalType } from "@/lib/enum";
import { type TimeFixedGoal } from "@/lib/model/Goal.TimeFixed";
import { type MeasurableGoal } from "@/lib/model/Goal.Measurable";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { useMemo } from "react";

interface BranchCardProps {
  branch: Branch;
  user: User;
  initialGoals: Goal[];
  syncId?: string;
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

// --- Compound Subcomponents ---

function BranchCardInfo({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-[4] flex flex-col justify-between border-r border-border/10 pr-6">
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

function BranchCardHeader({ name, isPrimary }: { name: string; isPrimary: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-bold tracking-tight text-foreground uppercase font-mono">
        {name}
      </h3>
      {isPrimary && (
        <Badge
          variant="secondary"
          className="bg-primary/20 text-primary border-none text-[10px] font-mono uppercase tracking-widest"
        >
          Primary
        </Badge>
      )}
    </div>
  );
}

function BranchCardStats({ retirementNw, terminalNw }: { retirementNw: number; terminalNw: number }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-1">
          Retire NW
        </span>
        <span className="text-xl font-mono font-bold text-foreground">
          {currencyFormatter.format(retirementNw)}
        </span>
      </div>
      <div>
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-1">
          Terminal NW
        </span>
        <span className="text-xl font-mono font-bold text-foreground">
          {currencyFormatter.format(terminalNw)}
        </span>
      </div>
    </div>
  );
}

function BranchCardGoals({ goals, achievedGoalIds }: { goals: Goal[]; achievedGoalIds: string[] }) {
  return (
    <div className="space-y-2">
      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">
        Goal Achievement
      </span>
      <div className="flex flex-wrap gap-2">
        <TooltipProvider>
          {goals.map((goal) => {
            const isAchieved = achievedGoalIds.includes(goal.id);
            let detail = "";
            if (goal.type === GoalType.TimeFixed) {
              detail = `(Target: ${(goal as TimeFixedGoal).targetDate.getFullYear()})`;
            } else if (goal.type === GoalType.Measurable) {
              detail = `(Target: ${currencyFormatter.format((goal as MeasurableGoal).targetValue)})`;
            }

            return (
              <Tooltip key={goal.id}>
                <TooltipTrigger asChild>
                  <div className="cursor-help">
                    {isAchieved ? (
                      <CheckCircle2 className="w-5 h-5 text-chart-2" />
                    ) : (
                      <XCircle className="w-5 h-5 text-destructive opacity-50" />
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-surface-container border border-border/20 text-xs font-mono p-3 space-y-1">
                  <p className="font-bold uppercase tracking-tight">{goal.name}</p>
                  {detail && <p className="text-muted-foreground text-[10px]">{detail}</p>}
                  <p className={isAchieved ? "text-chart-2" : "text-destructive"}>
                    {isAchieved ? "✓ ACHIEVED" : "✗ MISSED"}
                  </p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </div>
    </div>
  );
}

function BranchCardFooter({ isCashflowHealthy }: { isCashflowHealthy: boolean }) {
  return (
    <div className="pt-4 mt-auto border-t border-border/5">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          Cashflow Status:
        </span>
        {isCashflowHealthy ? (
          <Badge
            variant="outline"
            className="border-chart-2 text-chart-2 bg-chart-2/10 text-[10px] font-mono uppercase"
          >
            Healthy
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="border-destructive text-destructive bg-destructive/10 text-[10px] font-mono uppercase flex items-center gap-1"
          >
            <AlertCircle className="w-3 h-3" />
            Alert
          </Badge>
        )}
      </div>
    </div>
  );
}

function BranchCardVisual({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-[6] min-h-[200px]">
      {children}
    </div>
  );
}

// --- Main Component ---

export function BranchCard({
  branch,
  user,
  initialGoals,
  syncId,
}: BranchCardProps) {
  const metrics = useMemo(
    () => deriveBranchMetrics(branch, user, initialGoals),
    [branch, user, initialGoals],
  );

  const chartGoals: ChartGoalMarker[] = useMemo(() => {
    return metrics.goals.map((g) => {
      let year = 2030; // Default fallback

      if (g.type === GoalType.TimeFixed) {
        year = (g as TimeFixedGoal).targetDate.getFullYear();
      } else if (
        g.name.toLowerCase().includes("retirement") &&
        user.birthDate
      ) {
        year = new Date(user.birthDate).getFullYear() + 65;
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
  }, [metrics, user.birthDate]);

  return (
    <Link
      to="/branches/$name"
      params={{ name: branch.name }}
      className="block transition-transform hover:scale-[1.01] active:scale-[0.99]"
    >
      <Card className="flex flex-col md:flex-row overflow-hidden bg-surface-container border-none shadow-none p-6 gap-6 min-h-[280px]">
        <BranchCardInfo>
          <BranchCardHeader name={branch.name} isPrimary={branch.id === "main"} />
          <BranchCardStats 
            retirementNw={metrics.retirementNetWorth} 
            terminalNw={metrics.terminalNetWorth} 
          />
          <BranchCardGoals 
            goals={metrics.goals} 
            achievedGoalIds={metrics.achievedGoalIds} 
          />
          <BranchCardFooter isCashflowHealthy={metrics.isCashflowHealthy} />
        </BranchCardInfo>

        <BranchCardVisual>
          <TrajectoryChart
            data={metrics.snapshots.map((s) => ({
              date: `${s.year}-01-01`,
              netWorth: s.netWorth,
              equity: s.netWorth,
              untiedDebt: 0,
            }))}
            goals={chartGoals}
            isMini
            syncId={syncId}
          />
        </BranchCardVisual>
      </Card>
    </Link>
  );
}
