import { ArrowUp } from "lucide-react";

export function NetWorthPulse() {
  return (
    <div className="col-span-12 lg:col-span-8 bg-surface-container rounded-md p-6 flex flex-col justify-between border-l-[3px] border-primary shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest block mb-1">
            Total Net Worth
          </span>
          <h3 className="text-4xl font-mono font-bold tracking-tighter text-foreground">
            $1,482,903.42
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-chart-2 text-xs font-mono font-medium flex items-center">
              <ArrowUp className="w-3.5 h-3.5 mr-0.5" /> +4.2%
            </span>
            <span className="text-muted-foreground text-[11px] font-medium tracking-wide">
              (30D Pulse)
            </span>
          </div>
        </div>
        <div className="w-48 h-16 flex items-end gap-[3px] px-2">
          {/* Mock Sparkline */}
          <div className="flex-1 bg-primary/20 h-[30%] rounded-t-sm" />
          <div className="flex-1 bg-primary/20 h-[40%] rounded-t-sm" />
          <div className="flex-1 bg-primary/20 h-[35%] rounded-t-sm" />
          <div className="flex-1 bg-primary/20 h-[55%] rounded-t-sm" />
          <div className="flex-1 bg-primary/20 h-[45%] rounded-t-sm" />
          <div className="flex-1 bg-primary/20 h-[60%] rounded-t-sm" />
          <div className="flex-1 bg-primary/30 h-[75%] rounded-t-sm" />
          <div className="flex-1 bg-primary/30 h-[65%] rounded-t-sm" />
          <div className="flex-1 bg-primary/40 h-[85%] rounded-t-sm" />
          <div className="flex-1 bg-primary h-full rounded-t-sm" />
        </div>
      </div>
    </div>
  );
}
