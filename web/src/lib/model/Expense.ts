import type { Frequency } from "@/lib/enum";

export interface Expense {
  id: string;
  name: string;
  amount: number;
  frequency: Frequency;
  inflationAdjusted: boolean;
}

export function getYearlyExpenseAmount(expense: Expense): number {
  return expense.frequency === "monthly" ? expense.amount * 12 : expense.amount;
}

export function applyExpenseChange(expense: Expense, change: ExpenseChange): Expense {
  return {
    ...expense,
    ...(change.nameTo !== undefined && { name: change.nameTo }),
    ...(change.amountBy !== undefined && { amount: expense.amount + change.amountBy }),
    ...(change.frequencyTo !== undefined && { frequency: change.frequencyTo }),
    ...(change.inflationAdjustedTo !== undefined && { inflationAdjusted: change.inflationAdjustedTo }),
  };
}

export interface ExpenseChange {
  nameTo?: string;
  amountBy?: number;
  frequencyTo?: Frequency;
  inflationAdjustedTo?: boolean;
}
