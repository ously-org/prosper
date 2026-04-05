import React from "react";
import { Typography } from "@/components/ui/Typography";
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
    <Typography
      variant="small"
      align="center"
      className={cn("text-muted-foreground mt-8", className)}
    >
      {children}
    </Typography>
  );
}
