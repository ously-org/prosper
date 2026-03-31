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

export function AssetBreakdownTable() {
  return (
    <Card className="col-span-12 xl:col-span-8 bg-surface-container overflow-hidden flex flex-col shadow-sm border border-border/20">
      <CardHeader className="px-6 py-4 bg-surface-container-high flex flex-row justify-between items-center border-b border-border/20 space-y-0">
        <CardTitle className="text-sm font-bold uppercase tracking-widest text-foreground">
          Asset Breakdown
        </CardTitle>
        <Button variant="link" className="h-auto p-0 text-xs text-primary font-bold hover:underline cursor-pointer">
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
            <TableRow className="hover:bg-surface-container-highest transition-colors group cursor-default border-b border-border/20">
              <TableCell className="px-6 py-4 flex items-center gap-3 border-0">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm font-medium text-foreground">
                  Equities (US Stocks)
                </span>
              </TableCell>
              <TableCell className="px-6 py-4 font-mono text-sm text-foreground border-0">
                $842,100.00
              </TableCell>
              <TableCell className="px-6 py-4 text-right border-0">
                <span className="text-chart-2 text-xs font-mono font-medium">
                  +1.24%
                </span>
              </TableCell>
              <TableCell className="px-6 py-4 text-right border-0">
                <div className="flex items-center justify-end gap-2">
                  <span className="font-mono text-xs text-foreground">
                    56.8%
                  </span>
                  <div className="w-16">
                    <Progress value={56.8} className="h-1 bg-surface-container-high" />
                  </div>
                </div>
              </TableCell>
            </TableRow>
            <TableRow className="hover:bg-surface-container-highest transition-colors group cursor-default border-b border-border/20">
              <TableCell className="px-6 py-4 flex items-center gap-3 border-0">
                <div className="w-2 h-2 rounded-full bg-chart-2" />
                <span className="text-sm font-medium text-foreground">
                  Real Estate
                </span>
              </TableCell>
              <TableCell className="px-6 py-4 font-mono text-sm text-foreground border-0">
                $450,000.00
              </TableCell>
              <TableCell className="px-6 py-4 text-right border-0">
                <span className="text-muted-foreground text-xs font-mono font-medium">
                  0.00%
                </span>
              </TableCell>
              <TableCell className="px-6 py-4 text-right border-0">
                <div className="flex items-center justify-end gap-2">
                  <span className="font-mono text-xs text-foreground">
                    30.3%
                  </span>
                  <div className="w-16">
                    <Progress value={30.3} className="h-1 bg-surface-container-high [&>div]:bg-chart-2" />
                  </div>
                </div>
              </TableCell>
            </TableRow>
            <TableRow className="hover:bg-surface-container-highest transition-colors group cursor-default border-b border-border/20">
              <TableCell className="px-6 py-4 flex items-center gap-3 border-0">
                <div className="w-2 h-2 rounded-full bg-destructive" />
                <span className="text-sm font-medium text-foreground">
                  Crypto Assets
                </span>
              </TableCell>
              <TableCell className="px-6 py-4 font-mono text-sm text-foreground border-0">
                $125,803.42
              </TableCell>
              <TableCell className="px-6 py-4 text-right border-0">
                <span className="text-destructive text-xs font-mono font-medium">
                  -2.81%
                </span>
              </TableCell>
              <TableCell className="px-6 py-4 text-right border-0">
                <div className="flex items-center justify-end gap-2">
                  <span className="font-mono text-xs text-foreground">
                    8.5%
                  </span>
                  <div className="w-16">
                    <Progress value={8.5} className="h-1 bg-surface-container-high [&>div]:bg-destructive" />
                  </div>
                </div>
              </TableCell>
            </TableRow>
            <TableRow className="hover:bg-surface-container-highest transition-colors group cursor-default border-0">
              <TableCell className="px-6 py-4 flex items-center gap-3 border-0">
                <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  Cash & Equivalents
                </span>
              </TableCell>
              <TableCell className="px-6 py-4 font-mono text-sm text-foreground border-0">
                $65,000.00
              </TableCell>
              <TableCell className="px-6 py-4 text-right border-0">
                <span className="text-chart-2 text-xs font-mono font-medium">
                  +0.01%
                </span>
              </TableCell>
              <TableCell className="px-6 py-4 text-right border-0">
                <div className="flex items-center justify-end gap-2">
                  <span className="font-mono text-xs text-foreground">
                    4.4%
                  </span>
                  <div className="w-16">
                    <Progress value={4.4} className="h-1 bg-surface-container-high [&>div]:bg-muted-foreground" />
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
