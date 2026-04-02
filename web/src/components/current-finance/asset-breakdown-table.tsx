import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
import { RiAddLine } from "@remixicon/react";
import {
  useAssets,
  useLiabilities,
  useIncome,
  useExpenses,
} from "@/hooks/use-assets";
import {
  mapAssetsToItems,
  mapLiabilitiesToItems,
  mapIncomeToItems,
  mapExpensesToItems,
  groupItemsByCategory,
} from "./financial-table-adapters";
import { CollapsibleTableGroup } from "./collapsible-table-group";
import { useCommitStore } from "@/store/use-commit-store";
import { EntityType } from "@/lib/enum";

type TabType = "assets" | "liabilities" | "income" | "expenses";

export function AssetBreakdownTable() {
  const [activeTab, setActiveTab] = useState<TabType>("assets");
  const { stagedActions, commit } = useCommitStore();

  const { data: assets, isLoading: isLoadingAssets } = useAssets();
  const { data: liabilities, isLoading: isLoadingLiab } = useLiabilities();
  const { data: income, isLoading: isLoadingInc } = useIncome();
  const { data: expenses, isLoading: isLoadingExp } = useExpenses();

  const getTableData = () => {
    switch (activeTab) {
      case "assets":
        return {
          items: assets ? mapAssetsToItems(assets) : [],
          isLoading: isLoadingAssets,
          valueLabel: "Market Value",
          rateLabel: "Performance (1M)",
          entityType: EntityType.Asset,
          valueKey: "valueBy",
        };
      case "liabilities":
        return {
          items: liabilities ? mapLiabilitiesToItems(liabilities) : [],
          isLoading: isLoadingLiab,
          valueLabel: "Balance",
          rateLabel: "Growth Rate (1M)",
          entityType: EntityType.Liability,
          valueKey: "balanceBy",
        };
      case "income":
        return {
          items: income ? mapIncomeToItems(income) : [],
          isLoading: isLoadingInc,
          valueLabel: "Amount",
          rateLabel: "Growth Rate (1M)",
          entityType: EntityType.Income,
          valueKey: "amountBy",
        };
      case "expenses":
        return {
          items: expenses ? mapExpensesToItems(expenses) : [],
          isLoading: isLoadingExp,
          valueLabel: "Amount",
          rateLabel: "Growth Rate (1M)",
          entityType: EntityType.Expense,
          valueKey: "amountBy",
        };
      default:
        return {
          items: [],
          isLoading: false,
          valueLabel: "Value",
          rateLabel: "Rate",
          entityType: EntityType.Asset,
          valueKey: "valueBy",
        };
    }
  };

  const { items, isLoading, valueLabel, rateLabel, entityType, valueKey } =
    getTableData();
  const groupedData = groupItemsByCategory(items);

  return (
    <Card className="col-span-12 xl:col-span-8 bg-surface-container overflow-hidden flex flex-col shadow-sm border border-border/20">
      <CardHeader className="px-6 py-4 bg-surface-container-high flex flex-row justify-between items-center border-b border-border/20 space-y-0">
        <div className="flex items-center gap-6">
          <CardTitle className="text-sm font-bold uppercase tracking-widest text-foreground font-mono">
            Financial Breakdown
          </CardTitle>
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as TabType)}
            className="w-[400px]"
          >
            <TabsList className="grid w-full grid-cols-4 h-8">
              <TabsTrigger value="assets" className="text-xs">
                Assets
              </TabsTrigger>
              <TabsTrigger value="liabilities" className="text-xs">
                Liabilities
              </TabsTrigger>
              <TabsTrigger value="income" className="text-xs">
                Income
              </TabsTrigger>
              <TabsTrigger value="expenses" className="text-xs">
                Expenses
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <Button
          variant={stagedActions.length > 0 ? "default" : "link"}
          onClick={commit}
          className="h-8 px-2 py-1 text-xs font-bold"
        >
          {stagedActions.length > 0
            ? `Commit (${stagedActions.length})`
            : "No Commit"}
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
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
            ) : groupedData.length === 0 ? (
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
                />
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
