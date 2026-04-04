import { GoalType } from "@/lib/enum";
import { type Goal, applyGoalBaseChange, type GoalChange } from "./Goal.Base";
import type { Commit } from "@/lib/model/Commit";

/**
 * A life goal or commitment backed by a planned Commit.
 * The commit holds the set of financial actions that will be
 * applied when this commitment is executed (e.g., "Start a family"
 * → increase expenses, add childcare costs, etc.).
 */
export interface CommitmentGoal extends Goal {
  type: typeof GoalType.Commitment;
  commit: Commit;
}

export function applyCommitmentGoalChange(
  goal: CommitmentGoal,
  change: CommitmentGoalChange,
): CommitmentGoal {
  const updated = applyGoalBaseChange(goal, change);
  return {
    ...updated,
    ...(change.commitTo !== undefined && { commit: change.commitTo }),
  };
}

/**
 * Change interface for Commitment goals.
 * commitTo replaces the entire planned commit.
 */
export interface CommitmentGoalChange extends GoalChange {
  commitTo?: Commit;
}
