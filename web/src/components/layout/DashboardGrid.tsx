import React from "react";
import { cn } from "@/lib/utils";

interface DashboardGridProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardGrid({ children, className }: DashboardGridProps) {
  return (
    <div className={cn("grid grid-cols-12 gap-6 pb-8", className)}>
      {children}
    </div>
  );
}
