import { create } from "zustand";
import type {
  CommitAction,
  CommitActionUpdate,
} from "@/lib/model/CommitAction";
import { CommitActionType, EntityType } from "@/lib/enum";

interface CommitStore {
  stagedActions: CommitAction[];
  stageUpdate: (entityType: EntityType, entityId: string, data: any) => void;
  stageAdd: (entityType: EntityType, data: any) => void;
  stageDelete: (entityType: EntityType, entityId: string) => void;
  clearStaging: () => void;
  commit: () => void;
}

export const useCommitStore = create<CommitStore>((set, get) => ({
  stagedActions: [],

  stageUpdate: (entityType, entityId, data) => {
    const { stagedActions } = get();
    const existingIndex = stagedActions.findIndex(
      (a) =>
        a.type === CommitActionType.Update &&
        "entityId" in a &&
        a.entityId === entityId &&
        a.entityType === entityType,
    );

    if (existingIndex > -1) {
      const newActions = [...stagedActions];
      const existing = newActions[existingIndex] as CommitActionUpdate;
      newActions[existingIndex] = {
        ...existing,
        data: { ...existing.data, ...data },
      } as CommitAction;
      set({ stagedActions: newActions });
    } else {
      set({
        stagedActions: [
          ...stagedActions,
          {
            type: CommitActionType.Update,
            entityType,
            entityId,
            data,
          } as CommitAction,
        ],
      });
    }
  },

  stageAdd: (entityType, data) => {
    set((state) => ({
      stagedActions: [
        ...state.stagedActions,
        {
          type: CommitActionType.Add,
          entityType,
          data: {
            ...data,
            id: `new_${Date.now()}`,
            categoryName: data.category, // Store the display name for grouping
          },
        } as CommitAction,
      ],
    }));
  },

  stageDelete: (entityType, entityId) => {
    set((state) => ({
      stagedActions: [
        ...state.stagedActions,
        {
          type: CommitActionType.Delete,
          entityType,
          entityId,
        } as CommitAction,
      ],
    }));
  },

  clearStaging: () => set({ stagedActions: [] }),

  commit: () => {
    console.log("Committing actions:", get().stagedActions);
    set({ stagedActions: [] });
  },
}));
