import { AssetType, Frequency, LiabilityType } from "./enum";

export class User {
  name: string;
  email: string;
  avatar: string;

  constructor(name: string, email: string, avatar: string) {
    this.name = name;
    this.email = email;
    this.avatar = avatar;
  }
}

export class Asset {
  id: string;
  name: string;
  value: number;
  type: AssetType;
  growthRate: number; // yearly growth rate decimal

  constructor(
    id: string,
    name: string,
    value: number,
    type: AssetType = AssetType.Other,
    growthRate: number = 0,
  ) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.type = type;
    this.growthRate = growthRate;
  }

  // To be implemented: calculate value at a future date
  calculateGrowth(years: number): number {
    return this.value * Math.pow(1 + this.growthRate, years);
  }
}

export class Liability {
  id: string;
  name: string;
  balance: number;
  type: LiabilityType;
  interestRate: number; // yearly interest rate decimal

  constructor(
    id: string,
    name: string,
    balance: number,
    type: LiabilityType = LiabilityType.Other,
    interestRate: number = 0,
  ) {
    this.id = id;
    this.name = name;
    this.balance = balance;
    this.type = type;
    this.interestRate = interestRate;
  }

  // To be implemented: calculate balance at a future date
  calculateBalance(years: number): number {
    return this.balance * Math.pow(1 + this.interestRate, years);
  }
}

export class Income {
  id: string;
  name: string;
  amount: number;
  frequency: Frequency;
  growthRate: number;

  constructor(
    id: string,
    name: string,
    amount: number,
    frequency: Frequency = Frequency.Monthly,
    growthRate: number = 0,
  ) {
    this.id = id;
    this.name = name;
    this.amount = amount;
    this.frequency = frequency;
    this.growthRate = growthRate;
  }

  getYearlyAmount(): number {
    return this.frequency === Frequency.Monthly
      ? this.amount * 12
      : this.amount;
  }
}

export class Expense {
  id: string;
  name: string;
  amount: number;
  frequency: Frequency;
  inflationAdjusted: boolean;

  constructor(
    id: string,
    name: string,
    amount: number,
    frequency: Frequency = Frequency.Monthly,
    inflationAdjusted: boolean = true,
  ) {
    this.id = id;
    this.name = name;
    this.amount = amount;
    this.frequency = frequency;
    this.inflationAdjusted = inflationAdjusted;
  }

  getYearlyAmount(): number {
    return this.frequency === Frequency.Monthly
      ? this.amount * 12
      : this.amount;
  }
}

export class Commit {
  id: string;
  message: string;
  timestamp: Date;
  author: User;

  assets: Asset[];
  liabilities: Liability[];
  income: Income[];
  expenses: Expense[];

  constructor(
    id: string,
    message: string,
    author: User,
    assets: Asset[] = [],
    liabilities: Liability[] = [],
    income: Income[] = [],
    expenses: Expense[] = [],
  ) {
    this.id = id;
    this.message = message;
    this.author = author;
    this.timestamp = new Date();
    this.assets = assets;
    this.liabilities = liabilities;
    this.income = income;
    this.expenses = expenses;
  }

  // To be implemented later: calculate net worth at this commit
  getNetWorth(): number {
    const totalAssets = this.assets.reduce((sum, a) => sum + a.value, 0);
    const totalLiabilities = this.liabilities.reduce(
      (sum, l) => sum + l.balance,
      0,
    );
    return totalAssets - totalLiabilities;
  }

  // To be implemented later: calculate monthly cash flow
  getCashFlow(): number {
    const totalMonthlyIncome = this.income.reduce(
      (sum, i) =>
        sum + (i.frequency === Frequency.Monthly ? i.amount : i.amount / 12),
      0,
    );
    const totalMonthlyExpense = this.expenses.reduce(
      (sum, e) =>
        sum + (e.frequency === Frequency.Monthly ? e.amount : e.amount / 12),
      0,
    );
    return totalMonthlyIncome - totalMonthlyExpense;
  }
}

export class Branch {
  name: string;
  commits: Commit[];

  constructor(name: string, commits: Commit[] = []) {
    this.name = name;
    this.commits = commits;
  }

  getLatestCommit(): Commit | undefined {
    return this.commits[this.commits.length - 1];
  }
}

export class FinancialProject {
  id: string;
  name: string;
  owner: User;
  branches: Branch[];
  currentBranchName: string;

  constructor(id: string, name: string, owner: User) {
    this.id = id;
    this.name = name;
    this.owner = owner;
    this.branches = [new Branch("main")];
    this.currentBranchName = "main";
  }

  getCurrentBranch(): Branch {
    return (
      this.branches.find((b) => b.name === this.currentBranchName) ||
      this.branches[0]
    );
  }
}
