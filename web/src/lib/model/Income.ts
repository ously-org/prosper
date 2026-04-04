import type { Frequency } from "@/lib/enum";

export interface Income {
  id: string;
  name: string;
  amount: number;
  frequency: Frequency;
  growthRate: number;
}

export function getYearlyIncomeAmount(income: Income): number {
  return income.frequency === "monthly" ? income.amount * 12 : income.amount;
}

export function applyIncomeChange(income: Income, change: IncomeChange): Income {
  return {
    ...income,
    ...(change.nameTo !== undefined && { name: change.nameTo }),
    ...(change.amountBy !== undefined && { amount: income.amount + change.amountBy }),
    ...(change.frequencyTo !== undefined && { frequency: change.frequencyTo }),
    ...(change.growthRateBy !== undefined && { growthRate: income.growthRate + change.growthRateBy }),
  };
}

export interface IncomeChange {
  nameTo?: string;
  amountBy?: number;
  frequencyTo?: Frequency;
  growthRateBy?: number;
}
