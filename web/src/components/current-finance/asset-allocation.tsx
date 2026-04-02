import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import { useAssets } from "@/hooks/use-assets";
import type { Asset } from "@/lib/model/Asset";
import { ASSET_TYPE_TEXT } from "@/components/const";

const chartConfig = {
  value: {
    label: "Market Value ($)",
  },
  ...Object.fromEntries(
    Object.entries(ASSET_TYPE_TEXT).map(([key, value]) => [
      key,
      { label: value },
    ]),
  ),
} satisfies ChartConfig;

export function AssetAllocation() {
  const { data: assets, isLoading } = useAssets();

  const chartData = mapAssetsToChartData(assets ?? []);

  return (
    <Card className="col-span-12 lg:col-span-4 bg-surface-container border-l-[3px] border-chart-2 shadow-sm flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest text-center">
          Asset Allocation
        </CardTitle>
        <CardDescription className="text-[10px] font-mono">
          Current Distribution Architecture
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[200px]"
        >
          {isLoading ? (
            <div className="flex items-center justify-center h-full text-[10px] font-mono text-muted-foreground animate-pulse">
              ANALYZING NODES...
            </div>
          ) : (
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="label"
                innerRadius={40}
                strokeWidth={5}
              />
            </PieChart>
          )}
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-1 p-6 pt-0 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium text-foreground">
          Trending up by 4.2% this month{" "}
          <TrendingUp className="h-3.5 w-3.5 text-chart-2" />
        </div>
        <div className="leading-none text-[10px] text-muted-foreground font-mono uppercase tracking-tight">
          Aggregated from 4 primary asset nodes
        </div>
      </CardFooter>
    </Card>
  );
}

/**
 * Mapping helper function to transform domain Asset models into chart-ready data
 */
function mapAssetsToChartData(domainAssets: Asset[]) {
  return domainAssets.reduce(
    (acc, asset) => {
      let category = acc.find((c) => c.category === asset.type);
      if (!category) {
        category = {
          category: asset.type,
          label: ASSET_TYPE_TEXT[asset.type],
          value: 0,
          fill: asset.color || "var(--primary)",
        };
        acc.push(category);
      }
      category.value += asset.value;
      return acc;
    },
    [] as { category: string; label: string; value: number; fill: string }[],
  );
}
