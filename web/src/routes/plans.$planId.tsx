import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/plans/$planId")({
  component: PlanSummary,
});

function PlanSummary() {
  const { planId } = Route.useParams();

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          Plan Summary: {planId}
        </h1>
        <div className="font-mono text-xl text-primary">$1,240,000.00</div>
      </div>
      <p className="text-muted-foreground text-sm">
        This is a holistic summary of all your financial plans.
      </p>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-md bg-surface-container-low" />
        <div className="aspect-video rounded-md bg-surface-container" />
        <div className="aspect-video rounded-md bg-surface-container-high" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-md bg-surface-container md:min-h-min" />
    </div>
  );
}
