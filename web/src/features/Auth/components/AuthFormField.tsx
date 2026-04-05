import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthFormFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  required?: boolean;
  icon: LucideIcon;
  rightElement?: React.ReactNode;
  autoComplete?: string;
  className?: string;
}

export function AuthFormField({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  required,
  icon: Icon,
  rightElement,
  autoComplete = "off",
  className,
}: AuthFormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          autoComplete={autoComplete}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          required={required}
          className="h-12 pl-10 pr-10 bg-muted/50 border-border/50"
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}
