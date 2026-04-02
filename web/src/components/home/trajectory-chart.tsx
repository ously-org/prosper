"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const description = "An interactive area chart for long-term goal trajectory"

// Generate mock data for up to 30 years (monthly)
const generateMockData = () => {
  const data = [];
  const startDate = new Date("2024-01-01");
  let currentNetWorth = 1400000;
  let currentTarget = 1200000;

  for (let i = 0; i <= 360; i++) {
    const date = new Date(startDate);
    date.setMonth(startDate.getMonth() + i);
    
    // Add some random growth
    currentNetWorth *= 1.005 + (Math.random() * 0.002);
    currentTarget *= 1.004;

    data.push({
      date: date.toISOString().split('T')[0],
      netWorth: Math.floor(currentNetWorth),
      target: Math.floor(currentTarget),
    });
  }
  return data;
};

const chartData = generateMockData();

const chartConfig = {
  netWorth: {
    label: "Net Worth",
    color: "var(--chart-1)",
  },
  target: {
    label: "Target",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function TrajectoryChart() {
  const [timeRange, setTimeRange] = React.useState("1y")

  const filteredData = React.useMemo(() => {
    const referenceDate = new Date("2024-01-01");
    let monthsToShow = 12;
    
    switch (timeRange) {
      case "1y": monthsToShow = 12; break;
      case "2y": monthsToShow = 24; break;
      case "5y": monthsToShow = 60; break;
      case "10y": monthsToShow = 120; break;
      case "30y": monthsToShow = 360; break;
    }

    const endDate = new Date(referenceDate);
    endDate.setMonth(referenceDate.getMonth() + monthsToShow);

    return chartData.filter((item) => {
      const date = new Date(item.date);
      return date >= referenceDate && date <= endDate;
    });
  }, [timeRange]);

  return (
    <Card className="border-none bg-transparent shadow-none p-0">
      <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row p-0 mb-4 border-none">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Projection Architecture</CardTitle>
          <CardDescription className="text-[10px] font-mono">
            Long-term trajectory simulation
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex h-8 text-[10px] font-mono uppercase bg-surface-container border-none shadow-none focus:ring-0"
            aria-label="Select timeframe"
          >
            <SelectValue placeholder="Next Year" />
          </SelectTrigger>
          <SelectContent className="rounded-xl bg-surface-container border-none shadow-xl">
            <SelectItem value="1y" className="rounded-lg text-[10px] font-mono uppercase">Next Year</SelectItem>
            <SelectItem value="2y" className="rounded-lg text-[10px] font-mono uppercase">Next 2 Years</SelectItem>
            <SelectItem value="5y" className="rounded-lg text-[10px] font-mono uppercase">Next 5 Years</SelectItem>
            <SelectItem value="10y" className="rounded-lg text-[10px] font-mono uppercase">Next 10 Years</SelectItem>
            <SelectItem value="30y" className="rounded-lg text-[10px] font-mono uppercase">Until Retirement (30y)</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[320px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillNetWorth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-netWorth)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-netWorth)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillTarget" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-target)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-target)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#333" strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={timeRange === "30y" ? 48 : 32}
              tick={{ fill: '#888', fontSize: 10 }}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  year: "2-digit",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="target"
              type="natural"
              fill="url(#fillTarget)"
              stroke="var(--color-target)"
              stackId="a"
            />
            <Area
              dataKey="netWorth"
              type="natural"
              fill="url(#fillNetWorth)"
              stroke="var(--color-netWorth)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
