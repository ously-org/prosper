import * as React from "react";
import { OuslyCard } from "../OuslyCard";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  accent?: "primary" | "chart-2" | "destructive" | "none";
  rightElement?: React.ReactNode;
}

export function MetricCard({ title, accent = "none", rightElement, children, className, ...props }: MetricCardProps) {
  return (
    <OuslyCard accent={accent} className={cn("flex flex-col justify-between p-6", className)} {...props}>
      <div className="flex flex-row justify-between items-center mb-4">
        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest font-mono">
          {title}
        </span>
        {rightElement}
      </div>
      <div className="flex flex-col gap-4">
        {children}
      </div>
    </OuslyCard>
  );
}

interface MetricCardValueProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number | string;
  change?: number;
  prefix?: string;
  suffix?: string;
  formatter?: (val: number | string) => string;
  pulseLabel?: string;
}

const defaultFormatter = (val: number | string, prefix: string = "$", suffix: string = "") => {
  if (typeof val === "number") {
    return `${prefix}${val.toLocaleString()}${suffix}`;
  }
  return `${prefix}${val}${suffix}`;
};

export function MetricCardValue({ value, change, prefix = "$", suffix = "", pulseLabel = "(30D Pulse)", formatter, className, ...props }: MetricCardValueProps) {
  const isPositive = change !== undefined && change >= 0;
  const displayValue = formatter ? formatter(value) : defaultFormatter(value, prefix, suffix);
  
  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      <span className="text-3xl font-bold font-mono tracking-tighter text-foreground">
        {displayValue}
      </span>
      {change !== undefined && (
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "text-xs font-mono font-bold flex items-center",
              isPositive ? "text-chart-2" : "text-destructive"
            )}
          >
            {isPositive ? "+" : ""}{change}%
          </span>
          <span className="text-muted-foreground text-[10px] font-medium uppercase tracking-widest">
            {pulseLabel}
          </span>
        </div>
      )}
    </div>
  );
}

export function MetricCardProgress({ className, ...props }: React.ComponentPropsWithoutRef<typeof Progress>) {
  return (
    <Progress
      className={cn("h-1.5 bg-surface-container-high", className)}
      {...props}
    />
  );
}

export function MetricCardNote({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-[10px] font-mono leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  );
}
