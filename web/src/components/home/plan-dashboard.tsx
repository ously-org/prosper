import { useState } from "react";
import { useUserStore } from "@/store/use-user-store";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrajectoryChart } from "./trajectory-chart";
import { UpcomingCommitCard } from "./upcoming-commit-card";

export function PlanDashboard() {
  const { user } = useUserStore();
  const branches = user?.pastBranch ? [user.pastBranch, { id: "fire-path", name: "fire-path", commits: [], goalChanges: [] }] : [];
  const [selectedBranchId, setSelectedBranchId] = useState("main");

  return (
    <Card className="col-span-12 bg-surface-container shadow-sm p-6">
      <CardHeader className="p-0 mb-6 flex flex-row items-center justify-between">
        <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          Plan Summary Dashboard
        </CardTitle>
        <Select value={selectedBranchId} onValueChange={setSelectedBranchId}>
          <SelectTrigger className="w-[180px] h-8 text-[10px] font-mono uppercase bg-surface-container-low border-none shadow-none focus:ring-0">
            <SelectValue placeholder="Select Plan" />
          </SelectTrigger>
          <SelectContent className="bg-surface-container border-none shadow-xl">
            {branches.map(b => (
              <SelectItem key={b.id} value={b.id} className="text-[10px] font-mono uppercase focus:bg-primary focus:text-primary-foreground">
                {b.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-0 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface-container-low rounded-lg p-6 min-h-[400px] flex flex-col">
          <div className="flex-1">
            <TrajectoryChart />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <UpcomingCommitCard />
        </div>
      </CardContent>
    </Card>
  );
}
