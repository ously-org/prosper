import {
  AssetType,
  Frequency,
  GoalType,
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

// Initial assets 3 months ago (Jan 4, 2026)
export const MOCK_ASSETS: Asset[] = [
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
    assets: MOCK_ASSETS,
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

// --- COMPLETED COMMITS (Actual History) ---

export const MOCK_HISTORY_COMMITS: Commit[] = [
  {
    id: "commit_initial",
    parentId: null,
    message: "Initial state configuration (Jan 4, 2026)",
    timestamp: new Date("2026-01-04"),
    author: MOCK_USER,
    actions: [],
  },
  {
    id: "commit_jan_review",
    parentId: "commit_initial",
    message: "January Progress: Salary + Freelance Savings",
    timestamp: new Date("2026-01-31"),
    author: MOCK_USER,
    actions: [
      {
        type: CommitActionType.Update,
        entityType: EntityType.Asset,
        entityId: "asset_hysa",
        data: { valueBy: 55000 },
      },
    ],
  },
  {
    id: "commit_feb_review",
    parentId: "commit_jan_review",
    message: "February Progress: Salary + Freelance Savings",
    timestamp: new Date("2026-02-28"),
    author: MOCK_USER,
    actions: [
      {
        type: CommitActionType.Update,
        entityType: EntityType.Asset,
        entityId: "asset_hysa",
        data: { valueBy: 55000 },
      },
    ],
  },
  {
    id: "commit_mar_review",
    parentId: "commit_feb_review",
    message: "March Progress: Salary + Freelance Savings",
    timestamp: new Date("2026-03-31"),
    author: MOCK_USER,
    actions: [
      {
        type: CommitActionType.Update,
        entityType: EntityType.Asset,
        entityId: "asset_hysa",
        data: { valueBy: 55000 },
      },
    ],
  },
];

// --- PAST BRANCH (History Branch - Commits Already Done) ---

export const MOCK_HISTORY_BRANCH: Branch = {
  id: "branch_history",
  name: "history",
  commits: MOCK_HISTORY_COMMITS,
  goalChanges: [],
};

MOCK_USER.pastBranch = MOCK_HISTORY_BRANCH;

// --- CURRENT BRANCHES (Future Plans - No History Commits Here) ---

export const MOCK_BRANCHES: Branch[] = [
  {
    id: "branch_main",
    name: "main",
    commits: [
      {
        id: "commit_main_path",
        parentId: "commit_mar_review",
        message: "Continue Main Job (Stability Path)",
        timestamp: new Date("2030-01-01"), // Planned for future
        author: MOCK_USER,
        actions: [
          {
            type: CommitActionType.Update,
            entityType: EntityType.Income,
            entityId: "inc_job",
            data: { nameTo: "Senior Developer (Corporate Lead)", amountBy: 10000 },
          },
        ],
      },
    ],
    goalChanges: [],
  },
  {
    id: "branch_biz_success",
    name: "business-success",
    commits: [
      {
        id: "commit_biz_launch_success",
        parentId: "commit_mar_review",
        message: "Launch Successful Business Experiment",
        timestamp: new Date("2026-07-01"), // Planned for future
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
      {
        id: "commit_biz_launch_fail",
        parentId: "commit_mar_review",
        message: "Launch Business (High Risk)",
        timestamp: new Date("2026-07-01"), // Planned for future
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
        timestamp: new Date("2027-01-01"), // Planned for future
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

MOCK_USER.pastBranch = MOCK_HISTORY_BRANCH;

export const MOCK_NET_WORTH_PULSE = {
  change30D: 2.5,
  sparkline: [120, 125, 128, 132, 130, 135, 138, 140, 142, 145],
};
