import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { DashboardLayout } from "@/layouts/DashboardLayout";

export const Route = createRootRoute({
  component: () => (
    <DashboardLayout>
      <Outlet />
      <TanStackRouterDevtools />
    </DashboardLayout>
  ),
});
