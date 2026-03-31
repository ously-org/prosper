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
import { type SystemData } from "./system.model";
import type { User } from "./model";
export const SIDEBAR_SUBITEM_LIMIT = 3;

const MockUser: User = {
  name: "Mock User",
  email: "mockUser@mock.com",
  avatar: ReactIcon,
};

export const SYSTEM_DATA: SystemData = {
  mockUser: MockUser,
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
