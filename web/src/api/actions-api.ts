import type { Asset } from "@/lib/model/Asset";
import type { Liability } from "@/lib/model/Liability";
import type { Income } from "@/lib/model/Income";
import type { Expense } from "@/lib/model/Expense";
import type { CommitAction } from "@/lib/model/CommitAction";
import { CommitActionType, EntityType } from "@/lib/enum";
import { assets, liabilities, income, expenses } from "./state";
import { delay } from "./utils";
import { internalApplyAssetChange, internalReplaceAsset } from "./assets-api";
import { internalApplyLiabilityChange, internalReplaceLiability } from "./liabilities-api";
import { internalApplyIncomeChange, internalReplaceIncome } from "./budget-api";
import { internalApplyExpenseChange, internalReplaceExpense } from "./budget-api";

export async function commitActions(actions: CommitAction[]) {
  await delay(500);

  if (actions.length === 0) return { success: true };

  // 1. Process actions
  for (const action of actions) {
    if (action.type === CommitActionType.Add) {
      if (action.entityType === EntityType.Asset) assets.push(action.data as Asset);
      if (action.entityType === EntityType.Liability) liabilities.push(action.data as Liability);
      if (action.entityType === EntityType.Income) income.push(action.data as Income);
      if (action.entityType === EntityType.Expense) expenses.push(action.data as Expense);
    } else if (action.type === CommitActionType.Delete) {
      if (action.entityType === EntityType.Asset) {
        const idx = assets.findIndex(a => a.id === action.entityId);
        if (idx > -1) assets.splice(idx, 1);
      }
      if (action.entityType === EntityType.Liability) {
        const idx = liabilities.findIndex(l => l.id === action.entityId);
        if (idx > -1) liabilities.splice(idx, 1);
      }
      if (action.entityType === EntityType.Income) {
        const idx = income.findIndex(i => i.id === action.entityId);
        if (idx > -1) income.splice(idx, 1);
      }
      if (action.entityType === EntityType.Expense) {
        const idx = expenses.findIndex(e => e.id === action.entityId);
        if (idx > -1) expenses.splice(idx, 1);
      }
    } else if (action.type === CommitActionType.Update) {
      if (action.entityType === EntityType.Asset) internalApplyAssetChange(action.entityId, action.data as any);
      if (action.entityType === EntityType.Liability) internalApplyLiabilityChange(action.entityId, action.data as any);
      if (action.entityType === EntityType.Income) internalApplyIncomeChange(action.entityId, action.data as any);
      if (action.entityType === EntityType.Expense) internalApplyExpenseChange(action.entityId, action.data as any);
    } else if (action.type === CommitActionType.Replace) {
      if (action.entityType === EntityType.Asset) internalReplaceAsset(action.entityId, action.data as Asset);
      if (action.entityType === EntityType.Liability) internalReplaceLiability(action.entityId, action.data as Liability);
      if (action.entityType === EntityType.Income) internalReplaceIncome(action.entityId, action.data as Income);
      if (action.entityType === EntityType.Expense) internalReplaceExpense(action.entityId, action.data as Expense);
    }
  }

  return { success: true };
}
