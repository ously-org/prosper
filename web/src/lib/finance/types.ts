export type TaxTreatment = "Taxable" | "TaxDeferred" | "TaxFree" | "Cash";

export interface Account {
  id: string;
  name: string;
  taxTreatment: TaxTreatment;
  balance: number;
  expectedAnnualReturn: number;
  costBasis: number; // Important for calculating capital gains on withdrawal
}

export interface CashFlow {
  id: string;
  name: string;
  amount: number; // Nominal or Real depending on engine config
  startYear: number;
  endYear?: number; // Optional, defaults to simulation end
  inflationAdjusted: boolean;
  growthRate?: number; // Annual growth rate decimal
  type: "Income" | "Expense";
}

export interface SimulationConfig {
  startYear: number;
  endYear: number;
  inflationRate: number;
  isRealDollars: boolean; // If true, all results returned in today's purchasing power
  waterfall: {
    surplus: string[]; // List of account IDs where extra money goes
    deficit: string[]; // List of account IDs where money is pulled from
  };
}

export interface YearSnapshot {
  year: number;
  age: number;
  netWorth: number;
  totalIncome: number;
  totalExpenses: number;
  taxesPaid: number;
  accounts: Record<string, number>;
}
