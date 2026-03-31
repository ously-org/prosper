import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface LiquidityRatio {
  current: number;
  target: number;
  note: string;
}

const MOCK_LIQUIDITY: LiquidityRatio = {
  current: 4.4,
  target: 10,
  note: "Architecture note: Current liquidity is below target threshold of 10%. Consider rebalancing from Equities.",
};

export function LiquidCashRatio() {
  const isBelowTarget = MOCK_LIQUIDITY.current < MOCK_LIQUIDITY.target;

  return (
    <Card className="bg-surface-container border border-primary/10 shadow-sm p-5">
      <CardHeader className="p-0 flex flex-row justify-between items-center mb-2 space-y-0">
        <CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          Liquid Cash Ratio
        </CardTitle>
        <span className="font-mono text-xs text-primary">
          {MOCK_LIQUIDITY.current}%
        </span>
      </CardHeader>
      <CardContent className="p-0">
        <Progress
          value={MOCK_LIQUIDITY.current * 10}
          className="h-1 bg-surface-container-high"
        />
        <p className="text-[10px] text-muted-foreground mt-3 leading-relaxed">
          Architecture note: Current liquidity is{" "}
          <span className={isBelowTarget ? "text-destructive" : "text-chart-2"}>
            {isBelowTarget ? "below" : "above"}
          </span>{" "}
          target threshold of {MOCK_LIQUIDITY.target}%. {MOCK_LIQUIDITY.note}
        </p>
      </CardContent>
    </Card>
  );
}
