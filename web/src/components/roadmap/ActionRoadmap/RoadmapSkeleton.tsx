import { Skeleton } from "@/components/ui/skeleton";

export function RoadmapSkeleton() {
  return (
    <div className="space-y-8">
      {[1, 2, 3].map((i) => (
        <div 
          key={i} 
          className="relative pl-4 border-l border-surface-container-high space-y-2"
        >
          {/* Timeline Dot Skeleton */}
          <div className="absolute left-[-4.5px] top-1.5 w-2 h-2 rounded-full bg-primary/30" />
          
          {/* Title Skeleton */}
          <Skeleton className="h-3 w-2/3 bg-surface-container-highest rounded" />
          
          {/* Date Skeleton */}
          <Skeleton className="h-2 w-1/3 bg-surface-container-highest/60 rounded" />
          
          {/* Action Row Skeletons */}
          <div className="space-y-1 mt-3">
             <Skeleton className="h-2 w-1/2 bg-surface-container-highest/40 rounded" />
             <Skeleton className="h-2 w-2/5 bg-surface-container-highest/40 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
