import React from "react";
import { cn } from "@/lib/utils";

interface AuthFormNavigationProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthFormNavigation({
  children,
  className,
}: AuthFormNavigationProps) {
  return (
    <p
      className={cn(
        "text-center text-sm text-muted-foreground mt-8",
        className,
      )}
    >
      {children}
    </p>
  );
}
