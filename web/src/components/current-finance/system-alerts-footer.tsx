import { Lock, Database } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface SystemStatus {
  nodeStatus: string;
  dataStream: string;
  syncLatency: string;
}

const MOCK_SYSTEM_STATUS: SystemStatus = {
  nodeStatus: "ACTIVE",
  dataStream: "AES-256-GCM",
  syncLatency: "12ms",
};

export function SystemAlertsFooter() {
  return (
    <div className="mt-8">
      <Separator className="bg-border/20 mb-6" />
      <footer className="flex flex-wrap gap-8 items-center text-[11px] font-mono text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-chart-2" />
          <span>SYSTEM_NODE: {MOCK_SYSTEM_STATUS.nodeStatus}</span>
        </div>
        <div className="flex items-center gap-2">
          <Lock className="w-[14px] h-[14px]" />
          <span>DATA_STREAM: {MOCK_SYSTEM_STATUS.dataStream}</span>
        </div>
        <div className="flex items-center gap-2">
          <Database className="w-[14px] h-[14px]" />
          <span>SYNC_LATENCY: {MOCK_SYSTEM_STATUS.syncLatency}</span>
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
    </div>
  );
}
