import React from "react";
import { cn } from "@/lib/utils";

interface AuthFormProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  className?: string;
}

export function AuthForm({ children, onSubmit, className }: AuthFormProps) {
  return (
    <form onSubmit={onSubmit} className={cn("space-y-5 px-1", className)}>
      {children}
    </form>
  );
}
