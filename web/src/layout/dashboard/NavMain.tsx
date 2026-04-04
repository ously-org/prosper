import { Link, useRouterState } from "@tanstack/react-router";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRightIcon } from "lucide-react";
import type { NavGroup, NavItem, NavSubItem } from "@/lib/system.model";
import { SIDEBAR_SUBITEM_LIMIT } from "@/lib/const";

export function NavMain({ groups }: { groups: NavGroup[] }) {
  const { location } = useRouterState();

  return (
    <>
      {groups.map((group) => (
        <SidebarGroup key={group.label || "default"}>
          {group.label && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
          <SidebarMenu>
            {group.items.map((item: NavItem) => {
              const hasSubItems = item.items && item.items.length > 0;
              const isItemActive =
                location.pathname === item.url ||
                item.items?.some(
                  (sub: NavSubItem) => location.pathname === sub.url,
                );

              if (hasSubItems) {
                const shownItems =
                  item.items?.slice(0, SIDEBAR_SUBITEM_LIMIT) || [];
                const hasMore = (item.items?.length || 0) > SIDEBAR_SUBITEM_LIMIT;

                return (
                  <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={isItemActive}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          asChild
                          tooltip={item.title}
                          isActive={isItemActive}
                        >
                          <Link to={item.url}>
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                            <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </Link>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {shownItems.map((subItem: NavSubItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={location.pathname === subItem.url}
                              >
                                <Link to={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                          {hasMore && (
                            <SidebarMenuSubItem key="more">
                              <SidebarMenuSubButton asChild>
                                <Link to={item.url}>
                                  <span className="text-muted-foreground italic">
                                    ... show more
                                  </span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              }

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={location.pathname === item.url}
                  >
                    <Link to={item.url}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
