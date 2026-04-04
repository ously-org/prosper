import {
  AssetType,
  LiabilityType,
  Frequency,
  GoalType,
  GoalMetric,
} from "@/lib/enum";
import type { Asset } from "@/lib/model/Asset";
import type { Liability } from "@/lib/model/Liability";
import type { Income } from "@/lib/model/Income";
import type { Expense } from "@/lib/model/Expense";
import type { Goal } from "@/lib/model/Goal.Base";
import type { TimeFixedGoal } from "@/lib/model/Goal.TimeFixed";
import type { MeasurableGoal } from "@/lib/model/Goal.Measurable";
import type { CommitmentGoal } from "@/lib/model/Goal.Commitment";
import type { User } from "@/lib/model/User";
import type { Commit } from "@/lib/model/Commit";
import type { Branch } from "@/lib/model/Branch";
import type { Activity } from "@/lib/model/Activity";

// --- CORE MOCKS ---

export const MOCK_ASSETS: Asset[] = [
  {
    id: "asset_1",
    name: "VTSAX",
    value: 842100,
    type: AssetType.Investment,
    growthRate: 0.07,
    color: "#3b82f6", // Blue
  },
  {
    id: "asset_2",
    name: "Primary Residence",
    value: 450000,
    type: AssetType.RealEstate,
    growthRate: 0.03,
    color: "#10b981", // Green
  },
  {
    id: "asset_3",
    name: "BTC / ETH",
    value: 125803.42,
    type: AssetType.Other,
    growthRate: 0.15,
    color: "#f43f5e", // Rose
  },
  {
    id: "asset_4",
    name: "HYSA",
    value: 65000,
    type: AssetType.Cash,
    growthRate: 0.045,
    color: "#06b6d4", // Cyan
  },
];

export const MOCK_LIABILITIES: Liability[] = [
  {
    id: "liab_1",
    name: "Mortgage",
    balance: 320000,
    type: LiabilityType.Mortgage,
    growthRate: 0.035,
  },
];

export const MOCK_INCOME: Income[] = [
  {
    id: "inc_1",
    name: "Senior Software Engineer Salary",
    amount: 15500,
    frequency: Frequency.Monthly,
    growthRate: 0.03,
  },
];

export const MOCK_EXPENSES: Expense[] = [
  {
    id: "exp_1",
    name: "Living Expenses",
    amount: 4500,
    frequency: Frequency.Monthly,
    inflationAdjusted: true,
    growthRate: 0.02,
  },
];

export const MOCK_USER: User = {
  name: "Sarah Chen",
  email: "sarah.chen@prosper.local",
  avatar:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&auto=format&fit=crop",
  birthDate: new Date("1992-04-15"),
  pastBranch: null as any,
  initialFinancialState: {
    assets: MOCK_ASSETS,
    liabilities: MOCK_LIABILITIES,
    income: MOCK_INCOME,
    expenses: MOCK_EXPENSES,
  },
  initialGoals: [],
};

export const MOCK_GOALS: Goal[] = [
  {
    id: "goal_retirement",
    name: "Standard Retirement",
    description: "Retire at age 65.",
    isCompleted: false,
    type: GoalType.TimeFixed,
    targetDate: new Date("2057-01-01"),
  } as TimeFixedGoal,
  {
    id: "goal_house",
    name: "Buy Dream Home",
    description: "Down payment for a house in Seattle.",
    isCompleted: false,
    type: GoalType.Measurable,
    targetMetric: GoalMetric.NetWorth,
    targetValue: 500000,
  } as MeasurableGoal,
  {
    id: "goal_family",
    name: "Start a Family",
    description: "Be financially ready for kids.",
    isCompleted: false,
    type: GoalType.Commitment,
  } as CommitmentGoal,
  {
    id: "goal_fi",
    name: "Financial Independence",
    description: "Reach $2M in liquid assets.",
    isCompleted: false,
    type: GoalType.Measurable,
    targetMetric: GoalMetric.NetWorth,
    targetValue: 2000000,
  } as MeasurableGoal,
];

MOCK_USER.initialGoals = MOCK_GOALS;

export const MOCK_COMMITS: Commit[] = [
  {
    id: "commit_1",
    parentId: null,
    message: "Initial state configuration",
    timestamp: new Date("2024-01-01"),
    author: MOCK_USER,
    actions: [],
  },
];

export const MOCK_BRANCHES: Branch[] = [
  {
    id: "branch_main",
    name: "main",
    commits: MOCK_COMMITS,
    goalChanges: [],
  },
  {
    id: "branch_early_fire",
    name: "early-fire",
    commits: MOCK_COMMITS,
    goalChanges: [{ id: "goal_retirement", nameTo: "Early Retirement" }],
  },
  {
    id: "branch_family_first",
    name: "family-first",
    commits: MOCK_COMMITS,
    goalChanges: [
      { id: "goal_family", isCompletedTo: true },
      { id: "goal_house", nameTo: "Buy Family Home" },
    ],
  },
];

MOCK_USER.pastBranch = MOCK_BRANCHES[0];

// --- COMPONENT SPECIFIC MOCKS ---

export const MOCK_ACTIVITIES: Activity[] = [
  {
    category: "DIVIDEND",
    title: "AAPL_Q3_PAYOUT",
    date: "2023-10-25",
    amount: "+$1,240.50",
    variant: "chart-2",
  },
  {
    category: "OUTFLOW",
    title: "MORTGAGE_PMT_012",
    date: "2023-10-24",
    amount: "-$2,850.00",
    variant: "destructive",
  },
  {
    category: "TRADE_BUY",
    title: "BTC_SPOT_0.42",
    date: "2023-10-23",
    amount: "-$15,000.00",
    variant: "primary",
  },
  {
    category: "INFLOW",
    title: "FREELANCE_STRIPE_DEP",
    date: "2023-10-22",
    amount: "+$8,400.00",
    variant: "chart-2",
  },
  {
    category: "DIVIDEND",
    title: "MSFT_MONTHLY",
    date: "2023-10-20",
    amount: "+$420.15",
    variant: "chart-2",
  },
];

export const MOCK_NET_WORTH_PULSE = {
  change30D: 4.2,
  sparkline: [30, 40, 35, 55, 45, 60, 75, 65, 85, 100],
};
