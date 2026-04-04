import type { Income, IncomeChange } from "@/lib/model/Income";
import { applyIncomeChange } from "@/lib/model/Income";
import type { Expense, ExpenseChange } from "@/lib/model/Expense";
import { applyExpenseChange } from "@/lib/model/Expense";
import { income, setIncome, expenses, setExpenses } from "./state";
import { delay } from "./utils";

export async function fetchIncome() {
  await delay(300);
  return income;
}

export async function updateIncome(inc: Income) {
  await delay(300);
  setIncome(income.map((i) => (i.id === inc.id ? inc : i)));
  return inc;
}

export async function addIncome(inc: Income) {
  await delay(300);
  setIncome([...income, inc]);
  return inc;
}

export async function deleteIncome(id: string) {
  await delay(300);
  setIncome(income.filter((i) => i.id !== id));
}

export async function fetchExpenses() {
  await delay(300);
  return expenses;
}

export async function updateExpense(exp: Expense) {
  await delay(300);
  setExpenses(expenses.map((e) => (e.id === exp.id ? exp : e)));
  return exp;
}

export async function addExpense(exp: Expense) {
  await delay(300);
  setExpenses([...expenses, exp]);
  return exp;
}

export async function deleteExpense(id: string) {
  await delay(300);
  setExpenses(expenses.filter((e) => e.id !== id));
}

export function internalApplyIncomeChange(id: string, change: IncomeChange) {
  setIncome(income.map((i) => (i.id === id ? applyIncomeChange(i, change) : i)));
}

export function internalReplaceIncome(id: string, inc: Income) {
  setIncome(income.map((i) => (i.id === id ? inc : i)));
}

export function internalApplyExpenseChange(id: string, change: ExpenseChange) {
  setExpenses(expenses.map((e) => (e.id === id ? applyExpenseChange(e, change) : e)));
}

export function internalReplaceExpense(id: string, exp: Expense) {
  setExpenses(expenses.map((e) => (e.id === id ? exp : e)));
}
