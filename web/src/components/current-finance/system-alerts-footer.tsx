import { Lock, Database } from "lucide-react";

export function SystemAlertsFooter() {
  return (
    <footer className="mt-8 pt-6 border-t border-border/20 flex flex-wrap gap-8 items-center text-[11px] font-mono text-muted-foreground">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-chart-2" />
        <span>SYSTEM_NODE: ACTIVE</span>
      </div>
      <div className="flex items-center gap-2">
        <Lock className="w-[14px] h-[14px]" />
        <span>DATA_STREAM: AES-256-GCM</span>
      </div>
      <div className="flex items-center gap-2">
        <Database className="w-[14px] h-[14px]" />
        <span>SYNC_LATENCY: 12ms</span>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <span className="hover:text-primary cursor-pointer transition-colors">
          RELIABILITY_REPORT
        </span>
        <span className="hover:text-primary cursor-pointer transition-colors">
          NETWORK_STATUS
        </span>
      </div>
    </footer>
  );
}
