import React from "react";
import { cn } from "@/lib/utils";

interface DashboardGridSidebarProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardGridSidebar({
  children,
  className,
}: DashboardGridSidebarProps) {
  return (
    <div
      className={cn("col-span-12 xl:col-span-4 flex flex-col gap-6", className)}
    >
      {children}
    </div>
  );
}
