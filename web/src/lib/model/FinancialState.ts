import type { Asset } from "@/lib/model/Asset";
import type { Liability } from "@/lib/model/Liability";
import type { Income } from "@/lib/model/Income";
import type { Expense } from "@/lib/model/Expense";

export interface FinancialState {
  assets: Asset[];
  liabilities: Liability[];
  income: Income[];
  expenses: Expense[];
}
