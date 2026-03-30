import { describe, it, expect } from 'vitest';
import { Asset, Expense, GrowthRate } from './models';

describe('Financial Models', () => {
  describe('Asset', () => {
    it('should create an asset with initial values', () => {
      const asset = new Asset({
        name: 'Savings Account',
        type: 'cash',
        value: 10000,
      });
      expect(asset.name).toBe('Savings Account');
      expect(asset.type).toBe('cash');
      expect(asset.value).toBe(10000);
    });

    it('should handle stock asset type', () => {
      const asset = new Asset({
        name: 'VTSAX',
        type: 'stock',
        value: 50000,
        growthRate: 0.07,
      });
      expect(asset.type).toBe('stock');
      expect(asset.growthRate).toBe(0.07);
    });

    it('should handle real estate asset type', () => {
      const asset = new Asset({
        name: 'Primary Residence',
        type: 'real_estate',
        value: 500000,
      });
      expect(asset.type).toBe('real_estate');
    });
  });

  describe('Expense', () => {
    it('should create an expense with recurring values', () => {
      const expense = new Expense({
        name: 'Rent',
        amount: 2000,
        frequency: 'monthly',
      });
      expect(expense.name).toBe('Rent');
      expect(expense.amount).toBe(2000);
      expect(expense.frequency).toBe('monthly');
    });
  });

  describe('GrowthRate', () => {
    it('should create a growth rate', () => {
      const growth = new GrowthRate({
        name: 'Inflation',
        rate: 0.03,
      });
      expect(growth.name).toBe('Inflation');
      expect(growth.rate).toBe(0.03);
    });
  });
});
