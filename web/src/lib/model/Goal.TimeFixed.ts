import { GoalType } from "@/lib/enum";
import { type Goal, applyGoalBaseChange, type GoalChange } from "./Goal.Base";

/**
 * A goal that needs to be achieved by a specific deadline.
 */
export interface TimeFixedGoal extends Goal {
  type: typeof GoalType.TimeFixed;
  targetDate: Date;
}

export function applyTimeFixedGoalChange(goal: TimeFixedGoal, change: TimeFixedGoalChange): TimeFixedGoal {
  const updated = applyGoalBaseChange(goal, change);
  return {
    ...updated,
    ...(change.targetDateTo !== undefined && { targetDate: change.targetDateTo }),
  };
}

/**
 * Change interface for TimeFixed goals.
 */
export interface TimeFixedGoalChange extends GoalChange {
  targetDateTo?: Date;
}
