interface FinanceSummary {
  lastUpdated: string;
}

const MOCK_SUMMARY: FinanceSummary = {
  lastUpdated: "2023-10-27 14:42:01 UTC",
};

export function Header() {
  return (
    <header className="mb-8 flex justify-between items-end">
      <div>
        <h2 className="text-heading font-extrabold text-2xl tracking-tight text-foreground">
          Current Finance
        </h2>
        <p className="text-sm text-muted-foreground">
          Real-time capital overview & allocation architecture.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Last Updated
          </p>
          <p className="font-mono text-xs text-foreground">
            {MOCK_SUMMARY.lastUpdated}
          </p>
        </div>
      </div>
    </header>
  );
}
