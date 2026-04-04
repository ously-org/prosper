import type { EntityType, CommitActionType } from "@/lib/enum";
import type { Asset, AssetChange } from "@/lib/model/Asset";
import type { Liability, LiabilityChange } from "@/lib/model/Liability";
import type { Income, IncomeChange } from "@/lib/model/Income";
import type { Expense, ExpenseChange } from "@/lib/model/Expense";

export type EntityMap = {
  ASSET: Asset;
  LIABILITY: Liability;
  INCOME: Income;
  EXPENSE: Expense;
};

export type EntityChangeMap = {
  ASSET: AssetChange;
  LIABILITY: LiabilityChange;
  INCOME: IncomeChange;
  EXPENSE: ExpenseChange;
};

export interface CommitActionAdd<T extends EntityType = EntityType> {
  type: typeof CommitActionType.Add;
  entityType: T;
  data: EntityMap[T];
}

export interface CommitActionDelete<T extends EntityType = EntityType> {
  type: typeof CommitActionType.Delete;
  entityType: T;
  entityId: string;
}

export interface CommitActionUpdate<T extends EntityType = EntityType> {
  type: typeof CommitActionType.Update;
  entityType: T;
  entityId: string;
  data: EntityChangeMap[T];
}

export interface CommitActionReplace<T extends EntityType = EntityType> {
  type: typeof CommitActionType.Replace;
  entityType: T;
  entityId: string;
  data: EntityMap[T];
}

export type CommitAction =
  | { [K in EntityType]: CommitActionAdd<K> }[EntityType]
  | { [K in EntityType]: CommitActionDelete<K> }[EntityType]
  | { [K in EntityType]: CommitActionUpdate<K> }[EntityType]
  | { [K in EntityType]: CommitActionReplace<K> }[EntityType];
