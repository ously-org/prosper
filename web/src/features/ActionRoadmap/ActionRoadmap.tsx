import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface UpcomingCommit {
  id: string;
  title: string;
  date: string;
  actions: string[];
}

const UPCOMING_COMMITS: UpcomingCommit[] = [
  {
    id: "1",
    title: "Execute Rental Buy",
    date: "OCT 2026",
    actions: [
      "Withdraw $200,000 Cash",
      "Deploy Asset Node: Property A",
      "Attach Liability Node: Mortgage A"
    ]
  },
  {
    id: "2",
    title: "Max Out 401k",
    date: "JAN 2027",
    actions: [
      "Adjust Payroll Contribution",
      "Update Asset Node: 401k"
    ]
  },
  {
    id: "3",
    title: "Refinance Mortgage",
    date: "JUN 2027",
    actions: [
      "Update Liability Node: Mortgage A",
      "Calculate Break-even Point"
    ]
  }
];

export function ActionRoadmap() {
  return (
    <div className="flex flex-col h-full bg-surface-container rounded-lg p-6 max-h-[500px]">
      <div className="flex flex-col mb-4">
        <h4 className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest mb-1">Strategic Roadmap</h4>
        <div className="text-xl font-bold tracking-tight text-foreground">Upcoming Actions</div>
      </div>
      
      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-8">
          {UPCOMING_COMMITS.map((commit, index) => (
            <div key={commit.id} className="relative pl-4 border-l border-surface-container-high">
              {/* Timeline Dot */}
              <div className="absolute left-[-4.5px] top-1.5 w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
              
              <div className="mb-1 flex justify-between items-baseline">
                <div className="text-sm font-bold text-foreground">{commit.title}</div>
                <div className="text-[9px] font-mono text-muted-foreground uppercase">{commit.date}</div>
              </div>
              
              <div className="space-y-1.5">
                {commit.actions.map((action, aIndex) => (
                  <div key={aIndex} className="flex items-start gap-2 text-[10px] font-mono text-muted-foreground leading-relaxed">
                    <span className="text-chart-2 mt-0.5">→</span>
                    <span>{action}</span>
                  </div>
                ))}
              </div>
              
              {index === 0 && (
                <Button className="mt-4 w-full text-[9px] font-mono font-bold uppercase h-8 rounded-sm bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 transition-all" size="sm">
                  Review Next Deployment
                </Button>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="pt-6 mt-4 border-t border-surface-container-high">
        <Button className="w-full text-[10px] font-mono font-bold uppercase h-10 rounded-sm bg-surface-container-high hover:bg-surface-container-highest text-foreground transition-colors" size="sm">
          View Full Roadmap
        </Button>
      </div>
    </div>
  );
}
