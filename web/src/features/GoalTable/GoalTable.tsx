import { useState } from "react";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EditableCell } from "@/components/EditableCell";
import {
  RiCalendarLine,
  RiBarChartLine,
  RiHandHeartLine,
  RiArrowDownSLine,
  RiArrowRightSLine,
  RiAddLine,
  RiDeleteBinLine,
  RiRefreshLine,
  RiCheckLine,
} from "@remixicon/react";
import { useGoals } from "@/hooks/use-goals";
import { useGoalStore } from "@/store/use-goal-store";
import { GoalType, GoalMetric } from "@/lib/enum";
import type { Goal } from "@/lib/model/Goal.Base";
import type {
  TimeFixedGoal,
  TimeFixedGoalChange,
} from "@/lib/model/Goal.TimeFixed";
import type {
  MeasurableGoal,
  MeasurableGoalChange,
} from "@/lib/model/Goal.Measurable";
import type {
  CommitmentGoal,
  CommitmentGoalChange,
} from "@/lib/model/Goal.Commitment";
import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ActionBuilder } from "@/components/ActionBuilder";

// --- Constants ---

const GOAL_TYPE_CONFIG: Record<
  string,
  { label: string; icon: typeof RiCalendarLine; color: string }
> = {
  [GoalType.TimeFixed]: {
    label: "Time-Fixed",
    icon: RiCalendarLine,
    color: "text-chart-1",
  },
  [GoalType.Measurable]: {
    label: "Measurable",
    icon: RiBarChartLine,
    color: "text-chart-2",
  },
  [GoalType.Commitment]: {
    label: "Commitment",
    icon: RiHandHeartLine,
    color: "text-primary",
  },
};

const GOAL_METRIC_TEXT: Record<string, string> = {
  [GoalMetric.NetWorth]: "Net Worth",
  [GoalMetric.MonthlyIncome]: "Monthly Income",
  [GoalMetric.YearlyIncome]: "Yearly Income",
  [GoalMetric.Savings]: "Savings",
};

// --- Helper Functions ---

function computeAgeAtDate(birthDate: Date, targetDate: Date): string {
  const diffMs = targetDate.getTime() - birthDate.getTime();
  const totalMonths = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30.44));
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  return `${years}y${months}m`;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

// --- Row Components ---

function TimeFixedGoalRow({
  goal,
  birthDate,
  onUpdate,
}: {
  goal: TimeFixedGoal;
  birthDate?: Date;
  onUpdate: (changes: Partial<TimeFixedGoalChange>) => void;
}) {
  return (
    <>
      <TableCell className="px-6 py-4 border-0">
        <EditableCell
          value={goal.targetDate.toISOString().split("T")[0]}
          type="date"
          displayValue={formatDate(goal.targetDate)}
          onSave={(v) => onUpdate({ targetDateTo: new Date(v as string) })}
          className="text-xs font-mono text-muted-foreground"
        />
      </TableCell>
      <TableCell className="px-6 py-4 text-right border-0">
        {birthDate && (
          <span className="text-xs font-mono text-muted-foreground">
            Age {computeAgeAtDate(birthDate, goal.targetDate)}
          </span>
        )}
      </TableCell>
    </>
  );
}

function MeasurableGoalRow({
  goal,
  onUpdate,
}: {
  goal: MeasurableGoal;
  onUpdate: (changes: Partial<MeasurableGoalChange>) => void;
}) {
  return (
    <>
      <TableCell className="px-6 py-4 border-0">
        <div className="flex items-center gap-2">
          <Select
            value={goal.targetMetric}
            onValueChange={(v) => onUpdate({ targetMetricTo: v as GoalMetric })}
          >
            <SelectTrigger className="h-7 w-fit min-w-[120px] px-2 py-0 text-xs font-mono text-chart-2 border-transparent hover:border-border/20 bg-transparent">
              <SelectValue placeholder="Metric" />
            </SelectTrigger>
            <SelectContent className="bg-surface-container-highest border-border/20">
              {Object.entries(GOAL_METRIC_TEXT).map(([key, label]) => (
                <SelectItem
                  key={key}
                  value={key}
                  className="text-xs font-mono text-foreground hover:bg-primary/10 hover:text-primary transition-colors focus:bg-primary/10 focus:text-primary cursor-pointer"
                >
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <span className="text-xs text-muted-foreground">≥</span>

          <EditableCell
            value={goal.targetValue}
            type="number"
            onSave={(v) =>
              onUpdate({ targetValueBy: (v as number) - goal.targetValue })
            }
            className="text-sm font-mono font-bold text-foreground"
            prefix="$"
          />
        </div>
      </TableCell>
      <TableCell className="px-6 py-4 text-right border-0" />
    </>
  );
}

function CommitmentGoalRow({
  goal,
  isExpanded,
  onToggle,
}: {
  goal: CommitmentGoal;
  isExpanded: boolean;
  onToggle: () => void;
  onUpdate: (changes: Partial<CommitmentGoalChange>) => void;
}) {
  const actionCount = goal.commit.actions.length;
  return (
    <>
      <TableCell className="px-6 py-4 border-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className="flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          {isExpanded ? (
            <RiArrowDownSLine className="w-3.5 h-3.5" />
          ) : (
            <RiArrowRightSLine className="w-3.5 h-3.5" />
          )}
          <span className="text-primary font-bold">
            {actionCount} action{actionCount !== 1 ? "s" : ""} staged
          </span>
        </button>
      </TableCell>
      <TableCell className="px-6 py-4 text-right border-0" />
    </>
  );
}

// --- Main Component ---

export function GoalTable() {
  const { data: fetchGoals, isLoading } = useGoals();
  const { data: user } = useUser();
  const [expandedGoals, setExpandedGoals] = useState<Set<string>>(new Set());

  const {
    stagedGoalAdds,
    stagedGoalDeletes,
    stagedGoalUpdates,
    deleteGoal,
    updateGoal,
    addGoal,
    commit,
    clearStaging,
  } = useGoalStore();

  const toggleGoal = (goalId: string) => {
    const next = new Set(expandedGoals);
    if (next.has(goalId)) {
      next.delete(goalId);
    } else {
      next.add(goalId);
    }
    setExpandedGoals(next);
  };

  const handleAddNewGoal = (type: GoalType) => {
    const id = `new_${Date.now()}`;
    let newGoal: any; // Using any for factory to avoid strict Commit mismatch for now

    const base = {
      id,
      type,
      name: `New ${type.toLowerCase()} goal`,
      description: "",
      isCompleted: false,
    };

    switch (type) {
      case GoalType.TimeFixed:
        newGoal = {
          ...base,
          targetDate: new Date(new Date().getFullYear() + 10, 0, 1),
        };
        break;
      case GoalType.Measurable:
        newGoal = {
          ...base,
          targetMetric: GoalMetric.NetWorth,
          targetValue: 1000000,
        };
        break;
      case GoalType.Commitment:
        newGoal = {
          ...base,
          commit: {
            id: `commit_${id}`,
            actions: [],
            message: "Initial commitment",
            timestamp: new Date(),
            author: user?.name || "User",
            parentId: "0",
          },
        };
        break;
      default:
        return;
    }

    addGoal(newGoal as Goal);
  };

  const hasChanges =
    stagedGoalAdds.length > 0 ||
    stagedGoalDeletes.size > 0 ||
    stagedGoalUpdates.size > 0;

  const renderGoalRow = (goal: Goal, isStaged: boolean = false) => {
    const config =
      GOAL_TYPE_CONFIG[goal.type] || GOAL_TYPE_CONFIG[GoalType.TimeFixed];
    const Icon = config.icon;
    const isExpanded = expandedGoals.has(goal.id);
    const isDeleted = stagedGoalDeletes.has(goal.id);
    const isUpdated = stagedGoalUpdates.has(goal.id);

    return (
      <div key={goal.id} className="contents">
        <TableRow
          className={cn(
            "hover:bg-surface-container-highest transition-all border-b border-border/20 last:border-0 group/row",
            isDeleted && "opacity-50 grayscale bg-destructive/5",
            (isUpdated || isStaged) &&
              "border-l-2 border-l-chart-2 bg-chart-2/5",
          )}
        >
          {/* Name + Icon + Type Badge */}
          <TableCell className="px-6 py-4 border-0 w-[360px] min-w-[360px]">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-8 h-8 rounded-md flex items-center justify-center bg-surface-container-highest transition-colors",
                  config.color,
                  isDeleted && "text-muted-foreground",
                )}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <div className="flex items-center gap-2">
                  <EditableCell
                    value={goal.name}
                    onSave={(v) => updateGoal(goal.id, { nameTo: v as string })}
                    className={cn(
                      "text-sm font-bold text-foreground truncate transition-all",
                      isDeleted && "line-through text-muted-foreground",
                    )}
                  />
                  {isStaged && (
                    <Badge
                      variant="secondary"
                      className="text-[10px] h-3.5 px-1 bg-chart-2/20 text-chart-2 border-chart-2/30 font-bold"
                    >
                      NEW
                    </Badge>
                  )}
                </div>
                <Badge
                  variant="outline"
                  className="text-[9px] w-fit px-1.5 py-0 h-4 font-mono font-bold tracking-wider text-muted-foreground"
                >
                  {config.label}
                </Badge>
              </div>
              <RiDeleteBinLine
                className={cn(
                  "w-3.5 h-3.5 cursor-pointer opacity-0 group-hover/row:opacity-100 transition-opacity flex-shrink-0 ml-auto",
                  isDeleted
                    ? "text-primary opacity-100"
                    : "text-muted-foreground/40 hover:text-destructive",
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteGoal(goal.id);
                }}
              />
            </div>
          </TableCell>

          {/* Type-specific columns */}
          {goal.type === GoalType.TimeFixed && (
            <TimeFixedGoalRow
              goal={goal as TimeFixedGoal}
              birthDate={user?.birthDate}
              onUpdate={(changes) => updateGoal(goal.id, changes)}
            />
          )}
          {goal.type === GoalType.Measurable && (
            <MeasurableGoalRow
              goal={goal as MeasurableGoal}
              onUpdate={(changes) => updateGoal(goal.id, changes)}
            />
          )}
          {goal.type === GoalType.Commitment && (
            <CommitmentGoalRow
              goal={goal as CommitmentGoal}
              isExpanded={isExpanded}
              onToggle={() => toggleGoal(goal.id)}
              onUpdate={(changes) => updateGoal(goal.id, changes)}
            />
          )}
          {/* Fill empty cells if needed */}
          {goal.type !== GoalType.TimeFixed &&
            goal.type !== GoalType.Measurable &&
            goal.type !== GoalType.Commitment && (
              <>
                <TableCell className="px-6 py-4 border-0" />
                <TableCell className="px-6 py-4 border-0" />
              </>
            )}
        </TableRow>

        {/* Expanded commitment actions */}
        {goal.type === GoalType.Commitment &&
          isExpanded &&
          (goal as CommitmentGoal).commit && (
            <TableRow className="hover:bg-transparent border-0">
              <TableCell colSpan={3} className="p-0 border-0">
                <ActionBuilder
                  actions={(goal as CommitmentGoal).commit.actions}
                  onActionsChange={(actions) =>
                    updateGoal(goal.id, {
                      commitTo: { ...(goal as CommitmentGoal).commit, actions },
                    })
                  }
                />
              </TableCell>
            </TableRow>
          )}
      </div>
    );
  };

  return (
    <>
      <CardHeader className="px-6 py-4 bg-surface-container-high flex flex-row justify-between items-center border-b border-border/20 space-y-0 shrink-0">
        <div className="flex items-center gap-4">
          <CardTitle className="text-sm font-bold uppercase tracking-widest text-foreground font-mono">
            Strategic Goals
          </CardTitle>

          {hasChanges && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-2 text-[10px] font-bold border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 transition-all gap-1.5"
                onClick={commit}
              >
                <RiCheckLine className="w-3 h-3" />
                Commit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-[10px] font-bold text-muted-foreground hover:text-destructive hover:bg-destructive/5 gap-1.5"
                onClick={clearStaging}
              >
                <RiRefreshLine className="w-3 h-3" />
                Discard
              </Button>
            </div>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="link"
              className="h-8 px-3 py-1 text-xs font-bold gap-1 text-primary hover:text-primary/80"
            >
              <RiAddLine className="w-3.5 h-3.5" />
              Add Goal
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-surface-container-highest border-border/20 w-48 shadow-lg">
            <DropdownMenuLabel className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest py-2">
              Select Goal Type
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border/10" />
            <DropdownMenuItem
              onClick={() => handleAddNewGoal(GoalType.TimeFixed)}
              className="flex flex-col items-start gap-0.5 py-2 hover:bg-primary/10 cursor-pointer rounded-none transition-colors"
            >
              <span className="text-xs font-bold text-foreground">
                Time-Fixed
              </span>
              <span className="text-[10px] text-muted-foreground">
                Achieve by a specific date
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleAddNewGoal(GoalType.Measurable)}
              className="flex flex-col items-start gap-0.5 py-2 hover:bg-primary/10 cursor-pointer rounded-none transition-colors"
            >
              <span className="text-xs font-bold text-foreground">
                Measurable
              </span>
              <span className="text-[10px] text-muted-foreground">
                Track a specific metric target
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleAddNewGoal(GoalType.Commitment)}
              className="flex flex-col items-start gap-0.5 py-2 hover:bg-primary/10 cursor-pointer rounded-none transition-colors"
            >
              <span className="text-xs font-bold text-foreground">
                Commitment
              </span>
              <span className="text-[10px] text-muted-foreground">
                A planned life decision
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="p-0 flex-1 overflow-y-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-surface-container-high z-10">
            <TableRow className="border-b border-border/20 hover:bg-transparent text-left">
              <TableHead className="px-6 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest h-auto w-[360px]">
                Goal
              </TableHead>
              <TableHead className="px-6 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest h-auto">
                Condition / Target
              </TableHead>
              <TableHead className="px-6 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-right h-auto">
                Detail
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-border/20">
            {isLoading ? (
              <TableRow className="animate-pulse">
                <TableCell
                  colSpan={3}
                  className="h-40 text-center py-4 text-muted-foreground italic border-0"
                >
                  Loading goals...
                </TableCell>
              </TableRow>
            ) : (
              <>
                {stagedGoalAdds.map((goal) => renderGoalRow(goal, true))}
                {fetchGoals?.map((goal) => renderGoalRow(goal))}
                {(!fetchGoals || fetchGoals.length === 0) &&
                  stagedGoalAdds.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="h-40 text-center py-4 text-muted-foreground italic border-0"
                      >
                        No goals defined yet.
                      </TableCell>
                    </TableRow>
                  )}
              </>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </>
  );
}
