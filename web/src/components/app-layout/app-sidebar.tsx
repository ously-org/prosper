import * as React from "react";
import { NavMain } from "@/components/app-layout/nav-main";
import { NavUser } from "@/components/app-layout/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SYSTEM_DATA } from "@/lib/const";
import NavHeader from "./nav-header";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain groups={SYSTEM_DATA.navGroups} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={SYSTEM_DATA.mockUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
