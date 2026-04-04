import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CommitActionType, EntityType } from "@/lib/enum";
import type { Commit } from "@/lib/model/Commit";
import type { CommitAction } from "@/lib/model/CommitAction";

// --- Helpers ---

const ENTITY_LABEL: Record<string, string> = {
  [EntityType.Asset]: "ASSET",
  [EntityType.Liability]: "LIABILITY",
  [EntityType.Income]: "INCOME",
  [EntityType.Expense]: "EXPENSE",
};

const ACTION_COLOR: Record<string, string> = {
  [CommitActionType.Add]: "text-chart-2",
  [CommitActionType.Delete]: "text-destructive",
  [CommitActionType.Update]: "text-primary",
  [CommitActionType.Replace]: "text-yellow-400",
};

function formatActionLabel(action: CommitAction): string {
  const entity = ENTITY_LABEL[action.entityType] ?? action.entityType;
  switch (action.type) {
    case CommitActionType.Add:
      return `ADD ${entity}: ${(action.data as any)?.name ?? action.entityType}`;
    case CommitActionType.Delete:
      return `DELETE ${entity}: ${action.entityId}`;
    case CommitActionType.Update:
      return `UPDATE ${entity}: ${action.entityId}`;
    case CommitActionType.Replace:
      return `REPLACE ${entity}: ${action.entityId}`;
    default:
      return `${(action as any).type} ${entity}`;
  }
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  }).toUpperCase();
}

// --- Sub-parts ---

function CommitActionRow({ action }: { action: CommitAction }) {
  const colorClass = ACTION_COLOR[action.type] ?? "text-muted-foreground";
  return (
    <div className="flex items-start gap-2 text-[10px] font-mono text-muted-foreground leading-relaxed">
      <span className={`mt-0.5 ${colorClass}`}>→</span>
      <span>{formatActionLabel(action)}</span>
    </div>
  );
}

// --- Main ---

interface RoadmapCommitItemProps {
  commit: Commit;
  isFirst: boolean;
  onReview?: (commit: Commit) => void;
}

export function RoadmapCommitItem({
  commit,
  isFirst,
  onReview,
}: RoadmapCommitItemProps) {
  const isFuture = commit.timestamp > new Date();

  return (
    <div className="relative pl-4 border-l border-surface-container-high">
      {/* Timeline Dot */}
      <div
        className={`absolute left-[-4.5px] top-1.5 w-2 h-2 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.5)] ${
          isFuture ? "bg-primary" : "bg-chart-2"
        }`}
      />

      <div className="mb-1 flex justify-between items-baseline gap-4">
        <div className="text-sm font-bold text-foreground truncate">
          {commit.message}
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {!isFuture && (
            <Badge
              variant="outline"
              className="text-[8px] font-mono uppercase border-chart-2/30 text-chart-2 bg-chart-2/5 px-1.5 py-0"
            >
              done
            </Badge>
          )}
          <div className="text-[9px] font-mono text-muted-foreground uppercase">
            {formatDate(commit.timestamp)}
          </div>
        </div>
      </div>

      {commit.actions.length > 0 ? (
        <div className="space-y-1.5">
          {commit.actions.map((action, i) => (
            <CommitActionRow key={i} action={action} />
          ))}
        </div>
      ) : (
        <div className="text-[10px] font-mono text-muted-foreground/50 italic">
          No actions in this commit
        </div>
      )}

      {isFirst && onReview && (
        <Button
          onClick={() => onReview(commit)}
          className="mt-4 w-full text-[9px] font-mono font-bold uppercase h-8 rounded-sm bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 transition-all"
          size="sm"
        >
          Review Next Deployment
        </Button>
      )}
    </div>
  );
}
