import { Terminal } from "lucide-react";

export function RecentActivityLog() {
  return (
    <div className="bg-surface-container-high rounded-md p-5 flex-1 border border-border/20 shadow-sm">
      <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
        <Terminal className="w-3.5 h-3.5" /> RECENT_ACTIVITY_LOG
      </h4>
      <div className="space-y-4">
        <div className="flex justify-between items-start gap-3">
          <div className="font-mono text-[11px] text-chart-2">DIVIDEND</div>
          <div className="flex-1">
            <p className="text-xs font-medium text-foreground">AAPL_Q3_PAYOUT</p>
            <p className="font-mono text-[10px] text-muted-foreground">
              2023-10-25
            </p>
          </div>
          <div className="font-mono text-xs text-chart-2">+$1,240.50</div>
        </div>
        <div className="flex justify-between items-start gap-3">
          <div className="font-mono text-[11px] text-destructive">OUTFLOW</div>
          <div className="flex-1">
            <p className="text-xs font-medium text-foreground">
              MORTGAGE_PMT_012
            </p>
            <p className="font-mono text-[10px] text-muted-foreground">
              2023-10-24
            </p>
          </div>
          <div className="font-mono text-xs text-foreground">-$2,850.00</div>
        </div>
        <div className="flex justify-between items-start gap-3">
          <div className="font-mono text-[11px] text-primary">TRADE_BUY</div>
          <div className="flex-1">
            <p className="text-xs font-medium text-foreground">BTC_SPOT_0.42</p>
            <p className="font-mono text-[10px] text-muted-foreground">
              2023-10-23
            </p>
          </div>
          <div className="font-mono text-xs text-foreground">-$15,000.00</div>
        </div>
        <div className="flex justify-between items-start gap-3">
          <div className="font-mono text-[11px] text-chart-2">INFLOW</div>
          <div className="flex-1">
            <p className="text-xs font-medium text-foreground">
              FREELANCE_STRIPE_DEP
            </p>
            <p className="font-mono text-[10px] text-muted-foreground">
              2023-10-22
            </p>
          </div>
          <div className="font-mono text-xs text-chart-2">+$8,400.00</div>
        </div>
        <div className="flex justify-between items-start gap-3">
          <div className="font-mono text-[11px] text-chart-2">DIVIDEND</div>
          <div className="flex-1">
            <p className="text-xs font-medium text-foreground">MSFT_MONTHLY</p>
            <p className="font-mono text-[10px] text-muted-foreground">
              2023-10-20
            </p>
          </div>
          <div className="font-mono text-xs text-chart-2">+$420.15</div>
        </div>
      </div>
      <button className="w-full mt-6 py-2 border border-border/30 text-[10px] font-bold text-muted-foreground uppercase tracking-widest hover:bg-surface-container-highest transition-colors cursor-pointer rounded-sm">
        View Audit Trail
      </button>
    </div>
  );
}
