import { GoalType } from "@/lib/enum";
import type { Branch } from "@/lib/model/Branch";
import type { FinancialState } from "@/lib/model/FinancialState";
import type { Goal } from "@/lib/model/Goal.Base";
import { applyCommitAction } from "@/lib/model/Commit";
import { applyCommitmentGoalChange, type CommitmentGoal, type CommitmentGoalChange } from "@/lib/model/Goal.Commitment";
import { applyMeasurableGoalChange, type MeasurableGoal, type MeasurableGoalChange } from "@/lib/model/Goal.Measurable";
import { applyTimeFixedGoalChange, type TimeFixedGoal, type TimeFixedGoalChange } from "@/lib/model/Goal.TimeFixed";

export interface User {
  name: string;
  email: string;
  avatar: string;
  pastBranch: Branch;
  initialFinancialState: FinancialState;
  initialGoals: Goal[];
  birthDate: Date;
}

/**
 * Returns the user's goals for a specific branch by applying
 * branch-level changes to the initial goals.
 */
export function getUserGoals(user: User, branch: Branch): Goal[] {
  return user.initialGoals.map((goal) => {
    const change = branch.goalChanges.find((c) => c.id === goal.id);
    if (!change) return goal;

    switch (goal.type) {
      case GoalType.Commitment:
        return applyCommitmentGoalChange(goal as CommitmentGoal, change as CommitmentGoalChange);
      case GoalType.Measurable:
        return applyMeasurableGoalChange(goal as MeasurableGoal, change as MeasurableGoalChange);
      case GoalType.TimeFixed:
        return applyTimeFixedGoalChange(goal as TimeFixedGoal, change as TimeFixedGoalChange);
      default:
        return goal;
    }
  });
}

export function getCurrentUserGoals(user: User): Goal[] {
  return getUserGoals(user, user.pastBranch);
}

export function getCurrentUserState(user: User): FinancialState {
  let state: FinancialState = {
    assets: [...user.initialFinancialState.assets],
    liabilities: [...user.initialFinancialState.liabilities],
    income: [...user.initialFinancialState.income],
    expenses: [...user.initialFinancialState.expenses],
  };

  for (const commit of user.pastBranch.commits) {
    state = applyCommitAction(commit, state);
  }

  return state;
}
