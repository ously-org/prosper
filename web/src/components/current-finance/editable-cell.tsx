import { useState, useEffect, KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";

interface EditableCellProps {
  value: string | number;
  onSave: (newValue: string | number) => void;
  type?: "text" | "number" | "percentage";
  className?: string;
  prefix?: string;
  suffix?: string;
}

export function EditableCell({ value, onSave, type = "text", className, prefix, suffix }: EditableCellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleBlur = () => {
    setIsEditing(false);
    if (localValue !== value) {
      onSave(type === "number" || type === "percentage" ? Number(localValue) : localValue);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") handleBlur();
    if (e.key === "Escape") {
      setLocalValue(value);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <Input
        autoFocus
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="h-7 py-0 px-1 text-xs font-mono w-full"
        type={type === "text" ? "text" : "number"}
      />
    );
  }

  return (
    <span 
      onClick={() => setIsEditing(true)}
      className={`cursor-pointer hover:bg-primary/10 px-1 rounded transition-colors ${className}`}
    >
      {prefix}{type === "number" || type === "percentage" 
        ? Number(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : value}{suffix}
    </span>
  );
}
