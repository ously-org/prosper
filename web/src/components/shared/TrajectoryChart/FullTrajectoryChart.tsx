import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { chartData } from "@/components/shared/TrajectoryChart/chart-constants";
import { ChartHeader } from "@/components/shared/TrajectoryChart/components/ChartHeader";
import { BaseTrajectoryChart } from "@/components/shared/TrajectoryChart/components/BaseTrajectoryChart";

interface FullTrajectoryChartProps {
  data?: any[];
  goals?: any[];
  isMini?: boolean;
  syncId?: string;
}

export const FullTrajectoryChart = ({
  data,
  goals = [],
  isMini = false,
  syncId,
}: FullTrajectoryChartProps) => {
  const [timeRange, setTimeRange] = React.useState(isMini ? "360" : "12");
  const [viewMode, setViewMode] = React.useState("networth");

  const sourceData = data || chartData;

  const filteredData = React.useMemo(() => {
    const referenceDate =
      sourceData.length > 0
        ? new Date(sourceData[0].date)
        : new Date("2024-01-01");
    
    const monthsToShow = parseInt(timeRange, 10);

    const endDate = new Date(referenceDate);
    endDate.setMonth(referenceDate.getMonth() + monthsToShow);

    return sourceData.filter((item) => {
      const date = new Date(item.date);
      return date >= referenceDate && date <= endDate;
    });
  }, [timeRange, sourceData]);

  return (
    <Card
      className={`border-none bg-transparent shadow-none p-0 ring-0 ring-offset-0 ring-none outline-none ${isMini ? "p-0" : ""}`}
    >
      {!isMini && (
        <ChartHeader
          viewMode={viewMode}
          setViewMode={setViewMode}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
        />
      )}
      <CardContent className="p-0 border-none outline-none">
        <BaseTrajectoryChart
          data={filteredData}
          viewMode={viewMode}
          timeRange={timeRange}
          syncId={syncId}
          goals={goals}
          isMini={isMini}
        />
      </CardContent>
    </Card>
  );
};
