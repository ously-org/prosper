import { OuslyCard, OuslyCardContent } from "../OuslyCard";
import type { OuslyCardProps } from "../OuslyCard";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

export interface OuslyTabCardTab {
  value: string;
  label: string;
}

interface OuslyTabCardProps extends OuslyCardProps {
  tabs: OuslyTabCardTab[];
  activeTab: string;
  onTabChange: (value: string) => void;
}

export function OuslyTabCard({ tabs, activeTab, onTabChange, children, className, ...props }: OuslyTabCardProps) {
  return (
    <OuslyCard
      className={cn("h-full bg-surface-container overflow-hidden flex flex-col", className)}
      {...props}
    >
      <ToggleGroup
        type="single"
        value={activeTab}
        onValueChange={(v) => v && onTabChange(v)}
        variant="line"
        size="sm"
        className="shrink-0 justify-start px-2 border-b border-border/10"
      >
        {tabs.map((tab) => (
          <ToggleGroupItem key={tab.value} value={tab.value} className="px-4 text-[10px] font-bold uppercase tracking-widest font-mono">
            {tab.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <OuslyCardContent className="flex-1 overflow-hidden p-0">
        {children}
      </OuslyCardContent>
    </OuslyCard>
  );
}
