import { GoalType } from "@/lib/enum";
import { type Goal, applyGoalBaseChange, type GoalChange } from "./Goal.Base";

/**
 * A qualitative life goal or commitment (e.g., "Start a family" or "Move to Japan").
 */
export interface CommitmentGoal extends Goal {
  type: typeof GoalType.Commitment;
}

export function applyCommitmentGoalChange(goal: CommitmentGoal, change: CommitmentGoalChange): CommitmentGoal {
  return applyGoalBaseChange(goal, change);
}

/**
 * Change interface for Commitment goals.
 */
export interface CommitmentGoalChange extends GoalChange {}
