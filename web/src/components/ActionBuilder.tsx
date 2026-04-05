import { useState } from "react";
import { RiAddLine, RiDeleteBinLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  EntityType,
  CommitActionType,
  Frequency,
  AssetType,
  LiabilityType,
} from "@/lib/enum";
import type { CommitAction } from "@/lib/model/CommitAction";
import { useAssets } from "@/hooks/use-assets";
import { useLiabilities } from "@/hooks/use-liabilities";
import { useIncome, useExpenses } from "@/hooks/use-budget";
import { cn } from "@/lib/utils";

const ACTION_TYPE_TEXT: Record<string, string> = {
  [CommitActionType.Add]: "ADD",
  [CommitActionType.Delete]: "DELETE",
  [CommitActionType.Update]: "UPDATE",
};

interface ActionBuilderProps {
  actions: CommitAction[];
  onActionsChange: (actions: CommitAction[]) => void;
  title?: string;
  entityTypeFilter?: EntityType;
  className?: string;
  showActionsList?: boolean;
}

export function ActionBuilder({ 
  actions, 
  onActionsChange, 
  title = "Planned Actions",
  entityTypeFilter,
  className,
  showActionsList = true
}: ActionBuilderProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newActionType, setNewActionType] = useState<CommitActionType>(
    CommitActionType.Add,
  );
  const [newEntityType, setNewEntityType] = useState<EntityType>(
    entityTypeFilter || EntityType.Asset,
  );

  // Fetch current entities for UPDATE/DELETE selection
  const { data: assets } = useAssets();
  const { data: liabilities } = useLiabilities();
  const { data: income } = useIncome();
  const { data: expenses } = useExpenses();

  const getEntityList = (type: EntityType) => {
    switch (type) {
      case EntityType.Asset:
        return assets || [];
      case EntityType.Liability:
        return liabilities || [];
      case EntityType.Income:
        return income || [];
      case EntityType.Expense:
        return expenses || [];
      default:
        return [];
    }
  };

  const [selectedEntityId, setSelectedEntityId] = useState<string>("");
  const [actionData, setActionData] = useState<any>({
    name: "",
    value: 0,
    amount: 0,
    frequency: Frequency.Monthly,
    growthRate: 0,
    type: "other",
  });

  const handleAddAction = () => {
    let action: CommitAction;

    if (newActionType === CommitActionType.Add) {
      const data: any = {
        id: `new_${Date.now()}`,
        name: actionData.name || `New ${newEntityType.toLowerCase()}`,
      };

      if (newEntityType === EntityType.Asset) {
        data.value = Number(actionData.value);
        data.type = actionData.type as AssetType;
        data.growthRate = Number(actionData.growthRate);
      } else if (newEntityType === EntityType.Liability) {
        data.balance = Number(actionData.value);
        data.type = actionData.type as LiabilityType;
        data.growthRate = Number(actionData.growthRate);
      } else {
        data.amount = Number(actionData.amount);
        data.frequency = actionData.frequency;
        data.growthRate = Number(actionData.growthRate);
      }

      action = {
        type: CommitActionType.Add,
        entityType: newEntityType,
        data: data,
      } as CommitAction;
    } else if (newActionType === CommitActionType.Delete) {
      action = {
        type: CommitActionType.Delete,
        entityType: newEntityType,
        entityId: selectedEntityId,
      } as CommitAction;
    } else {
      // Update logic
      const changes: any = {};
      if (
        newEntityType === EntityType.Asset ||
        newEntityType === EntityType.Liability
      ) {
        if (actionData.value !== 0) {
          if (newEntityType === EntityType.Asset)
            changes.valueBy = Number(actionData.value);
          else changes.balanceBy = Number(actionData.value);
        }
      } else {
        if (actionData.amount !== 0)
          changes.amountBy = Number(actionData.amount);
      }

      action = {
        type: CommitActionType.Update,
        entityType: newEntityType,
        entityId: selectedEntityId,
        data: changes,
      } as CommitAction;
    }

    onActionsChange([...actions, action]);
    setIsAdding(false);
    resetForm();
  };

  const removeAction = (index: number) => {
    const nextActions = [...actions];
    nextActions.splice(index, 1);
    onActionsChange(nextActions);
  };

  const resetForm = () => {
    setSelectedEntityId("");
    setActionData({
      name: "",
      value: 0,
      amount: 0,
      frequency: Frequency.Monthly,
      growthRate: 0,
      type: "other",
    });
  };

  return (
    <div className={cn("flex flex-col gap-6 py-6 px-6 bg-surface-container/50 border-t border-border/10 w-full max-w-full", className)}>
      <div className="flex items-center justify-between">
        <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest font-mono">
          {title}
        </h4>
        {!isAdding && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAdding(true)}
            className="h-7 px-2 text-[10px] font-bold text-primary hover:bg-primary/10 gap-1.5"
          >
            <RiAddLine className="w-3 h-3" />
            Add Action
          </Button>
        )}
      </div>

      {showActionsList && (
        <div className="flex flex-col gap-2 w-full">
          {actions.map((action, idx) => (
            <div
              key={idx}
              className="grid grid-cols-[60px_80px_1fr_24px] items-center gap-4 py-2 px-3 bg-surface-container-highest/40 border border-border/5 rounded-sm group/action w-full"
            >
              <Badge
                variant="outline"
                className="text-[9px] px-0 py-0 h-4 font-bold tracking-wider border-border/20 flex justify-center w-[50px]"
              >
                {ACTION_TYPE_TEXT[action.type]}
              </Badge>
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-tight">
                {action.entityType}
              </span>
              <span className="text-xs font-mono text-foreground truncate min-w-0">
                {action.type === CommitActionType.Add
                  ? (action.data as any).name
                  : action.entityId}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6 opacity-0 group-hover/action:opacity-100 hover:text-destructive transition-all flex-shrink-0 justify-self-end"
                onClick={() => removeAction(idx)}
              >
                <RiDeleteBinLine className="w-3 h-3" />
              </Button>
            </div>
          ))}

          {actions.length === 0 && !isAdding && (
            <div className="py-8 text-center border border-dashed border-border/10 rounded-sm w-full">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-40">
                No actions defined
              </span>
            </div>
          )}
        </div>
      )}

      {isAdding && (
        <div className="mt-4 p-6 bg-surface-container-highest rounded-md border border-primary/20 ring-1 ring-primary/10 animate-in fade-in slide-in-from-top-2 duration-200 w-full min-w-0 overflow-hidden">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-3 bg-primary rounded-full" />
            <h5 className="text-[10px] font-bold text-foreground uppercase tracking-widest font-mono">
              New Financial Action
            </h5>
          </div>

          <div className="flex flex-col gap-4 mb-6 w-full">
            <div className="grid grid-cols-[130px_1fr] items-center gap-4 min-w-0">
              <label className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-wider">
                Action Type
              </label>
              <Select
                value={newActionType}
                onValueChange={(v) => setNewActionType(v as CommitActionType)}
              >
                <SelectTrigger className="h-8 text-xs font-mono bg-surface-container border-border/20 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-surface-container-highest border-border/20">
                  <SelectItem
                    value={CommitActionType.Add}
                    className="text-xs font-mono"
                  >
                    ADD (New Entity)
                  </SelectItem>
                  <SelectItem
                    value={CommitActionType.Update}
                    className="text-xs font-mono"
                  >
                    UPDATE (Existing)
                  </SelectItem>
                  <SelectItem
                    value={CommitActionType.Delete}
                    className="text-xs font-mono"
                  >
                    DELETE (Existing)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            {!entityTypeFilter && (
              <div className="grid grid-cols-[130px_1fr] items-center gap-4 min-w-0">
                <label className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-wider">
                  Entity Type
                </label>
                <Select
                  value={newEntityType}
                  onValueChange={(v) => {
                    setNewEntityType(v as EntityType);
                    resetForm();
                  }}
                >
                  <SelectTrigger className="h-8 text-xs font-mono bg-surface-container border-border/20 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-surface-container-highest border-border/20">
                    <SelectItem
                      value={EntityType.Asset}
                      className="text-xs font-mono"
                    >
                      Asset
                    </SelectItem>
                    <SelectItem
                      value={EntityType.Liability}
                      className="text-xs font-mono"
                    >
                      Liability
                    </SelectItem>
                    <SelectItem
                      value={EntityType.Income}
                      className="text-xs font-mono"
                    >
                      Income
                    </SelectItem>
                    <SelectItem
                      value={EntityType.Expense}
                      className="text-xs font-mono"
                    >
                      Expense
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="space-y-4 border-t border-border/10 pt-6 w-full">
            {newActionType === CommitActionType.Add ? (
              <div className="flex flex-col gap-4 w-full">
                <div className="grid grid-cols-[130px_1fr] items-center gap-4 min-w-0">
                  <label className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-wider">
                    Entity Name
                  </label>
                  <Input
                    placeholder="e.g., Retirement Fund"
                    value={actionData.name}
                    onChange={(e) =>
                      setActionData({ ...actionData, name: e.target.value })
                    }
                    className="h-8 text-xs font-mono bg-surface-container w-full"
                  />
                </div>
                <div className="grid grid-cols-[130px_1fr] items-center gap-4 min-w-0">
                  <label className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-wider">
                    {newEntityType === EntityType.Asset ||
                    newEntityType === EntityType.Liability
                      ? "Initial Value"
                      : "Monthly Amount"}
                  </label>
                  <Input
                    type="number"
                    value={
                      newEntityType === EntityType.Asset ||
                      newEntityType === EntityType.Liability
                        ? actionData.value
                        : actionData.amount
                    }
                    onChange={(e) =>
                      setActionData({
                        ...actionData,
                        [newEntityType === EntityType.Asset ||
                        newEntityType === EntityType.Liability
                          ? "value"
                          : "amount"]: e.target.value,
                      })
                    }
                    className="h-8 text-xs font-mono bg-surface-container w-full"
                  />
                </div>
                {(newEntityType === EntityType.Income ||
                  newEntityType === EntityType.Expense) && (
                  <div className="grid grid-cols-[130px_1fr] items-center gap-4 min-w-0">
                    <label className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-wider">
                      Frequency
                    </label>
                    <Select
                      value={actionData.frequency}
                      onValueChange={(v) =>
                        setActionData({ ...actionData, frequency: v })
                      }
                    >
                      <SelectTrigger className="h-8 text-xs font-mono bg-surface-container border-border/20 w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-surface-container-highest border-border/20">
                        <SelectItem
                          value={Frequency.Monthly}
                          className="text-xs font-mono"
                        >
                          Monthly
                        </SelectItem>
                        <SelectItem
                          value={Frequency.Yearly}
                          className="text-xs font-mono"
                        >
                          Yearly
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-4 w-full">
                <div className="grid grid-cols-[130px_1fr] items-center gap-4 min-w-0">
                  <label className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-wider">
                    Select Entity
                  </label>
                  <Select
                    value={selectedEntityId}
                    onValueChange={setSelectedEntityId}
                  >
                    <SelectTrigger className="h-8 text-xs font-mono bg-surface-container border-border/20 w-full">
                      <SelectValue
                        placeholder={`Select ${newEntityType.toLowerCase()}`}
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-surface-container-highest border-border/20">
                      {getEntityList(newEntityType).map((e: any) => (
                        <SelectItem
                          key={e.id}
                          value={e.id}
                          className="text-xs font-mono"
                        >
                          {e.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {newActionType === CommitActionType.Update && (
                  <div className="grid grid-cols-[130px_1fr] items-center gap-4 min-w-0">
                    <label className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-wider">
                      {newEntityType === EntityType.Asset ||
                      newEntityType === EntityType.Liability
                        ? "Change By ($)"
                        : "Update Amount ($)"}
                    </label>
                    <Input
                      type="number"
                      value={
                        newEntityType === EntityType.Asset ||
                        newEntityType === EntityType.Liability
                          ? actionData.value
                          : actionData.amount
                      }
                      onChange={(e) =>
                        setActionData({
                          ...actionData,
                          [newEntityType === EntityType.Asset ||
                          newEntityType === EntityType.Liability
                            ? "value"
                            : "amount"]: e.target.value,
                        })
                      }
                      className="h-8 text-xs font-mono bg-surface-container w-full"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-2 mt-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAdding(false)}
              className="text-[10px] font-bold text-muted-foreground underline-offset-4 hover:underline"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleAddAction}
              disabled={
                newActionType !== CommitActionType.Add && !selectedEntityId
              }
              className="h-8 px-4 text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm"
            >
              Stage Action
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
