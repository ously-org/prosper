import type { User } from "@/lib/model/User";
import type { LucideIcon } from "lucide-react";

export interface NavSubItem {
  title: string;
  url: string;
}

export interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: NavSubItem[];
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export interface SystemData {
  mockUser: User;
  navGroups: NavGroup[];
}
