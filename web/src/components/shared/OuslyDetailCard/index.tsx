import * as React from "react";
import { OuslyCard, OuslyCardContent } from "../OuslyCard";
import type { OuslyCardProps } from "../OuslyCard";
import { cn } from "@/lib/utils";

interface OuslyDetailCardProps extends OuslyCardProps {
  leftElement?: React.ReactNode;
}

export function OuslyDetailCard({ leftElement, children, className, ...props }: OuslyDetailCardProps) {
  return (
    <OuslyCard className={cn("bg-surface-container border-none shadow-none overflow-hidden", className)} {...props}>
      <OuslyCardContent className="p-4 flex gap-4 w-full">
        {leftElement && (
          <div className="shrink-0">
            {leftElement}
          </div>
        )}
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </OuslyCardContent>
    </OuslyCard>
  );
}
