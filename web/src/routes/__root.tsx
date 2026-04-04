import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { DashboardLayout } from "@/layout/dashboard/DashboardLayout";
import { AuthLayout } from "@/layout/auth/AuthLayout";
import { useHeaderStore } from "@/store/use-header-store";
import { Header } from "@/layout/shared/Header";
import { SystemAlertsFooter } from "@/layout/shared/SystemAlertsFooter";

export const Route = createRootRoute({
  // beforeLoad: ({ location }) => {
  //   const user = useUserStore.getState().user;
  //   const isAuthRoute =
  //     location.pathname === "/login" || location.pathname === "/register";

  //   if (!user && !isAuthRoute) {
  //     throw redirect({ to: "/login" });
  //   }
  //   if (user && isAuthRoute) {
  //     throw redirect({ to: "/" });
  //   }
  // },
  component: RootComponent,
});

function RootComponent() {
  const location = useLocation();
  const isAuthRoute =
    location.pathname === "/login" || location.pathname === "/register";

  const { title, description, headerChildren } = useHeaderStore();

  if (isAuthRoute) {
    return (
      <>
        <AuthLayout>
          <Outlet />
        </AuthLayout>
        <TanStackRouterDevtools />
      </>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col min-h-screen">
        {title && (
          <Header title={title} description={description}>
            {headerChildren}
          </Header>
        )}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
        <SystemAlertsFooter />
      </div>
      <TanStackRouterDevtools />
    </DashboardLayout>
  );
}
