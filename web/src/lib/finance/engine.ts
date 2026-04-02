import type {
  Account,
  CashFlow,
  SimulationConfig,
  YearSnapshot,
} from "./types";

export class ProjectionEngine {
  private config: SimulationConfig;
  private accounts: Map<string, Account>;
  private cashFlows: Map<string, CashFlow>;

  constructor(
    config: SimulationConfig,
    accounts: Account[],
    cashFlows: CashFlow[],
  ) {
    this.config = config;
    this.accounts = new Map(accounts.map((a) => [a.id, { ...a }]));
    this.cashFlows = new Map(cashFlows.map((cf) => [cf.id, { ...cf }]));
  }

  /**
   * Main simulation entry point.
   */
  public run(startAge: number): YearSnapshot[] {
    const results: YearSnapshot[] = [];
    const yearsToSimulate = this.config.endYear - this.config.startYear;

    for (let i = 0; i <= yearsToSimulate; i++) {
      const currentYear = this.config.startYear + i;
      const currentAge = startAge + i;

      results.push(this.simulateYear(currentYear, currentAge));
    }

    return results;
  }

  /**
   * Processes a single year simulation.
   */
  private simulateYear(year: number, age: number): YearSnapshot {
    let income = 0;
    let expenses = 0;

    // 1. Resolve Cash Flows (Nominal adjustment if needed)
    for (const cf of this.cashFlows.values()) {
      if (year < cf.startYear || (cf.endYear && year > cf.endYear)) continue;

      const yearsElapsed = year - cf.startYear;
      const adjustedAmount = cf.inflationAdjusted
        ? cf.amount * Math.pow(1 + this.config.inflationRate, yearsElapsed)
        : cf.amount;

      if (cf.type === "Income") income += adjustedAmount;
      else expenses += adjustedAmount;
    }

    // 2. Handle Surplus/Deficit (The Waterfall)
    let netCashFlow = income - expenses;
    this.applyWaterfall(netCashFlow);

    // 3. Apply Growth
    this.applyGrowth();

    // 4. Capture Snapshot
    const balances: Record<string, number> = {};
    let netWorth = 0;
    for (const acc of this.accounts.values()) {
      balances[acc.id] = acc.balance;
      netWorth += acc.balance;
    }

    return {
      year,
      age,
      totalIncome: income,
      totalExpenses: expenses,
      taxesPaid: 0, // Placeholder for Phase 3
      netWorth: netWorth,
      accounts: balances,
    };
  }

  /**
   * Distributes cash flow according to the waterfall strategy.
   */
  private applyWaterfall(amount: number): void {
    const strategy =
      amount >= 0
        ? this.config.waterfall.surplus
        : this.config.waterfall.deficit;

    let remaining = Math.abs(amount);

    for (const accId of strategy) {
      const acc = this.accounts.get(accId);
      if (!acc) continue;

      if (amount >= 0) {
        // Surplus -> Add to account
        acc.balance += remaining;
        remaining = 0;
        break;
      } else {
        // Deficit -> Withdraw from account
        const withdrawal = Math.min(acc.balance, remaining);
        acc.balance -= withdrawal;
        remaining -= withdrawal;
        if (remaining <= 0) break;
      }
    }

    // Fallback: If deficit remains, put it on 'Cash' or throw warning
    if (remaining > 0 && amount < 0) {
      console.warn(
        `Deficit of ${remaining} could not be covered by waterfall accounts.`,
      );
    }
  }

  /**
   * Applies annual growth based on expected returns.
   */
  private applyGrowth(): void {
    for (const acc of this.accounts.values()) {
      if (acc.balance > 0) {
        acc.balance *= 1 + acc.expectedAnnualReturn;
      }
    }
  }
}
