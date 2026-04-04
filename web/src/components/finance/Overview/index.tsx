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
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import { useAssets } from "@/hooks/use-assets";
import { useLiabilities } from "@/hooks/use-liabilities";
import { useIncome, useExpenses } from "@/hooks/use-budget";
import { ASSET_TYPE_TEXT, LIABILITY_TYPE_TEXT } from "@/components/const";
import { cn } from "@/lib/utils";

// --- Mock Data ---
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
  networth: { label: "Net Worth", color: "var(--chart-1)" },
  assets: { label: "Assets", color: "var(--chart-2)" },
  liabilities: { label: "Liabilities", color: "var(--destructive)" },
} satisfies ChartConfig;

type TabType = "performance" | "allocation" | "cashflow";

function PerformanceChart() {
  return (
    <ChartContainer
      config={performanceChartConfig}
      className="aspect-auto h-[350px] w-full"
    >
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{ left: 12, right: 12, top: 20 }}
      >
        <CartesianGrid vertical={false} stroke="#333" strokeDasharray="3 3" />
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
              labelFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })
              }
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
  );
}

function AllocationCharts({
  assetData,
  liabilityData,
  netWorthData,
  totalNetWorth,
  totalAssets,
  totalLiabilities,
}: any) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {[
        {
          title: "Net Worth",
          data: netWorthData,
          total: totalNetWorth,
          color: "var(--chart-1)",
        },
        {
          title: "Assets",
          data: assetData,
          total: totalAssets,
          color: "var(--chart-2)",
        },
        {
          title: "Liabilities",
          data: liabilityData,
          total: totalLiabilities,
          color: "var(--destructive)",
        },
      ].map((chart, idx) => (
        <div
          key={chart.title}
          className={cn(
            "flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4",
            `duration-${500 + idx * 200}`,
          )}
        >
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
                  data={chart.data}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={idx === 0 ? 5 : 2}
                  dataKey="value"
                  nameKey={idx === 0 ? "name" : "label"}
                  stroke="none"
                >
                  {chart.data.map((entry: any, index: number) => (
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
                              ${(chart.total / 1000).toFixed(1)}K
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 28}
                              className="fill-muted-foreground text-[10px] uppercase font-mono tracking-widest font-bold"
                            >
                              {chart.title}
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
      ))}
    </div>
  );
}

function CashflowChart({ waterfallData }: { waterfallData: any[] }) {
  return (
    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
      <ChartContainer config={{}} className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={waterfallData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--surface-container-high)"
            />
            <XAxis
              dataKey="name"
              tick={{
                fontSize: 10,
                fontFamily: "monospace",
                fill: "var(--muted-foreground)",
              }}
              tickLine={false}
              axisLine={false}
              interval={0}
              tickFormatter={(value) =>
                value.length > 14 ? value.substring(0, 14) + "..." : value
              }
            />
            <ChartTooltip
              cursor={{ fill: "var(--surface-container-high)", opacity: 0.4 }}
              content={({ active, payload }) => {
                if (active && payload && payload.length > 0) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-surface-container-highest border-none shadow-2xl p-3 rounded-lg font-mono text-xs z-50">
                      <div className="font-bold text-foreground mb-1">
                        {data.name}
                      </div>
                      <div style={{ color: data.fill }} className="text-lg">
                        {data.actualValue > 0 && data.name !== "Net Cashflow"
                          ? "+"
                          : ""}
                        {data.actualValue < 0 ? "-" : ""}$
                        {Math.abs(data.actualValue).toLocaleString()}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="value" radius={[4, 4, 4, 4]}>
              {waterfallData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
              <LabelList
                dataKey="actualValue"
                position="top"
                formatter={(val: any) =>
                  `${val > 0 ? "+" : ""}${(Number(val) / 1000).toFixed(1)}k`
                }
                style={{
                  fill: "var(--muted-foreground)",
                  fontSize: 10,
                  fontFamily: "monospace",
                  fontWeight: "bold",
                }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}

// --- Main Component ---

import { OuslyChartCard } from "@/components/shared/OuslyChartCard";

export function CurrentFinanceOverview() {
  const [activeTab, setActiveTab] = React.useState<TabType>("performance");
  const { data: assets } = useAssets();
  const { data: liabilities } = useLiabilities();
  const { data: income } = useIncome();
  const { data: expenses } = useExpenses();

  const tabs: { id: TabType; title: string; description: string }[] = [
    {
      id: "performance",
      title: "Performance",
      description: "Historical analysis of the last 12 months",
    },
    {
      id: "allocation",
      title: "Allocation",
      description: "Current capital distribution architecture",
    },
    {
      id: "cashflow",
      title: "Cashflow",
      description: "Income and Expense cashflow distribution map",
    },
  ];

  const waterfallData = React.useMemo(() => {
    // ... same waterfall logic
    let currentSum = 0;
    const data = [];
    if (income) {
      income.forEach((i) => {
        data.push({
          name: i.name,
          value: [currentSum, currentSum + i.amount],
          fill: "var(--chart-2)",
          isExpense: false,
          actualValue: i.amount,
        });
        currentSum += i.amount;
      });
    }
    if (expenses) {
      expenses.forEach((e) => {
        data.push({
          name: e.name,
          value: [currentSum - e.amount, currentSum],
          fill: "var(--destructive)",
          isExpense: true,
          actualValue: -e.amount,
        });
        currentSum -= e.amount;
      });
    }
    data.push({
      name: "Net Cashflow",
      value: [0, currentSum],
      fill: currentSum >= 0 ? "var(--chart-1)" : "var(--destructive)",
      isExpense: currentSum < 0,
      actualValue: currentSum,
    });
    return data;
  }, [income, expenses]);

  const assetChartData = React.useMemo(() => {
    if (!assets) return [];
    return assets.reduce((acc, asset) => {
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
  }, [assets]);

  const liabilityChartData = React.useMemo(() => {
    if (!liabilities) return [];
    return liabilities.reduce((acc, liab) => {
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
  }, [liabilities]);

  const totalAssets = assetChartData.reduce((sum, item) => sum + item.value, 0);
  const totalLiabilities = liabilityChartData.reduce(
    (sum, item) => sum + item.value,
    0,
  );
  const totalNetWorth = totalAssets - totalLiabilities;

  const netWorthChartData = [
    { name: "Assets", value: totalAssets, fill: "var(--chart-2)" },
    {
      name: "Liabilities",
      value: totalLiabilities,
      fill: "var(--destructive)",
    },
  ];

  const activeTabData = tabs.find((t) => t.id === activeTab);

  return (
    <OuslyChartCard
      title="Capital Overview"
      description={activeTabData?.description}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={(id) => setActiveTab(id as TabType)}
      className="bg-surface-container border-none shadow-none ring-0 py-4 sm:py-0"
    >
      {activeTab === "performance" ? (
        <PerformanceChart />
      ) : activeTab === "allocation" ? (
        <AllocationCharts
          assetData={assetChartData}
          liabilityData={liabilityChartData}
          netWorthData={netWorthChartData}
          totalNetWorth={totalNetWorth}
          totalAssets={totalAssets}
          totalLiabilities={totalLiabilities}
        />
      ) : (
        <CashflowChart waterfallData={waterfallData} />
      )}
    </OuslyChartCard>
  );
}
