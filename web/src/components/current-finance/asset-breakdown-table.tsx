import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export interface AssetCategory {
  id: string;
  label: string;
  value: number;
  color: string;
  performance: number;
  allocation: number;
}

export const MOCK_ASSETS: AssetCategory[] = [
  {
    id: "equities",
    label: "Equities (US Stocks)",
    value: 842100,
    color: "var(--color-equities)",
    performance: 1.24,
    allocation: 56.8,
  },
  {
    id: "realestate",
    label: "Real Estate",
    value: 450000,
    color: "var(--color-realestate)",
    performance: 0.0,
    allocation: 30.3,
  },
  {
    id: "crypto",
    label: "Crypto Assets",
    value: 125803.42,
    color: "var(--color-crypto)",
    performance: -2.81,
    allocation: 8.5,
  },
  {
    id: "cash",
    label: "Cash & Equivalents",
    value: 65000,
    color: "var(--color-cash)",
    performance: 0.01,
    allocation: 4.4,
  },
];

export function AssetBreakdownTable() {
  return (
    <Card className="col-span-12 xl:col-span-8 bg-surface-container overflow-hidden flex flex-col shadow-sm border border-border/20">
      <CardHeader className="px-6 py-4 bg-surface-container-high flex flex-row justify-between items-center border-b border-border/20 space-y-0">
        <CardTitle className="text-sm font-bold uppercase tracking-widest text-foreground">
          Asset Breakdown
        </CardTitle>
        <Button
          variant="link"
          className="h-auto p-0 text-xs text-primary font-bold hover:underline cursor-pointer"
        >
          Export CSV
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border/20 hover:bg-transparent">
              <TableHead className="px-6 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest h-auto">
                Asset Category
              </TableHead>
              <TableHead className="px-6 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest h-auto">
                Market Value
              </TableHead>
              <TableHead className="px-6 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-right h-auto">
                Performance (1D)
              </TableHead>
              <TableHead className="px-6 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-right h-auto">
                Allocation
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-border/20">
            {MOCK_ASSETS.map((asset) => (
              <TableRow
                key={asset.id}
                className="hover:bg-surface-container-highest transition-colors group cursor-default border-b border-border/20 last:border-0"
              >
                <TableCell className="px-6 py-4 flex items-center gap-3 border-0">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: asset.color }}
                  />
                  <span className="text-sm font-medium text-foreground">
                    {asset.label}
                  </span>
                </TableCell>
                <TableCell className="px-6 py-4 font-mono text-sm text-foreground border-0">
                  ${asset.value.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell className="px-6 py-4 text-right border-0">
                  <span
                    className={`text-xs font-mono font-medium ${
                      asset.performance > 0
                        ? "text-chart-2"
                        : asset.performance < 0
                          ? "text-destructive"
                          : "text-muted-foreground"
                    }`}
                  >
                    {asset.performance > 0 ? "+" : ""}
                    {asset.performance.toFixed(2)}%
                  </span>
                </TableCell>
                <TableCell className="px-6 py-4 text-right border-0">
                  <div className="flex items-center justify-end gap-2">
                    <span className="font-mono text-xs text-foreground">
                      {asset.allocation}%
                    </span>
                    <div className="w-16">
                      <Progress
                        value={asset.allocation}
                        className="h-1 bg-surface-container-high"
                        style={
                          {
                            "--progress-foreground": asset.color,
                          } as React.CSSProperties
                        }
                      />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
