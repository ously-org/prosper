export function AssetBreakdownTable() {
  return (
    <div className="col-span-12 xl:col-span-8 bg-surface-container rounded-md overflow-hidden flex flex-col shadow-sm border border-border/20">
      <div className="px-6 py-4 bg-surface-container-high flex justify-between items-center border-b border-border/20">
        <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">
          Asset Breakdown
        </h4>
        <button className="text-xs text-primary font-bold hover:underline cursor-pointer">
          Export CSV
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border/20">
              <th className="px-6 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Asset Category
              </th>
              <th className="px-6 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Market Value
              </th>
              <th className="px-6 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-right">
                Performance (1D)
              </th>
              <th className="px-6 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-right">
                Allocation
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            <tr className="hover:bg-surface-container-highest transition-colors group cursor-default">
              <td className="px-6 py-4 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm font-medium text-foreground">
                  Equities (US Stocks)
                </span>
              </td>
              <td className="px-6 py-4 font-mono text-sm text-foreground">
                $842,100.00
              </td>
              <td className="px-6 py-4 text-right">
                <span className="text-chart-2 text-xs font-mono font-medium">
                  +1.24%
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <span className="font-mono text-xs text-foreground">
                    56.8%
                  </span>
                  <div className="w-16 h-1 bg-surface-container-high rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full"
                      style={{ width: "56.8%" }}
                    />
                  </div>
                </div>
              </td>
            </tr>
            <tr className="hover:bg-surface-container-highest transition-colors group cursor-default">
              <td className="px-6 py-4 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-chart-2" />
                <span className="text-sm font-medium text-foreground">
                  Real Estate
                </span>
              </td>
              <td className="px-6 py-4 font-mono text-sm text-foreground">
                $450,000.00
              </td>
              <td className="px-6 py-4 text-right">
                <span className="text-muted-foreground text-xs font-mono font-medium">
                  0.00%
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <span className="font-mono text-xs text-foreground">
                    30.3%
                  </span>
                  <div className="w-16 h-1 bg-surface-container-high rounded-full overflow-hidden">
                    <div
                      className="bg-chart-2 h-full"
                      style={{ width: "30.3%" }}
                    />
                  </div>
                </div>
              </td>
            </tr>
            <tr className="hover:bg-surface-container-highest transition-colors group cursor-default">
              <td className="px-6 py-4 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-destructive" />
                <span className="text-sm font-medium text-foreground">
                  Crypto Assets
                </span>
              </td>
              <td className="px-6 py-4 font-mono text-sm text-foreground">
                $125,803.42
              </td>
              <td className="px-6 py-4 text-right">
                <span className="text-destructive text-xs font-mono font-medium">
                  -2.81%
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <span className="font-mono text-xs text-foreground">
                    8.5%
                  </span>
                  <div className="w-16 h-1 bg-surface-container-high rounded-full overflow-hidden">
                    <div
                      className="bg-destructive h-full"
                      style={{ width: "8.5%" }}
                    />
                  </div>
                </div>
              </td>
            </tr>
            <tr className="hover:bg-surface-container-highest transition-colors group cursor-default">
              <td className="px-6 py-4 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  Cash & Equivalents
                </span>
              </td>
              <td className="px-6 py-4 font-mono text-sm text-foreground">
                $65,000.00
              </td>
              <td className="px-6 py-4 text-right">
                <span className="text-chart-2 text-xs font-mono font-medium">
                  +0.01%
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <span className="font-mono text-xs text-foreground">
                    4.4%
                  </span>
                  <div className="w-16 h-1 bg-surface-container-high rounded-full overflow-hidden">
                    <div
                      className="bg-muted-foreground h-full"
                      style={{ width: "4.4%" }}
                    />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
