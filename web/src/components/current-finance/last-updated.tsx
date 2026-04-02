

interface FinanceSummary {
  lastUpdated: string;
}

const MOCK_SUMMARY: FinanceSummary = {
  lastUpdated: "2023-10-27 14:42:01 UTC",
};

export function LastUpdated() {
  return (
    <div className="text-right">
      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
        Last Updated
      </p>
      <p className="font-mono text-xs text-foreground">
        {MOCK_SUMMARY.lastUpdated}
      </p>
    </div>
  );
}
