export function LiquidCashRatio() {
  return (
    <div className="bg-surface-container rounded-md p-5 border border-primary/10 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          Liquid Cash Ratio
        </span>
        <span className="font-mono text-xs text-primary">4.4%</span>
      </div>
      <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden">
        <div className="bg-primary h-full" style={{ width: "44%" }} />
      </div>
      <p className="text-[10px] text-muted-foreground mt-3 leading-relaxed">
        Architecture note: Current liquidity is{" "}
        <span className="text-foreground">below</span> target threshold of 10%.
        Consider rebalancing from Equities.
      </p>
    </div>
  );
}
