import { createFileRoute } from "@tanstack/react-router";
import { FinancePageLayout } from "@/components/page-layout/page-layout";

export const Route = createFileRoute("/branches")({
  component: BranchesSummaryPage,
});

function BranchesSummaryPage() {
  return (
    <FinancePageLayout
      title="Branches Summary"
      description="Overview and management of your financial scenario branches."
    >
      <div className="p-6">
        <p className="text-muted-foreground">This is a placeholder for the Branches Summary page.</p>
      </div>
    </FinancePageLayout>
  );
}
