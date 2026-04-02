import { createFileRoute } from "@tanstack/react-router";
import { FinancePageLayout } from "@/components/page-layout/page-layout";
import { useBranches, useUser, useGoals, useFinancialState } from "@/hooks/use-assets";
import { BranchCard } from "@/components/finance/branch-card";
import { type User } from "@/lib/model/User";

export const Route = createFileRoute("/branches")({
  component: BranchesSummaryPage,
});

function BranchesSummaryPage() {
  const { data: branches, isLoading: branchesLoading } = useBranches();
  const { data: userData, isLoading: userLoading } = useUser();
  const { data: goals, isLoading: goalsLoading } = useGoals();
  const { data: financialState, isLoading: stateLoading } = useFinancialState();

  const isLoading = branchesLoading || userLoading || goalsLoading || stateLoading;

  if (isLoading) {
    return (
      <FinancePageLayout
        title="Branches Summary"
        description="Overview and management of your financial scenario branches."
      >
        <div className="p-6 flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground animate-pulse font-mono uppercase tracking-widest text-xs">
            Fetching branches...
          </p>
        </div>
      </FinancePageLayout>
    );
  }

  // Handle cases where data might be undefined or empty
  if (!userData || !branches || !financialState) {
    return (
      <FinancePageLayout
        title="Branches Summary"
        description="Overview and management of your financial scenario branches."
      >
        <div className="p-6 flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground font-mono uppercase tracking-widest text-xs">
            No financial data found.
          </p>
        </div>
      </FinancePageLayout>
    );
  }

  // Construct complete User object for BranchCard since MOCK_USER is partial
  const user: User = {
    ...userData,
    initialFinancialState: financialState,
    initialGoals: goals || [],
    pastBranch: branches[0],
  } as User;

  return (
    <FinancePageLayout
      title="Branches Summary"
      description="Overview and management of your financial scenario branches."
    >
      <div className="max-w-7xl mx-auto p-6 space-y-6">
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
      </div>
    </FinancePageLayout>
  );
}
