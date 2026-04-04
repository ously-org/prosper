interface ChartSummarySidebarProps {
  activeData: any;
}

export const ChartSummarySidebar = ({
  activeData,
}: ChartSummarySidebarProps) => {
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  if (!activeData) return null;

  return (
    <div className="w-full md:w-[280px] shrink-0 border-l border-border/10 pl-6 flex flex-col gap-6 animate-in fade-in max-h-[360px] overflow-y-auto pr-2">
      <div className="flex items-center justify-between pb-4 border-b border-border/10">
        <span className="text-sm font-mono text-muted-foreground">
          {new Date(activeData.date).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <span className="text-sm font-mono font-bold text-foreground">
          Age{" "}
          {new Date(activeData.date).getFullYear() - 1990 /* Hack for now */}
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-chart-2">
            Net Worth
          </span>
          <span className="text-sm font-mono font-bold">
            {currencyFormatter.format(
              activeData.netWorth ||
                activeData.totalAssets - (activeData.totalLiabilities || 0),
            )}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-muted-foreground">
            Liquid Net Worth
          </span>
          <span className="text-sm font-mono">
            {currencyFormatter.format(
              (activeData.cash || 0) + (activeData.stock || 0),
            )}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-chart-4">
            Total Assets
          </span>
          <span className="text-sm font-mono font-bold">
            {currencyFormatter.format(activeData.totalAssets)}
          </span>
        </div>
        <div className="space-y-2 pl-2 border-l-2 border-border/20">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-muted-foreground uppercase">
              Cash & Equiv
            </span>
            <span className="text-xs font-mono">
              {currencyFormatter.format(activeData.cash || 0)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-muted-foreground uppercase">
              Equities
            </span>
            <span className="text-xs font-mono">
              {currencyFormatter.format(activeData.stock || 0)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-muted-foreground uppercase">
              Real Estate
            </span>
            <span className="text-xs font-mono">
              {currencyFormatter.format(activeData.property || 0)}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-destructive">
            Total Liabilities
          </span>
          <span className="text-sm font-mono font-bold">
            {currencyFormatter.format(activeData.totalLiabilities || 0)}
          </span>
        </div>
        <div className="space-y-2 pl-2 border-l-2 border-border/20">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-muted-foreground uppercase">
              Mortgage
            </span>
            <span className="text-xs font-mono">
              {currencyFormatter.format(activeData.mortgage || 0)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-muted-foreground uppercase">
              Untied Debt
            </span>
            <span className="text-xs font-mono">
              {currencyFormatter.format(Math.abs(activeData.untiedDebt || 0))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
