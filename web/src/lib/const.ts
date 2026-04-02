import {
  LayoutDashboardIcon,
  ReceiptRussianRubleIcon,
  ArrowLeftRightIcon,
  HistoryIcon,
  Settings2Icon,
  GitBranchIcon,
} from "lucide-react";
import ReactIcon from "@/assets/react.svg";
import { type SystemData } from "@/lib/system.model";
import type { User } from "@/lib/model/User";
import type { Branch } from "@/lib/model/Branch";

export const SIDEBAR_SUBITEM_LIMIT = 3;

const MockBranch: Branch = {
  id: "main",
  name: "main",
  commits: [],
  goalChanges: [],
};

const MockUser: User = {
  name: "Mock User",
  email: "mockUser@mock.com",
  avatar: ReactIcon,
  pastBranch: MockBranch,
  initialFinancialState: {
    assets: [],
    liabilities: [],
    income: [],
    expenses: [],
  },
  initialGoals: [],
  birthDate: new Date(),
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
          title: "Current",
          url: "/current",
          icon: ReceiptRussianRubleIcon,
        },
      ],
    },
    {
      label: "Future",
      items: [
        {
          title: "Branchs",
          url: "/branchs",
          icon: GitBranchIcon,
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
          title: "Logs",
          url: "/logs",
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
