import type { User } from "./model";

export interface NavSubItem {
  title: string;
  url: string;
}

export interface NavItem {
  title: string;
  url: string;
  icon?: React.ElementType;
  items?: NavSubItem[];
}

export interface NavGroup {
  label?: string;
  items: NavItem[];
}

export interface SystemData {
  mockUser: User;
  navGroups: NavGroup[];
}
