import { type Asset, calculateTotalAssets } from "@/lib/model/Asset";
import { type Liability, calculateTotalLiabilities } from "@/lib/model/Liability";
import type { Income } from "@/lib/model/Income";
import type { Expense } from "@/lib/model/Expense";

export interface FinancialState {
  assets: Asset[];
  liabilities: Liability[];
  income: Income[];
  expenses: Expense[];
}

export function calculateNetWorth(state: FinancialState): number {
  return calculateTotalAssets(state.assets) - calculateTotalLiabilities(state.liabilities);
}
