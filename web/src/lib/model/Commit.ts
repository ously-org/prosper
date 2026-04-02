import { CommitActionType } from "@/lib/enum";
import type { User } from "@/lib/model/User";
import type { CommitAction } from "@/lib/model/CommitAction";
import type { FinancialState } from "@/lib/model/FinancialState";
import { applyAssetChange } from "@/lib/model/Asset";
import { applyLiabilityChange } from "@/lib/model/Liability";
import { applyIncomeChange } from "@/lib/model/Income";
import { applyExpenseChange } from "@/lib/model/Expense";

export interface Commit {
  id: string;
  parentId: string | null;
  message: string;
  timestamp: Date;
  author: User;
  actions: CommitAction[];
}

export function applyCommitAction(commit: Commit, state: FinancialState): FinancialState {
  let newState: FinancialState = {
    assets: [...state.assets],
    liabilities: [...state.liabilities],
    income: [...state.income],
    expenses: [...state.expenses],
  };

  for (const action of commit.actions) {
    newState = executeSingleCommitAction(newState, action);
  }

  return newState;
}

function executeSingleCommitAction(
  state: FinancialState,
  action: CommitAction,
): FinancialState {
  const listMap: Record<CommitAction["entityType"], any[]> = {
    ASSET: state.assets,
    LIABILITY: state.liabilities,
    INCOME: state.income,
    EXPENSE: state.expenses,
  };

  const applyChangeMap: Record<CommitAction["entityType"], (entity: any, change: any) => any> = {
    ASSET: applyAssetChange,
    LIABILITY: applyLiabilityChange,
    INCOME: applyIncomeChange,
    EXPENSE: applyExpenseChange,
  };

  const list = listMap[action.entityType];

  switch (action.type) {
    case CommitActionType.Add:
      list.push(action.data);
      break;
    case CommitActionType.Delete: {
      const idx = list.findIndex((e) => e.id === action.entityId);
      if (idx > -1) list.splice(idx, 1);
      break;
    }
    case CommitActionType.Update: {
      const idx = list.findIndex((e) => e.id === action.entityId);
      if (idx > -1) {
        const applyFn = applyChangeMap[action.entityType];
        list[idx] = applyFn(list[idx], action.data);
      }
      break;
    }
    case CommitActionType.Replace: {
      const idx = list.findIndex((e) => e.id === action.entityId);
      if (idx > -1) {
        list[idx] = action.data;
      }
      break;
    }
  }

  return state;
}
