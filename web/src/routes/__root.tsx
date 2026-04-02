import {
  createRootRoute,
  Outlet,
  redirect,
  useLocation,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { DashboardLayout } from "@/components/app-layout/DashboardLayout";
import { useUserStore } from "@/store/use-user-store";

export const Route = createRootRoute({
  beforeLoad: ({ location }) => {
    const user = useUserStore.getState().user;
    const isAuthRoute =
      location.pathname === "/login" || location.pathname === "/register";

    if (!user && !isAuthRoute) {
      throw redirect({ to: "/login" });
    }
    if (user && isAuthRoute) {
      throw redirect({ to: "/" });
    }
  },
  component: RootComponent,
});

function RootComponent() {
  const location = useLocation();
  const isAuthRoute =
    location.pathname === "/login" || location.pathname === "/register";

  if (isAuthRoute) {
    return (
      <>
        <Outlet />
        <TanStackRouterDevtools />
      </>
    );
  }

  return (
    <DashboardLayout>
      <Outlet />
      <TanStackRouterDevtools />
    </DashboardLayout>
  );
}
