interface RoadmapHeaderProps {
  commitCount: number;
}

export function RoadmapHeader({ commitCount }: RoadmapHeaderProps) {
  return (
    <div className="flex justify-between">
      <div className="text-xl font-bold tracking-tight text-foreground">
        Upcoming Actions
      </div>
      <span className="text-xs font-mono text-muted-foreground">
        {commitCount} commit{commitCount !== 1 ? "s" : ""}
      </span>
    </div>
  );
}
