import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { chartData } from "@/components/shared/TrajectoryChart/chart-constants";
import { ChartHeader } from "@/components/shared/TrajectoryChart/components/ChartHeader";
import { BaseTrajectoryChart } from "@/components/shared/TrajectoryChart/components/BaseTrajectoryChart";
import { ChartSummarySidebar } from "@/components/shared/TrajectoryChart/components/ChartSummarySidebar";

interface SplitTrajectoryChartProps {
  data?: any[];
  goals?: any[];
  isMini?: boolean;
  syncId?: string;
}

export const SplitTrajectoryChart = ({
  data,
  goals = [],
  isMini = false,
  syncId,
}: SplitTrajectoryChartProps) => {
  const [timeRange, setTimeRange] = React.useState(isMini ? "360" : "12");
  const [viewMode, setViewMode] = React.useState("networth");
  const [activeData, setActiveData] = React.useState<any | null>(null);

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

  // Update activeData when filteredData changes
  React.useEffect(() => {
    if (filteredData.length > 0) {
      setActiveData(filteredData[filteredData.length - 1]);
    } else {
      setActiveData(null);
    }
  }, [filteredData]);

  const handleMouseMove = (state: any) => {
    if (state && state.activePayload && state.activePayload.length > 0) {
      const payloadObj = state.activePayload[0].payload;
      if (!activeData || activeData.date !== payloadObj.date) {
        setActiveData(payloadObj);
      }
    }
  };

  const handleMouseLeave = () => {
    if (filteredData.length > 0) {
      setActiveData(filteredData[filteredData.length - 1]);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full h-full">
      <Card
        className={`flex-1 border-none bg-transparent shadow-none p-0 ring-0 ring-offset-0 ring-none outline-none ${isMini ? "p-0" : ""}`}
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
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />
        </CardContent>
      </Card>

      {activeData && <ChartSummarySidebar activeData={activeData} />}
    </div>
  );
};
