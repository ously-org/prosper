import { Asset, Expense } from './models';

export interface ProjectionResult {
  year: number;
  netWorth: number;
  assets: { name: string; value: number }[];
}

export interface Environment {
  inflation?: number;
  globalROIModifier?: number;
}

export class ProjectionEngine {
  project(
    assets: Asset[],
    expenses: Expense[],
    years: number,
    env: Environment = {}
  ): Record<number, ProjectionResult> {
    const results: Record<number, ProjectionResult> = {};
    const inflation = env.inflation ?? 0;
    const globalROI = env.globalROIModifier ?? 0;
    
    // Initial state (Year 0)
    let currentAssets = assets.map(a => new Asset({ ...a }));
    
    results[0] = {
      year: 0,
      netWorth: this.calculateNetWorth(currentAssets),
      assets: currentAssets.map(a => ({ name: a.name, value: a.value }))
    };

    for (let year = 1; year <= years; year++) {
      // 1. Grow assets
      currentAssets.forEach(asset => {
        asset.value *= (1 + asset.growthRate + globalROI);
      });

      // 2. Calculate expenses with inflation
      const totalYearlyExpenses = expenses.reduce((total, expense) => {
        let amount = expense.amount;
        // Apply inflation: amount * (1 + inflation) ^ year-1 (first year is base)
        // Wait, usually inflation is applied starting from second year if Year 1 is today's dollars
        // Let's assume Year 1 already has 1 year of inflation applied if we are projecting into the FUTURE.
        // Actually, let's keep it simple: Year N expense = Base * (1 + inflation) ^ (year - 1)
        // If year = 1, amount = Base.
        const inflatedAmount = amount * Math.pow(1 + inflation, year - 1);

        if (expense.frequency === 'yearly') {
          return total + inflatedAmount;
        } else if (expense.frequency === 'monthly') {
          return total + (inflatedAmount * 12);
        }
        return total;
      }, 0);

      // 3. Subtract expenses
      let remainingExpense = totalYearlyExpenses;
      
      // Try to subtract from 'cash' assets first
      currentAssets.filter(a => a.type === 'cash').forEach(asset => {
        const deduction = Math.min(asset.value, remainingExpense);
        asset.value -= deduction;
        remainingExpense -= deduction;
      });

      // If still remaining, subtract from others
      if (remainingExpense > 0) {
        currentAssets.forEach(asset => {
          const deduction = Math.min(asset.value, remainingExpense);
          asset.value -= deduction;
          remainingExpense -= deduction;
        });
      }

      results[year] = {
        year,
        netWorth: this.calculateNetWorth(currentAssets),
        assets: currentAssets.map(a => ({ name: a.name, value: a.value }))
      };
    }

    return results;
  }

  private calculateNetWorth(assets: Asset[]): number {
    return assets.reduce((sum, asset) => sum + asset.value, 0);
  }

  projectPath(
    path: FinancialNode[],
    env: Environment = {}
  ): Record<number, ProjectionResult> {
    // This is a more complex simulation that handles events at specific dates.
    // For now, let's just combine all assets and expenses from the path and project for a fixed duration.
    // In a real implementation, we'd process nodes chronologically.
    const allAssets = path.flatMap(node => node.assets);
    const allExpenses = path.flatMap(node => node.expenses);
    
    // Default to 30 years if no duration specified, or based on node dates
    return this.project(allAssets, allExpenses, 30, env);
  }
}
