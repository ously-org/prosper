import {
  LayoutDashboardIcon,
  ReceiptRussianRubleIcon,
  TargetIcon,
  ArrowLeftRightIcon,
  HistoryIcon,
  Settings2Icon,
  GitBranchIcon,
} from "lucide-react";
import ReactIcon from "@/assets/react.svg";
import React from "react";

export const SIDEBAR_SUBITEM_LIMIT = 3;

export interface User {
  name: string;
  email: string;
  avatar: string;
}

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

export interface AppData {
  user: User;
  navGroups: NavGroup[];
}

export const APP_DATA: AppData = {
  user: {
    name: "Supakone",
    email: "supakone.kongprapan@gmail.com",
    avatar: ReactIcon,
  },
  navGroups: [
    {
      label: "Current",
      items: [
        {
          title: "Home",
          url: "/",
          icon: LayoutDashboardIcon,
        },
        {
          title: "Current finance",
          url: "/current",
          icon: ReceiptRussianRubleIcon,
        },
      ],
    },
    {
      label: "Future",
      items: [
        {
          title: "Plans",
          url: "/plans",
          icon: GitBranchIcon,
        },
        {
          title: "Goals",
          url: "/goals",
          icon: TargetIcon,
        },
        {
          title: "Compare",
          url: "/compare",
          icon: ArrowLeftRightIcon,
        },
      ],
    },
    {
      label: "Other",
      items: [
        {
          title: "History",
          url: "/history",
          icon: HistoryIcon,
        },
        {
          title: "Config",
          url: "/config",
          icon: Settings2Icon,
        },
      ],
    },
  ],
};
