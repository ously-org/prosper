import {
  Terminal,
  History,
  Star,
  Settings,
  Layers,
  FileText,
  Building2,
  TrendingUp,
  Plane,
  CheckCircle2,
  Search,
  Bell,
  Plus,
  Wallet,
  ArrowRightLeft,
  CalendarDays,
  ArrowUp,
  Flag,
} from "lucide-react";

import FaceOnlyLogo from "@/assets/logo_face_only_big.png";

export function Dashboard() {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background text-on-surface font-body selection:bg-primary-container">
      <div className="flex flex-1 overflow-hidden">
        {/* SideNavBar Shell */}
        <aside className="flex h-full w-64 shrink-0 flex-col border-r border-slate-200/50 bg-slate-50 py-4 gap-1">
          <div className="mb-6 px-6">
            <div className="mb-1 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
                <Building2 className="h-4 w-4 text-white" />
              </div>
              <div className="font-headline text-lg font-bold tracking-tight text-slate-900">
                Prosper
              </div>
            </div>
            <div className="mt-4 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
              PLATFORM
            </div>
            <div className="mt-0.5 text-[10px] text-slate-400">v1.0.4-stable</div>
          </div>
          <nav className="flex-1 space-y-0.5 overflow-y-auto px-3">
            {/* Active Tab: Playground */}
            <a
              className="flex items-center gap-3 rounded-md bg-slate-200/50 px-3 py-1.5 text-[13px] font-medium tracking-tight text-slate-900 transition-all duration-150 ease-in-out"
              href="#"
            >
              <Terminal className="h-[18px] w-[18px] text-primary" />
              Playground
            </a>
            <a
              className="flex items-center gap-3 rounded-md px-3 py-1.5 text-[13px] tracking-tight text-slate-600 transition-all duration-150 ease-in-out hover:bg-slate-200/30 hover:text-slate-900"
              href="#"
            >
              <History className="h-[18px] w-[18px]" />
              History
            </a>
            <a
              className="flex items-center gap-3 rounded-md px-3 py-1.5 text-[13px] tracking-tight text-slate-600 transition-all duration-150 ease-in-out hover:bg-slate-200/30 hover:text-slate-900"
              href="#"
            >
              <Star className="h-[18px] w-[18px]" />
              Starred
            </a>
            <a
              className="flex items-center gap-3 rounded-md px-3 py-1.5 text-[13px] tracking-tight text-slate-600 transition-all duration-150 ease-in-out hover:bg-slate-200/30 hover:text-slate-900"
              href="#"
            >
              <Settings className="h-[18px] w-[18px]" />
              Settings
            </a>
            <div className="px-3 pb-2 pt-6">
              <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
                ENGINEERING
              </div>
            </div>
            <a
              className="flex items-center gap-3 rounded-md px-3 py-1.5 text-[13px] tracking-tight text-slate-600 transition-all duration-150 ease-in-out hover:bg-slate-200/30 hover:text-slate-900"
              href="#"
            >
              <Layers className="h-[18px] w-[18px]" />
              Models
            </a>
            <a
              className="flex items-center gap-3 rounded-md px-3 py-1.5 text-[13px] tracking-tight text-slate-600 transition-all duration-150 ease-in-out hover:bg-slate-200/30 hover:text-slate-900"
              href="#"
            >
              <FileText className="h-[18px] w-[18px]" />
              Documentation
            </a>
            <a
              className="flex items-center gap-3 rounded-md px-3 py-1.5 text-[13px] tracking-tight text-slate-600 transition-all duration-150 ease-in-out hover:bg-slate-200/30 hover:text-slate-900"
              href="#"
            >
              <Building2 className="h-[18px] w-[18px]" />
              Financial Engineering
            </a>
            <a
              className="flex items-center gap-3 rounded-md px-3 py-1.5 text-[13px] tracking-tight text-slate-600 transition-all duration-150 ease-in-out hover:bg-slate-200/30 hover:text-slate-900"
              href="#"
            >
              <TrendingUp className="h-[18px] w-[18px]" />
              Sales & Marketing
            </a>
            <a
              className="flex items-center gap-3 rounded-md px-3 py-1.5 text-[13px] tracking-tight text-slate-600 transition-all duration-150 ease-in-out hover:bg-slate-200/30 hover:text-slate-900"
              href="#"
            >
              <Plane className="h-[18px] w-[18px]" />
              Travel
            </a>
          </nav>
          <div className="mt-auto border-t border-slate-200/10 px-3 pt-4">
            <div className="flex items-center gap-3 px-3 py-2 font-mono text-[11px] text-tertiary">
              <CheckCircle2 className="h-[16px] w-[16px]" />
              MCP: Connected
            </div>
            <div className="group mt-2 flex cursor-pointer items-center gap-3 px-3 py-2">
              <div className="h-6 w-6 overflow-hidden rounded-full border border-slate-200">
                <img
                  className="h-full w-full object-cover"
                  data-alt="professional male headshot"
                  src={FaceOnlyLogo}
                />
              </div>
              <div className="text-[12px] font-medium text-slate-700">
                User Account
              </div>
            </div>
          </div>
        </aside>
        {/* Main Content Area */}
        <main className="flex flex-1 flex-col overflow-hidden bg-white text-slate-900">
          {/* Header-less Toolbar inspired by Linear */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/80 px-8 py-3 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="text-[13px] font-medium text-slate-500">
                Playground
              </div>
              <span className="text-slate-300">/</span>
              <div className="text-[13px] font-semibold text-slate-900">
                Dashboard
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative flex items-center">
                <Search className="absolute left-3 h-[18px] w-[18px] text-slate-400" />
                <input
                  className="w-64 rounded-md border border-slate-200 bg-slate-50 py-1 pl-9 pr-4 text-xs placeholder:text-slate-400 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus:outline-none"
                  placeholder="Search..."
                  type="text"
                />
              </div>
              <button className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                <Bell className="h-[18px] w-[18px]" />
              </button>
              <button className="ml-2 flex items-center gap-1.5 rounded bg-primary px-3 py-1.5 text-[12px] font-medium text-white shadow-sm transition-colors hover:bg-primary-dim">
                <Plus className="h-[16px] w-[16px]" />
                New Entry
              </button>
            </div>
          </div>
          <div className="flex flex-1 overflow-hidden">
            {/* Middle Scrollable Column */}
            <div className="flex-1 space-y-8 overflow-y-auto p-8 custom-scrollbar">
              {/* Summary Cards Section */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] transition-shadow hover:shadow-md">
                  <div className="mb-3 flex items-start justify-between">
                    <span className="font-headline text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Net Worth
                    </span>
                    <Wallet className="h-5 w-5 text-primary/60" />
                  </div>
                  <div className="font-mono text-2xl font-bold tracking-tight text-slate-900">
                    $1,429,850.42
                  </div>
                  <div className="mt-3 flex items-center gap-1 font-mono text-xs text-tertiary">
                    <TrendingUp className="h-[14px] w-[14px]" />
                    +2.4% <span className="ml-1 text-slate-400">vs last month</span>
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] transition-shadow hover:shadow-md">
                  <div className="mb-3 flex items-start justify-between">
                    <span className="font-headline text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Monthly Cashflow
                    </span>
                    <ArrowRightLeft className="h-5 w-5 text-primary/60" />
                  </div>
                  <div className="font-mono text-2xl font-bold tracking-tight text-slate-900">
                    +$8,420.00
                  </div>
                  <div className="mt-3 flex items-center gap-1 font-mono text-xs text-slate-400">
                    <ArrowUp className="h-[14px] w-[14px] text-tertiary" />
                    $15.2k In / $6.8k Out
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] transition-shadow hover:shadow-md">
                  <div className="mb-3 flex items-start justify-between">
                    <span className="font-headline text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      FI Projection
                    </span>
                    <CalendarDays className="h-5 w-5 text-primary/60" />
                  </div>
                  <div className="font-mono text-2xl font-bold tracking-tight text-slate-900">
                    Oct 2034
                  </div>
                  <div className="mt-3 flex items-center gap-1 font-mono text-xs text-primary">
                    <Flag className="h-[14px] w-[14px]" />
                    10.2 years remaining
                  </div>
                </div>
              </div>
              {/* Financial History Git Tree */}
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <History className="h-5 w-5 text-slate-400" />
                    <h2 className="font-headline text-[13px] font-bold uppercase tracking-tight text-slate-700">
                      Financial History
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="rounded border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-600 transition-colors hover:bg-slate-100">
                      Filter
                    </button>
                    <button className="rounded border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-600 transition-colors hover:bg-slate-100">
                      Compare
                    </button>
                  </div>
                </div>
                <div className="p-8">
                  <div className="relative space-y-8">
                    {/* Commit Item 1 */}
                    <div className="relative pl-10">
                      <div className="git-line"></div>
                      <div className="absolute left-0 top-1 z-10 h-5 w-5 rounded-full border-4 border-primary bg-white"></div>
                      <div className="rounded-lg border border-slate-200/50 bg-slate-50/50 p-4">
                        <div className="mb-1 flex items-center justify-between">
                          <h3 className="font-mono text-[13px] font-bold text-slate-900">
                            Update: Salary Increase (Q3 adjustment)
                          </h3>
                          <span className="rounded border border-slate-100 bg-white px-2 py-0.5 font-mono text-[10px] text-slate-400">
                            8e2a1f
                          </span>
                        </div>
                        <p className="mb-3 font-mono text-[11px] text-slate-500">
                          Author: System <span className="mx-2">•</span> 2 days
                          ago
                        </p>
                        <div className="flex gap-4">
                          <div className="font-mono text-[11px]">
                            <span className="text-tertiary">+$1,200</span> base_pay
                          </div>
                          <div className="font-mono text-[11px]">
                            <span className="text-tertiary">+0.5%</span> 401k_match
                          </div>
                          <div className="font-mono text-[11px] italic text-slate-400">
                            #recurring-income
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Commit Item 2 */}
                    <div className="relative pl-10">
                      <div className="git-line"></div>
                      <div className="absolute left-0 top-1 z-10 h-5 w-5 rounded-full border-4 border-slate-300 bg-white"></div>
                      <div className="rounded-lg border border-slate-200/50 bg-slate-50/30 p-4">
                        <div className="mb-1 flex items-center justify-between">
                          <h3 className="font-mono text-[13px] font-bold text-slate-900">
                            Merge: House Purchase Scenario
                          </h3>
                          <span className="rounded border border-slate-100 bg-white px-2 py-0.5 font-mono text-[10px] text-slate-400">
                            f4c92b
                          </span>
                        </div>
                        <p className="mb-3 font-mono text-[11px] text-slate-500">
                          Author: Simulation Engine <span className="mx-2">•</span>{" "}
                          1 week ago
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <div className="rounded border border-red-100 bg-red-50 px-2 py-1 font-mono text-[11px] text-red-600">
                            - $85,000 liquid_assets
                          </div>
                          <div className="rounded border border-green-100 bg-green-50 px-2 py-1 font-mono text-[11px] text-tertiary">
                            + $450,000 real_estate
                          </div>
                          <div className="rounded border border-slate-200 bg-slate-100 px-2 py-1 font-mono text-[11px] text-slate-600">
                            + $365,000 mortgage_liability
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Commit Item 3 */}
                    <div className="relative pl-10">
                      <div className="git-line git-line-last"></div>
                      <div className="absolute left-0 top-1 z-10 h-5 w-5 rounded-full border-4 border-slate-300 bg-white"></div>
                      <div className="rounded-lg border border-slate-200/50 bg-slate-50/30 p-4">
                        <div className="mb-1 flex items-center justify-between">
                          <h3 className="font-mono text-[13px] font-bold text-slate-900">
                            Rebalance: Portfolio Allocation
                          </h3>
                          <span className="rounded border border-slate-100 bg-white px-2 py-0.5 font-mono text-[10px] text-slate-400">
                            a1029c
                          </span>
                        </div>
                        <p className="mb-3 font-mono text-[11px] text-slate-500">
                          Author: User <span className="mx-2">•</span> Sep 12, 2024
                        </p>
                        <div className="font-mono text-[11px] leading-relaxed text-slate-500">
                          Shifted 5% from{" "}
                          <span className="font-bold text-primary">VTSAX</span> to{" "}
                          <span className="font-bold text-primary">VTIAX</span> for
                          international exposure.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <footer className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 pb-8 pt-8 md:flex-row">
                <div className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
                  © 2024 Prosper Terminal
                </div>
                <div className="flex gap-6 font-mono text-[10px] uppercase tracking-widest">
                  <a
                    className="text-slate-500 transition-colors hover:text-primary"
                    href="#"
                  >
                    Docs
                  </a>
                  <a
                    className="text-slate-500 transition-colors hover:text-primary"
                    href="#"
                  >
                    API
                  </a>
                  <a
                    className="text-slate-500 transition-colors hover:text-primary"
                    href="#"
                  >
                    Security
                  </a>
                  <a
                    className="text-slate-500 transition-colors hover:text-primary"
                    href="#"
                  >
                    Terms
                  </a>
                </div>
              </footer>
            </div>
            {/* Right Column Sidebar */}
            <aside className="flex w-80 shrink-0 flex-col space-y-8 overflow-y-auto border-l border-slate-100 bg-slate-50/30 p-6 custom-scrollbar">
              {/* Active Projections */}
              <div className="space-y-4">
                <h2 className="font-headline text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  Active Projections
                </h2>
                <div className="space-y-3">
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-slate-300">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-[12px] font-semibold text-slate-800">
                        Base Growth
                      </span>
                      <span className="rounded-full border border-green-100 bg-green-50 px-2 py-0.5 font-mono text-[9px] text-green-700">
                        STABLE
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full w-3/4 bg-tertiary"></div>
                      </div>
                      <div className="flex justify-between font-mono text-[10px] text-slate-500">
                        <span>7.0% CAGR</span>
                        <span>Goal: 2034</span>
                      </div>
                    </div>
                  </div>
                  <div className="cursor-pointer rounded-xl border border-slate-200 bg-white p-4 opacity-80 shadow-sm transition-opacity hover:opacity-100">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-[12px] font-semibold text-slate-800">
                        Early Retirement
                      </span>
                      <span className="rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 font-mono text-[9px] text-blue-700">
                        OPTIMISTIC
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full w-1/2 bg-primary"></div>
                      </div>
                      <div className="flex justify-between font-mono text-[10px] text-slate-500">
                        <span>9.5% CAGR</span>
                        <span>Goal: 2031</span>
                      </div>
                    </div>
                  </div>
                  <div className="cursor-pointer rounded-xl border border-slate-200 bg-white p-4 opacity-80 shadow-sm transition-opacity hover:opacity-100">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-[12px] font-semibold text-slate-800">
                        Market Downturn
                      </span>
                      <span className="rounded-full border border-red-100 bg-red-50 px-2 py-0.5 font-mono text-[9px] text-red-700">
                        RISK
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full w-1/4 bg-error"></div>
                      </div>
                      <div className="flex justify-between font-mono text-[10px] text-slate-500">
                        <span>4.2% CAGR</span>
                        <span>Goal: 2039</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* System Logs */}
              <div className="space-y-4">
                <h2 className="font-headline text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  System Logs
                </h2>
                <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <div className="space-y-2 font-mono text-[10px] leading-tight text-slate-500">
                    <div className="flex gap-2">
                      <span className="text-slate-400">14:22:01</span>
                      <span>[INFO] Syncing Vanguard broker...</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-slate-400">14:22:05</span>
                      <span>[INFO] Found 3 new transactions</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-slate-400">13:45:10</span>
                      <span className="text-tertiary">
                        [OK] Model "Base Growth" recalculated
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 border-t border-slate-200 pt-3">
                    <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                      Terminal Tip
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-500">
                      Use{" "}
                      <kbd className="rounded border border-slate-300 bg-white px-1.5 py-0.5 text-[9px] shadow-sm">
                        CTRL
                      </kbd>{" "}
                      +{" "}
                      <kbd className="rounded border border-slate-300 bg-white px-1.5 py-0.5 text-[9px] shadow-sm">
                        K
                      </kbd>{" "}
                      to open command palette.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
