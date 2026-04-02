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
  
  let cash = 100000;
  let stock = 800000;
  let property = 600000;
  let crypto = 100000;
  
  let mortgage = 150000;
  let loan = 40000;
  let credit = 10000;

  for (let i = 0; i <= 360; i++) {
    const date = new Date(startDate);
    date.setMonth(startDate.getMonth() + i);
    
    // Asset Growth
    cash *= 1.001;
    stock *= 1.007 + (Math.random() * 0.002);
    property *= 1.003;
    crypto *= 1.01 + (Math.random() * 0.05 - 0.025);

    // Liability Reduction
    mortgage *= 0.997;
    loan *= 0.99;
    credit = Math.max(0, credit - 500);

    const totalAssets = cash + stock + property + crypto;
    const totalLiabilities = mortgage + loan + credit;
    const netWorth = totalAssets - totalLiabilities;

    const tiedLiabilities = mortgage;
    const untiedLiabilities = loan + credit;
    const equity = totalAssets - tiedLiabilities;
    const untiedDebt = -untiedLiabilities;

    data.push({
      date: date.toISOString().split('T')[0],
      // Assets
      cash: Math.floor(cash),
      stock: Math.floor(stock),
      property: Math.floor(property),
      crypto: Math.floor(crypto),
      totalAssets: Math.floor(totalAssets),
      // Liabilities
      mortgage: Math.floor(mortgage),
      loan: Math.floor(loan),
      credit: Math.floor(credit),
      totalLiabilities: Math.floor(totalLiabilities),
      // Summary
      netWorth: Math.floor(netWorth),
      equity: Math.floor(equity),
      untiedDebt: Math.floor(untiedDebt),
    });
  }
  return data;
};

const chartData = generateMockData();

const chartConfig = {
  netWorth: { label: "Net Worth", color: "var(--chart-1)" },
  equity: { label: "Equity", color: "var(--chart-1)" },
  untiedDebt: { label: "Untied Debt", color: "var(--destructive)" },
  cash: { label: "Cash", color: "var(--chart-2)" },
  stock: { label: "Stock", color: "var(--chart-3)" },
  property: { label: "Property", color: "var(--chart-4)" },
  crypto: { label: "Crypto", color: "var(--chart-5)" },
  mortgage: { label: "Mortgage", color: "var(--destructive)" },
  loan: { label: "Personal Loan", color: "#f59e0b" },
  credit: { label: "Credit Card", color: "#ec4899" },
  totalAssets: { label: "Total Assets", color: "var(--chart-2)" },
  totalLiabilities: { label: "Total Liabilities", color: "var(--destructive)" },
} satisfies ChartConfig

export function TrajectoryChart() {
  const [timeRange, setTimeRange] = React.useState("1y")
  const [viewMode, setViewMode] = React.useState("networth")

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
    <Card className="border-none bg-transparent shadow-none p-0 ring-0 ring-offset-0 ring-none outline-none">
      <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row p-0 mb-4 border-none outline-none">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Projection Architecture</CardTitle>
          <CardDescription className="text-[10px] font-mono">
            Trajectory simulation for {viewMode.replace(/([A-Z])/g, ' $1')}
          </CardDescription>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <Select value={viewMode} onValueChange={setViewMode}>
            <SelectTrigger
              className="w-[140px] h-8 text-[10px] font-mono uppercase bg-surface-container border-none shadow-none focus:ring-0"
              aria-label="Select view mode"
            >
              <SelectValue placeholder="Net Worth" />
            </SelectTrigger>
            <SelectContent className="rounded-xl bg-surface-container border-none shadow-xl">
              <SelectItem value="networth" className="rounded-lg text-[10px] font-mono uppercase">Net Worth</SelectItem>
              <SelectItem value="assets" className="rounded-lg text-[10px] font-mono uppercase">Assets</SelectItem>
              <SelectItem value="liabilities" className="rounded-lg text-[10px] font-mono uppercase">Liabilities</SelectItem>
            </SelectContent>
          </Select>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="w-[160px] h-8 text-[10px] font-mono uppercase bg-surface-container border-none shadow-none focus:ring-0"
              aria-label="Select timeframe"
            >
              <SelectValue placeholder="Next Year" />
            </SelectTrigger>
            <SelectContent className="rounded-xl bg-surface-container border-none shadow-xl">
              <SelectItem value="1y" className="rounded-lg text-[10px] font-mono uppercase">Next Year</SelectItem>
              <SelectItem value="2y" className="rounded-lg text-[10px] font-mono uppercase">Next 2 Years</SelectItem>
              <SelectItem value="5y" className="rounded-lg text-[10px] font-mono uppercase">Next 5 Years</SelectItem>
              <SelectItem value="10y" className="rounded-lg text-[10px] font-mono uppercase">Next 10 Years</SelectItem>
              <SelectItem value="30y" className="rounded-lg text-[10px] font-mono uppercase">Retirement (30y)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="p-0 border-none outline-none">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[320px] w-full border-none outline-none"
        >
          <AreaChart data={filteredData}>
            <defs>
              {Object.keys(chartConfig).map((key) => (
                <linearGradient key={key} id={`fill${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartConfig[key as keyof typeof chartConfig].color || "var(--primary)"} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={chartConfig[key as keyof typeof chartConfig].color || "var(--primary)"} stopOpacity={0.1} />
                </linearGradient>
              ))}
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
                  formatter={(value, name, item) => {
                    // Custom formatter to show total when hovering breakdown
                    const totalKey = viewMode === "networth" ? "netWorth" : viewMode === "assets" ? "totalAssets" : "totalLiabilities";
                    const totalValue = item.payload[totalKey];
                    
                    const isLastItem = viewMode === "assets" 
                      ? name === "crypto" 
                      : viewMode === "liabilities" 
                        ? name === "credit" 
                        : viewMode === "networth"
                          ? name === "untiedDebt"
                          : true;

                    const displayValue = name === "untiedDebt"
                      ? `-$${Math.abs(value as number).toLocaleString()}`
                      : `$${(value as number).toLocaleString()}`;

                    return (
                      <div className="flex flex-1 justify-between items-center gap-4">
                        <div className="flex items-center gap-1.5">
                          <div 
                            className="h-1.5 w-1.5 shrink-0 rounded-[2px]" 
                            style={{ backgroundColor: item.color }} 
                          />
                          <span className="text-muted-foreground whitespace-nowrap">
                            {chartConfig[name as keyof typeof chartConfig]?.label || name}
                          </span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="font-mono font-medium text-foreground tabular-nums">
                            {displayValue}
                          </span>
                          {isLastItem && (
                            <span className="text-[11px] font-mono font-bold text-primary mt-2 border-t border-primary/20 pt-2">
                              TOTAL: ${totalValue.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  }}
                />
              }
            />
            {viewMode === "networth" && (
              <>
                <Area
                  dataKey="equity"
                  type="natural"
                  fill="url(#fillequity)"
                  stroke="var(--color-equity)"
                  stackId="networth"
                />
                <Area
                  dataKey="untiedDebt"
                  type="natural"
                  fill="url(#filluntiedDebt)"
                  stroke="var(--color-untiedDebt)"
                  stackId="networth"
                />
              </>
            )}
            {viewMode === "assets" && (
              <>
                <Area dataKey="cash" type="natural" fill="url(#fillcash)" stroke="var(--color-cash)" stackId="assets" />
                <Area dataKey="stock" type="natural" fill="url(#fillstock)" stroke="var(--color-stock)" stackId="assets" />
                <Area dataKey="property" type="natural" fill="url(#fillproperty)" stroke="var(--color-property)" stackId="assets" />
                <Area dataKey="crypto" type="natural" fill="url(#fillcrypto)" stroke="var(--color-crypto)" stackId="assets" />
              </>
            )}
            {viewMode === "liabilities" && (
              <>
                <Area dataKey="mortgage" type="natural" fill="url(#fillmortgage)" stroke="var(--color-mortgage)" stackId="liabilities" />
                <Area dataKey="loan" type="natural" fill="url(#fillloan)" stroke="var(--color-loan)" stackId="liabilities" />
                <Area dataKey="credit" type="natural" fill="url(#fillcredit)" stroke="var(--color-credit)" stackId="liabilities" />
              </>
            )}
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
