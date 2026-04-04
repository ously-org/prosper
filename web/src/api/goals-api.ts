import type { Goal, GoalChange } from "@/lib/model/Goal.Base";
import { GoalType } from "@/lib/enum";
import type { TimeFixedGoal, TimeFixedGoalChange } from "@/lib/model/Goal.TimeFixed";
import { applyTimeFixedGoalChange } from "@/lib/model/Goal.TimeFixed";
import type { MeasurableGoal, MeasurableGoalChange } from "@/lib/model/Goal.Measurable";
import { applyMeasurableGoalChange } from "@/lib/model/Goal.Measurable";
import type { CommitmentGoal, CommitmentGoalChange } from "@/lib/model/Goal.Commitment";
import { applyCommitmentGoalChange } from "@/lib/model/Goal.Commitment";
import { goals, setGoals } from "./state";
import { delay } from "./utils";

export async function fetchGoals() {
  await delay(300);
  return goals;
}

export async function updateGoal(goal: Goal) {
  await delay(300);
  setGoals(goals.map((g) => (g.id === goal.id ? goal : g)));
  return goal;
}

export async function addGoal(goal: Goal) {
  await delay(300);
  setGoals([...goals, goal]);
  return goal;
}

export async function deleteGoal(id: string) {
  await delay(300);
  setGoals(goals.filter((g) => g.id !== id));
}

export type StagedGoalChange = GoalChange | TimeFixedGoalChange | MeasurableGoalChange | CommitmentGoalChange;

export async function commitGoalChanges(data: {
  adds: Goal[],
  deletes: string[],
  updates: StagedGoalChange[]
}) {
  await delay(500);

  let newGoals = [...goals];

  // 1. Process adds
  newGoals = [...newGoals, ...data.adds];

  // 2. Process deletes
  const deleteIds = new Set(data.deletes);
  newGoals = newGoals.filter((g) => !deleteIds.has(g.id));

  // 3. Process updates
  for (const change of data.updates) {
    newGoals = newGoals.map((g) => {
      if (g.id !== change.id) return g;
      
      switch (g.type) {
        case GoalType.TimeFixed:
          return applyTimeFixedGoalChange(g as TimeFixedGoal, change as TimeFixedGoalChange);
        case GoalType.Measurable:
          return applyMeasurableGoalChange(g as MeasurableGoal, change as MeasurableGoalChange);
        case GoalType.Commitment:
          return applyCommitmentGoalChange(g as CommitmentGoal, change as CommitmentGoalChange);
        default:
          return g;
      }
    });
  }

  setGoals(newGoals);

  return { success: true };
}
