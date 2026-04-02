import type { LiabilityType } from "@/lib/enum";

export interface Liability {
  id: string;
  name: string;
  balance: number;
  type: LiabilityType;
  interestRate: number; // yearly interest rate decimal
}

// calculate balance at a future date
export function calculateLiabilityBalance(liability: Liability, years: number): number {
  return liability.balance * Math.pow(1 + liability.interestRate, years);
}

export function applyLiabilityChange(liability: Liability, change: LiabilityChange): Liability {
  return {
    ...liability,
    ...(change.nameTo !== undefined && { name: change.nameTo }),
    ...(change.balanceBy !== undefined && { balance: liability.balance + change.balanceBy }),
    ...(change.typeTo !== undefined && { type: change.typeTo }),
    ...(change.interestRateBy !== undefined && { interestRate: liability.interestRate + change.interestRateBy }),
  };
}

export interface LiabilityChange {
  nameTo?: string;
  balanceBy?: number;
  typeTo?: LiabilityType;
  interestRateBy?: number;
}
