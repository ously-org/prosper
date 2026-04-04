import { create } from "zustand";
import type { Goal, GoalChange } from "@/lib/model/Goal.Base";
import type { TimeFixedGoalChange } from "@/lib/model/Goal.TimeFixed";
import type { MeasurableGoalChange } from "@/lib/model/Goal.Measurable";
import type { CommitmentGoalChange } from "@/lib/model/Goal.Commitment";
import { commitGoalChanges } from "@/api/finance-api";
import { queryClient } from "@/lib/query-client";

type StagedGoalChange = GoalChange | TimeFixedGoalChange | MeasurableGoalChange | CommitmentGoalChange;

interface GoalStore {
  stagedGoalAdds: Goal[];
  stagedGoalDeletes: Set<string>;
  stagedGoalUpdates: Map<string, StagedGoalChange>;
  
  addGoal: (goal: Goal) => void;
  deleteGoal: (goalId: string) => void;
  updateGoal: (goalId: string, changes: Partial<StagedGoalChange>) => void;
  clearStaging: () => void;
  commit: () => Promise<void>;
}

export const useGoalStore = create<GoalStore>((set, get) => ({
  stagedGoalAdds: [],
  stagedGoalDeletes: new Set<string>(),
  stagedGoalUpdates: new Map<string, StagedGoalChange>(),

  addGoal: (goal) => {
    set((state) => ({
      stagedGoalAdds: [...state.stagedGoalAdds, goal],
    }));
  },

  deleteGoal: (goalId) => {
    const { stagedGoalDeletes } = get();
    const nextDeletes = new Set(stagedGoalDeletes);
    if (nextDeletes.has(goalId)) {
      nextDeletes.delete(goalId);
    } else {
      nextDeletes.add(goalId);
    }
    set({ stagedGoalDeletes: nextDeletes });
  },

  updateGoal: (goalId, changes) => {
    const { stagedGoalUpdates } = get();
    const nextUpdates = new Map(stagedGoalUpdates);
    const existing = nextUpdates.get(goalId) || { id: goalId };
    
    nextUpdates.set(goalId, {
      ...existing,
      ...changes,
    } as StagedGoalChange);
    
    set({ stagedGoalUpdates: nextUpdates });
  },

  clearStaging: () => {
    set({
      stagedGoalAdds: [],
      stagedGoalDeletes: new Set<string>(),
      stagedGoalUpdates: new Map<string, StagedGoalChange>(),
    });
  },

  commit: async () => {
    const { stagedGoalAdds, stagedGoalDeletes, stagedGoalUpdates } = get();
    
    if (stagedGoalAdds.length === 0 && stagedGoalDeletes.size === 0 && stagedGoalUpdates.size === 0) {
      return;
    }

    console.log("Committing Goal Changes:", {
      adds: stagedGoalAdds,
      deletes: Array.from(stagedGoalDeletes),
      updates: Array.from(stagedGoalUpdates.values()),
    });

    try {
      await commitGoalChanges({
        adds: stagedGoalAdds,
        deletes: Array.from(stagedGoalDeletes),
        updates: Array.from(stagedGoalUpdates.values()),
      });

      // Invalidate query to reflect changes in UI
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      queryClient.invalidateQueries({ queryKey: ["activities"] });
      
      get().clearStaging();
    } catch (error) {
      console.error("Failed to commit goal changes:", error);
    }
  },
}));
