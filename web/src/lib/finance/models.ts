export type AssetType = 'cash' | 'stock' | 'real_estate' | 'other';
export type Frequency = 'monthly' | 'yearly' | 'once';

export interface AssetConfig {
  name: string;
  type: AssetType;
  value: number;
  growthRate?: number;
}

export class Asset {
  name: string;
  type: AssetType;
  value: number;
  growthRate: number;

  constructor(config: AssetConfig) {
    this.name = config.name;
    this.type = config.type;
    this.value = config.value;
    this.growthRate = config.growthRate ?? 0;
  }
}

export interface ExpenseConfig {
  name: string;
  amount: number;
  frequency: Frequency;
  startDate?: Date;
  endDate?: Date;
}

export class Expense {
  name: string;
  amount: number;
  frequency: Frequency;
  startDate: Date;
  endDate?: Date;

  constructor(config: ExpenseConfig) {
    this.name = config.name;
    this.amount = config.amount;
    this.frequency = config.frequency;
    this.startDate = config.startDate ?? new Date();
    this.endDate = config.endDate;
  }
}

export interface GrowthRateConfig {
  name: string;
  rate: number;
}

export class GrowthRate {
  name: string;
  rate: number;

  constructor(config: GrowthRateConfig) {
    this.name = config.name;
    this.rate = config.rate;
  }
}

export interface FinancialNodeConfig {
  id: string;
  name: string;
  date: Date;
  assets: Asset[];
  expenses: Expense[];
  parentId?: string;
}

export class FinancialNode {
  id: string;
  name: string;
  date: Date;
  assets: Asset[];
  expenses: Expense[];
  parentId?: string;

  constructor(config: FinancialNodeConfig) {
    this.id = config.id;
    this.name = config.name;
    this.date = config.date;
    this.assets = config.assets;
    this.expenses = config.expenses;
    this.parentId = config.parentId;
  }
}
