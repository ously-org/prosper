import { createFileRoute } from "@tanstack/react-router";
import { FinancePageLayout } from "@/components/page-layout/page-layout";
import { MetricCards } from "@/components/home/metric-cards";
import { PlanDashboard } from "@/components/home/plan-dashboard";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <FinancePageLayout
      title="Architecture Center"
      description="Holistic financial trajectory and strategic plan summary."
    >
      <MetricCards />

      <section className="grid grid-cols-12 gap-6 pb-8">
        <PlanDashboard />
      </section>
    </FinancePageLayout>
  );
}
