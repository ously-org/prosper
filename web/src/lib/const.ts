import {
  LayoutDashboardIcon,
  ReceiptRussianRubleIcon,
  ArrowLeftRightIcon,
  HistoryIcon,
  Settings2Icon,
  GitBranchIcon,
} from "lucide-react";
import { type SystemData } from "@/lib/system.model";
import { MOCK_USER } from "@/lib/model/mock";

export const SIDEBAR_SUBITEM_LIMIT = 3;

export const TRAJECTORY_VIEW_MODES = [
  { value: "networth", label: "Net Worth" },
  { value: "assets", label: "Assets" },
  { value: "liabilities", label: "Liabilities" },
];

export const TRAJECTORY_TIME_RANGES = [
  { value: "12", label: "Next Year" },
  { value: "24", label: "Next 2 Years" },
  { value: "60", label: "Next 5 Years" },
  { value: "120", label: "Next 10 Years" },
  { value: "360", label: "Retirement (30y)" },
];

export const TRAJECTORY_AREAS = {
  networth: [
    { key: "equity", stackId: "networth", color: "var(--color-equity)" },
    {
      key: "untiedDebt",
      stackId: "networth",
      color: "var(--color-untiedDebt)",
    },
  ],
  assets: [
    { key: "cash", stackId: "assets", color: "var(--color-cash)" },
    { key: "stock", stackId: "assets", color: "var(--color-stock)" },
    { key: "property", stackId: "assets", color: "var(--color-property)" },
    { key: "crypto", stackId: "assets", color: "var(--color-crypto)" },
  ],
  liabilities: [
    { key: "mortgage", stackId: "liabilities", color: "var(--color-mortgage)" },
    { key: "loan", stackId: "liabilities", color: "var(--color-loan)" },
    { key: "credit", stackId: "liabilities", color: "var(--color-credit)" },
  ],
} as const;


export const SYSTEM_DATA: SystemData = {
  mockUser: MOCK_USER,
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
          title: "Branches",
          url: "/branches",
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
