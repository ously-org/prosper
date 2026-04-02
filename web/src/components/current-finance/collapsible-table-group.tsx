import { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { RiArrowRightSLine, RiArrowDownSLine, RiAddLine } from "@remixicon/react";
import type { FinancialGroup } from "./financial-table-adapters";
import { EditableCell } from "./editable-cell";
import { useCommitStore } from "@/store/use-commit-store";
import { EntityType, AssetType, LiabilityType, Frequency } from "@/lib/enum";
import { ASSET_TEXT_TO_TYPE, LIABILITY_TEXT_TO_TYPE } from "@/components/const";

interface GroupProps {
  group: FinancialGroup;
  entityType: EntityType;
  valueKey: string;
}

export function CollapsibleTableGroup({ group, entityType, valueKey }: GroupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { stageUpdate, stageAdd } = useCommitStore();

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    let defaults = {};
    const category = group.category;

    switch (entityType) {
      case EntityType.Asset:
        defaults = { 
          name: "New Asset", 
          value: 0, 
          type: ASSET_TEXT_TO_TYPE[category] || AssetType.Other, 
          growthRate: 0,
          color: "var(--primary)"
        };
        break;
      case EntityType.Liability:
        defaults = { 
          name: "New Liability", 
          balance: 0, 
          type: LIABILITY_TEXT_TO_TYPE[category] || LiabilityType.Other, 
          growthRate: 0 
        };
        break;
      case EntityType.Income:
        defaults = { 
          name: "New Income", 
          amount: 0, 
          frequency: category === "Monthly Income" ? Frequency.Monthly : Frequency.Yearly, 
          growthRate: 0 
        };
        break;
      case EntityType.Expense:
        defaults = { 
          name: "New Expense", 
          amount: 0, 
          frequency: category === "Monthly Expense" ? Frequency.Monthly : Frequency.Yearly, 
          growthRate: 0, 
          inflationAdjusted: true 
        };
        break;
    }
    stageAdd(entityType, defaults);
    setIsOpen(true);
  };

  return (
    <>
      <TableRow 
        className="hover:bg-surface-container-highest transition-colors cursor-pointer border-b border-border/20 last:border-0 group/row"
        onClick={() => setIsOpen(!isOpen)}
      >
        <TableCell className="px-6 py-4 flex items-center gap-3 border-0 w-[360px] min-w-[360px] max-w-[360px]">
          <div className="flex-shrink-0">
            {isOpen ? (
              <RiArrowDownSLine className="w-4 h-4 text-muted-foreground" />
            ) : (
              <RiArrowRightSLine className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-foreground truncate">
              {group.category}
            </span>
            <RiAddLine 
              className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer opacity-0 group-hover/row:opacity-100 transition-opacity" 
              onClick={handleAdd}
            />
          </div>
        </TableCell>
        <TableCell className="px-6 py-4 font-mono text-sm text-foreground font-bold border-0">
          ${group.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </TableCell>
        <TableCell className="px-6 py-4 text-right border-0">
          {group.weightedRate !== undefined && (
             <span className={`text-xs font-mono font-bold ${group.weightedRate > 0 ? "text-chart-2" : group.weightedRate < 0 ? "text-destructive" : "text-muted-foreground"}`}>
               {group.weightedRate > 0 ? "+" : ""}{group.weightedRate.toFixed(2)}%
             </span>
          )}
        </TableCell>
        <TableCell className="px-6 py-4 text-right border-0">
          <div className="flex items-center justify-end gap-2">
            <span className="font-mono text-xs font-bold text-foreground">
              {group.totalAllocation}%
            </span>
            <div className="w-16">
              <Progress
                value={group.totalAllocation}
                className="h-1.5 bg-surface-container-high"
                style={{ "--progress-foreground": "var(--primary)" } as React.CSSProperties}
              />
            </div>
          </div>
        </TableCell>
      </TableRow>
      
      {isOpen && group.items.map((item) => (
        <TableRow key={item.id} className="bg-surface-container/50 border-b border-border/10 last:border-0">
          <TableCell className="px-6 py-3 pl-12 flex items-center gap-3 border-0 w-[360px] min-w-[360px] max-w-[360px]">
             <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
             <EditableCell 
                value={item.name} 
                className="text-sm text-muted-foreground truncate"
                onSave={(v) => stageUpdate(entityType, item.id, { nameTo: v })}
             />
          </TableCell>
          <TableCell className="px-6 py-3 font-mono text-sm text-muted-foreground border-0">
            <EditableCell 
              value={item.primaryValue} 
              type="number"
              prefix="$"
              onSave={(v) => stageUpdate(entityType, item.id, { [valueKey]: v - item.primaryValue })}
            />
          </TableCell>
          <TableCell className="px-6 py-3 text-right border-0">
            {item.rate !== undefined && (
              <span className={`text-xs font-mono font-medium ${item.rate > 0 ? "text-chart-2" : item.rate < 0 ? "text-destructive" : "text-muted-foreground"}`}>
                {item.rate > 0 ? "+" : ""}{item.rate.toFixed(2)}%
              </span>
            )}
          </TableCell>
          <TableCell className="px-6 py-3 text-right border-0">
            <div className="flex items-center justify-end gap-2">
              <span className="font-mono text-xs text-muted-foreground">{item.allocation}%</span>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
