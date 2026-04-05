import { Area, AreaChart, CartesianGrid, XAxis, ReferenceDot } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
} from "@/components/ui/chart";
import { chartConfig } from "@/components/TrajectoryChart/chart-constants";
import { TrajectoryTooltipContent } from "@/components/TrajectoryChart/components/ChartTooltipContent";

import { TRAJECTORY_AREAS } from "@/lib/const";

interface BaseTrajectoryChartProps {
  data: any[];
  viewMode: string;
  timeRange: string;
  syncId?: string;
  goals?: any[];
  isMini?: boolean;
  onMouseMove?: (state: any) => void;
  onMouseLeave?: () => void;
}

export const BaseTrajectoryChart = ({
  data,
  viewMode,
  timeRange,
  syncId,
  goals = [],
  isMini = false,
  onMouseMove,
  onMouseLeave,
}: BaseTrajectoryChartProps) => {
  const currentAreas =
    TRAJECTORY_AREAS[viewMode as keyof typeof TRAJECTORY_AREAS] || [];

  return (
    <ChartContainer
      config={chartConfig}
      className={`aspect-auto w-full border-none outline-none ${isMini ? "h-[160px]" : "h-[320px]"}`}
    >
      <AreaChart
        data={data}
        syncId={syncId}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <defs>
          {Object.keys(chartConfig).map((key) => (
            <linearGradient
              key={key}
              id={`fill${key}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor={
                  chartConfig[key as keyof typeof chartConfig].color ||
                  "var(--primary)"
                }
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={
                  chartConfig[key as keyof typeof chartConfig].color ||
                  "var(--primary)"
                }
                stopOpacity={0.1}
              />
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
          tick={{ fill: "#888", fontSize: 10 }}
          tickFormatter={(value) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-US", {
              month: "short",
              year: "2-digit",
            });
          }}
        />
        <ChartTooltip
          cursor={false}
          content={<TrajectoryTooltipContent viewMode={viewMode} />}
        />

        {currentAreas.map((area) => (
          <Area
            key={area.key}
            dataKey={area.key}
            type="natural"
            fill={`url(#fill${area.key})`}
            stroke={area.color}
            stackId={area.stackId}
          />
        ))}

        {goals.map((goal: any, idx: number) => {
          const isInRange = data.some((d) => d.date === goal.date);
          if (!isInRange) return null;
          return (
            <ReferenceDot
              key={idx}
              x={goal.date}
              y={goal.netWorth}
              r={isMini ? 3 : 5}
              fill={goal.isAchieved ? "var(--chart-2)" : "var(--destructive)"}
              stroke="#fff"
              strokeWidth={2}
            />
          );
        })}
        {!isMini && <ChartLegend content={<ChartLegendContent />} />}
      </AreaChart>
    </ChartContainer>
  );
};
