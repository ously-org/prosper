import { createFileRoute } from "@tanstack/react-router";
import { usePageHeader } from "@/hooks/use-page-header";
import { useBranches, useGoals } from "@/hooks/use-roadmap";
import { useUser } from "@/hooks/use-user";
import { useFinancialState } from "@/hooks/use-finance";
import { BranchCard } from "@/components/roadmap/BranchCard";
import { type User } from "@/lib/model/User";
import { DashboardContent } from "@/components/shared/layout/DashboardContent";

export const Route = createFileRoute("/branches/")({
  component: BranchesSummaryPage,
});

function BranchesSummaryPage() {
  const { data: branches, isLoading: branchesLoading } = useBranches();
  const { data: userData, isLoading: userLoading } = useUser();
  const { data: goals, isLoading: goalsLoading } = useGoals();
  const { data: financialState, isLoading: stateLoading } = useFinancialState();

  usePageHeader({
    title: "Branches Summary",
    description: "Overview and management of your financial scenario branches.",
  });

  const isLoading =
    branchesLoading || userLoading || goalsLoading || stateLoading;

  if (isLoading) {
    return (
      <DashboardContent className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground animate-pulse font-mono uppercase tracking-widest text-xs">
          Fetching branches...
        </p>
      </DashboardContent>
    );
  }

  if (!userData || !branches || !financialState) {
    return (
      <DashboardContent className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground font-mono uppercase tracking-widest text-xs">
          No financial data found.
        </p>
      </DashboardContent>
    );
  }

  const user: User = {
    ...userData,
    initialFinancialState: financialState,
    initialGoals: goals || [],
    pastBranch: branches[0],
  } as User;

  return (
    <DashboardContent>
      {branches.length === 0 ? (
        <div className="flex items-center justify-center min-h-[200px] border border-dashed border-border/20 rounded-lg">
          <p className="text-muted-foreground font-mono uppercase tracking-widest text-xs">
            No active branches.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {branches.map((branch) => (
            <BranchCard
              key={branch.id}
              branch={branch}
              user={user}
              initialGoals={goals || []}
              syncId="branches-summary"
            />
          ))}
        </div>
      )}
    </DashboardContent>
  );
}
