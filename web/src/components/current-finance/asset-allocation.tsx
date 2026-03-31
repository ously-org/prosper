export function AssetAllocation() {
  return (
    <div className="col-span-12 lg:col-span-4 bg-surface-container rounded-md p-6 border-l-[3px] border-chart-2 shadow-sm flex flex-col items-center justify-center">
      <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest block mb-4 text-center w-full">
        Asset Allocation
      </span>
      <div className="flex items-center justify-center relative h-32 w-full">
        {/* Minimal Doughnut Simulation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-sm border-[12px] border-surface-container-high border-t-primary border-r-chart-2 border-b-muted-foreground border-l-destructive rotate-45" />
        </div>
        <div className="text-center z-10 mt-1">
          <p className="font-mono text-lg font-bold text-foreground">
            4 Classes
          </p>
        </div>
      </div>
    </div>
  );
}
