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
import { useAssets } from "@/hooks/use-assets";
import { AssetType } from "@/lib/enum";
import type { Asset } from "@/lib/model/Asset";
import { ASSET_TYPE_TEXT } from "@/components/const";

// Interface moved to component level as it is UI-specific
interface AssetCategory {
  id: string;
  name: string;
  categoryName: string;
  value: number;
  color: string;
  performance: number;
  allocation: number;
}

export function AssetBreakdownTable() {
  const { data: domainAssets, isLoading } = useAssets();

  // Call the mapping helper function to prepare UI-ready categories
  const assets: AssetCategory[] = mapAssetsToAssetCategoryProps(
    domainAssets ?? [],
  );

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
          Update Assets
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border/20 hover:bg-transparent">
              <TableHead className="px-6 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest h-auto">
                Asset Name
              </TableHead>
              <TableHead className="px-6 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest h-auto">
                Category
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
            {isLoading ? (
              <TableRow className="animate-pulse">
                <TableCell
                  colSpan={5}
                  className="h-40 text-center py-4 text-muted-foreground italic border-0"
                >
                  Loading asset data...
                </TableCell>
              </TableRow>
            ) : (
              assets?.map((asset) => (
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
                      {asset.name}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4 border-0">
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-surface-container-highest text-muted-foreground uppercase tracking-tighter">
                      {asset.categoryName}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4 font-mono text-sm text-foreground border-0">
                    $
                    {asset.value.toLocaleString(undefined, {
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
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

/**
 * Mapping helper function to transform domain Asset models into UI-ready categories
 */
function mapAssetsToAssetCategoryProps(domainAssets: Asset[]): AssetCategory[] {
  const totalValue = domainAssets.reduce((sum, a) => sum + a.value, 0) || 1;

  return domainAssets.map((asset) => ({
    id: asset.id,
    name: asset.name,
    categoryName: ASSET_TYPE_TEXT[asset.type],
    value: asset.value,
    color: asset.color || "var(--primary)",
    performance: asset.type === AssetType.Investment ? 1.24 : 0, // Mock for now
    allocation: parseFloat(((asset.value / totalValue) * 100).toFixed(1)),
  }));
}
