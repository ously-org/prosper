import { user } from "./state";
import { delay } from "./utils";

export async function fetchActivities() {
  await delay(300);
  
  // Derive activities from the user's past branch commits
  if (!user.pastBranch || !user.pastBranch.commits) {
    return [];
  }

  // Map Commits to a format that the Activity Log component expects
  // We can still return the shape of Activity for compatibility, or change it.
  // The user wants to "use the commit instead", so let's see.
  return user.pastBranch.commits.map((commit) => ({
    category: "COMMIT",
    title: commit.message,
    date: commit.timestamp.toISOString().split('T')[0],
    amount: commit.actions.length > 0 ? `${commit.actions.length} actions` : "No changes",
    variant: "primary",
  }));
}
