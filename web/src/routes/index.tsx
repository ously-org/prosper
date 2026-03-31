import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-md bg-surface-container" />
        <div className="aspect-video rounded-md bg-surface-container" />
        <div className="aspect-video rounded-md bg-surface-container" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-md bg-surface-container md:min-h-min" />
    </>
  );
}
