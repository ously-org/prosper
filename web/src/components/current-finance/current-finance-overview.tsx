"use client";

import * as React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  Pie,
  PieChart,
  Cell,
  Label,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import { useAssets, useLiabilities } from "@/hooks/use-assets";
import { ASSET_TYPE_TEXT, LIABILITY_TYPE_TEXT } from "@/components/const";

// Generate mock historical data (monthly)
const generateMockHistoricalData = () => {
  const data = [];
  const startDate = new Date("2023-04-01");
  let netWorth = 1200000;
  let assets = 1400000;
  let liabilities = 200000;

  for (let i = 0; i < 12; i++) {
    const date = new Date(startDate);
    date.setMonth(startDate.getMonth() + i);

    const nwChange = Math.random() * 50000 - 10000;
    netWorth += nwChange;
    assets += nwChange + Math.random() * 5000;
    liabilities = assets - netWorth;

    data.push({
      date: date.toISOString().split("T")[0],
      networth: Math.floor(netWorth),
      assets: Math.floor(assets),
      liabilities: Math.floor(liabilities),
    });
  }
  return data;
};

const chartData = generateMockHistoricalData();

const performanceChartConfig = {
  networth: {
    label: "Net Worth",
    color: "var(--chart-1)",
  },
  assets: {
    label: "Assets",
    color: "var(--chart-2)",
  },
  liabilities: {
    label: "Liabilities",
    color: "var(--destructive)",
  },
} satisfies ChartConfig;

export function CurrentFinanceOverview() {
  const [activeTab, setActiveTab] = React.useState<
    "performance" | "allocation"
  >("performance");
  const { data: assets } = useAssets();
  const { data: liabilities } = useLiabilities();

  const assetChartData = React.useMemo(() => {
    if (!assets) return [];
    const data = assets.reduce((acc, asset) => {
      let category = acc.find((c) => c.category === asset.type);
      if (!category) {
        category = {
          category: asset.type,
          label: ASSET_TYPE_TEXT[asset.type],
          value: 0,
          fill: asset.color || "var(--chart-2)",
        };
        acc.push(category);
      }
      category.value += asset.value;
      return acc;
    }, [] as any[]);
    return data;
  }, [assets]);

  const liabilityChartData = React.useMemo(() => {
    if (!liabilities) return [];
    const data = liabilities.reduce((acc, liab) => {
      let category = acc.find((c) => c.category === liab.type);
      if (!category) {
        category = {
          category: liab.type,
          label: LIABILITY_TYPE_TEXT[liab.type],
          value: 0,
          fill: "var(--destructive)",
        };
        acc.push(category);
      }
      category.value += liab.balance;
      return acc;
    }, [] as any[]);
    return data;
  }, [liabilities]);

  const netWorthChartData = React.useMemo(() => {
    const totalAssets = assetChartData.reduce(
      (sum, item) => sum + item.value,
      0,
    );
    const totalLiabilities = liabilityChartData.reduce(
      (sum, item) => sum + item.value,
      0,
    );

    // For net worth donut, we can show assets and liabilities
    return [
      { name: "Assets", value: totalAssets, fill: "var(--chart-2)" },
      {
        name: "Liabilities",
        value: totalLiabilities,
        fill: "var(--destructive)",
      },
    ];
  }, [assetChartData, liabilityChartData]);

  const totalAssets = assetChartData.reduce((sum, item) => sum + item.value, 0);
  const totalLiabilities = liabilityChartData.reduce(
    (sum, item) => sum + item.value,
    0,
  );
  const totalNetWorth = totalAssets - totalLiabilities;

  return (
    <Card className="col-span-12 py-4 sm:py-0 bg-surface-container border-none shadow-none ring-0">
      <CardHeader className="flex flex-col items-stretch border-b border-surface-container-high p-0! sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-widest font-mono">
            Capital Overview
          </CardTitle>
          <CardDescription className="text-[10px] font-mono">
            {activeTab === "performance"
              ? "Historical analysis of the last 12 months"
              : "Current distribution architecture"}
          </CardDescription>
        </div>
        <div className="flex">
          <button
            data-active={activeTab === "performance"}
            className="flex flex-1 flex-col justify-center gap-1 border-t border-surface-container-high px-6 py-4 text-left first:border-l-0 even:border-l data-[active=true]:bg-surface-container-high sm:border-t-0 sm:border-l sm:px-8 sm:py-6 transition-colors outline-none min-w-[200px]"
            onClick={() => setActiveTab("performance")}
          >
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-tight">
              Historical Performance
            </span>
            <span className="text-xl leading-none font-bold sm:text-2xl font-mono tracking-tighter">
              Performance
            </span>
          </button>
          <button
            data-active={activeTab === "allocation"}
            className="flex flex-1 flex-col justify-center gap-1 border-t border-surface-container-high px-6 py-4 text-left border-l data-[active=true]:bg-surface-container-high sm:border-t-0 sm:border-l sm:px-8 sm:py-6 transition-colors outline-none min-w-[200px]"
            onClick={() => setActiveTab("allocation")}
          >
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-tight">
              Asset Allocation
            </span>
            <span className="text-xl leading-none font-bold sm:text-2xl font-mono tracking-tighter">
              Allocation
            </span>
          </button>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6 min-h-[400px]">
        {activeTab === "performance" ? (
          <ChartContainer
            config={performanceChartConfig}
            className="aspect-auto h-[350px] w-full"
          >
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
                top: 20,
              }}
            >
              <CartesianGrid
                vertical={false}
                stroke="#333"
                strokeDasharray="3 3"
              />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tick={{ fill: "#888", fontSize: 10, fontFamily: "monospace" }}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    year: "2-digit",
                  });
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[180px] bg-surface-container border-none shadow-xl font-mono"
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      });
                    }}
                  />
                }
              />
              <Line
                dataKey="networth"
                type="monotone"
                stroke={performanceChartConfig.networth.color}
                strokeWidth={4}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
              <Line
                dataKey="assets"
                type="monotone"
                stroke={performanceChartConfig.assets.color}
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
              <Line
                dataKey="liabilities"
                type="monotone"
                stroke={performanceChartConfig.liabilities.color}
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-12">
            {/* Net Worth Donut */}
            <div className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="h-[300px] w-full relative">
                <ChartContainer
                  config={performanceChartConfig}
                  className="mx-auto aspect-square h-full"
                >
                  <PieChart>
                    <ChartTooltip
                      cursor={false}
                      content={
                        <ChartTooltipContent
                          hideLabel
                          className="font-mono bg-surface-container-highest border-none shadow-2xl"
                        />
                      }
                    />
                    <Pie
                      data={netWorthChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={110}
                      paddingAngle={5}
                      dataKey="value"
                      nameKey="name"
                      stroke="none"
                    >
                      {netWorthChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.fill}
                          className="hover:opacity-80 transition-opacity outline-none"
                        />
                      ))}
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor="middle"
                                dominantBaseline="middle"
                              >
                                <tspan
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  className="fill-foreground text-3xl font-bold font-mono tracking-tighter"
                                >
                                  ${(totalNetWorth / 1000).toFixed(1)}K
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 28}
                                  className="fill-muted-foreground text-[10px] uppercase font-mono tracking-widest font-bold"
                                >
                                  Net Worth
                                </tspan>
                              </text>
                            );
                          }
                        }}
                      />
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </div>
            </div>

            {/* Assets Donut */}
            <div className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="h-[300px] w-full relative">
                <ChartContainer
                  config={{}}
                  className="mx-auto aspect-square h-full"
                >
                  <PieChart>
                    <ChartTooltip
                      cursor={false}
                      content={
                        <ChartTooltipContent
                          hideLabel
                          className="font-mono bg-surface-container-highest border-none shadow-2xl"
                        />
                      }
                    />
                    <Pie
                      data={assetChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={110}
                      paddingAngle={2}
                      dataKey="value"
                      nameKey="label"
                      stroke="none"
                    >
                      {assetChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.fill}
                          className="hover:opacity-80 transition-opacity outline-none"
                        />
                      ))}
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor="middle"
                                dominantBaseline="middle"
                              >
                                <tspan
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  className="fill-foreground text-3xl font-bold font-mono tracking-tighter"
                                >
                                  ${(totalAssets / 1000).toFixed(1)}K
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 28}
                                  className="fill-muted-foreground text-[10px] uppercase font-mono tracking-widest font-bold"
                                >
                                  Assets
                                </tspan>
                              </text>
                            );
                          }
                        }}
                      />
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </div>
            </div>

            {/* Liabilities Donut */}
            <div className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-900">
              <div className="h-[300px] w-full relative">
                <ChartContainer
                  config={{}}
                  className="mx-auto aspect-square h-full"
                >
                  <PieChart>
                    <ChartTooltip
                      cursor={false}
                      content={
                        <ChartTooltipContent
                          hideLabel
                          className="font-mono bg-surface-container-highest border-none shadow-2xl"
                        />
                      }
                    />
                    <Pie
                      data={liabilityChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={110}
                      paddingAngle={2}
                      dataKey="value"
                      nameKey="label"
                      stroke="none"
                    >
                      {liabilityChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.fill}
                          className="hover:opacity-80 transition-opacity outline-none"
                        />
                      ))}
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor="middle"
                                dominantBaseline="middle"
                              >
                                <tspan
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  className="fill-foreground text-3xl font-bold font-mono tracking-tighter"
                                >
                                  ${(totalLiabilities / 1000).toFixed(1)}K
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 28}
                                  className="fill-muted-foreground text-[10px] uppercase font-mono tracking-widest font-bold"
                                >
                                  Liabilities
                                </tspan>
                              </text>
                            );
                          }
                        }}
                      />
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      {/* <CardFooter className="flex-col gap-1 p-6 pt-0 text-sm border-t border-surface-container-high pt-4">
        <div className="flex items-center gap-2 leading-none font-medium text-foreground">
          Trending up by 4.2% this month{" "}
          <TrendingUp className="h-3.5 w-3.5 text-chart-2" />
        </div>
        <div className="leading-none text-[10px] text-muted-foreground font-mono uppercase tracking-tight">
          Aggregated from all primary capital nodes
        </div>
      </CardFooter> */}
    </Card>
  );
}
