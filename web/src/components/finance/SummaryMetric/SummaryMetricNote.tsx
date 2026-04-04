import * as React from "react";
import { cn } from "@/lib/utils";

interface SummaryMetricNoteProps {
  children: React.ReactNode;
  className?: string;
}

export function SummaryMetricNote({
  children,
  className,
}: SummaryMetricNoteProps) {
  return (
    <p
      className={cn(
        "text-[10px] text-muted-foreground mt-1 leading-relaxed",
        className,
      )}
    >
      {children}
    </p>
  );
}
