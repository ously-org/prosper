import Logo from "@/assets/logo.svg";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../../components/ui/sidebar";

function NavHeader() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          asChild
          className="data-[slot=sidebar-menu-button]:p-1.5! group-data-[collapsible=icon]:p-0!"
        >
          <a href="#" className="flex items-center justify-center gap-3">
            <img
              src={Logo}
              alt=""
              className="h-10 w-10 transition-all group-data-[collapsible=icon]:h-6 group-data-[collapsible=icon]:w-6"
            />
            <span className="text-base text-primary font-semibold group-data-[collapsible=icon]:hidden">
              PROSPER
            </span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default NavHeader;
