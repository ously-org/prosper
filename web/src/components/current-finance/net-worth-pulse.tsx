import { ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface NetWorthData {
  total: number;
  change30D: number;
  sparkline: number[];
}

const MOCK_NET_WORTH: NetWorthData = {
  total: 1482903.42,
  change30D: 4.2,
  sparkline: [30, 40, 35, 55, 45, 60, 75, 65, 85, 100],
};

export function NetWorthPulse() {
  const isPositive = MOCK_NET_WORTH.change30D > 0;

  return (
    <Card className="col-span-12 lg:col-span-8 bg-surface-container flex flex-col justify-between border-l-[3px] border-primary shadow-sm p-6">
      <CardContent className="p-0 flex justify-between items-start">
        <div>
          <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest block mb-1">
            Total Net Worth
          </span>
          <h3 className="text-4xl font-mono font-bold tracking-tighter text-foreground">
            ${MOCK_NET_WORTH.total.toLocaleString()}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`${isPositive ? "text-chart-2" : "text-destructive"} text-xs font-mono font-medium flex items-center`}
            >
              {isPositive ? (
                <ArrowUp className="w-3.5 h-3.5 mr-0.5" />
              ) : (
                <ArrowDown className="w-3.5 h-3.5 mr-0.5" />
              )}
              {isPositive ? "+" : ""}
              {MOCK_NET_WORTH.change30D}%
            </span>
            <span className="text-muted-foreground text-[11px] font-medium tracking-wide">
              (30D Pulse)
            </span>
          </div>
        </div>
        <div className="w-48 h-12 flex items-end gap-[3px] px-2 self-center">
          {MOCK_NET_WORTH.sparkline.map((val, idx) => (
            <div
              key={idx}
              className={`flex-1 ${val >= 80 ? "bg-primary" : val >= 60 ? "bg-primary/40" : val >= 40 ? "bg-primary/30" : "bg-primary/20"} rounded-t-[1px]`}
              style={{ height: `${val}%` }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
