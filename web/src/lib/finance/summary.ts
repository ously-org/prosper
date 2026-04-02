import type { Branch } from "@/lib/model/Branch";
import type { User } from "@/lib/model/User";
import { getUserGoals } from "@/lib/model/User";
import type { Goal } from "@/lib/model/Goal.Base";
import { ProjectionEngine } from "./engine";
import type { Account, CashFlow, SimulationConfig, YearSnapshot } from "./types";
import { getYearlyIncomeAmount } from "@/lib/model/Income";
import { getYearlyExpenseAmount } from "@/lib/model/Expense";
import type { FinancialState } from "@/lib/model/FinancialState";
import { applyCommitAction } from "@/lib/model/Commit";
import { GoalMetric, GoalType } from "@/lib/enum";
import type { MeasurableGoal } from "@/lib/model/Goal.Measurable";
import type { TimeFixedGoal } from "@/lib/model/Goal.TimeFixed";

export interface BranchMetrics {
  retirementNetWorth: number;
  terminalNetWorth: number;
  isCashflowHealthy: boolean;
  achievedGoalIds: string[];
  snapshots: YearSnapshot[];
  goals: Goal[];
}

/**
 * Derives summary metrics for a branch by running a financial simulation.
 * 
 * @param branch The branch to evaluate
 * @param user The user whose financial state we are projecting
 * @param initialGoals The initial goals to evaluate against
 * @returns BranchMetrics containing retirement NW, terminal NW, and goal achievement
 */
export function deriveBranchMetrics(
  branch: Branch,
  user: User,
  initialGoals: Goal[]
): BranchMetrics {
  // 1. Reconstruct the financial state by applying all commits in the branch
  let state: FinancialState = {
    assets: [...user.initialFinancialState.assets],
    liabilities: [...user.initialFinancialState.liabilities],
    income: [...user.initialFinancialState.income],
    expenses: [...user.initialFinancialState.expenses],
  };

  for (const commit of branch.commits) {
    state = applyCommitAction(commit, state);
  }

  // 2. Get the branch-specific goals (initial goals + branch level changes)
  const goals = getUserGoals(user, branch, initialGoals);

  // 3. Convert FinancialState to Engine Inputs
  const accounts: Account[] = state.assets.map((asset) => ({
    id: asset.id,
    name: asset.name,
    taxTreatment: "Taxable",
    balance: asset.value,
    expectedAnnualReturn: asset.growthRate,
    costBasis: asset.value,
  }));

  // Add liabilities as accounts with negative balances
  state.liabilities.forEach((liab) => {
    accounts.push({
      id: liab.id,
      name: liab.name,
      taxTreatment: "Cash",
      balance: -liab.balance,
      expectedAnnualReturn: liab.growthRate,
      costBasis: 0,
    });
  });

  const startYear = new Date().getFullYear();
  const currentAge = startYear - user.birthDate.getFullYear();

  const cashFlows: CashFlow[] = [
    ...state.income.map((inc) => ({
      id: inc.id,
      name: inc.name,
      amount: getYearlyIncomeAmount(inc),
      startYear,
      inflationAdjusted: false,
      growthRate: inc.growthRate,
      type: "Income" as const,
    })),
    ...state.expenses.map((exp) => ({
      id: exp.id,
      name: exp.name,
      amount: getYearlyExpenseAmount(exp),
      startYear,
      inflationAdjusted: exp.inflationAdjusted,
      growthRate: exp.growthRate,
      type: "Expense" as const,
    })),
  ];

  // 4. Setup Simulation Configuration
  const terminalAge = 100;
  const endYear = startYear + (terminalAge - currentAge);

  const config: SimulationConfig = {
    startYear,
    endYear,
    inflationRate: 0.03, // 3% default inflation
    isRealDollars: true,
    waterfall: {
      surplus: accounts.length > 0 ? [accounts[0].id] : [],
      deficit: accounts.map((a) => a.id),
    },
  };

  // 5. Run the Simulation
  const engine = new ProjectionEngine(config, accounts, cashFlows);
  const snapshots = engine.run(currentAge);

  // 6. Extract Metrics
  const retirementGoal = goals.find((g) =>
    g.name.toLowerCase().includes("retirement")
  );
  
  // Find year for retirement (default to age 65)
  let retirementYear = startYear + (65 - currentAge);
  if (retirementGoal && retirementGoal.type === GoalType.TimeFixed) {
    retirementYear = (retirementGoal as TimeFixedGoal).targetDate.getFullYear();
  }

  const retirementSnapshot = 
    snapshots.find((s) => s.year === retirementYear) || 
    snapshots.find((s) => s.age >= 65) ||
    snapshots[snapshots.length - 1];
    
  const terminalSnapshot = snapshots[snapshots.length - 1];

  const isCashflowHealthy = snapshots.every((s) => s.netWorth >= 0);

  // 7. Determine Achieved Goals
  const achievedGoalIds: string[] = [];
  for (const goal of goals) {
    let isAchieved = false;
    
    switch (goal.type) {
      case GoalType.Measurable: {
        const mg = goal as MeasurableGoal;
        if (mg.targetMetric === GoalMetric.NetWorth) {
          isAchieved = snapshots.some((s) => s.netWorth >= mg.targetValue);
        } else if (mg.targetMetric === GoalMetric.YearlyIncome) {
          isAchieved = snapshots.some((s) => s.totalIncome >= mg.targetValue);
        }
        break;
      }
      case GoalType.TimeFixed: {
        const tfg = goal as TimeFixedGoal;
        const snapshotAtTarget = snapshots.find((s) => s.year === tfg.targetDate.getFullYear());
        // For time-fixed goals, assume achievement if we still have positive net worth at that time
        // or if it's explicitly marked as completed.
        if (tfg.isCompleted || (snapshotAtTarget && snapshotAtTarget.netWorth >= 0)) {
          isAchieved = true;
        }
        break;
      }
      case GoalType.Commitment:
        // Commitment goals are qualitative, assume achieved if marked so
        isAchieved = goal.isCompleted;
        break;
    }

    if (isAchieved) {
      achievedGoalIds.push(goal.id);
    }
  }

  return {
    retirementNetWorth: retirementSnapshot.netWorth,
    terminalNetWorth: terminalSnapshot.netWorth,
    isCashflowHealthy,
    achievedGoalIds,
    snapshots,
    goals,
  };
}
