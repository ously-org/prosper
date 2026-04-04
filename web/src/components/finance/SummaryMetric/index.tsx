import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SummaryMetricProps {
  children?: React.ReactNode;
  className?: string;
  borderColor?: string;
}

/**
 * SummaryMetric is the base layout component for financial metric cards.
 * It provides a consistent container with a left border accent.
 */
export function SummaryMetric({
  children,
  className,
  borderColor,
}: SummaryMetricProps) {
  return (
    <Card
      className={cn(
        "bg-surface-container flex flex-col justify-between border-l-[3px] shadow-sm p-6",
        borderColor || "border-primary",
        className,
      )}
    >
      <CardContent className="p-0 flex flex-col gap-4">{children}</CardContent>
    </Card>
  );
}
