import { RefreshCw } from "lucide-react";

export function Header() {
  return (
    <header className="mb-8 flex justify-between items-end">
      <div>
        <h2 className="text-heading font-extrabold text-2xl tracking-tight text-foreground">
          Current Finance
        </h2>
        <p className="text-sm text-muted-foreground">
          Real-time capital overview & allocation architecture.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Last Updated
          </p>
          <p className="font-mono text-xs text-foreground">
            2023-10-27 14:42:01 UTC
          </p>
        </div>
        <button className="h-10 w-10 rounded-md bg-surface-container-high border border-border/20 flex items-center justify-center hover:bg-surface-container-highest transition-colors cursor-pointer">
          <RefreshCw className="text-primary w-[18px] h-[18px]" />
        </button>
      </div>
    </header>
  );
}
