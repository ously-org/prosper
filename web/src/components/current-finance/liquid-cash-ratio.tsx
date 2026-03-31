import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function LiquidCashRatio() {
  return (
    <Card className="bg-surface-container border border-primary/10 shadow-sm p-5">
      <CardHeader className="p-0 flex flex-row justify-between items-center mb-2 space-y-0">
        <CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          Liquid Cash Ratio
        </CardTitle>
        <span className="font-mono text-xs text-primary">4.4%</span>
      </CardHeader>
      <CardContent className="p-0">
        <Progress value={44} className="h-1 bg-surface-container-high" />
        <p className="text-[10px] text-muted-foreground mt-3 leading-relaxed">
          Architecture note: Current liquidity is{" "}
          <span className="text-foreground">below</span> target threshold of 10%.
          Consider rebalancing from Equities.
        </p>
      </CardContent>
    </Card>
  );
}
