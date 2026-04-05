interface SummaryMetricHeaderProps {
  title: string;
  rightElement?: React.ReactNode;
}

export function SummaryMetricHeader({
  title,
  rightElement,
}: SummaryMetricHeaderProps) {
  return (
    <div className="flex flex-row justify-between items-center space-y-0">
      <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
        {title}
      </span>
      {rightElement}
    </div>
  );
}
