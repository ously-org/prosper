import type { GoalType } from "@/lib/enum";

/**
 * Base interface for all financial and life goals.
 */
export interface Goal {
  id: string;
  name: string;
  description: string;
  isCompleted: boolean;
  type: GoalType;
}

/**
 * Shared helper for cloning and updating basic Goal properties.
 */
export function applyGoalBaseChange<T extends Goal>(goal: T, change: GoalChange): T {
  return {
    ...goal,
    ...(change.nameTo !== undefined && { name: change.nameTo }),
    ...(change.descriptionTo !== undefined && { description: change.descriptionTo }),
    ...(change.isCompletedTo !== undefined && { isCompleted: change.isCompletedTo }),
  };
}

/**
 * Base interface for goal changes.
 */
export interface GoalChange {
  id: string; // The ID of the goal being changed
  nameTo?: string;
  descriptionTo?: string;
  isCompletedTo?: boolean;
}
