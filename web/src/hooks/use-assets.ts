import { useQuery } from "@tanstack/react-query";
import type { Asset } from "@/lib/model/Asset";
import { AssetType, LiabilityType, Frequency, GoalType, GoalMetric } from "@/lib/enum";
import type { Liability } from "@/lib/model/Liability";
import type { Income } from "@/lib/model/Income";
import type { Expense } from "@/lib/model/Expense";
import type { User } from "@/lib/model/User";
import type { Branch } from "@/lib/model/Branch";
import type { Commit } from "@/lib/model/Commit";
import type { Goal } from "@/lib/model/Goal.Base";
import type { FinancialState } from "@/lib/model/FinancialState";

import type { MeasurableGoal } from "@/lib/model/Goal.Measurable";
import type { TimeFixedGoal } from "@/lib/model/Goal.TimeFixed";
import type { CommitmentGoal } from "@/lib/model/Goal.Commitment";

// --- MOCK DATA ---

const MOCK_ASSETS: Asset[] = [
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

const MOCK_LIABILITIES: Liability[] = [
  {
    id: "liab_1",
    name: "Mortgage",
    balance: 320000,
    type: LiabilityType.Mortgage,
    growthRate: 0.035,
  },
];

const MOCK_INCOME: Income[] = [
  {
    id: "inc_1",
    name: "Senior Software Engineer Salary",
    amount: 15500,
    frequency: Frequency.Monthly,
    growthRate: 0.03,
  },
];

const MOCK_EXPENSES: Expense[] = [
  {
    id: "exp_1",
    name: "Living Expenses",
    amount: 4500,
    frequency: Frequency.Monthly,
    inflationAdjusted: true,
    growthRate: 0.02,
  },
];

const MOCK_USER: Partial<User> = {
  name: "Sarah Chen",
  email: "sarah.chen@prosper.local",
  avatar:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&auto=format&fit=crop",
  birthDate: new Date("1992-04-15"),
};

const MOCK_GOALS: Goal[] = [
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

const MOCK_COMMITS: Commit[] = [
  {
    id: "commit_1",
    parentId: null,
    message: "Initial state configuration",
    timestamp: new Date("2024-01-01"),
    author: MOCK_USER as User,
    actions: [],
  },
];

const MOCK_BRANCHES: Branch[] = [
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
    goalChanges: [
      {
        id: "goal_retirement",
        nameTo: "Early Retirement",
        targetDateTo: new Date("2042-01-01"), // Age 50
      },
      {
        id: "goal_fi",
        targetValueBy: 500000, // Increase target to $2.5M
      },
    ],
  },
  {
    id: "branch_family_first",
    name: "family-first",
    commits: MOCK_COMMITS,
    goalChanges: [
      {
        id: "goal_family",
        isCompletedTo: true,
      },
      {
        id: "goal_house",
        nameTo: "Buy Family Home",
        targetValueBy: 200000, // Increase downpayment to $700k
      },
    ],
  },
];

// --- HOOKS ---

export function useAssets() {
  return useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return MOCK_ASSETS;
    },
  });
}

export function useLiabilities() {
  return useQuery({
    queryKey: ["liabilities"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return MOCK_LIABILITIES;
    },
  });
}

export function useIncome() {
  return useQuery({
    queryKey: ["income"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return MOCK_INCOME;
    },
  });
}

export function useExpenses() {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return MOCK_EXPENSES;
    },
  });
}

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return MOCK_USER;
    },
  });
}

export function useGoals() {
  return useQuery({
    queryKey: ["goals"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return MOCK_GOALS;
    },
  });
}

export function useBranches() {
  return useQuery({
    queryKey: ["branches"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return MOCK_BRANCHES;
    },
  });
}

export function useCommits() {
  return useQuery({
    queryKey: ["commits"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return MOCK_COMMITS;
    },
  });
}

export function useFinancialState() {
  return useQuery({
    queryKey: ["financial-state"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return {
        assets: MOCK_ASSETS,
        liabilities: MOCK_LIABILITIES,
        income: MOCK_INCOME,
        expenses: MOCK_EXPENSES,
      } as FinancialState;
    },
  });
}
