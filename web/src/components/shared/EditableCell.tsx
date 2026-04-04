import { useState, useEffect, type KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";

interface EditableCellProps {
  value: string | number;
  onSave: (newValue: string | number) => void;
  type?: "text" | "number" | "percentage" | "date";
  displayValue?: string;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export function EditableCell({ 
  value, 
  onSave, 
  type = "text", 
  displayValue,
  className, 
  prefix, 
  suffix 
}: EditableCellProps) {
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
        className="h-7 py-0 px-1 text-xs font-mono w-full min-w-[80px]"
        type={type === "date" ? "date" : type === "text" ? "text" : "number"}
      />
    );
  }

  const renderedValue = displayValue ?? (
    type === "number" || type === "percentage" 
      ? Number(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : value
  );

  return (
    <span 
      onClick={() => setIsEditing(true)}
      className={`cursor-pointer hover:bg-primary/10 px-1 rounded transition-colors ${className}`}
    >
      {prefix}{renderedValue}{suffix}
    </span>
  );
}
