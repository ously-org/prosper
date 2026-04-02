import { GoalType, type GoalMetric } from "@/lib/enum";
import { type Goal, applyGoalBaseChange, type GoalChange } from "./Goal.Base";

/**
 * A quantitative goal measured against specific financial metrics.
 */
export interface MeasurableGoal extends Goal {
  type: typeof GoalType.Measurable;
  targetMetric: GoalMetric;
  targetValue: number;
}

export function applyMeasurableGoalChange(goal: MeasurableGoal, change: MeasurableGoalChange): MeasurableGoal {
  const updated = applyGoalBaseChange(goal, change);
  return {
    ...updated,
    ...(change.targetMetricTo !== undefined && { targetMetric: change.targetMetricTo }),
    ...(change.targetValueBy !== undefined && { targetValue: goal.targetValue + change.targetValueBy }),
  };
}

/**
 * Change interface for Measurable goals.
 */
export interface MeasurableGoalChange extends GoalChange {
  targetMetricTo?: GoalMetric;
  targetValueBy?: number;
}
