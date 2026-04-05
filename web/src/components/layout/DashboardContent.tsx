import React from "react";
import { cn } from "@/lib/utils";

interface DashboardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardContent({
  children,
  className,
}: DashboardContentProps) {
  return (
    <div className={cn("max-w-7xl mx-auto p-6 w-full", className)}>
      {children}
    </div>
  );
}
