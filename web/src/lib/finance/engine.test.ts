import { describe, it, expect } from 'vitest';
import { ProjectionEngine } from './engine';
import { Asset, Expense } from './models';

describe('ProjectionEngine', () => {
  it('should project asset growth correctly over 1 year', () => {
    const asset = new Asset({ name: 'Cash', type: 'cash', value: 1000, growthRate: 0.1 });
    const engine = new ProjectionEngine();
    
    const results = engine.project([asset], [], 1);
    
    // 1000 * 1.1 = 1100
    expect(results[1].netWorth).toBeCloseTo(1100);
  });

  it('should project asset growth correctly over 10 years', () => {
    const asset = new Asset({ name: 'Stock', type: 'stock', value: 1000, growthRate: 0.07 });
    const engine = new ProjectionEngine();
    
    const results = engine.project([asset], [], 10);
    
    // 1000 * (1.07 ^ 10) = 1967.15
    expect(results[10].netWorth).toBeCloseTo(1967.15, 1);
  });

  it('should include monthly expenses in projection', () => {
    const asset = new Asset({ name: 'Cash', type: 'cash', value: 10000, growthRate: 0 });
    const expense = new Expense({ name: 'Rent', amount: 500, frequency: 'monthly' });
    const engine = new ProjectionEngine();
    
    const results = engine.project([asset], [expense], 1);
    
    // 10000 - (500 * 12) = 4000
    expect(results[1].netWorth).toBe(4000);
  });

  it('should handle inflation for expenses', () => {
    const asset = new Asset({ name: 'Cash', type: 'cash', value: 10000, growthRate: 0 });
    const expense = new Expense({ name: 'Rent', amount: 1000, frequency: 'yearly' });
    const engine = new ProjectionEngine();
    
    // With 10% inflation, expense in year 2 should be 1100
    const results = engine.project([asset], [expense], 2, { inflation: 0.1 });
    
    // Year 1: 10000 - 1000 = 9000
    // Year 2: 9000 - (1000 * 1.1) = 7900
    expect(results[2].netWorth).toBe(7900);
  });

  it('should apply global ROI modifier if provided', () => {
    const asset = new Asset({ name: 'Stock', type: 'stock', value: 1000, growthRate: 0.05 });
    const engine = new ProjectionEngine();
    
    // Global ROI adds 2% to all growth rates
    const results = engine.project([asset], [], 1, { globalROIModifier: 0.02 });
    
    // 1000 * (1 + 0.05 + 0.02) = 1070
    expect(results[1].netWorth).toBe(1070);
  });
});
