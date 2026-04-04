import {
  MOCK_ASSETS,
  MOCK_LIABILITIES,
  MOCK_INCOME,
  MOCK_EXPENSES,
  MOCK_USER,
  MOCK_GOALS,
  MOCK_BRANCHES,
} from "@/lib/model/mock";
import type { Asset } from "@/lib/model/Asset";
import type { Liability } from "@/lib/model/Liability";
import type { Income } from "@/lib/model/Income";
import type { Expense } from "@/lib/model/Expense";
import type { Goal } from "@/lib/model/Goal.Base";
import type { User } from "@/lib/model/User";

// --- IN-MEMORY STATE ---

export let assets = [...MOCK_ASSETS];
export let liabilities = [...MOCK_LIABILITIES];
export let income = [...MOCK_INCOME];
export let expenses = [...MOCK_EXPENSES];
export let user = { ...MOCK_USER };
export let goals = [...MOCK_GOALS];
export const branches = [...MOCK_BRANCHES];

// --- STATE SETTERS ---

export const setAssets = (newAssets: Asset[]) => {
  assets = newAssets;
};
export const setLiabilities = (newLiabilities: Liability[]) => {
  liabilities = newLiabilities;
};
export const setIncome = (newIncome: Income[]) => {
  income = newIncome;
};
export const setExpenses = (newExpenses: Expense[]) => {
  expenses = newExpenses;
};
export const setUser = (newUser: User) => {
  user = newUser;
};
export const setGoals = (newGoals: Goal[]) => {
  goals = newGoals;
};
