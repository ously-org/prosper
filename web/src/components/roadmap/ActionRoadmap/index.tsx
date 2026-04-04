import { useBranches } from "@/hooks/use-roadmap";
import { RoadmapCommitItem } from "@/components/roadmap/ActionRoadmap/RoadmapCommitItem";
import { RoadmapFooter } from "@/components/roadmap/ActionRoadmap/RoadmapFooter";
import { RoadmapSkeleton } from "@/components/roadmap/ActionRoadmap/RoadmapSkeleton";
import type { Commit } from "@/lib/model/Commit";
import { OuslyListCard } from "@/components/shared/OuslyListCard";

// --- Main ---

export function ActionRoadmap() {
  const { data: branches, isLoading } = useBranches();

  // Find the main branch
  const mainBranch = branches?.find((b) => b.name === "main");
  const commits: Commit[] = mainBranch?.commits ?? [];

  const handleReview = (commit: Commit) => {
    // TODO: open commit detail / staging drawer
    console.log("Review commit:", commit.id);
  };

  return (
    <OuslyListCard
      title="Upcoming Actions"
      headerRight={<span className="text-xs font-mono text-muted-foreground">{commits.length} commit{commits.length !== 1 ? "s" : ""}</span>}
      footer={<RoadmapFooter />}
      className="max-h-[500px]"
    >
      {isLoading ? (
        <RoadmapSkeleton />
      ) : commits.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 gap-2 text-center">
          <span className="text-2xl">📭</span>
          <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest">
            No commits on main
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {commits.map((commit, index) => (
            <RoadmapCommitItem
              key={commit.id}
              commit={commit}
              isFirst={index === 0}
              onReview={handleReview}
            />
          ))}
        </div>
      )}
    </OuslyListCard>
  );
}
