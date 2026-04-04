import { Button } from "@/components/ui/button";

interface RoadmapFooterProps {
  onViewAll?: () => void;
}

export function RoadmapFooter({ onViewAll }: RoadmapFooterProps) {
  return (
    <div className="w-full">
      <Button
        onClick={onViewAll}
        className="w-full text-[10px] font-mono font-bold uppercase h-10 rounded-sm bg-surface-container-high hover:bg-surface-container-highest text-foreground transition-colors"
        size="sm"
      >
        View Full Roadmap
      </Button>
    </div>
  );
}
