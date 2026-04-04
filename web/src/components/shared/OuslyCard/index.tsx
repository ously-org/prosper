import * as React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface OuslyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  accent?: "primary" | "chart-2" | "destructive" | "none";
}

export function OuslyCard({ className, accent = "none", ...props }: OuslyCardProps) {
  return (
    <Card
      className={cn(
        "bg-surface-container border-border/20 shadow-sm",
        accent === "primary" && "border-l-[3px] border-l-primary",
        accent === "chart-2" && "border-l-[3px] border-l-chart-2",
        accent === "destructive" && "border-l-[3px] border-l-destructive",
        className
      )}
      {...props}
    />
  );
}

export function OuslyCardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  );
}

export function OuslyCardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-sm font-bold uppercase tracking-widest text-foreground font-mono leading-none",
        className
      )}
      {...props}
    />
  );
}

export function OuslyCardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-[10px] font-mono text-muted-foreground", className)}
      {...props}
    />
  );
}

export function OuslyCardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6 pt-0", className)} {...props} />
  );
}

export function OuslyCardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  );
}
