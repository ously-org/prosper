import { useState } from "react";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RiCloseLine, RiAddLine } from "@remixicon/react";
import { useAssets } from "@/hooks/use-assets";
import { useLiabilities } from "@/hooks/use-liabilities";
import { useIncome, useExpenses } from "@/hooks/use-budget";
import {
  mapAssetsToItems,
  mapLiabilitiesToItems,
  mapIncomeToItems,
  mapExpensesToItems,
  groupItemsByCategory,
  mergeStagedActions,
  FINANCIAL_TABLE_CONTROLS,
} from "@/features/FinancialTable/adapters";
import { CollapsibleTableGroup } from "@/features/FinancialTable/CollapsibleGroup";
import { useCommitStore } from "@/store/use-commit-store";
import { EntityType, CommitActionType } from "@/lib/enum";
import { ActionBuilder } from "@/components/ActionBuilder";
import { cn } from "@/lib/utils";

type TabType = EntityType;

// --- Compound Subcomponents ---

function FinancialTableHeader({ children }: { children: React.ReactNode }) {
  return (
    <CardHeader className="px-6 py-4 bg-surface-container-high flex flex-row justify-between items-center border-b border-border/20 space-y-0 shrink-0">
      {children}
    </CardHeader>
  );
}

function FinancialTableTitle({ children }: { children: React.ReactNode }) {
  return (
    <CardTitle className="text-sm font-bold uppercase tracking-widest text-foreground font-mono">
      {children}
    </CardTitle>
  );
}

function FinancialTableTabs({
  value,
  onValueChange,
}: {
  value: TabType;
  onValueChange: (v: TabType) => void;
}) {
  return (
    <Tabs
      value={value}
      onValueChange={(v) => onValueChange(v as TabType)}
      className="w-[400px]"
    >
      <TabsList className="grid w-full grid-cols-4 h-8">
        <TabsTrigger value={EntityType.Asset} className="text-xs">
          Assets
        </TabsTrigger>
        <TabsTrigger value={EntityType.Liability} className="text-xs">
          Liabilities
        </TabsTrigger>
        <TabsTrigger value={EntityType.Income} className="text-xs">
          Income
        </TabsTrigger>
        <TabsTrigger value={EntityType.Expense} className="text-xs">
          Expenses
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

function FinancialTableActions({
  stagedCount,
  onCommit,
  onClear,
  onToggleBuilder,
  isBuilderOpen,
}: {
  stagedCount: number;
  onCommit: () => void;
  onClear: () => void;
  onToggleBuilder: () => void;
  isBuilderOpen: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onToggleBuilder}
        className={cn(
          "h-8 px-3 text-[10px] font-bold border-primary/20 transition-all gap-1.5",
          isBuilderOpen ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-primary/5 text-primary hover:bg-primary/10"
        )}
      >
        <RiAddLine className="w-3.5 h-3.5" />
        New Action
      </Button>
      {stagedCount > 0 && (
        <Button
          variant="outline"
          onClick={onClear}
          className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive border-border/40 bg-surface-container-highest"
        >
          <RiCloseLine className="w-4 h-4" />
        </Button>
      )}
      <Button
        variant={stagedCount > 0 ? "default" : "link"}
        onClick={onCommit}
        className="h-8 px-3 py-1 text-xs font-bold"
      >
        {stagedCount > 0 ? `Commit (${stagedCount})` : "Update Data"}
      </Button>
    </div>
  );
}

function FinancialTableContent({
  children,
  valueLabel,
  rateLabel,
  isLoading,
}: {
  children: React.ReactNode;
  valueLabel: string;
  rateLabel: string;
  isLoading: boolean;
}) {
  return (
    <CardContent className="p-0 flex-1 overflow-y-auto">
      <Table>
        <TableHeader className="sticky top-0 bg-surface-container-high z-10">
          <TableRow className="border-b border-border/20 hover:bg-transparent">
            <TableHead className="px-6 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest h-auto w-[360px]">
              Category / Name
            </TableHead>
            <TableHead className="px-6 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest h-auto">
              {valueLabel}
            </TableHead>
            <TableHead className="px-6 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-right h-auto">
              {rateLabel}
            </TableHead>
            <TableHead className="px-6 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-right h-auto">
              Allocation
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-border/20">
          {isLoading ? (
            <TableRow className="animate-pulse">
              <TableCell
                colSpan={5}
                className="h-40 text-center py-4 text-muted-foreground italic border-0"
              >
                Loading data...
              </TableCell>
            </TableRow>
          ) : (
            children
          )}
        </TableBody>
      </Table>
    </CardContent>
  );
}

// --- Main Component ---

export function AssetBreakdownTable() {
  const [activeTab, setActiveTab] = useState<TabType>(EntityType.Asset);
  const [isActionBuilderOpen, setIsActionBuilderOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(),
  );
  const { stagedActions, commit, clearStaging, stageAdd, stageUpdate, stageDelete } = useCommitStore();

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const { data: assets, isLoading: isLoadingAssets } = useAssets();
  const { data: liabilities, isLoading: isLoadingLiab } = useLiabilities();
  const { data: income, isLoading: isLoadingInc } = useIncome();
  const { data: expenses, isLoading: isLoadingExp } = useExpenses();

  const getTableData = () => {
    const config = FINANCIAL_TABLE_CONTROLS[activeTab];

    switch (activeTab) {
      case EntityType.Asset:
        return {
          ...config,
          items: assets ? mapAssetsToItems(assets) : [],
          isLoading: isLoadingAssets,
        };
      case EntityType.Liability:
        return {
          ...config,
          items: liabilities ? mapLiabilitiesToItems(liabilities) : [],
          isLoading: isLoadingLiab,
        };
      case EntityType.Income:
        return {
          ...config,
          items: income ? mapIncomeToItems(income) : [],
          isLoading: isLoadingInc,
        };
      case EntityType.Expense:
        return {
          ...config,
          items: expenses ? mapExpensesToItems(expenses) : [],
          isLoading: isLoadingExp,
        };
      default:
        return {
          ...FINANCIAL_TABLE_CONTROLS[EntityType.Asset],
          items: [],
          isLoading: false,
        };
    }
  };

  const {
    items: baseItems,
    isLoading,
    valueLabel,
    rateLabel,
    entityType,
    valueKey,
  } = getTableData();

  const mergedItems = mergeStagedActions(
    baseItems,
    stagedActions,
    entityType,
    valueKey,
  );
  const groupedData = groupItemsByCategory(mergedItems);

  return (
    <>
      <FinancialTableHeader>
        <div className="flex items-center gap-6">
          <FinancialTableTitle>Financial Breakdown</FinancialTableTitle>
          <FinancialTableTabs value={activeTab} onValueChange={setActiveTab} />
        </div>
        <FinancialTableActions
          stagedCount={stagedActions.length}
          onCommit={commit}
          onClear={clearStaging}
          onToggleBuilder={() => setIsActionBuilderOpen(!isActionBuilderOpen)}
          isBuilderOpen={isActionBuilderOpen}
        />
      </FinancialTableHeader>

      {isActionBuilderOpen && (
        <ActionBuilder
          actions={stagedActions}
          onActionsChange={(newActions) => {
            // Find the newly added action
            const latestAction = newActions[newActions.length - 1];
            if (latestAction) {
              if (latestAction.type === CommitActionType.Add) {
                stageAdd(latestAction.entityType, latestAction.data);
              } else if (latestAction.type === CommitActionType.Update) {
                stageUpdate(latestAction.entityType, latestAction.entityId, latestAction.data);
              } else if (latestAction.type === CommitActionType.Delete) {
                stageDelete(latestAction.entityType, latestAction.entityId);
              }
            }
          }}
          title="Manual Staging Area"
          showActionsList={false}
          className="border-b"
        />
      )}

      <FinancialTableContent
        isLoading={isLoading}
        valueLabel={valueLabel}
        rateLabel={rateLabel}
      >
        {groupedData.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={5}
              className="h-40 text-center py-4 text-muted-foreground italic border-0"
            >
              No data available.
            </TableCell>
          </TableRow>
        ) : (
          groupedData.map((group) => (
            <CollapsibleTableGroup
              key={group.category}
              group={group}
              entityType={entityType}
              valueKey={valueKey}
              isExpanded={expandedCategories.has(group.category)}
              onToggle={() => toggleCategory(group.category)}
            />
          ))
        )}
      </FinancialTableContent>
    </>
  );
}
