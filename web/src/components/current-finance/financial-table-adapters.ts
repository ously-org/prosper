import { Frequency } from "@/lib/enum";
import type { Asset } from "@/lib/model/Asset";
import type { Liability } from "@/lib/model/Liability";
import type { Income } from "@/lib/model/Income";
import type { Expense } from "@/lib/model/Expense";
import { ASSET_TYPE_TEXT, LIABILITY_TYPE_TEXT } from "@/components/const";

export interface FinancialItem {
  id: string;
  name: string;
  category: string;
  primaryValue: number;
  rate?: number; // Growth, Interest, etc.
  allocation: number;
  color?: string;
}

export interface FinancialGroup {
  category: string;
  totalValue: number;
  totalAllocation: number;
  weightedRate?: number;
  items: FinancialItem[];
}

export function mapAssetsToItems(assets: Asset[]): FinancialItem[] {
  const totalValue = assets.reduce((sum, a) => sum + a.value, 0) || 1;
  return assets.map((a) => ({
    id: a.id,
    name: a.name,
    category: ASSET_TYPE_TEXT[a.type] || "Asset",
    primaryValue: a.value,
    rate: (a.growthRate / 12) * 100, // Monthly growth rate
    allocation: parseFloat(((a.value / totalValue) * 100).toFixed(1)),
    color: a.color || "var(--primary)",
  }));
}

export function mapLiabilitiesToItems(liabilities: Liability[]): FinancialItem[] {
  const totalValue = liabilities.reduce((sum, l) => sum + l.balance, 0) || 1;
  return liabilities.map((l) => ({
    id: l.id,
    name: l.name,
    category: LIABILITY_TYPE_TEXT[l.type] || "Liability",
    primaryValue: l.balance,
    rate: (l.growthRate / 12) * 100, // Monthly growth rate
    allocation: parseFloat(((l.balance / totalValue) * 100).toFixed(1)),
    color: "hsl(var(--destructive))",
  }));
}

export function mapIncomeToItems(income: Income[]): FinancialItem[] {
  const totalValue = income.reduce((sum, i) => sum + i.amount, 0) || 1;
  return income.map((i) => ({
    id: i.id,
    name: i.name,
    category: i.frequency === Frequency.Monthly ? "Monthly Income" : "Annual Income",
    primaryValue: i.amount,
    rate: (i.growthRate / 12) * 100, // Monthly growth rate
    allocation: parseFloat(((i.amount / totalValue) * 100).toFixed(1)),
    color: "hsl(var(--chart-2))",
  }));
}

export function mapExpensesToItems(expenses: Expense[]): FinancialItem[] {
  const totalValue = expenses.reduce((sum, e) => sum + e.amount, 0) || 1;
  return expenses.map((e) => ({
    id: e.id,
    name: e.name,
    category: e.frequency === Frequency.Monthly ? "Monthly Expense" : "Annual Expense",
    primaryValue: e.amount,
    rate: (e.growthRate / 12) * 100, // Monthly growth rate
    allocation: parseFloat(((e.amount / totalValue) * 100).toFixed(1)),
    color: "hsl(var(--destructive))",
  }));
}

export function groupItemsByCategory(items: FinancialItem[]): FinancialGroup[] {
  const grouped = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = { category: item.category, items: [], totalValue: 0, totalAllocation: 0 };
    }
    acc[item.category].items.push(item);
    acc[item.category].totalValue += item.primaryValue;
    acc[item.category].totalAllocation += item.allocation;
    return acc;
  }, {} as Record<string, FinancialGroup>);

  return Object.values(grouped).map(g => {
    // Calculate weighted average rate: sum(value * rate) / sum(value)
    let weightedRate = 0;
    const itemsWithRate = g.items.filter(i => i.rate !== undefined);
    
    if (itemsWithRate.length > 0 && g.totalValue > 0) {
      const totalWeightedValue = itemsWithRate.reduce((sum, i) => sum + (i.primaryValue * (i.rate || 0)), 0);
      weightedRate = totalWeightedValue / g.totalValue;
    }

    return {
      ...g,
      totalAllocation: parseFloat(g.totalAllocation.toFixed(1)),
      weightedRate: itemsWithRate.length > 0 ? weightedRate : undefined
    };
  });
}
