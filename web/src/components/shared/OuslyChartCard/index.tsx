import * as React from "react";
import {
  OuslyCard,
  OuslyCardHeader,
  OuslyCardTitle,
  OuslyCardContent,
  OuslyCardDescription,
} from "../OuslyCard";
import type { OuslyCardProps } from "../OuslyCard";
import { cn } from "@/lib/utils";

export interface OuslyChartCardTab {
  id: string;
  title: string;
  description?: string;
}

interface OuslyChartCardProps extends OuslyCardProps {
  title: string;
  description?: string;
  tabs?: OuslyChartCardTab[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  headerContent?: React.ReactNode;
}

export function OuslyChartCard({
  title,
  description,
  tabs,
  activeTab,
  onTabChange,
  headerContent,
  children,
  className,
  ...props
}: OuslyChartCardProps) {
  return (
    <OuslyCard className={cn("col-span-12", className)} {...props}>
      <OuslyCardHeader className="flex flex-col items-stretch border-b border-border/10 p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-4 sm:py-6">
          <OuslyCardTitle>{title}</OuslyCardTitle>
          <OuslyCardDescription>{description}</OuslyCardDescription>
          {headerContent}
        </div>
        {tabs && (
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                data-active={activeTab === tab.id}
                className="flex flex-1 flex-col justify-center gap-1 border-t border-border/10 px-6 py-4 text-left first:border-l-0 even:border-l data-[active=true]:bg-surface-container-high sm:border-t-0 sm:border-l sm:px-8 sm:py-6 transition-colors outline-none min-w-[160px]"
                onClick={() => onTabChange?.(tab.id)}
              >
                <span className="text-xl leading-none font-bold sm:text-2xl font-mono tracking-tighter">
                  {tab.title}
                </span>
              </button>
            ))}
          </div>
        )}
      </OuslyCardHeader>
      <OuslyCardContent className="px-2 sm:p-6 min-h-[400px]">
        {children}
      </OuslyCardContent>
    </OuslyCard>
  );
}
