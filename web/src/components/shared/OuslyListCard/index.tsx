import * as React from "react";
import { OuslyCard, OuslyCardHeader, OuslyCardTitle, OuslyCardContent, OuslyCardFooter } from "../OuslyCard";
import type { OuslyCardProps } from "../OuslyCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface OuslyListCardProps extends OuslyCardProps {
  title: string;
  icon?: React.ReactNode;
  headerRight?: React.ReactNode;
  footer?: React.ReactNode;
  maxHeight?: string;
}

export function OuslyListCard({ title, icon, headerRight, footer, maxHeight = "400px", children, className, ...props }: OuslyListCardProps) {
  return (
    <OuslyCard className={cn("flex flex-col h-full", className)} {...props}>
      <OuslyCardHeader className="flex-row items-center justify-between space-y-0 px-6 pt-6 pb-4">
        <OuslyCardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </OuslyCardTitle>
        {headerRight}
      </OuslyCardHeader>
      <OuslyCardContent className="flex-1 overflow-hidden px-6 pt-0">
        <ScrollArea style={{ maxHeight }} className="h-full pr-4">
          <div className="space-y-4">
            {children}
          </div>
        </ScrollArea>
      </OuslyCardContent>
      {footer && (
        <OuslyCardFooter className="px-6 pb-6 pt-0 border-t-0">
          {footer}
        </OuslyCardFooter>
      )}
    </OuslyCard>
  );
}
