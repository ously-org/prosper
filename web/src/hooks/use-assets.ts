import { useQuery } from "@tanstack/react-query";
import type { FinancialState } from "@/lib/model/FinancialState";
import {
  MOCK_ASSETS,
  MOCK_LIABILITIES,
  MOCK_INCOME,
  MOCK_EXPENSES,
  MOCK_USER,
  MOCK_GOALS,
  MOCK_BRANCHES,
  MOCK_COMMITS,
  MOCK_ACTIVITIES,
} from "@/lib/model/mock";

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

export function useActivities() {
  return useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return MOCK_ACTIVITIES;
    },
  });
}
