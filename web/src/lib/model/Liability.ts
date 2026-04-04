import type { LiabilityType } from "@/lib/enum";

export interface Liability {
  id: string;
  name: string;
  balance: number;
  type: LiabilityType;
  growthRate: number; // yearly growth rate decimal (usually negative for liabilities)
}

// calculate balance at a future date
export function calculateLiabilityBalance(liability: Liability, years: number): number {
  return liability.balance * Math.pow(1 + liability.growthRate, years);
}

export function calculateTotalLiabilities(liabilities: Liability[]): number {
  return liabilities.reduce((sum, liab) => sum + liab.balance, 0);
}

export function applyLiabilityChange(liability: Liability, change: LiabilityChange): Liability {
  return {
    ...liability,
    ...(change.nameTo !== undefined && { name: change.nameTo }),
    ...(change.balanceBy !== undefined && { balance: liability.balance + change.balanceBy }),
    ...(change.typeTo !== undefined && { type: change.typeTo }),
    ...(change.growthRateBy !== undefined && { growthRate: liability.growthRate + change.growthRateBy }),
  };
}

export interface LiabilityChange {
  nameTo?: string;
  balanceBy?: number;
  typeTo?: LiabilityType;
  growthRateBy?: number;
}
