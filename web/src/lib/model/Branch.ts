import type { Commit } from "@/lib/model/Commit";
import type { GoalChange } from "@/lib/model/Goal.Base";

export interface Branch {
  id: string;
  name: string;
  commits: Commit[];
  goalChanges: GoalChange[];
}

export function getLatestBranchCommit(branch: Branch): Commit | undefined {
  return branch.commits[branch.commits.length - 1];
}
