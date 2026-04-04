import React from "react";
import { cn } from "@/lib/utils";

interface DashboardGridMainProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardGridMain({
  children,
  className,
}: DashboardGridMainProps) {
  return (
    <div
      className={cn("col-span-12 xl:col-span-8 flex flex-col gap-6", className)}
    >
      {children}
    </div>
  );
}
