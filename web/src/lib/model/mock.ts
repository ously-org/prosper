import {
  AssetType,
  LiabilityType,
  Frequency,
  GoalType,
  GoalMetric,
  CommitActionType,
  EntityType,
} from "@/lib/enum";
import type { Asset } from "@/lib/model/Asset";
import type { Liability } from "@/lib/model/Liability";
import type { Income } from "@/lib/model/Income";
import type { Expense } from "@/lib/model/Expense";
import type { Goal } from "@/lib/model/Goal.Base";
import type { TimeFixedGoal } from "@/lib/model/Goal.TimeFixed";
import type { User } from "@/lib/model/User";
import type { Commit } from "@/lib/model/Commit";
import type { Branch } from "@/lib/model/Branch";
import type { Activity } from "@/lib/model/Activity";

export const MOCK_ASSETS: Asset[] = [
  {
    id: "asset_hysa",
    name: "Savings Account (HYSA)",
    value: 55000,
    type: AssetType.Cash,
    growthRate: 0.045,
    color: "#06b6d4", // Cyan
  },
  {
    id: "asset_vtsax",
    name: "VTSAX (Total Stock Market)",
    value: 62000,
    type: AssetType.Investment,
    growthRate: 0.07,
    color: "#3b82f6", // Blue
  },
  {
    id: "asset_btc",
    name: "Bitcoin (BTC)",
    value: 20000,
    type: AssetType.Other,
    growthRate: 0.15,
    color: "#f43f5e", // Rose
  },
  {
    id: "asset_land",
    name: "Small Plot of Land",
    value: 8500,
    type: AssetType.RealEstate,
    growthRate: 0.03,
    color: "#10b981", // Green
  },
];

export const MOCK_LIABILITIES: Liability[] = [];

export const MOCK_INCOME: Income[] = [
  {
    id: "inc_job",
    name: "Main Job (Senior Developer)",
    amount: 75000,
    frequency: Frequency.Monthly,
    growthRate: 0.03,
  },
  {
    id: "inc_freelance",
    name: "Freelance (Consulting)",
    amount: 15000,
    frequency: Frequency.Monthly,
    growthRate: 0.02,
  },
];

export const MOCK_EXPENSES: Expense[] = [
  {
    id: "exp_living",
    name: "Living Expenses",
    amount: 35000,
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
  birthDate: new Date("1996-01-04"), // Age 30
  pastBranch: null as any,
  initialFinancialState: {
    assets: [
      {
        id: "asset_hysa",
        name: "Savings Account (HYSA)",
        value: 10000,
        type: AssetType.Cash,
        growthRate: 0.045,
        color: "#06b6d4",
      },
      {
        id: "asset_vtsax",
        name: "VTSAX (Total Stock Market)",
        value: 2000,
        type: AssetType.Investment,
        growthRate: 0.07,
        color: "#3b82f6",
      },
      {
        id: "asset_btc",
        name: "Bitcoin (BTC)",
        value: 1000,
        type: AssetType.Other,
        growthRate: 0.15,
        color: "#f43f5e",
      },
      {
        id: "asset_land",
        name: "Small Plot of Land",
        value: 5000,
        type: AssetType.RealEstate,
        growthRate: 0.03,
        color: "#10b981",
      },
    ],
    liabilities: [],
    income: MOCK_INCOME,
    expenses: MOCK_EXPENSES,
  },
  initialGoals: [],
};

export const MOCK_GOALS: Goal[] = [
  {
    id: "goal_retire_40",
    name: "Retire at Age 40",
    description: "Achieve financial independence by 40.",
    isCompleted: false,
    type: GoalType.TimeFixed,
    targetDate: new Date("2036-01-04"),
  } as TimeFixedGoal,
];

MOCK_USER.initialGoals = MOCK_GOALS;

export const MOCK_COMMITS: Commit[] = [
  {
    id: "commit_initial",
    parentId: null,
    message: "Initial state configuration (3 months ago)",
    timestamp: new Date("2026-01-04"),
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
    id: "branch_biz_success",
    name: "business-success",
    commits: [
      ...MOCK_COMMITS,
      {
        id: "commit_biz_launch_success",
        parentId: "commit_initial",
        message: "Launch Successful Business Experiment",
        timestamp: new Date("2026-07-01"),
        author: MOCK_USER,
        actions: [
          {
            type: CommitActionType.Delete,
            entityType: EntityType.Income,
            entityId: "inc_job",
          },
          {
            type: CommitActionType.Add,
            entityType: EntityType.Income,
            data: {
              id: "inc_biz_high",
              name: "Software Agency Revenue",
              amount: 300000,
              frequency: Frequency.Monthly,
              growthRate: 0.05,
            },
          },
        ],
      },
    ],
    goalChanges: [{ id: "goal_retire_40", nameTo: "Early Retirement (Business)" }],
  },
  {
    id: "branch_biz_failure",
    name: "business-failed",
    commits: [
      ...MOCK_COMMITS,
      {
        id: "commit_biz_launch_fail",
        parentId: "commit_initial",
        message: "Launch Business (High Risk)",
        timestamp: new Date("2026-07-01"),
        author: MOCK_USER,
        actions: [
          {
            type: CommitActionType.Delete,
            entityType: EntityType.Income,
            entityId: "inc_job",
          },
          {
            type: CommitActionType.Add,
            entityType: EntityType.Income,
            data: {
              id: "inc_biz_low",
              name: "Freelance Agency (Transition)",
              amount: 15000,
              frequency: Frequency.Monthly,
              growthRate: 0.01,
            },
          },
        ],
      },
      {
        id: "commit_revert_job",
        parentId: "commit_biz_launch_fail",
        message: "Business Failed: Reverting to Corporate Job",
        timestamp: new Date("2027-01-01"),
        author: MOCK_USER,
        actions: [
          {
            type: CommitActionType.Delete,
            entityType: EntityType.Income,
            entityId: "inc_biz_low",
          },
          {
            type: CommitActionType.Add,
            entityType: EntityType.Income,
            data: {
              id: "inc_job_new",
              name: "Senior Developer (New Company)",
              amount: 80000,
              frequency: Frequency.Monthly,
              growthRate: 0.03,
            },
          },
        ],
      },
    ],
    goalChanges: [],
  },
];

MOCK_USER.pastBranch = MOCK_BRANCHES[0];

// --- COMPONENT SPECIFIC MOCKS ---

export const MOCK_ACTIVITIES: Activity[] = [
  {
    category: "INFLOW",
    title: "Main Job Salary (Mar)",
    date: "2026-03-31",
    amount: "+75,000.00",
    variant: "chart-2",
  },
  {
    category: "INFLOW",
    title: "Freelance Payout (Mar)",
    date: "2026-03-15",
    amount: "+15,000.00",
    variant: "primary",
  },
  {
    category: "OUTFLOW",
    title: "Living Expenses (Mar)",
    date: "2026-03-05",
    amount: "-35,000.00",
    variant: "destructive",
  },
  {
    category: "INFLOW",
    title: "Main Job Salary (Feb)",
    date: "2026-02-28",
    amount: "+75,000.00",
    variant: "chart-2",
  },
  {
    category: "INFLOW",
    title: "Freelance Payout (Feb)",
    date: "2026-02-15",
    amount: "+15,000.00",
    variant: "primary",
  },
  {
    category: "OUTFLOW",
    title: "Living Expenses (Feb)",
    date: "2026-02-05",
    amount: "-35,000.00",
    variant: "destructive",
  },
  {
    category: "INFLOW",
    title: "Main Job Salary (Jan)",
    date: "2026-01-31",
    amount: "+75,000.00",
    variant: "chart-2",
  },
  {
    category: "INFLOW",
    title: "Freelance Payout (Jan)",
    date: "2026-01-15",
    amount: "+15,000.00",
    variant: "primary",
  },
  {
    category: "OUTFLOW",
    title: "Living Expenses (Jan)",
    date: "2026-01-05",
    amount: "-35,000.00",
    variant: "destructive",
  },
];

export const MOCK_NET_WORTH_PULSE = {
  change30D: 2.5,
  sparkline: [120, 125, 128, 132, 130, 135, 138, 140, 142, 145],
};
