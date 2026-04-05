import React from "react";
import { cn } from "@/lib/utils";

interface DashboardSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardSection({
  children,
  className,
}: DashboardSectionProps) {
  return (
    <section className={cn("mb-8", className)}>
      {children}
    </section>
  );
}
