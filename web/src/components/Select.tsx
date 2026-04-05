import {
  Select as UISelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface TrajectorySelectProps {
  value: string;
  onValueChange: (val: string) => void;
  items: readonly { value: string; label: string }[];
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
}

export const TrajectorySelect = ({
  value,
  onValueChange,
  items,
  placeholder,
  ariaLabel,
  className,
}: TrajectorySelectProps) => {
  if (items.length === 0) return null;

  const defaultPlaceholder = items[0]?.label || "Select...";

  return (
    <UISelect value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className={cn(
          "h-8 text-[10px] font-mono uppercase bg-surface-container border-none shadow-none focus:ring-0",
          className,
        )}
        aria-label={ariaLabel}
      >
        <SelectValue placeholder={placeholder || defaultPlaceholder} />
      </SelectTrigger>
      <SelectContent className="rounded-xl bg-surface-container border-none shadow-xl">
        {items.map((item) => (
          <SelectItem
            key={item.value}
            value={item.value}
            className="rounded-lg text-[10px] font-mono uppercase"
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </UISelect>
  );
};
