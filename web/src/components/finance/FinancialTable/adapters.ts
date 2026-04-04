import { Frequency, CommitActionType, EntityType } from "@/lib/enum";
import type { Asset } from "@/lib/model/Asset";
import type { Liability } from "@/lib/model/Liability";
import type { Income } from "@/lib/model/Income";
import type { Expense } from "@/lib/model/Expense";
import type {
  CommitAction,
  CommitActionUpdate,
  CommitActionAdd,
} from "@/lib/model/CommitAction";
import { ASSET_TYPE_TEXT, LIABILITY_TYPE_TEXT } from "@/components/const";

export interface FinancialTableConfig {
  valueLabel: string;
  rateLabel: string;
  entityType: EntityType;
  valueKey: string;
}

export const FINANCIAL_TABLE_CONTROLS: Record<EntityType, FinancialTableConfig> = {
  [EntityType.Asset]: {
    valueLabel: "Market Value",
    rateLabel: "Performance (1M)",
    entityType: EntityType.Asset,
    valueKey: "valueBy",
  },
  [EntityType.Liability]: {
    valueLabel: "Balance",
    rateLabel: "Growth Rate (1M)",
    entityType: EntityType.Liability,
    valueKey: "balanceBy",
  },
  [EntityType.Income]: {
    valueLabel: "Amount",
    rateLabel: "Growth Rate (1M)",
    entityType: EntityType.Income,
    valueKey: "amountBy",
  },
  [EntityType.Expense]: {
    valueLabel: "Amount",
    rateLabel: "Growth Rate (1M)",
    entityType: EntityType.Expense,
    valueKey: "amountBy",
  },
};

export interface FinancialItem {
  id: string;
  name: string;
  category: string;
  primaryValue: number;
  rate?: number; // Growth, Interest, etc.
  allocation: number;
  color?: string;
  isStaged?: boolean;
}

export interface FinancialGroup {
  category: string;
  totalValue: number;
  totalAllocation: number;
  weightedRate?: number;
  items: FinancialItem[];
}

export function mergeStagedActions(
  items: FinancialItem[],
  stagedActions: CommitAction[],
  entityType: EntityType,
  valueKey: string,
): FinancialItem[] {
  let result = [...items];

  // 1. Handle Deletes
  const deletedIds = new Set(
    stagedActions
      .filter(
        (a) =>
          a.type === CommitActionType.Delete && a.entityType === entityType,
      )
      .map((a) => (a as any).entityId),
  );
  result = result.filter((item) => !deletedIds.has(item.id));

  // 2. Handle Updates
  stagedActions
    .filter(
      (a) => a.type === CommitActionType.Update && a.entityType === entityType,
    )
    .forEach((action) => {
      const update = action as CommitActionUpdate;
      const index = result.findIndex((i) => i.id === update.entityId);
      if (index > -1) {
        const data = update.data as any;
        result[index] = {
          ...result[index],
          name: data.nameTo ?? result[index].name,
          primaryValue:
            data[valueKey] !== undefined
              ? result[index].primaryValue + data[valueKey]
              : result[index].primaryValue,
          isStaged: true,
        };
      }
    });

  // 3. Handle Adds
  stagedActions
    .filter(
      (a) => a.type === CommitActionType.Add && a.entityType === entityType,
    )
    .forEach((action) => {
      const add = action as CommitActionAdd;
      const data = add.data as any;

      // Determine value based on entity type
      let primaryValue = 0;
      if (entityType === EntityType.Asset) primaryValue = data.value;
      else if (entityType === EntityType.Liability) primaryValue = data.balance;
      else primaryValue = data.amount;

      result.push({
        id: data.id,
        name: data.name,
        category: data.categoryName || "Other", // Use category name from data
        primaryValue: primaryValue,
        rate: data.growthRate !== undefined ? data.growthRate * 100 : undefined,
        allocation: 0, // Will be recalculated by grouping
        color: data.color || "var(--primary)",
        isStaged: true,
      });
    });

  return result;
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

export function mapLiabilitiesToItems(
  liabilities: Liability[],
): FinancialItem[] {
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
    category:
      i.frequency === Frequency.Monthly ? "Monthly Income" : "Annual Income",
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
    category:
      e.frequency === Frequency.Monthly ? "Monthly Expense" : "Annual Expense",
    primaryValue: e.amount,
    rate: (e.growthRate / 12) * 100, // Monthly growth rate
    allocation: parseFloat(((e.amount / totalValue) * 100).toFixed(1)),
    color: "hsl(var(--destructive))",
  }));
}

export function groupItemsByCategory(items: FinancialItem[]): FinancialGroup[] {
  const grouped = items.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = {
          category: item.category,
          items: [],
          totalValue: 0,
          totalAllocation: 0,
        };
      }
      acc[item.category].items.push(item);
      acc[item.category].totalValue += item.primaryValue;
      acc[item.category].totalAllocation += item.allocation;
      return acc;
    },
    {} as Record<string, FinancialGroup>,
  );

  return Object.values(grouped).map((g) => {
    // Calculate weighted average rate: sum(value * rate) / sum(value)
    let weightedRate = 0;
    const itemsWithRate = g.items.filter((i) => i.rate !== undefined);

    if (itemsWithRate.length > 0 && g.totalValue > 0) {
      const totalWeightedValue = itemsWithRate.reduce(
        (sum, i) => sum + i.primaryValue * (i.rate || 0),
        0,
      );
      weightedRate = totalWeightedValue / g.totalValue;
    }

    return {
      ...g,
      totalAllocation: parseFloat(g.totalAllocation.toFixed(1)),
      weightedRate: itemsWithRate.length > 0 ? weightedRate : undefined,
    };
  });
}
